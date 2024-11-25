<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductCategoryService } from "@/services/productCategoryService";
import { ProductCategoryUpsertModel }  from "@/models/productCategoryModels";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import SubmitButton from "@forms/SubmitButtonComponent.vue";
import DeleteButton from "@forms/DeleteButtonComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const service = useProductCategoryService();

// Internal states.
const model = await initializeModelAsync();
useUpsertViewStates();

// Computed properties.
const blockTitle = computed<string>(() => {
    if (props.isForCreating) {
        return "Tạo phân loại sản phẩm mới";
    }
    return "Chỉnh sửa phân loại sản phẩm";
});

// Functions
async function initializeModelAsync(): Promise<ProductCategoryUpsertModel> {
    if (props.isForCreating) {
        return reactive(new ProductCategoryUpsertModel());
    } else {
        const id = parseInt(route.params.productCategoryId as string);
        const responseDto = await service.getDetailAsync(id);
        return reactive(new ProductCategoryUpsertModel(responseDto));
    }
}

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        model.id = await service.createAsync(model.toRequestDto());
    } else {
        await service.updateAsync(model.id, model.toRequestDto());
    }
}

async function deleteAsync(): Promise<void> {
    await service.deleteAsync(model.id);
}

async function onSubmissionOrDeletionSucceededAsync(): Promise<void> {
    await router.push({ name: "productList" });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <div class="col col-12" v-if="!props.isForCreating">
                <ResourceAccess resource-type="ProductCategory" :resource-primary-id="model.id"
                        access-mode="Update" />
            </div>
            <div class="col col-12">
                <MainBlock :title="blockTitle" close-button
                        body-class="row g-3" :body-padding="[2, 3, 3, 3]">
                    <template #body>
                        <FormLabel text="Tên phân loại" />
                        <TextInput name="name" maxlength="30"
                                placeholder="Tên phân loại" v-model="model.name" />
                        <ValidationMessage name="name" />
                    </template>
                </MainBlock>
            </div>

            <!-- Action buttons -->
            <div class="col col-auto">
                <SubmitButton :callback="submitAsync"
                        @succeeded="onSubmissionOrDeletionSucceededAsync" />
            </div>
            <div class="col col-auto">
                <DeleteButton :callback="deleteAsync"
                        @succeeded="onSubmissionOrDeletionSucceededAsync" />
            </div>
        </div>
    </MainContainer>
</template>