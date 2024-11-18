<script setup lang="ts">
import { DebtIncurrenceDetailModel } from "@/models/debtIncurrenceModels";
import { useDebtIncurrenceService } from "@/services/debtIncurrenceService";

// Shared component.
import DebtDetailView, { type Props as DetailProps } from "./DebtDetailView.vue";

// Dependency.
const service = useDebtIncurrenceService();

// Props for shared component.
const detailProps: DetailProps<DebtIncurrenceDetailModel> = {
    displayName: (displayNameGetter) => displayNameGetter("debtIncurrence"),
    initializeModelAsync: async (route) => {
        const id = parseInt(route.params.debtIncurrenceId as string);
        const responseDto = await service.getDetailAsync(id);
        return new DebtIncurrenceDetailModel(responseDto);
    } 
}
</script>

<template>
    <DebtDetailView v-bind="detailProps" />
</template>