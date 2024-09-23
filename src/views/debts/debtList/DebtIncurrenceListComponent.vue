<script setup lang="ts">
import { reactive } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useDebtIncurrenceService } from "@/services/debtIncurrenceService";
import { DebtIncurrenceListModel, DebtIncurrenceBasicModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Dependencies.
const debtIncurrenceService = useDebtIncurrenceService();

// Model and states.
const model = await initialLoadAsync();

// Functions.
async function initialLoadAsync(): Promise<DebtIncurrenceListModel> {
    const responseDto = await debtIncurrenceService.getListAsync({ resultsPerPage: 10 });
    const listModel = new DebtIncurrenceListModel(responseDto);
    listModel.resultsPerPage = 10;
    return reactive(listModel);
}

function getAmountText(debtIncurrence: DebtIncurrenceBasicModel): string {
    return `${debtIncurrence.amount.toLocaleString().replace(" ", ".")}vnđ`;
}

function getCustomerProfileRoute(debtIncurrence: DebtIncurrenceBasicModel): RouteLocationRaw {
    return {
        name: "customerDetail",
        params: {
            customerId: debtIncurrence.customer.id
        }
    };
}
</script>

<template>
    <MainBlock title="Khoản ghi nợ gần nhất" color="danger" body-padding="0">
        <template #body>
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-transparent" v-for="debtIncurrence in model.items"
                        :key="debtIncurrence.id">
                    <div class="row g-0">
                        <!-- Id -->
                        <div class="col col-2 d-flex align-items-center">
                            <span class="bg-primary-subtle px-2 fw-bold rounded text-primary">
                                #{{ debtIncurrence.id }}
                            </span>
                        </div>

                        <!-- Amount -->
                        <div class="col col-3 d-flex align-items-center">
                            {{ getAmountText(debtIncurrence) }}
                        </div>

                        <!-- Customer -->
                        <div class="col col-5 d-flex justify-content-start align-items-center">
                            <img class="img-thumbnail rounded-circle customer-avatar me-2"
                                    :src="debtIncurrence.customer.avatarUrl">
                            <RouterLink :to="getCustomerProfileRoute(debtIncurrence)"
                                    class="customer-name d-block">
                                {{ debtIncurrence.customer.fullName }}
                            </RouterLink>
                        </div>

                        <!-- Collapse button -->
                        <div class="col col-2 d-flex justify-content-end align-items-center">
                            <button class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-eye"></i>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </template>
    </MainBlock>
</template>

<style scoped>
.customer-avatar {
    width: 40px;
    height: 40px;
}

.customer-name {
    text-decoration: none;
}

.customer-name:hover {
    text-decoration: underline;
}
</style>