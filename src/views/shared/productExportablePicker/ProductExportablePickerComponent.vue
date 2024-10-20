<script setup lang="ts">
// Interface and types.
interface Props {
    itemInitializer: (product: ProductBasicModel) => ItemModel;
}

type ItemModel = OrderUpsertItemModel | TreatmentUpsertItemModel;
type InitialLoadResult = [ProductListModel, ProductCategoryListModel, BrandListModel];
            
// Imports.
import { reactive, computed, watch, inject } from "vue";
import {
    OrderUpsertItemModel, TreatmentUpsertItemModel, ProductBasicModel, ProductListModel,
    ProductCategoryListModel, BrandListModel } from "@/models";
import { useProductService } from "@/services/productService";
import { useProductCategoryService } from "@/services/productCategoryService";
import { useBrandService } from "@/services/brandService";
import { useAmountUtility } from "@/utilities/amountUtility";
import type { LoadingState } from "@/composables";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import { FormLabel, SelectInput } from "@/components/formInputs";

// Child components.
import PickedItemList from "./ProductExportablePickerPickedItemListComponent.vue";

// Dependencies.
const productService = useProductService();
const productCategoryService = useProductCategoryService();
const brandService = useBrandService();
const amountUtility = useAmountUtility();

// Props.
const props = defineProps<Props>();

// Model and states.
const model = defineModel<ItemModel[]>({
    required: true
});

const [productListModel, categoryOptions, brandOptions] = await initialLoadListAsync();
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
    return `Trang ${productListModel.page}/${productListModel.pageCount}`
});

// Watch.
watch(() => productListModel.page, reloadListAsync);
watch(() => [productListModel.brandId, productListModel.categoryName], async () => {
    productListModel.page = 1;
    await reloadListAsync();
});

// Functions.
async function initialLoadListAsync(): Promise<InitialLoadResult> {
    const model = reactive(new ProductListModel());
    model.resultsPerPage = 10;
    const categoryOptions = reactive(new ProductCategoryListModel());
    const brandOptions = reactive(new BrandListModel());
    const [productListResponseDto, categoryResponseDto, brandResponseDto] = await Promise.all([
        productService.getListAsync(model.toRequestDto()),
        productCategoryService.getListAsync(),
        brandService.getListAsync()
    ]);
    model.mapFromResponseDto(productListResponseDto);
    categoryOptions.mapFromResponseDto(categoryResponseDto);
    brandOptions.mapFromResponseDto(brandResponseDto);
    return [model, categoryOptions, brandOptions];
}

async function reloadListAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await productService.getListAsync(productListModel.toRequestDto());
    productListModel.mapFromResponseDto(responseDto);
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

function getAmountText(amount: number): string {
    return amount.toLocaleString().replaceAll(".", " ") + "vnđ";
}

function getProductPickButtonClass(product: ProductBasicModel): string {
    if (!model.value.map(i => i.product!.id).includes(product.id)) {
        return "btn-outline-primary";
    }
    return "btn-outline-success";
}

function getProductPickButtonIcon(product: ProductBasicModel): string {
    if (!model.value.map(i => i.product!.id).includes(product.id)) {
        return "bi bi-check2";
    }
    return "bi bi-plus-lg";
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
                            <FormLabel name="Phân loại" />
                            <SelectInput v-model="productListModel.categoryName">
                                <option :value="null">Tất cả phân loại</option>
                                <option :value="category.name" :key="category.id"
                                        v-for="category in categoryOptions.items">
                                    {{ category.name }}
                                </option>
                            </SelectInput>
                        </div>

                        <!-- Brand -->
                        <div class="col col-xl-6 col-lg-12 col-md-6 col-12 mt-md-0">
                            <FormLabel name="Thương hiệu" />
                            <SelectInput v-model="productListModel.brandId">
                                <option :value="null">Tất cả thương hiệu</option>
                                <option :value="brand.id" :key="brand.id"
                                        v-for="brand in brandOptions.items">
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
                            <div class="col col-12"
                                    v-if="!loadingState.isLoading">
                                <!-- List -->
                                <ul class="list-group" v-if="productListModel.items.length">
                                    <li class="list-group-item d-flex justify-content-start
                                                align-items-center overflow-hidden"
                                            :key="product.id"
                                            v-for="product in productListModel.items">
                                        <!-- Product thumbnail -->
                                        <img class="img-thumbnail me-2 product-thumbnail"
                                                :src="product.thumbnailUrl" />

                                        <!-- Name and details -->
                                        <div class="d-flex flex-column flex-fill
                                                    overflow-hidden justify-content-start
                                                    h-100">
                                            <!-- Name -->
                                            <span class="fw-bold">{{ product.name }}</span>

                                            <!-- Price -->
                                            <div class="product-detail">
                                                <span class="bg-success-subtle text-success
                                                            px-2 py-1 rounded small">
                                                    <i class="bi bi-cash-coin me-1"></i>
                                                    {{ getAmountText(product.defaultPrice) }}
                                                </span>

                                                <!-- Stocking quantity -->
                                                <span class="bg-primary-subtle text-primary
                                                            px-2 py-1 rounded small ms-2">
                                                    <i class="bi bi-archive me-1"></i>
                                                    {{ product.stockingQuantity }}
                                                    {{ product.unit.toLocaleLowerCase() }}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <!-- Pick button -->
                                        <button class="btn btn-outline-primary btn-sm"
                                                :class="getProductPickButtonClass(product)"
                                                @click="onProductPicked(product)">
                                            <i :class="getProductPickButtonIcon(product)"></i>
                                        </button>
                                    </li>
                                </ul>
                                
                                <!-- Fallback -->
                                <div class="w-100 h-100 d-flex justify-content-center
                                            align-items-center border rounded p-4" v-else>
                                    <span class="opacity-50">Không tìm thấy kết quả</span>
                                </div>
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

<style scoped>
.img-thumbnail.product-thumbnail, .img-thumbnail.item-product-thumbnail {
    object-fit: contain;
    object-position: 50% 50%;
    aspect-ratio: 1;
}

.img-thumbnail.product-thumbnail {
    width: 50px;
    height: 50px;
}

.img-thumbnail.item-product-thumbnail {
    width: 55px;
    height: 55px;
}
</style>

