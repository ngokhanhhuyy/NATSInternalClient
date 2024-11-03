<script setup lang="ts">
// Types
type InitialLoadingResult = [
    Reactive<ProductListModel>,
    Ref<ProductCategoryBasicModel[]>,
    Ref<BrandBasicModel[]>
];

// Imports.
import { reactive, ref, watch, type Ref, type Reactive } from "vue";
import { useRouter, type RouteLocationRaw } from "vue-router";
import {
    ProductBasicModel,
    ProductListModel } from "@/models/productModels";
import { ProductCategoryBasicModel } from "@/models/productCategoryModels";
import { BrandBasicModel } from "@/models/brandModels";
import { useProductService } from "@/services/productService";
import { useProductCategoryService } from "@/services/productCategoryService";
import { useBrandService } from "@/services/brandService";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";

// Child components.
import MainPaginator from "@layouts/MainPaginatorComponent.vue";
import SecondaryList from "./ProductSecondaryListComponent.vue";
import ProductListResults from "./ProductListResultsComponent.vue";

// Dependencies.
const router = useRouter();
const productService = useProductService();
const productCategoryService = useProductCategoryService();
const brandService = useBrandService();

// Models and states.
const [model, categoryOptions, brandOptions] = await initialLoadAsync();
const { loadingState } = useViewStates();
const createRoute: RouteLocationRaw = { name: "productCreate" };

// Watch.
watch(() => [model.categoryName, model.brandId], async () => await loadResultsAsync());

// Functions.
async function initialLoadAsync(): Promise<InitialLoadingResult> {
    const model = reactive(new ProductListModel());
    const [
        productListResponseDto,
        categoryOptionResponseDtos,
        brandOptionResponseDtos
    ] = await Promise.all([
        productService.getListAsync(model.toRequestDto()),
        productCategoryService.getAllAsync(),
        brandService.getAllAsync()
    ]);
    model.mapFromResponseDto(productListResponseDto);
    const categoryOptions = ref(categoryOptionResponseDtos
        .map(responseDto => new ProductCategoryBasicModel(responseDto)) ?? []);
    const brandOptions = ref(brandOptionResponseDtos
        .map(responseDto => new BrandBasicModel(responseDto)) ?? []);

    return [model, categoryOptions, brandOptions];
}

async function loadResultsAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await productService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
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
</script>

<template>
    <MainContainer>
        <div class="row g-0 p-0">
            <div class="col col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                <div class="row g-3 justify-content-end">
                    <div class="col col-12">
                        <MainBlock title="Sản phẩm" :body-padding="[0, 2, 2, 2]"
                                body-class="row g-3">
                            <template #header>
                                <RouterLink :to="createRoute" class="btn btn-primary btn-sm">
                                    <i class="bi bi-plus-lg"></i>
                                    Tạo sản phẩm
                                </RouterLink>
                            </template>
                            <template #body>
                                <!-- Category options -->
                                <div class="col col-md-6 col-sm-12 col-122">
                                    <FormLabel text="Phân loại" />
                                    <SelectInput v-model="model.categoryName"
                                            :disabled="loadingState.isLoading"
                                            v-if="categoryOptions">
                                        <option :value="null">Tất cả phân loại</option>
                                        <option :value="category.name"
                                                v-for="category in categoryOptions"
                                            :key="category.id">
                                            {{ category.name }}
                                        </option>
                                    </SelectInput>
                                </div>

                                <!-- Brand options -->
                                <div class="col col-md-6 col-sm-12 col-12">
                                    <FormLabel text="Thương hiệu" />
                                    <SelectInput v-model="model.brandId"
                                            :disabled="loadingState.isLoading"
                                            v-if="brandOptions">
                                        <option :value="null">Tất cả thương hiệu</option>
                                        <option :value="brand.id" :key="brand.id"
                                                v-for="brand in brandOptions">
                                            {{ brand.name }}
                                        </option>
                                    </SelectInput>
                                </div>
                            </template>
                        </MainBlock>
                    </div>
                </div>

                <!-- Results -->
                <div class="row g-3">
                    <div class="col col-12">
                        <div class="block block-product rounded-3">
                            <ProductListResults v-model="model.items"
                                    @item-clicked="onItemClicked" />
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
                        <SecondaryList type="ProductCategory" />
                    </div>
                    <div class="col col-xl-12 col-lg-6 col-md-6 col-sm-6 col-12">
                        <SecondaryList type="Brand" />
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