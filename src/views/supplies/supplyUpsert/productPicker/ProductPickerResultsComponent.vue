<script setup lang="ts">
// Interface.
interface Props {
    pickedProductIds: number[];
    pickedCalledback: (poroduct: ProductBasicModel) => any;
    incrementedCallback: (product: ProductBasicModel) => any;
}

// Imports.
import type { ProductBasicModel } from "@/models/productModels";

// Props.
const props = defineProps<Props>();

// Model.
const model = defineModel<ProductBasicModel[]>({ required: true });

// Functions.
function invokePickedCallback(product: ProductBasicModel): void {
    props.pickedCalledback(product);
}

function invokeIncrementedCallback(product: ProductBasicModel): void {
    props.incrementedCallback(product);
}
</script>

<template>
    <ul class="list-group mt-2" v-if="model.length">
        <li class="list-group-item p-2 d-flex align-items-center"
                :key="product.id" v-for="product in model">
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
                    @click="invokePickedCallback(product)"
                    v-if="!pickedProductIds.includes(product.id)">
                <i class="bi bi-check2"></i>
            </button>
            <!-- Increment button -->
            <button class="btn btn-outline-success btn-sm flex-shrink-0 ms-2 me-1"
                    @click="invokeIncrementedCallback(product)"
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
</template>