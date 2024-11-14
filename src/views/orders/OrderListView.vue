<script setup lang="ts">
import { useOrderService } from "@/services/orderService";
import { OrderListModel } from "@/models/orderModels";
import { useInitialDataStore } from "@/stores/initialData";

// Shared component.
import ProductExportableListView, { type Props as ViewProps }
    from "../shared/productExportableViews/list/ProductExportableListView.vue";

// Dependencies.
const service = useOrderService();
const initialDataStore = useInitialDataStore();

// Props for child components.
const viewProps: ViewProps<OrderListModel> = {
    displayName: initialDataStore.getDisplayName("treatment"),
    async initializeModelAsync(initialData) {
        const responseDto = await service.getListAsync();
        return new OrderListModel(responseDto, initialData.order);
    },
    async reloadModelAsync(model) {
        const responseDto = await service.getListAsync(model.toRequestDto());
        model.mapFromListResponseDto(responseDto);
    }
}
</script>

<template>
    <ProductExportableListView v-bind="viewProps" />
</template>