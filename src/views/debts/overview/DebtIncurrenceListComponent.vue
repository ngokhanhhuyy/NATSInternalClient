<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { useDebtIncurrenceService } from "@/services/debtIncurrenceService";
import { DebtIncurrenceBasicModel } from "@/models/debtIncurrenceModels";

// Shared components.
import DebtList from "../../shared/debt/overview/DebtListComponent.vue";

// Dependency.
const service = useDebtIncurrenceService();

// Functions.
function initializeModel(responseDto: DebtIncurrenceListResponseDto)
        : DebtIncurrenceBasicModel[] {
    return responseDto.items?.map(dto => new DebtIncurrenceBasicModel(dto)) ?? [];
}

function getListRoute(): RouteLocationRaw {
    return { name: "debtIncurrenceList" };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getUpdateRoute(id: number): RouteLocationRaw {
    return { name: "home" };
}
</script>

<template>
    <DebtList resource-display-name="Khoản ghi nợ" color="danger"
            :get-list-async="service.getListAsync"
            :initialize-model="initializeModel"
            :get-list-route="getListRoute"
            :get-update-route="getUpdateRoute" />
</template>