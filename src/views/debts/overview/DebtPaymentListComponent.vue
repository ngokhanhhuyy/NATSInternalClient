<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { useDebtPaymentService } from "@/services/debtPaymentService";
import { DebtPaymentBasicModel } from "@/models/debtPaymentModels";

// Shared components.
import DebtList from "../../shared/debt/overview/DebtListComponent.vue";

// Dependency.
const service = useDebtPaymentService();

// Functions.
function initializeModel(responseDto: DebtPaymentListResponseDto): DebtPaymentBasicModel[] {
    return responseDto.items?.map(dto => new DebtPaymentBasicModel(dto)) ?? [];
}

function getListRoute(): RouteLocationRaw {
    return { name: "home" };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getUpdateRoute(id: number): RouteLocationRaw {
    return { name: "home" };
}
</script>

<template>
    <DebtList resource-display-name="Khoản trả nợ" color="success"
            :get-list-async="service.getListAsync"
            :initialize-model="initializeModel"
            :get-list-route="getListRoute"
            :get-update-route="getUpdateRoute" />
</template>