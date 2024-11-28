<script lang="ts">
type TransactionType = 
        | "expense" | "supply" | "order" | "treatment"
        | "consultant" | "debtIncurrence" | "debtPayment";
interface TransactionModel {
    type: TransactionType;
    amount: number;
    deltaMinutes: number;
}

interface Model {
    items: TransactionModel[];
    isInitialLoading: boolean;
}
</script>

<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import { useLoadingState } from "@/composables/loadingStateComposable";
import { useInitialDataStore } from "@/stores/initialData";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainBlock from "../layouts/MainBlockComponent.vue";

// Dependency.
const initialDataStore = useInitialDataStore();
const amountUtility = useAmountUtility();

// Model.
const model = reactive<Model>({
    items: [],
    isInitialLoading: true
});
const loadingState = useLoadingState();

// Life cycle hooks.
onMounted(async () => {
    await loadAsync();
    model.isInitialLoading = false
});

// Function.
async function loadAsync(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    model.items = [];
    const types: TransactionType[] = [
        "expense", "supply", "order", "treatment",
        "consultant", "debtIncurrence", "debtPayment"
    ];

    for (let i = 0; i < 10; i++) {
        model.items.push({
            type: types[Math.floor(Math.random() * types.length)],
            amount: (500 + Math.round(Math.random() * 1_500)) * 1000,
            deltaMinutes: Math.round(Math.random() * 120),
        });
    }

    model.items.sort((itemA, itemB) => itemA.deltaMinutes - itemB.deltaMinutes)
    loadingState.isLoading = false;
}

function getTransactionTypeClass(type: TransactionType) {
    const typeColors = {
        "expense": "primary",
        "supply": "success",
        "consultant": "orange",
        "order": "info",
        "treatment": "purple",
        "debtIncurrence": "success",
        "debtPayment": "danger"
    };
    
    return `text-${typeColors[type]}`;
}
</script>

<template>
    <MainBlock title="Giao dịch mới nhất" body-padding="0" class="h-100" body-class="h-100 overflow-hidden">
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex bg-transparent" :key="index"
                    v-for="(transaction, index) in model.items">
                <div></div>
                <div class="flex-fill small">
                    <span :class="getTransactionTypeClass(transaction.type)" class="fw-bold ">
                        {{ initialDataStore.getDisplayName(transaction.type) }}
                    </span>&nbsp;
                    <span class="opacity-50">
                        ({{ transaction.deltaMinutes }} phút trước)
                    </span><br/>
                    <span>
                        {{ amountUtility.getDisplayText(transaction.amount) }}
                    </span>
                </div>
            </li>
        </ul>
    </MainBlock>
</template>