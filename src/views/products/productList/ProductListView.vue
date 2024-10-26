<script setup lang="ts">
// Types
type InitialLoadingResult = [ProductListModel, ProductCategoryListModel, BrandListModel];

// Imports.
import { reactive, watch, defineAsyncComponent } from "vue";
import { useRouter, type RouteLocationRaw } from "vue-router";
import {
    ProductBasicModel,
    ProductListModel } from "@/models/productModels";
import { ProductCategoryListModel } from "@/models/productCategoryModels";
import { BrandListModel } from "@/models/brandModels";
import { useProductService } from "@/services/productService";
import { useProductCategoryService } from "@/services/productCategoryService";
import { useBrandService } from "@/services/brandService";
import { useViewStates } from "@/composables";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";

// Child components.
const MainPaginator = defineAsyncComponent(() =>
    import("@layouts/MainPaginatorComponent.vue"));
const ProductCategoryList = defineAsyncComponent(() =>
    import("./ProductCategoryListComponent.vue"));
const BrandList = defineAsyncComponent(() =>
    import("./BrandListComponent.vue"));
const ProductListResults = defineAsyncComponent(() =>
    import("./ProductListResultsComponent.vue"));

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
        categoryListResponseDto,
        brandListResponseDto
    ] = await Promise.all([
        productService.getListAsync(model.toRequestDto()),
        productCategoryService.getListAsync(),
        brandService.getListAsync()
    ]);
    model.mapFromResponseDto(productListResponseDto);
    const categoryOptions = new ProductCategoryListModel(categoryListResponseDto);
    const brandOptions = reactive(new BrandListModel(brandListResponseDto));

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

function onCategoryDeleted(id: number) {
    if (model.categoryName === categoryOptions.items.find(c => c.id === id)?.name) {
        model.categoryName = null;
    }
    const category = categoryOptions.items.find(c => c.id === id);
    const index = categoryOptions.items.indexOf(category!);
    categoryOptions.items.splice(index, 1);
}

function onBrandDeleted(id: number) {
    if (model.brandId === id) {
        model.brandId = null;
    }
    const brand = brandOptions.items.find(b => b.id === id);
    const index = brandOptions.items.indexOf(brand!);
    brandOptions.items.splice(index, 1);
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
                                    <FormLabel name="Phân loại" />
                                    <SelectInput v-model="model.categoryName"
                                            :disabled="loadingState.isLoading"
                                            v-if="categoryOptions.items">
                                        <option :value="null">Tất cả phân loại</option>
                                        <option :value="category.name"
                                                v-for="category in categoryOptions.items"
                                            :key="category.id">
                                            {{ category.name }}
                                        </option>
                                    </SelectInput>
                                </div>

                                <!-- Brand options -->
                                <div class="col col-md-6 col-sm-12 col-12">
                                    <FormLabel name="Thương hiệu" />
                                    <SelectInput v-model="model.brandId"
                                            :disabled="loadingState.isLoading"
                                            v-if="brandOptions.items">
                                        <option :value="null">Tất cả thương hiệu</option>
                                        <option :value="brand.id" :key="brand.id"
                                                v-for="brand in brandOptions.items">
                                            {{ brand.name }}
                                        </option>
                                    </SelectInput>
                                </div>
                            </template>
                        </MainBlock>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="row g-3">
                    <div class="col col-12 d-flex flex-row justify-content-center">
                        <MainPaginator :page="model.page" :page-count="model.pageCount"
                                v-if="model.pageCount > 1" 
                            @page-click="onPageButtonClicked" />
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
                        <ProductCategoryList :model="categoryOptions" @deleted="onCategoryDeleted" />
                    </div>
                    <div class="col col-xl-12 col-lg-6 col-md-6 col-sm-6 col-12">
                        <BrandList :model="brandOptions" @deleted="onBrandDeleted" />
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