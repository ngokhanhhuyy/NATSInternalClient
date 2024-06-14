<script setup lang="ts">
import { reactive, watch, defineAsyncComponent } from "vue";
import { useRouter, type RouteLocationRaw } from "vue-router";
import { ProductBasicModel, ProductListModel, ProductCategoryListModel } from "@/models";
import { BrandListModel } from "@/models";
import { useProductService } from "@/services/productService";
import { useProductCategoryService } from "@/services/productCategoryService";
import { useBrandService } from "@/services/brandService";
import { useViewStates } from "@/composables/viewStatesComposable";
type InitialLoadingResult = [ProductListModel, ProductCategoryListModel, BrandListModel];

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, SelectInput } from "@/components/formInputs";

// Async components.
const ProductCategoryList = defineAsyncComponent(() =>
    import("@/views/products/productList/ProductCategoryListComponent.vue"));
const BrandList = defineAsyncComponent(() =>
    import("@/views/products/productList/BrandListComponent.vue"));
const MainPaginator = defineAsyncComponent(() =>
    import("@/views/shared/MainPaginatorComponent.vue"));

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
    const [productListResponseDto, categoryListResponseDto, brandListResponseDto] = await Promise.all([
        productService.getListAsync(model.toRequestDto()),
        productCategoryService.getListAsync(),
        brandService.getListAsync()
    ]);
    model.mapFromResponseDto(productListResponseDto);
    const categoryOptions = reactive(new ProductCategoryListModel(categoryListResponseDto));
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
                <div class="row g-3 justify-content-end my-3">
                    <div class="col col-12">
                        <MainBlock title="Sản phẩm" body-padding="2" body-class="row g-3">
                            <template #header>
                                <RouterLink :to="createRoute" class="btn btn-primary btn-sm">
                                    <i class="bi bi-plus-lg"></i>
                                    Tạo sản phẩm
                                </RouterLink>
                            </template>
                            <template #body>
                                <!-- Category options -->
                                <div class="col col-md-6 col-sm-12 col-12 mb-2">
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
                                <div class="col col-md-6 col-sm-12 col-12 mb-2">
                                    <FormLabel name="Thương hiệu" />
                                    <SelectInput v-model="model.brandId"
                                            :disabled="loadingState.isLoading"
                                            v-if="brandOptions.items">
                                        <option :value="null">Tất cả thương hiệu</option>
                                        <option :value="brand.id"
                                            v-for="brand in brandOptions.items"
                                            :key="brand.id">
                                            {{ brand.name }}
                                        </option>
                                    </SelectInput>
                                </div>
                            </template>
                        </MainBlock>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="row g-3 mb-3">
                    <div class="col col-12 d-flex flex-row justify-content-center">
                        <MainPaginator :page="model.page" v-if="model.pageCount > 1"
                                :page-count="model.pageCount" @page-click="onPageButtonClicked" />
                    </div>
                </div>

                <!-- Results -->
                <div class="row g-3">
                    <div class="col col-12 mb-3">
                        <div class="block block-product rounded-3">
                            <Transition name="fade" mode="out-in">
                                <div class="border rounded-3 bg-white overflow-hidden"
                                        v-if="!loadingState.isLoading">
                                    <ul class="list-group list-group-flush" v-if="model.items.length">
                                        <li class="list-group-item d-flex flex-row justify-content-start
                                                    align-items-center px-3 py-2"
                                                v-for="product in model.items" :key="product.id">
                                            <img class="img-thumbnail" :src="product.thumbnailUrl">
                                            <div class="px-3 d-flex flex-column flex-fill justify-content-center
                                                        align-items-start additional-info">
                                                <span class="fw-bold">{{ product.name }}</span>
                                                <span class="bg-success-subtle text-success small px-2 rounded">
                                                    {{ product.price.toLocaleString().replace(",", " ") }}đ
                                                </span>
                                            </div>
                                            <button class="btn btn-outline-primary btn-sm m-2 flex-shrink-0"
                                                    @click="onItemClicked(product)">
                                                <i class="bi bi-eye"></i>
                                                <span class="d-md-inline d-sm-none d-none ms-1">Chi tiết</span>
                                            </button>
                                        </li>
                                    </ul>
                                    <ul class="list-group list-group-flush"
                                            v-else>
                                        <li class="list-group-item d-flex flex-row justify-content-center
                                                    align-items-center opacity-50 p-3">
                                            Không tìm thấy sản phẩm
                                        </li>
                                    </ul>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="row g-3 mb-xl-0 mb-lg-3 mb-md-3 mb-sm-3 mb-3">
                    <div class="col col-12 d-flex flex-row justify-content-center">
                        <MainPaginator :page="model.page" v-if="model.pageCount > 1"
                                :page-count="model.pageCount" @page-click="onPageButtonClicked" />
                    </div>
                </div>
            </div>
            <div class="col p-0">
                <div class="row g-3">
                    <div class="col col-xl-12 col-lg-6 col-md-6 col-sm-6 col-12">
                        <ProductCategoryList :model="categoryOptions"
                            @deleted="onCategoryDeleted" />
                    </div>
                    <div class="col col-xl-12 col-lg-6 col-md-6 col-sm-6 col-12">
                        <BrandList :model="brandOptions" @deleted="onBrandDeleted"/>
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