<script setup lang="ts">
// Interface.
interface Emits {
    (event: "itemClicked", product: ProductBasicModel): void
}

// Imports.
import type { ProductBasicModel } from "@/models/productModels";

// Emits.
const emit = defineEmits<Emits>();

// Model and state.
const model = defineModel<ProductBasicModel[]>({ required: true });

// Functions
</script>

<template>
    <div class="border rounded-3 bg-white overflow-hidden">
        <ul class="list-group list-group-flush" v-if="model.length">
            <li class="list-group-item d-flex flex-row justify-content-start
                        align-items-center px-3 py-2"
                    v-for="product in model"
                :key="product.id">
                <!-- Thumbnail -->
                <img class="img-thumbnail" :src="product.thumbnailUrl">

                <!-- Detail -->
                <div class="px-3 d-flex flex-column flex-fill justify-content-center
                            align-items-start additional-info">
                    <span class="fw-bold">{{ product.name }}</span>
                    <div class="d-flex">
                        <span class="bg-success-subtle text-success small px-2
                                    rounded border border-success-subtle me-2">
                            <i class="bi bi-cash-coin"></i>
                            {{ product.defaultPrice.toLocaleString().replace(",", " ") }}đ
                        </span>
                        <span class="bg-primary-subtle text-primary small px-2
                                    rounded border border-primary-subtle">
                            <i class="bi bi-archive"></i>
                            {{ product.stockingQuantity }}
                            {{ product.unit.toLocaleLowerCase()}}
                        </span>
                    </div>
                </div>

                <!-- Route -->
                <button class="btn btn-outline-primary btn-sm m-2 flex-shrink-0"
                    @click='emit("itemClicked", product)'>
                    <i class="bi bi-eye"></i>
                    <span class="d-md-inline d-sm-none d-none ms-1">Chi tiết</span>
                </button>
            </li>
        </ul>
        <ul class="list-group list-group-flush" v-else>
            <li class="list-group-item d-flex flex-row justify-content-center
                        align-items-center opacity-50 p-3">
                Không tìm thấy sản phẩm
            </li>
        </ul>
    </div>
</template>

<style scoped>
img {
    width: auto;
    height: 70px;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: 50% 50%;
}

.additional-info {
    overflow: hidden;
}

.additional-info span {
    width: auto;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>