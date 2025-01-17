<script setup lang="ts">
// Interface.
interface Props { isForCreating: boolean }

// Imports.
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductService } from "@/services/productService";
import { useProductCategoryService } from "@/services/productCategoryService";
import { useBrandService } from "@/services/brandService";
import { ProductUpsertModel } from "@/models/productModels";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import SubmitButton from "@forms/SubmitButtonComponent.vue";
import DeleteButton from "@forms/DeleteButtonComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";

// Child components.
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";
import ProductUpsertInputs from "./ProductUpsertInputsComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const productService = useProductService();
const productCategoryService = useProductCategoryService();
const brandService = useBrandService();

// Internal states.
const model = await initializeModelAndOptionsAsync();
const { modelState } = useUpsertViewStates();

// Computed properties.
const blockTitle = computed<string>(() => {
    if (props.isForCreating) {
        return "Tạo sản phẩm mới";
    }
    return "Chỉnh sửa sản phẩm";
});

const deleteButtonVisible = computed<boolean>(() => {
    return !props.isForCreating && !!model.canDelete;
});

// Functions
async function initializeModelAndOptionsAsync(): Promise<ProductUpsertModel> {
    if (props.isForCreating) {
        return reactive(new ProductUpsertModel());
    } else {
        const productId = parseInt(route.params.productId as string);
        const [productDetail, brandOptions, categoryOptions] = await Promise.all([
            productService.getDetailAsync(productId),
            brandService.getAllAsync(),
            productCategoryService.getAllAsync()
        ]);
        return reactive(new ProductUpsertModel(productDetail, brandOptions, categoryOptions));
    }
} 

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        model.id = await productService.createAsync(model.toRequestDto());
    } else {
        await productService.updateAsync(model.id, model.toRequestDto());
    }
}

async function deleteAsync(): Promise<void> {
    await productService.deleteAsync(model.id);
}

async function onDeletionSucceededAsync(): Promise<void> {
    await router.push({ name: "productList" });
}

async function onSubmissionSucceededAsync(): Promise<void> {
    await router.push({ name: "productDetail", params: { productId: model.id }});
}

function onThumbnailFileChanged(file: string | null): void {
    model.thumbnailFile = file;
    model.thumbnailChanged = true;
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <div class="col col-12">
                <ResourceAccess resource-type="Product" :resource-primary-id="model.id"
                        access-mode="Update" />
            </div>
            <div class="col col-12">
                <MainBlock :title="blockTitle" body-padding="2" close-button>
                    <template #body>
                        <!-- Upper row -->
                        <ProductUpsertInputs v-model="model"
                                @thumbnail-file-changed="onThumbnailFileChanged" />

                        <div class="row g-3">
                            <div class="col col-12 mb-2">
                                <div class="form-group">
                                    <FormLabel text="Mô tả" />
                                    <TextInput type="textarea" name="description"
                                            maxlength="1000" placeholder="Mô tả"
                                            v-model="model.description" />
                                    <ValidationMessage :model-state="modelState"
                                            name="description" />
                                </div>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Delete button -->
            <div class="col col-auto" v-if="deleteButtonVisible">
                <DeleteButton :callback="deleteAsync"
                        @succeeded="onDeletionSucceededAsync" />
            </div>

            <!-- Submit button -->
            <div class="col col-auto">
                <SubmitButton :callback="submitAsync"
                        @succeeded="onSubmissionSucceededAsync" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
textarea {
    min-height: 300px;
}
</style>