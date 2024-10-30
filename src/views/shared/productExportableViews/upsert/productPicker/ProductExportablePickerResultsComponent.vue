<script setup lang="ts">
// Interface.
interface Emits {
    (event: "productPicked", product: ProductBasicModel): void;
}

// Imports.
import type { ProductBasicModel } from "@/models/productModels";
import { useAmountUtility } from "@/utilities/amountUtility";

// Emits.
const emit = defineEmits<Emits>();

// Dependency.
const amountUtility = useAmountUtility();

// Model.
const productsModel = defineModel<ProductBasicModel[]>("products", { required: true });
const pickedItemsModel = defineModel<IProductExportableUpsertItemModel[]>(
    "pickedItems",
    { required: true });

// Functions.
function getProductPickButtonClass(product: ProductBasicModel): string {
    if (!pickedItemsModel.value.map(i => i.product!.id).includes(product.id)) {
        return "btn-outline-primary";
    }
    return "btn-outline-success";
}

function getProductPickButtonIcon(product: ProductBasicModel): string {
    if (!pickedItemsModel.value.map(i => i.product!.id).includes(product.id)) {
        return "bi bi-check2";
    }
    return "bi bi-plus-lg";
}
</script>

<template>
    <ul class="list-group" v-if="productsModel.length">
        <li class="list-group-item d-flex justify-content-start
                    align-items-center overflow-hidden"
                :key="product.id"
                v-for="product in productsModel">
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
                        {{ amountUtility.getDisplayText(product.defaultPrice) }}
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
                    @click="emit('productPicked', product)">
                <i :class="getProductPickButtonIcon(product)"></i>
            </button>
        </li>
    </ul>
    
    <!-- Fallback -->
    <div class="w-100 h-100 d-flex justify-content-center
                align-items-center border rounded p-4" v-else>
        <span class="opacity-50">Không tìm thấy kết quả</span>
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