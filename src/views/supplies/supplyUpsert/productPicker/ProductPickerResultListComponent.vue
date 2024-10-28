<script setup lang="ts">
// Interface.
interface Emits {
    (event: "picked", product: ProductBasicModel): void;
    (event: "incremented", product: ProductBasicModel): void;
}

// Imports.
import { computed } from "vue";
import type { ProductBasicModel } from "@/models/productModels";
import type { SupplyUpsertItemModel } from "@/models/supplyItemModels";

// Props and emits.
const emit = defineEmits<Emits>();

// Model.
const productsModel = defineModel<ProductBasicModel[]>("products", { required: true });
const supplyItemsModel = defineModel<SupplyUpsertItemModel[]>("supplyItems", { required: true });

// Computed properties.
const pickedProductIds = computed<number[]>(() => {
    return supplyItemsModel.value.map(i => i.product.id);
});

// Functions.
function emitPickedEvent(product: ProductBasicModel): void {
    emit("picked", product);
}

function emitIncrementedEvent(product: ProductBasicModel): void {
    emit("incremented", product);
}

function isMaximumQuantityExceeded(product: ProductBasicModel): boolean {
    const suppliedQuantity = supplyItemsModel.value
        .find(i => i.product.id === product.id)!.quantity;
    return suppliedQuantity + 1 >= 100;
}
</script>

<template>
    <ul class="list-group" v-if="productsModel.length">
        <li class="list-group-item p-2 d-flex align-items-center"
                :key="product.id" v-for="product in productsModel">
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
                    @click="emitPickedEvent(product)"
                    v-if="!pickedProductIds.includes(product.id)">
                <i class="bi bi-check2"></i>
            </button>
            <!-- Increment button -->
            <button class="btn btn-outline-success btn-sm flex-shrink-0 ms-2 me-1"
                    @click="emitIncrementedEvent(product)"
                    :disabled="isMaximumQuantityExceeded(product)" v-else>
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