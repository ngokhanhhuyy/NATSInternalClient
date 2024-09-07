<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductCategoryService } from "@/services/productCategoryService";
import { ProductCategoryModel } from "@/models";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, TextInput, SubmitButton,
    ValidationMessage } from "@/components/formInputs";

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const service = useProductCategoryService();

// Internal states.
const model = await initializeModalAsync();
useUpsertViewStates();

// Computed properties.
const blockTitle = computed<string>(() => {
    if (props.isForCreating) {
        return "Tạo phân loại sản phẩm mới";
    }
    return "Chỉnh sửa phân loại sản phẩm";
});

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
            <div class="col col-12">
                <MainBlock :title="blockTitle" close-button
                        body-class="row g-3" :body-padding="[2, 3, 3, 3]">
                    <template #body>
                        <FormLabel name="Tên phân loại" />
                        <TextInput property-path="name" maxlength="30"
                                placeholder="Tên phân loại" v-model="model.name" />
                        <ValidationMessage property-path="name" />
                    </template>
                </MainBlock>
            </div>

            <!-- Submit button -->
            <div class="col col-auto mt-3">
                <SubmitButton :callback="submitAsync"
                        @submission-suceeded="onSubmissionSucceededAsync" />
            </div>
        </div>
    </MainContainer>
</template>