<script setup lang="ts">
// Interfaces.
interface Props {
    index: number;
}

interface Emits {
    (event: "deleteRequested", item: SupplyItemModel): void;
}

// Imports.
import { ref, type Ref, watch, inject, onMounted } from "vue";
import { SupplyItemModel } from "@/models";

// Form components.
import { MoneyInput } from "@/components/formInputs";

// Props and emits.
defineProps<Props>();
const emit = defineEmits<Emits>();

// Model and states.
const model = defineModel<SupplyItemModel>({ required: true });
const isInitialLoad = inject<Ref<boolean>>("isInitialLoad")!;
const liElement = ref<HTMLLIElement>(null!);
const itemLiElementClass = ref<string | null>(null);

// Watch.
watch(
    () => [
        model.value.amount,
        model.value.suppliedQuantity
    ],
    () => {
        model.value.hasBeenChanged = true;
        itemLiElementClass.value = "item-animation";
        setTimeout(() => itemLiElementClass.value = null, 2100);
    },
    { deep: true });

// Life cycle.
onMounted(() => {
    console.log(isInitialLoad.value);
    if (!isInitialLoad.value) {
        itemLiElementClass.value = "item-animation";
        setTimeout(() => itemLiElementClass.value = null, 2100);
    }
});
</script>

<template>
    <li class="list-group-item d-flex align-items-center w-100"
            ref="liElement" :id="`item-${index}`"
            v-if="!model.hasBeenDeleted" :class="itemLiElementClass">
        <!-- Thumbnail -->
        <img :src="model.product.thumbnailUrl"
                class="img-thumbnail product-thumbnail me-2">

        <!-- Detail -->
        <div class="d-flex flex-column flex-fill item-detail h-100
                    ms-2 py-2 overflow-hidden">
            <div class="fw-bold product-name small">{{ model.product.name }}</div>
            <div class="d-flex justify-content-end ms-1">
                <!-- Amount and SuppliedQuantity -->
                <div class="input-group input-group-sm amount-quantity-container ms-1">
                    <MoneyInput class="small text-end amount-input"
                            suffix=" vnđ" v-model="model.amount" />
                    <MoneyInput class="small text-end supplied-quantity-input"
                            prefix="×" :min="1" :max="99"
                            v-model="model.suppliedQuantity" />
                </div>
                <!-- Delete button -->
                <button class="btn btn-outline-danger btn-sm flex-shrink-0 ms-2"
                        @click='emit("deleteRequested", model)'>
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
        </div>
    </li>
</template>

<style scoped>
@keyframes item-modified-animation {
    0% {
        background-color: transparent;
    }
    25% {
        background-color: rgba(var(--bs-primary-rgb), 0.25);
    }
    50% {
        background-color: transparent;
    }
    75% {
        background-color: rgba(var(--bs-primary-rgb), 0.25);
    }
    100% {
        background-color: transparent;
    }
}

.list-group-item {
    background-color: transparent;
}

.list-group-item.item-animation {
    animation-name: item-modified-animation;
    animation-duration: 1s;
    animation-iteration-count: 2;
    animation-fill-mode: forwards;
}

.order-number {
    min-width: 40px;
}

.img-thumbnail.product-thumbnail {
    width: 60px;
    height: 60px;
    object-fit: cover;
    object-position: 50% 50%;
}

.detail, .product-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}

.input-group-text {
    min-width: 35px;
    display: flex;
    align-items: center;
    justify-content: center
}

input {
    text-align: end;
}

.amount-input {
    flex-shrink: 0;
}

.supplied-quantity-input {
    max-width: 60px;
    flex-shrink: 0;
    margin-left: -1px !important;
}
</style>