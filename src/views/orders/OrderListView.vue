<script setup lang="ts">
import { useOrderService } from "@/services/orderService";
import { OrderListModel } from "@/models/orderModels";

// Shared component.
import ProductExportableListView
    from "../shared/productExportableViews/list/ProductExportableListView.vue";

// Dependencies.
const service = useOrderService();

// Functions.
function initializeModel(
        responseDto: TreatmentListResponseDto,
        requestDto?: Partial<TreatmentListRequestDto>) {
    return new OrderListModel(responseDto, requestDto);
}
</script>

<template>
    <ProductExportableListView resource-display-name="Đơn bán lẻ"
            :initialize-model="initializeModel"
            :fetch-list-async="service.getListAsync" />
</template>