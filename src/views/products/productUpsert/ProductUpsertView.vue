<script setup lang="ts">
// Interface.
interface Props { isForCreating: boolean }

interface ModelAndOptionsResult {
    model: ProductUpsertModel;
    categoryOptions: ProductCategoryListModel;
    brandOptions: BrandListModel;
}

// Imports.
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductService } from "@/services/productService";
import { useProductCategoryService } from "@/services/productCategoryService";
import { useBrandService } from "@/services/brandService";
import { ProductUpsertModel } from "@/models";
import { ProductCategoryListModel } from "@/models";
import { BrandListModel } from "@/models";
import { useUpsertViewStates } from "@/composables";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, TextInput, SubmitButton, DeleteButton,
    ValidationMessage } from "@/components/formInputs";

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
const { model, categoryOptions, brandOptions } = await initializeModelAndOptionsAsync();
const { modelState } = useUpsertViewStates();

// Computed properties.
const blockTitle = computed<string>(() => {
    if (props.isForCreating) {
        return "Tạo sản phẩm mới";
    }
    return "Chỉnh sửa sản phẩm";
});

const deleteButtonVisible = computed<boolean>(() => {
    return !props.isForCreating && !!model.authorization?.canDelete;
});

// Functions
async function initializeModelAndOptionsAsync(): Promise<ModelAndOptionsResult> {
    const [model, brandOptions, categoryOptions] = await Promise.all([
        initializeModelAsync(),
        loadBrandOptionsAsync(),
        loadCategoryOptionsAsync()
    ]);
    return { model, brandOptions, categoryOptions };
} 

async function initializeModelAsync(): Promise<ProductUpsertModel> {
    if (props.isForCreating) {
        return reactive(new ProductUpsertModel());
    } else {
        const productId = parseInt(route.params.productId as string);
        const responseDto = await productService.getDetailAsync(productId);
        return reactive(new ProductUpsertModel(responseDto));
    }
}

async function loadCategoryOptionsAsync(): Promise<ProductCategoryListModel> {
    const responseDto = await productCategoryService.getListAsync();
    return reactive(new ProductCategoryListModel(responseDto));
}

async function loadBrandOptionsAsync(): Promise<BrandListModel> {
    const responseDto = await brandService.getListAsync();
    return reactive(new BrandListModel(responseDto));
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
            <div class="col col-12 mb-3">
                <ResourceAccess resource-type="Product" :resource-primary-id="model.id"
                        access-mode="Update" />
            </div>
            <div class="col col-12 mb-3">
                <MainBlock :title="blockTitle" body-padding="2" close-button>
                    <template #body>
                        <!-- Upper row -->
                        <ProductUpsertInputs v-model="model"
                                :category-options="categoryOptions"
                                :brand-options="brandOptions"
                                @thumbnail-file-changed="onThumbnailFileChanged" />

                        <div class="row g-3">
                            <div class="col col-12 mb-2">
                                <div class="form-group">
                                    <FormLabel name="Mô tả" />
                                    <TextInput type="textarea" property-path="description"
                                            maxlength="1000" placeholder="Mô tả"
                                            v-model="model.description" />
                                    <ValidationMessage :model-state="modelState"
                                            property-path="description" />
                                </div>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Delete button -->

            <!-- Submit button -->
            <div class="col col-auto" v-if="deleteButtonVisible">
                <DeleteButton :callback="deleteAsync"
                        @deletion-succeeded="onDeletionSucceededAsync" />
            </div>
            <div class="col col-auto">
                <SubmitButton :callback="submitAsync"
                        @submission-suceeded="onSubmissionSucceededAsync" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
textarea {
    min-height: 300px;
}
</style>