<script setup lang="ts">
import { useTreatmentService } from "@/services/treatmentService";
import { TreatmentListModel } from "@/models/treatmentModels";

// Shared component.
import ProductExportableListView
    from "../shared/productExportableViews/list/ProductExportableListView.vue";

// Dependencies.
const service = useTreatmentService();

// Functions.
function initializeModel(
        responseDto: TreatmentListResponseDto,
        requestDto?: Partial<TreatmentListRequestDto>) {
    return new TreatmentListModel(responseDto, requestDto);
}
</script>

<template>
    <ProductExportableListView resource-display-name="Liệu trình"
            :initialize-model="initializeModel"
            :fetch-list-async="service.getListAsync" />
</template>