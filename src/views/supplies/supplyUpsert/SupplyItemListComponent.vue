<script setup lang="ts">
// Interfaces.
interface Emits {
    (event: "deleted", product: ProductBasicModel): void;
}

// Imports.
import { watch } from "vue";
import { ProductBasicModel, SupplyItemModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import { NumberInput } from "@/components/formInputs";

// Emits.
const emit = defineEmits<Emits>();

// Model.
const model = defineModel<SupplyItemModel[]>({ required: true });
</script>

<template>
    <MainBlock title="Sản phẩm đã chọn" class="h-100" body-padding="0"
            body-class="overflow-scroll">
        <template #body>
            <ul class="list-group list-group-flush" v-if="model.length">
                <li class="list-group-item d-flex align-items-center"
                        v-for="(item, index) in model" :key="index">
                    <img :src="item.product.thumbnailUrl"
                            class="img-thumbnail product-thumbnail">
                    <div class="flex-fill item-detail h-100 mx-2">
                        <span class="product-name fw-bold">
                            {{ item.product.name }}
                        </span>
                        <div class="d-flex justify-content-end">
                            <div class="input-group input-group-sm mx-2 amount-input-container">
                                <NumberInput type="number" v-model="item.amount"
                                        class="form-control-sm amount-input" :min="0" />
                                <span class="input-group-text border-start-0">đ</span>
                            </div>
                            <NumberInput type="number" v-model="item.suppliedQuantity"
                                    class="form-control-sm supplied-quantity-input me-2"
                                    :max="50" /> 
                            <button class="btn btn-outline-danger btn-sm flex-shrink-0"
                                    @click='emit("deleted", item.product)'>
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </template>
    </MainBlock>
</template>

<style scoped>
.img-thumbnail.product-thumbnail {
    width: 55px;
    height: 55px;
    object-fit: cover;
    object-position: 50% 50%;
}

.amount-input-container {
    width: fit-content !important;
}

input.amount-input {
    width: 140px !important;
}

input.supplied-quantity-input {
    width: 60px !important;
}
</style>