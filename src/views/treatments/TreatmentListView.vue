<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
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

function getCreateRoute(): RouteLocationRaw {
    return { name: "treatmentCreate" };
}

function getDetailRoute(id: number): RouteLocationRaw {
    return { name: "treatmentDetail", params: { treatmentId: id } };
}
</script>

<template>
    <ProductExportableListView resource-display-name="Liệu trình"
            :initialize-model="initializeModel"
            :get-list-async="service.getListAsync"
            :get-create-route="getCreateRoute"
            :get-detail-route="getDetailRoute" />
</template>