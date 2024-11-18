<script setup lang="ts">
import { DebtPaymentDetailModel } from "@/models/debtPaymentModels";
import { useDebtPaymentService } from "@/services/debtPaymentService";

// Shared component.
import DebtDetailView, { type Props as DetailProps } from "./DebtDetailView.vue";

// Dependency.
const service = useDebtPaymentService();

// Props for shared component.
const detailProps: DetailProps<DebtPaymentDetailModel> = {
    displayName: (displayNameGetter) => displayNameGetter("debtIncurrence"),
    initializeModelAsync: async (route) => {
        const id = parseInt(route.params.debtIncurrenceId as string);
        const responseDto = await service.getDetailAsync(id);
        return new DebtPaymentDetailModel(responseDto);
    } 
}
</script>

<template>
    <DebtDetailView v-bind="detailProps" />
</template>