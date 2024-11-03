<script setup lang="ts">
import { useDebtIncurrenceService } from "@/services/debtIncurrenceService";
import { DebtIncurrenceListModel } from "@/models/debtIncurrenceModels";

// Shared component.
import DebtListView from "@/views/shared/debt/listView/DebtListView.vue";

// Dependency.
const service = useDebtIncurrenceService();

// Functions.
</script>

<template>
    <DebtListView resource-display-name="Khoản ghi nợ"
            :get-list-async="service.getListAsync"
            :initialize-model="(responseDto) => new DebtIncurrenceListModel(responseDto)"
            :model-to-request-dto="(model) => model.toRequestDto()" />
</template>