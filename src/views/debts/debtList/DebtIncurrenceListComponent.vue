<script setup lang="ts">
import { reactive, watch, inject } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useDebtIncurrenceService } from "@/services/debtIncurrenceService";
import { DebtIncurrenceListModel, DebtIncurrenceBasicModel } from "@/models";
import type { LoadingState } from "@/composables";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Dependencies.
const debtIncurrenceService = useDebtIncurrenceService();

// Model and states.
const model = await initialLoadAsync();
const loadingState = inject<LoadingState>("loadingState")!;

// Watch.
watch(() => model.page, reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<DebtIncurrenceListModel> {
    const responseDto = await debtIncurrenceService.getListAsync({ resultsPerPage: 5 });
    const listModel = new DebtIncurrenceListModel(responseDto);
    listModel.resultsPerPage = 10;
    return reactive(listModel);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await debtIncurrenceService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

function getCustomerProfileRoute(debtIncurrence: DebtIncurrenceBasicModel): RouteLocationRaw {
    return {
        name: "customerDetail",
        params: {
            customerId: debtIncurrence.customer.id
        }
    };
}

function getAmountText(debtIncurrence: DebtIncurrenceBasicModel): string {
    return debtIncurrence.amount.toLocaleString().replaceAll(",", ".") + " vnđ";
}
</script>

<template>
    <MainBlock title="Khoản ghi nợ gần nhất" color="danger" body-padding="0">
        <!-- Header -->
        <template #header>
            <button class="btn btn-outline-danger btn-sm">
                <i class="bi bi-list-ul me-2"></i>
                <span>Danh sách đầy đủ</span>
            </button>
        </template>

        <!-- Body -->
        <template #body>
            <!-- List -->
            <ul class="list-group list-group-flush" v-if="model.items.length">
                <!-- Results --> 
                <li class="list-group-item bg-transparent"
                        v-for="debtIncurrence in model.items" :key="debtIncurrence.id">
                    <div class="row g-0">
                        <!-- Customer Avatar + Details -->
                        <div class="col col-xl-5 col-5 d-flex justify-content-start
                                    align-items-center">
                            <!-- Customer Avatar -->
                            <img class="img-thumbnail rounded-circle customer-avatar me-2
                                        flex-shrink-0"
                                    :src="debtIncurrence.customer.avatarUrl">

                            <!-- Customer FullName -->
                            <RouterLink :to="getCustomerProfileRoute(debtIncurrence)"
                                    class="customer-name d-block">
                                {{ debtIncurrence.customer.fullName }}
                            </RouterLink>
                        </div>

                        <div class="col col-xl-5 col-4 d-flex flex-column
                                    justify-content-center align-items-center px-2">
                            <!-- Amount -->
                            <span class="small">{{ getAmountText(debtIncurrence) }}</span>

                            <!-- IncurredDeltaText -->
                            <span class="small">
                                {{ debtIncurrence.incurredDeltaText }}
                            </span>
                        </div>

                        <!-- Detail button -->
                        <div class="col d-flex justify-content-end align-items-center">
                            <button class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-eye"></i>
                            </button>
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

select {
    width: fit-content;
}
</style>