<script setup lang="ts">
import { reactive } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useDebtPaymentService } from "@/services/debtPaymentService";
import { DebtPaymentListModel, DebtPaymentBasicModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Dependencies.
const debtPaymentService = useDebtPaymentService();

// Model and states.
const model = await initialLoadAsync();

// Functions.
async function initialLoadAsync(): Promise<DebtPaymentListModel> {
    const responseDto = await debtPaymentService.getListAsync({ resultsPerPage: 10 });
    const listModel = new DebtPaymentListModel(responseDto);
    listModel.resultsPerPage = 10;
    return reactive(listModel);
}

function getAmountText(debtPayment: DebtPaymentBasicModel): string {
    return `${debtPayment.amount.toLocaleString().replace(" ", ".")}vnđ`;
}

function getCustomerProfileRoute(debtPayment: DebtPaymentBasicModel): RouteLocationRaw {
    return {
        name: "customerDetail",
        params: {
            customerId: debtPayment.customer.id
        }
    };
}
</script>

<template>
    <MainBlock title="Khoản trả nợ gần nhất" color="success" body-padding="0">
        <template #body>
            <!-- List -->
            <ul class="list-group list-group-flush" v-if="model.items.length">
                <li class="list-group-item bg-transparent"
                        v-for="debtPayment in model.items" :key="debtPayment.id">
                    <div class="row g-0">
                        <!-- Id -->
                        <div class="col col-2 d-flex align-items-center">
                            <span class="bg-primary-subtle px-2 fw-bold rounded text-primary">
                                #{{ debtPayment.id }}
                            </span>
                        </div>

                        <!-- Amount -->
                        <div class="col col-3 d-flex align-items-center">
                            {{ getAmountText(debtPayment) }}
                        </div>

                        <!-- Customer -->
                        <div class="col col-5 d-flex justify-content-start align-items-center">
                            <img class="img-thumbnail rounded-circle customer-avatar me-2"
                                    :src="debtPayment.customer.avatarUrl">
                            <RouterLink :to="getCustomerProfileRoute(debtPayment)"
                                    class="customer-name d-block">
                                {{ debtPayment.customer.fullName }}
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
            
            <!-- Fallback -->
            <div class="m-4 opacity-50 text-center" v-else>
                Không có khoản trả nợ nào gần đây
            </div>
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