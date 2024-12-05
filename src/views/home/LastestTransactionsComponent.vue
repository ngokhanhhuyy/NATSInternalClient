<script lang="ts">
interface States {
    model: LastestTransactionModel[];
    isInitialLoading: boolean;
}
</script>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useStatsService } from "@/services/statsService";
import { LastestTransactionModel } from "@/models/statsModels";
import { TransactionType } from "@/services/dtos/enums";
import { useInitialDataStore } from "@/stores/initialData";

// Layout components.
import MainBlock from "../layouts/MainBlockComponent.vue";

// Dependency.
const statsService = useStatsService();
const initialDataStore = useInitialDataStore();

// States.
const states = reactive<States>({
    model: [],
    isInitialLoading: true
});

// Life cycle hooks.
onMounted(async () => {
    await loadAsync();
    states.isInitialLoading = false
});

// Function.
async function loadAsync(): Promise<void> {
    const responseDtos = await statsService.getLastestTransactionsAsync();
    states.model = responseDtos.map(dto => new LastestTransactionModel(dto));
}

function getColor(transaction: LastestTransactionModel): string {
    const typeColors: Record<TransactionType, string> = {
        [TransactionType.Expense]: "primary",
        [TransactionType.Supply]: "success",
        [TransactionType.Consultant]: "orange",
        [TransactionType.Order]: "info",
        [TransactionType.Treatment]: "purple",
        [TransactionType.DebtIncurrence]: "success",
        [TransactionType.DebtPayment]: "danger"
    };
    
    return typeColors[transaction.type];
}

function getIconClass(transaction: LastestTransactionModel): string {
    const typeColors: Record<TransactionType, string> = {
        [TransactionType.Expense]: "bi-cash-coin",
        [TransactionType.Supply]: "bi-truck",
        [TransactionType.Consultant]: "bi-patch-question",
        [TransactionType.Order]: "bi-cart4",
        [TransactionType.Treatment]: "bi-magic",
        [TransactionType.DebtIncurrence]: "bi-hourglass-bottom",
        [TransactionType.DebtPayment]: "bi-hourglass-bottom"
    };
    
    return `${typeColors[transaction.type]} text-${getColor(transaction)}`;
}

function getIconContainerClass(transaction: LastestTransactionModel): string {
    return `bg-${getColor(transaction)}-subtle border-${getColor(transaction)}`;
}

function getDisplayName(transaction: LastestTransactionModel): string {
    const typeName = TransactionType[transaction.type];
    const camelCaseTypeName = typeName[0].toLowerCase() +
        typeName.substring(1, typeName.length);
    return initialDataStore.getDisplayName(camelCaseTypeName);
}
</script>

<template>
    <MainBlock title="Giao dịch mới nhất" body-padding="0" class="h-100"
            body-class="h-100 overflow-hidden">
        <template v-if="!states.isInitialLoading">
            <ul class="list-group list-group-flush">
                <template v-if="states.model.length">
                    <li class="list-group-item d-flex align-items-center bg-transparent"
                            :key="index" v-for="(transaction, index) in states.model">
                        <RouterLink :to="transaction.detailRoute"
                                class="p-2 d-flex justify-content-center align-items-center
                                        border rounded-circle flex-shrink-0
                                        transaction-icon-container me-3"
                                :class="getIconContainerClass(transaction)">
                            <i :class="`bi ${getIconClass(transaction)}`"></i>
                        </RouterLink>
                        <div class="flex-fill">
                            <RouterLink :to="transaction.detailRoute"
                                    :class="`fw-bold text-${getColor(transaction)}`">
                                {{ getDisplayName(transaction) }}
                            </RouterLink><br/>
                            <span class="opacity-50 small">
                                {{ transaction.statsDateTime.deltaText }}
                            </span>
                        </div>
                    </li>
                </template>
                <li class="list-group-item d-flex align-items-center justify-content-center
                            bg-transparent py-4 opacity-50"
                        v-else>
                    Không có giao dịch nào
                </li>
            </ul>
        </template>
        <div class="d-flex justify-content-center align-items-center p-3" v-else>
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Đang tải...</span>
            </div>
            <span class="ms-2 text-primary">Đang tải</span>
        </div>
    </MainBlock>
</template>

<style scoped>
.list-group-item {
    height: 65px;
}

.transaction-icon-container {
    aspect-ratio: 1;
    height: 40px;
}

.border-purple {
    --bs-border-opacity: 1;
    border-color: rgba(var(--bs-purple-rgb), var(--bs-border-opacity)) !important;
}

.border-orange {
    --bs-border-opacity: 1;
    border-color: rgba(var(--bs-orange-rgb), var(--bs-border-opacity)) !important;
}
</style>