<script setup lang="ts">
// Interface.
interface Props {
    item: OrderItemModel;
    index: number;
}

// Imports.
import { computed } from "vue";
import { OrderItemModel } from "@/models";

// Props.
const props = defineProps<Props>();

// Computed properties.
const itemDetailText = computed<string>(() => {
    const amount = props.item.amount.toLocaleString().replaceAll(".", " ") + "vnđ";
    const quantity = props.item.quantity.toString();
    const unit = props.item.product!.unit.toLowerCase();
    const vatFactorPercentage = Math.round(props.item.vatPercentage);
    return `${amount} × ${quantity} ${unit} (${vatFactorPercentage}% VAT)`;
});

</script>

<template>
    <!-- Index -->
    <span class="bg-primary-subtle border border-primary-subtle \
                rounded px-2 py-1 text-primary small fw-bold">
        #{{ index + 1 }}
    </span>

    <!-- Thumbnail -->
    <img class="img-thumbnail product-thumbnail mx-3"
            :src="item.product!.thumbnailUrl">

    <!-- Detail -->
    <div class="detail d-flex flex-column small flex-fill
                align-self-stretch py-1">
        <!-- ProductName -->
        <span class="product-name fw-bold">
            {{ item.product!.name }}
        </span>

        <!-- ItemDetail -->
        <span>{{ itemDetailText }}</span>
    </div>
</template>

<style scoped>
.product-thumbnail {
    object-fit: contain;
    object-position: 50% 50%;
    width: 55px;
    height: 55px;
}
</style>