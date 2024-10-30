<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { useOrderService } from "@/services/orderService";
import { OrderListModel } from "@/models/orderModels";

// Shared component.
import ProductExportableListView
    from "../shared/productExportableViews/list/ProductExportableListView.vue";

// Dependencies.
const service = useOrderService();

// Functions.
function initializeModel(
        responseDto: OrderListResponseDto,
        requestDto?: Partial<OrderListRequestDto>) {
    return new OrderListModel(responseDto, requestDto);
}

function getCreateRoute(): RouteLocationRaw {
    return { name: "orderCreate" };
}

function getDetailRoute(id: number): RouteLocationRaw {
    return { name: "orderDetail", params: { orderId: id } };
}
</script>

<template>
    <ProductExportableListView resource-display-name="Đơn bán lẻ"
            :initialize-model="initializeModel"
            :get-list-async="service.getListAsync"
            :get-create-route="getCreateRoute"
            :get-detail-route="getDetailRoute" />
</template>