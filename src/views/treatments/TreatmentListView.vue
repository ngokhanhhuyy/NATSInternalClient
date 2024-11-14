<script setup lang="ts">
import { useTreatmentService } from "@/services/treatmentService";
import { TreatmentListModel } from "@/models/treatmentModels";
import { useInitialDataStore } from "@/stores/initialData";

// Shared component.
import ProductExportableListView, { type Props as ViewProps }
    from "../shared/productExportableViews/list/ProductExportableListView.vue";

// Dependencies.
const service = useTreatmentService();
const initialDataStore = useInitialDataStore();

// Props for child components.
const viewProps: ViewProps<TreatmentListModel> = {
    displayName: initialDataStore.getDisplayName("treatment"),
    async initializeModelAsync(initialData) {
        const responseDto = await service.getListAsync();
        return new TreatmentListModel(responseDto, initialData.order);
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