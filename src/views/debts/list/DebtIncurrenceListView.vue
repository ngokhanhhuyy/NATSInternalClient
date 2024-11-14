<script setup lang="ts">
import { useDebtIncurrenceService } from "@/services/debtIncurrenceService";
import { DebtIncurrenceListModel } from "@/models/debtIncurrenceModels";

// Shared component.
import DebtListView, { type Props as ViewProps } from "./DebtListView.vue";

// Dependency.
const service = useDebtIncurrenceService();

// Props for shared components.
const viewProps: ViewProps<DebtIncurrenceListModel> = {
    getDisplayName: (store) => store.getDisplayName("debtIncurrence"),
    async initializeModelAsync(initialData) {
        const responseDto = await service.getListAsync();
        return new DebtIncurrenceListModel(responseDto, initialData.debtIncurrence);
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