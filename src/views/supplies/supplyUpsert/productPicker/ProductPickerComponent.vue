<script setup lang="ts">
import { reactive, computed, watch, inject, type Reactive } from "vue";
import { useProductService } from "@/services/productService";
import { useBrandService } from "@/services/brandService";
import { useProductCategoryService } from "@/services/productCategoryService";
import type { LoadingState } from "@/composables/loadingStateComposable";
import { ProductListModel, ProductBasicModel } from "@/models/productModels";
import { BrandBasicModel } from "@/models/brandModels";
import { ProductCategoryBasicModel } from "@/models/productCategoryModels";
import { SupplyUpsertItemModel } from "@/models/supplyItemModels";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";

// Child component.
import ResultList from "./ProductPickerResultListComponent.vue";

// Dependencies.
const productService = useProductService();
const brandService = useBrandService();
const productCategoryService = useProductCategoryService();

// Model and states.
const model = defineModel<SupplyUpsertItemModel[]>({ required: true });
const [productListModel, brandOptionsModel, categoryOptionsModel] = await Promise.all([
    initialLoadProductListAsync(),
    initialLoadBrandOptionsAsync(),
    initialLoadCategoryOptionsAsync()
]);
const loadingState = inject<LoadingState>("loadingState")!;

// Computed properties.
const backButtonDisabled = computed<boolean>(() => productListModel.page === 1);
const backButtonClass = computed<string | null>(() => {
    return backButtonDisabled.value ? "opacity-25" : null;
});

const nextButtonDisabled = computed<boolean>(() =>
    productListModel.page === productListModel.pageCount);
const nextButtonClass = computed<string | null>(() => {
    return nextButtonDisabled.value ? "opacity-25" : null;
});

// Watch.
watch(
    () => [productListModel.page, productListModel.brandId, productListModel.categoryName],
    reloadProductListAsync);

// Functions.
async function initialLoadProductListAsync(): Promise<Reactive<ProductListModel>> {
    const requestDto = { resultsPerPage: 7 };
    const responseDto = await productService.getListAsync(requestDto);
    const listModel = reactive(new ProductListModel());
    listModel.resultsPerPage = requestDto.resultsPerPage;
    listModel.mapFromResponseDto(responseDto);
    return listModel;
}

async function reloadProductListAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await productService.getListAsync(productListModel.toRequestDto());
    productListModel.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

async function initialLoadBrandOptionsAsync(): Promise<BrandBasicModel[]> {
    const responseDto = await brandService.getAllAsync();
    return responseDto.map(b => new BrandBasicModel(b));
}

async function initialLoadCategoryOptionsAsync(): Promise<ProductCategoryBasicModel[]> {
    const responseDto = await productCategoryService.getAllAsync();
    return responseDto.map(pc => new ProductCategoryBasicModel(pc));
}

function onProductPicked(product: ProductBasicModel): void {
    const item = model.value.find(i => i.product.id === product.id);
    if (item) {
        item.quantity += 1;
    } else {
        const supplyItem = new SupplyUpsertItemModel(product);
        model.value.push(supplyItem);
    }
}

function onProductIncremented(product: ProductBasicModel): void {
    const item = model.value.find(i => i.product.id === product.id)!;
    item.quantity += 1;
}
</script>

<template>
    <MainBlock title="Sản phẩm" :body-padding="[0, 2, 2, 2]" body-class="row g-3"
            class="sticky-top">
        <template #body>
            <!-- Product name search -->
            <div class="col col-12">
                <FormLabel name="Tìm kiếm sản phẩm" />
                <TextInput v-model="productListModel.productName"
                        placeholder="Tìm kiếm theo tên ..." />
            </div>

            <!-- Category options -->
            <div class="col col-xl-6 col-lg-12 col-md-6 col-sm-12 col-12">
                <FormLabel name="Phân loại" />
                <SelectInput v-model="productListModel.categoryName">
                    <option :value="null">Tất cả phân loại</option>
                    <option :value="category.name" :key="category.id"
                            v-for="category of categoryOptionsModel">
                        {{ category.name }}
                    </option>
                </SelectInput>
            </div>

            <!-- Brand options -->
            <div class="col col-xl-6 col-lg-12 col-md-6 col-sm-12 col-1">
                <FormLabel name="Thương hiệu" />
                <SelectInput v-model="productListModel.categoryName">
                    <option :value="null">Tất cả thương hiệu</option>
                    <option :value="brand.id" :key="brand.id"
                            v-for="brand in brandOptionsModel">
                        {{ brand.name }}
                    </option>
                </SelectInput>
            </div>

            <!-- Product results -->
            <div class="col col-12">
                <!-- Pagination -->
                <div class="d-flex justify-content-center align-items-center pagination"
                        v-if="productListModel.pageCount != 0">
                    <!-- Back button -->
                    <button class="btn btn-outline-primary btn-sm"
                            :class="backButtonClass"
                            :disabled="backButtonDisabled"
                            @click="productListModel.page -= 1">
                        <i class="bi bi-chevron-left"></i>
                    </button>

                    <!-- Page number -->
                    <div class="border rounded px-3 py-1 mx-2 small">
                        Trang {{ productListModel.page }}/{{ productListModel.pageCount }}
                    </div>

                    <!-- Next button -->
                    <button class="btn btn-outline-primary btn-sm"
                            :class="nextButtonClass"
                            :disabled="nextButtonDisabled"
                            @click="productListModel.page += 1">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>

            <!-- Results list -->
            <div class="col col-12">
                <Transition name="fade">
                    <div v-if="!loadingState.isLoading">
                        <ResultList v-model:products="productListModel.items"
                                v-model:supplyItems="model"
                                @picked="onProductPicked"
                                @incremented="onProductIncremented" />
                    </div>
                </Transition>
            </div>
        </template>
    </MainBlock>
</template>