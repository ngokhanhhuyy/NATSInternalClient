<script setup lang="ts">
// Interfaces.
interface Props {
    index: number;
}

interface Emits {
    (event: "updateRequested"): void;
}

// Imports.
import { ref, type Ref, watch, inject, onMounted } from "vue";
import { SupplyItemModel } from "@/models";

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
        scrollViewToThisItem();
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
    scrollViewToThisItem();
});

// Functions.
function scrollViewToThisItem(): void {
    liElement.value.scrollIntoView();
}
</script>

<template>
    <li class="list-group-item d-flex align-items-center
                overflow-hidden w-100"
            ref="liElement"
            :id="`item-${index}`" v-if="!model.hasBeenDeleted"
            :class="itemLiElementClass">
        <!-- Order number -->
        <span class="bg-primary-subtle border border-primary-subtle
                    text-primary small px-2 rounded flex-shrink-0
                    order-number d-flex justify-content-center
                    align-items-center"
                v-if="model.id != null">
            #{{ model.id }}
        </span>
        <span class="bg-success-subtle border border-success-subtle
                    text-success small px-2 rounded flex-shrink-0
                    order-number d-flex justify-content-center
                    align-items-center"
                v-else>
            Mới
        </span>
        <!-- Thumbnail -->
        <img :src="model.product.thumbnailUrl"
                class="img-thumbnail product-thumbnail mx-2">

        <!-- Detail -->
        <div class="d-flex flex-column flex-fill item-detail h-100
                    mx-2 overflow-hidden">
            <span class="product-name fw-bold">
                {{ model.product.name }}
            </span>
            <div class="small">
                {{ model.amount.toLocaleString() }}đ ×
                {{ model.suppliedQuantity }}
                {{ model.product.unit.toLowerCase() }}
            </div>
        </div>

        <!-- Delete button -->
        <button class="btn btn-outline-primary btn-sm flex-shrink-0
                        justify-self-end"
                @click='emit("updateRequested")'>
            <i class="bi bi-pencil-square"></i>
        </button>
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
    width: 55px;
    height: 55px;
    object-fit: cover;
    object-position: 50% 50%;
}

.detail, .product-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
</style>