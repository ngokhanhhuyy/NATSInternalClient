<script setup lang="ts">
import type { RouteLocationRaw, RouteLocationNormalizedLoadedGeneric } from "vue-router";
import { useOrderService } from "@/services/orderService";
import { OrderDetailModel } from "@/models/orderModels";

// Shared component.
import ProductExportableDetail
    from "../shared/productExportableViews/detail/ProductExportableDetailView.vue";

// Dependency.
const service = useOrderService();

// Functions.
async function initialLoadAsync(route: RouteLocationNormalizedLoadedGeneric)
        : Promise<OrderDetailModel> {
    const orderId = parseInt(route.params.orderId as string);
    return new OrderDetailModel(await service.getDetailAsync(orderId));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getUpdateRoute(orderId: number): RouteLocationRaw {
    return { name: "orderUpdate", params: { orderId: orderId } };
}
</script>

<template>
    <ProductExportableDetail resource-type="Order"
            resource-display-name="Đơn bán lẻ"
            :initial-load-async="initialLoadAsync"
            :get-update-route="getUpdateRoute" />
</template>