<script setup lang="ts">
// Interface.
interface Props {
    model: SupplyDetailItemModel;
}

// Imports.
import type { RouteLocationRaw } from "vue-router";
import type { SupplyDetailItemModel } from "@/models/supplyItemModels";
import { useAmountUtility } from "@/utilities/amountUtility";

// Dependencies.
const amountUtility = useAmountUtility();

// Props.
const props = defineProps<Props>();

// Route.
const productDetailRoute: RouteLocationRaw = {
    name: "productDetail",
    params: {
        productId: props.model.product.id
    }
};

</script>

<template>
    <li class="list-group-item px-3 py-2 d-flex bg-transparent justify-content-start
                align-items-center">
        <!-- Thumbnail -->
        <img :src="model.product.thumbnailUrl"
                class="img-thumbnail me-2 product-photo">

        <!-- Left column -->
        <div class="d-flex flex-column flex-fill pe-2">
            <!-- Product name -->
            <RouterLink :to="productDetailRoute" class="fw-bold small">
                {{ model.product.name }}
            </RouterLink>

            <!-- Item amount + Supplied quantity -->
            <span class="small">
                {{ `${model.quantity} ${model.product.unit}` }}
            </span>
        </div>

        
        <!-- Right column -->
        <div class="d-flex flex-column flex-fill
                    justify-content-center align-items-end">
            <!-- Amount -->
            <span class="small">
                {{ amountUtility.getDisplayText(model.productAmountPerUnit) }}
            </span>
        </div>
    </li>
</template>

<style scoped>
img.product-photo {
    object-fit: cover;
    object-position: 50% 50%;
    width: 50px;
    height: 50px;
}
</style>