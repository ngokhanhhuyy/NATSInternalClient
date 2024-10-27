<script setup lang="ts">
// Interfaces.
interface Props {
    brandOptions: BrandListModel;
    categoryOptions: ProductCategoryListModel;
    addedSupplyItems: SupplyDetailItemModel[];
}

interface Emits {
    (event: "picked", product: ProductBasicModel): void;
    (event: "incremented", product: ProductBasicModel): void;
}

// Imports.
import { computed, inject } from "vue";
import { useProductService } from "@/services/productService";
import { useBrandService } from "@/services/brandService";
import { useProductCategoryService } from "@/services/productCategoryService";
import type { LoadingState } from "@/composables/loadingStateComposable";
import { SupplyBasicModel } from "@/models/supplyModels";
import { ProductListModel, ProductBasicModel } from "@/models/productModels";
import { BrandBasicModel } from "@/models/brandModels";
import { ProductCategoryBasicModel } from "@/models/productCategoryModels";
import { SupplyDetailItemModel } from "@/models/supplyItemModels";

// Layout components.
import MainBlock from "@layouts/MainContainerComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";

// Props and emtis
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Model and states.
const model
const productListModel = defineModel<ProductListModel>({ required: true });
const loadingState = inject<LoadingState>("loadingState")!;

// Computed properties.
const pickedProductIds = computed<number[]>(() => {
    return props.addedSupplyItems.map(i => i.product.id);
});

const backButtonDisabled = computed<boolean>(() => productListModel.value.page === 1);
const backButtonClass = computed<string | null>(() => {
    return backButtonDisabled.value ? "opacity-25" : null;
});

const nextButtonDisabled = computed<boolean>(() => productListModel.value.page === productListModel.value.pageCount);
const nextButtonClass = computed<string | null>(() => {
    return nextButtonDisabled.value ? "opacity-25" : null;
});

// Functions.
function isMaximumQuantityExceeded(productId: number): boolean {
    const suppliedQuantity = props.addedSupplyItems
        .find(i => i.product.id === productId)!.quantity;
    return suppliedQuantity + 1 >= 100;
}
</script>

<template>
    <MainBlock title="Sản phẩm" :body-padding="[2, 2, 3, 2]" body-class="row g-3">
        <template #body>
            <!-- Product name search -->
            <div class="col col-12">
                <FormLabel name="Tìm kiếm sản phẩm" />
                <TextInput v-model="productListModel.productName"
                        placeholder="Tìm kiếm theo tên ..." />
            </div>

            <!-- Category options -->
            <div class="col col-xl-6 col-lg-12 col-md-6 col-sm-12 col-12 mt-3">
                <FormLabel name="Phân loại" />
                <SelectInput v-model="productListModel.categoryName">
                    <option :value="null">Tất cả phân loại</option>
                    <option :value="category.name" :key="category.id"
                            v-for="category in categoryOptions.items">
                        {{ category.name }}
                    </option>
                </SelectInput>
            </div>

            <!-- Brand options -->
            <div class="col col-xl-6 col-lg-12 col-md-6 col-sm-12 col-12 mt-3">
                <FormLabel name="Thương hiệu" />
                <SelectInput v-model="productListModel.categoryName">
                    <option :value="null">Tất cả thương hiệu</option>
                    <option :value="brand.id" :key="brand.id"
                            v-for="brand in brandOptions.items">
                        {{ brand.name }}
                    </option>
                </SelectInput>
            </div>

            <!-- Product results -->
            <div class="col col-12 mt-3">
                <!-- Pagination -->
                <div class="d-flex justify-content-center align-items-center pagination"
                        v-if="productListModel.pageCount != 0">
                    <!-- Back button -->
                    <button class="btn btn-outline-primary btn-sm" :class="backButtonClass"
                            :disabled="backButtonDisabled" @click="productListModel.page -= 1">
                        <i class="bi bi-chevron-left"></i>
                    </button>

                    <!-- Page number -->
                    <div class="border rounded px-3 py-1 mx-2 small">
                        Trang {{ productListModel.page }}/{{ productListModel.pageCount }}
                    </div>

                    <!-- Next button -->
                    <button class="btn btn-outline-primary btn-sm" :class="nextButtonClass"
                            :disabled="nextButtonDisabled" @click="productListModel.page += 1">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </div>

                <!-- Results list -->
                <Transition name="fade">
                    <div v-if="!loadingState.isLoading">
                        <ul class="list-group mt-2" v-if="productListModel.items.length">
                            <li class="list-group-item p-2 d-flex align-items-center"
                                    :key="product.id" v-for="product in productListModel.items">
                                <!-- Thumbnail -->
                                <img :src="product.thumbnailUrl"
                                        class="img-thumbnail product-thumbnail me-2" />

                                <!-- Detail -->
                                <div class="d-flex flex-column flex-fill product-detail">
                                    <span class="small fw-bold">{{ product.name }}</span>
                                    <span class="small">
                                        {{ product.stockingQuantity }} {{ product.unit }}
                                    </span>
                                </div>

                                <!-- Pick button -->
                                <button class="btn btn-outline-primary btn-sm flex-shrink-0 ms-2 me-1"
                                        @click='emit("picked", product)'
                                        v-if="!pickedProductIds.includes(product.id)">
                                    <i class="bi bi-check2"></i>
                                </button>
                                <!-- Increment button -->
                                <button class="btn btn-outline-success btn-sm flex-shrink-0 ms-2 me-1"
                                        @click='emit("incremented", product)' 
                                        :disabled="isMaximumQuantityExceeded(product.id)" v-else>
                                    <i class="bi bi-plus-lg"></i>
                                </button>
                            </li>
                        </ul>

                        <!-- Fallback -->
                        <div class="border rounded p-4 d-flex mt-2
                                    justify-content-center align-items-center"
                                v-else>
                            Không tìm thấy sản phẩm
                        </div>
                    </div>
                </Transition>
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.img-thumbnail.product-thumbnail {
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: 50% 50%;
}

.product-detail {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>