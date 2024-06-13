<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { reactive, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductCategoryService } from "@/services/productCategoryService";
import { ProductCategoryModel } from "@/models";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@/views/layouts/MainContainerComponent.vue";

// Async components.
const ValidationMessage = defineAsyncComponent(() =>
    import("@/components/formInputs/ValidationMessage.vue"));
const SubmitButton = defineAsyncComponent(() =>
    import("@/components/formInputs/SubmitButtonComponent.vue"));

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const service = useProductCategoryService();

// Internal states.
const model = await initializeModalAsync();
const { modelState } = useUpsertViewStates();

// Functions
async function initializeModalAsync(): Promise<ProductCategoryModel> {
    if (props.isForCreating) {
        return reactive(new ProductCategoryModel());
    } else {
        const id = parseInt(route.params.productCategoryId as string);
        const responseDto = await service.getDetailAsync(id);
        return reactive(new ProductCategoryModel(responseDto));
    }
}

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        model.id = await service.createAsync(model.toUpsertRequestDto());
    } else {
        await service.updateAsync(model.id, model.toUpsertRequestDto());
    }
}

async function onSubmissionSucceededAsync(): Promise<void> {
    await router.push({ name: "productList" });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <div class="col col-12 my-3">
                <div class="block bg-white rounded-3">
                    <!-- Header -->
                    <div class="block-header bg-primary-subtle border border-primary-subtle
                                rounded-top-3 p-2 ps-3">
                        <span class="text-primary small fw-bold" v-if="isForCreating">
                            TẠO PHÂN LOẠI SẢN PHẨM MỚI
                        </span>
                        <span class="text-primary small fw-bold" v-else>
                            CHỈNH SỬA PHÂN LOẠI SẢN PHẨM
                        </span>
                    </div>

                    <!-- Body -->
                    <div class="block-body border border-top-0 rounded-bottom-3 p-3 pt-2">
                        <label class="form-label small fw-bold">Tên phân loại</label>
                        <input class="form-control" :class='modelState.inputClass("name")'
                                type="text" maxlength="30" placeholder="Tên phân loại"
                                v-model="model.name" />
                        <ValidationMessage property-path="name" />
                    </div>
                </div>
            </div>

            <!-- Cancel button -->
            <div class="col col-lg-3 col-md-4 col-sm-5 col-6">
                <button class="btn btn-secondary w-100" @click="router.back()">
                    <i class="bi bi-x-lg"></i>
                    <span class="ms-1">Huỷ bỏ</span>
                </button>
            </div>

            <!-- Submit button -->
            <div class="col col-lg-3 col-md-4 col-sm-5 col-6 mb-3">
                <SubmitButton :callback="submitAsync"
                        @submission-suceeded="onSubmissionSucceededAsync" />
            </div>
        </div>
    </MainContainer>
</template>