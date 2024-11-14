<script setup lang="ts">
// Types
type BrandListProps = SecondaryListProps<
    BrandListModel,
    BrandBasicModel,
    BrandExistingAuthorizationModel>;

type ProductCategoryListProps = SecondaryListProps<
    ProductCategoryListModel,
    ProductCategoryBasicModel,
    ProductCategoryExistingAuthorizationModel>;

// Imports.
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { ProductBasicModel, ProductListModel } from "@/models/productModels";
import {
    ProductCategoryListModel,
    type ProductCategoryBasicModel,
    type ProductCategoryExistingAuthorizationModel } from "@/models/productCategoryModels";
import {
    BrandListModel,
    type BrandBasicModel,
    type BrandExistingAuthorizationModel } from "@/models/brandModels";
import { useProductService } from "@/services/productService";
import { useProductCategoryService } from "@/services/productCategoryService";
import { useBrandService } from "@/services/brandService";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainPaginator from "@layouts/MainPaginatorComponent.vue";

// Child components.
import Filters from "./FiltersComponent.vue";
import Results from "./ResultsComponent.vue";
import SecondaryList, { type Props as SecondaryListProps } from "./SecondaryListComponent.vue";

// Dependencies.
const router = useRouter();
const productService = useProductService();
const productCategoryService = useProductCategoryService();
const brandService = useBrandService();

// Models and states.
const { loadingState, initialData } = useViewStates();
const model = reactive(await initialLoadAsync());

// Watch.
watch(
    () => [model.categoryId, model.brandId],
    async (oldValue, currentValue) => {
        if (currentValue != oldValue) {
            await loadResultsAsync();
        }
    });

// Functions.
async function initialLoadAsync(): Promise<ProductListModel> {
    const responseDto = await productService.getListAsync();
    return new ProductListModel(
        responseDto,
        initialData.brand.allAsOptions,
        initialData.productCategory.allAsOptions,
        initialData.product);
}

async function loadResultsAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await productService.getListAsync(model.toRequestDto());
    model.mapFromListResponseDto(responseDto);
    loadingState.isLoading = false;
}

async function onItemClicked(product: ProductBasicModel): Promise<void> {
    loadingState.isLoading = true;
    await router.push({ name: "productDetail", params: { productId: product.id } });
}

async function onPageButtonClicked(page: number) {
    model.page = page;
    await loadResultsAsync();
}

const brandListProps: BrandListProps = {
    resourceDisplayName: "Thương hiệu",
    iconClass: "bi bi-building",
    initializeModelAsync: async (requestDto) => {
        const responseDto = await brandService.getListAsync(requestDto);
        return new BrandListModel(
            responseDto,
            initialData.brand.creatingPermission,
            requestDto);
    },
    reloadModelAsync: async (model) => {
        const responseDto = await brandService.getListAsync(model.toRequestDto());
        model.mapFromResponseDto(responseDto);
    },
    getCreatingPermissionAsync: async () => {
        return await brandService.getCreatingPermissionAsync();
    }
};

const productCategoryListProps: ProductCategoryListProps = {
    resourceDisplayName: "Phân loại",
    iconClass: "bi bi-tag-fill",
    initializeModelAsync: async (requestDto) => {
        const responseDto = await productCategoryService.getListAsync(requestDto);
        return new ProductCategoryListModel(
            responseDto,
            initialData.productCategory.creatingPermission,
            requestDto);
    },
    reloadModelAsync: async (model) => {
        const responseDto = await brandService.getListAsync(model.toRequestDto());
        model.mapFromResponseDto(responseDto);
    },
    getCreatingPermissionAsync: async () => {
        return await brandService.getCreatingPermissionAsync();
    }
};
</script>

<template>
    <MainContainer>
        <div class="row g-0 p-0">
            <div class="col col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                <div class="row g-3 justify-content-end">
                    <div class="col col-12">
                        <Filters v-model="model" />
                    </div>
                </div>

                <!-- Results -->
                <div class="row g-3">
                    <div class="col col-12">
                        <div class="block block-product rounded-3">
                            <Results v-model="model.items" @item-clicked="onItemClicked" />
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="row g-3">
                    <div class="col col-12 d-flex flex-row justify-content-center">
                        <MainPaginator :page="model.page" :page-count="model.pageCount"
                            @page-click="onPageButtonClicked" v-if="model.pageCount > 1" />
                    </div>
                </div>
            </div>
            <div class="col p-0">
                <div class="row g-3">
                    <div class="col col-xl-12 col-lg-6 col-md-6 col-sm-6 col-12">
                        <SecondaryList v-bind="brandListProps" />
                    </div>
                    <div class="col col-xl-12 col-lg-6 col-md-6 col-sm-6 col-12">
                        <SecondaryList v-bind="productCategoryListProps" />
                    </div>
                </div>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
.block.block-product img {
    width: auto;
    height: 70px;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: 50% 50%;
}

.block.block-product .additional-info {
    overflow: hidden;
}

.block.block-product .additional-info span {
    width: auto;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>