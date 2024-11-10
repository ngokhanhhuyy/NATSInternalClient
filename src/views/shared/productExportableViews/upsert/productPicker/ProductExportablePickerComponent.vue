<script setup lang="ts">
// Interface and types.
interface Props {
    itemInitializer: (product: ProductBasicModel) => IExportProductUpsertItemModel;
}
            
// Imports.
import { reactive, computed, watch, inject } from "vue";
import { ProductBasicModel, ProductListModel } from "@/models/productModels";
import { ProductCategoryBasicModel } from "@/models/productCategoryModels";
import { BrandBasicModel } from "@/models/brandModels";
import { useProductService } from "@/services/productService";
import { useProductCategoryService } from "@/services/productCategoryService";
import { useBrandService } from "@/services/brandService";
import type { LoadingState } from "@/composables/loadingStateComposable";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";

// Child components.
import Results from "./ProductExportablePickerResultsComponent.vue";
import PickedItemList from "./ProductExportablePickerPickedItemListComponent.vue";

// Dependencies.
const productService = useProductService();
const productCategoryService = useProductCategoryService();
const brandService = useBrandService();

// Props.
const props = defineProps<Props>();

// Model and states.
const model = defineModel<IExportProductUpsertItemModel[]>({
    required: true
});

const [productListModel, categoryOptions, brandOptions] = await initialLoadAsync();
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
const pageDisplayText = computed<string>(() => {
    return `Trang ${productListModel.page}/${productListModel.pageCount}`;
});

// Watch.
watch(() => productListModel.page, reloadListAsync);
watch(() => [productListModel.brandId, productListModel.categoryName], async () => {
    productListModel.page = 1;
    await reloadListAsync();
});

// Functions.
async function initialLoadAsync()
        : Promise<[ProductListModel, BrandBasicModel[], ProductCategoryBasicModel[]]> {
    return await Promise.all([
        initialLoadListAsync(),
        initialLoadBrandOptionsAsync(),
        initialLoadCategoryOptionsAsync()
    ]);
}

async function initialLoadListAsync(): Promise<ProductListModel> {
    const model = reactive(new ProductListModel());
    model.resultsPerPage = 10;
    const responseDto = await productService.getListAsync(model.toRequestDto());
    model.mapFromListResponseDto(responseDto);
    return model;
}

async function initialLoadBrandOptionsAsync(): Promise<BrandBasicModel[]> {
    const responseDto = await brandService.getAllAsync();
    return responseDto.map(b => new BrandBasicModel(b));
}

async function initialLoadCategoryOptionsAsync(): Promise<ProductCategoryBasicModel[]> {
    const responseDto = await productCategoryService.getAllAsync();
    return responseDto.map(pc => new ProductCategoryBasicModel(pc));
}

async function reloadListAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await productService.getListAsync(productListModel.toRequestDto());
    productListModel.mapFromListResponseDto(responseDto);
    loadingState.isLoading = false;
}

function onProductPicked(product: ProductBasicModel): void {
    const item = model.value?.find(i => i.product?.id === product.id);
    if (item != null) {
        item.quantity += 1;
    } else {
        model.value.push(props.itemInitializer(product));
    }
}

function onProductUnpicked(productId: number): void {
    const itemIndex = model.value.findIndex(i => i.product?.id === productId);
    model.value.splice(itemIndex, 1);
}
</script>

<template>
    <div class="row g-0 w-100">
        <!-- Product list -->
        <div class="col col-lg-6 col-12 pe-lg-2 pe-0 pb-lg-0 pb-3">
            <MainBlock title="Chọn sản phẩm" :body-padding="[0, 2, 2, 2]">
                <template #body>
                    <!-- Search and list -->
                    <div class="row g-3">
                        <!-- Category -->
                        <div class="col col-xl-6 col-lg-12 col-md-6 col-12">
                            <FormLabel text="Phân loại" />
                            <SelectInput v-model="productListModel.categoryName">
                                <option :value="null">Tất cả phân loại</option>
                                <option :value="category.name" :key="category.id"
                                        v-for="category in categoryOptions">
                                    {{ category.name }}
                                </option>
                            </SelectInput>
                        </div>

                        <!-- Brand -->
                        <div class="col col-xl-6 col-lg-12 col-md-6 col-12 mt-md-0">
                            <FormLabel text="Thương hiệu" />
                            <SelectInput v-model="productListModel.brandId">
                                <option :value="null">Tất cả thương hiệu</option>
                                <option :value="brand.id" :key="brand.id"
                                        v-for="brand in brandOptions">
                                    {{ brand.name }}
                                </option>
                            </SelectInput>
                        </div>

                        <!-- Paginator -->
                        <div class="col col-12 d-flex justify-content-center"
                                v-if="productListModel.pageCount > 1">
                            <div class="d-flex justify-content-center align-items-center
                                        pagination">
                                <!-- Back button -->
                                <button class="btn btn-outline-primary btn-sm"
                                        :class="backButtonClass"
                                        :disabled="backButtonDisabled"
                                        @click="productListModel.page -= 1">
                                    <i class="bi bi-chevron-left"></i>
                                </button>

                                <!-- Page number -->
                                <div class="border rounded px-3 py-1 mx-2 small">
                                    {{ pageDisplayText }}
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

                        <!-- Results -->
                        <Transition name="fade" mode="out-in">
                            <div class="col col-12" v-if="!loadingState.isLoading">
                                <Results v-model:products="productListModel.items"
                                        v-model:picked-items="model"
                                        @product-picked="onProductPicked" />
                            </div>
                        </Transition>
                    </div>
                </template>
            </MainBlock>
        </div>

        <!-- Picked items -->
        <div class="col col-lg-6 col-12 ps-lg-2 ps-0 ">
            <MainBlock title="Sản phẩm đã chọn" class="h-100" body-padding="0">
                <template #body>
                    <!-- List -->
                    <PickedItemList v-model="model" @unpicked="onProductUnpicked" />
                </template>
            </MainBlock>
        </div>
    </div>
</template>