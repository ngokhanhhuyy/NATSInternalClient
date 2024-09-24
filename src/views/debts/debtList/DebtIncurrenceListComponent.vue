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
            <!-- List -->
            <ul class="list-group list-group-flush" v-if="model.items.length">
                <li class="list-group-item bg-transparent"
                        v-for="debtIncurrence in model.items" :key="debtIncurrence.id">
                    <div class="row g-0">
                        <!-- Id -->
                        <div class="col d-flex align-items-center">
                            <span class="bg-primary-subtle px-2 fw-bold rounded text-primary">
                                #{{ debtIncurrence.id }}
                            </span>
                        </div>

                        <!-- Amount -->
                        <div class="col col-4 d-flex align-items-center">
                            {{ getAmountText(debtIncurrence) }}
                        </div>

                        <!-- Customer -->
                        <div class="col col-5 d-flex justify-content-start align-items-center">
                            <RouterLink :to="getCustomerProfileRoute(debtIncurrence)"
                                    class="customer-name d-block">
                                {{ debtIncurrence.customer.fullName }}
                            </RouterLink>
                        </div>

                        <!-- Collapse button -->
                        <div class="col d-flex justify-content-end align-items-center">
                            <button class="btn btn-outline-primary btn-sm"
                                    data-bs-toggle="collapse"
                                    :data-bs-target="`#collapse-${debtIncurrence.id}`"
                                    aria-expanded="false"
                                    :aria-controls="`collapse-${debtIncurrence.id}`">
                                <i class="bi bi-eye"></i>
                            </button>
                        </div>
                    </div>
                    <div class="row g-0 collapse" :id="`collapse-${debtIncurrence.id}`">
                        <div class="col-md-2 col-3 offset-md-3 opacity-50 py-2">
                            Ngày giờ
                        </div>
                        <div class="col col-md-10 col-9 py-2">
                            {{ debtIncurrence.incurredDateTime }}
                        </div>
                    </div>
                </li>
            </ul>
            
            <!-- Fallback -->
            <div class="m-4 opacity-50 text-center" v-else>
                Không có khoản ghi nợ nào gần đây
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