<script setup lang="ts">
import { useDebtPaymentService } from "@/services/debtPaymentService";
import { DebtPaymentListModel } from "@/models/debtPaymentModels";

// Shared component.
import DebtListView, { type Props as ViewProps } from "./DebtListView.vue";

// Dependency.
const service = useDebtPaymentService();

// Props for shared components.
const viewProps: ViewProps<DebtPaymentListModel> = {
    getDisplayName: (store) => store.getDisplayName("debtPayment"),
    async initializeModelAsync(initialData) {
        const responseDto = await service.getListAsync();
        return new DebtPaymentListModel(responseDto, initialData.debtIncurrence);
    },
    async reloadModelAsync(model) {
        const responseDto = await service.getListAsync(model.toRequestDto());
        model.mapFromListResponseDto(responseDto);
    }
}
</script>

<template>
    <DebtListView v-bind="viewProps" />
</template>