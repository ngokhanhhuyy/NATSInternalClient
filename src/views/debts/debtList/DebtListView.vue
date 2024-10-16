<script setup lang="ts">
import { useViewStates } from "@/composables";

// Layout components.
import { MainContainer } from "@/views/layouts";

// Child components.
import RemainingDebtList from "./RemainingDebtListComponent.vue";
import DebtIncurrenceList from "./DebtIncurrenceListComponent.vue";
import DebtPaymentList from "./DebtPaymentListComponent.vue";

// States.
useViewStates();
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-start">
            <!-- Filter -->
            <div class="col col-12">
                <RemainingDebtList />
            </div>

            <!-- DebtIncurrences -->
            <div class="col col-xl-6 col-12 mt-3">
                <DebtIncurrenceList />
            </div>

            <!-- DebtPayment -->
            <div class="col col-xl-6 col-12 mt-3">
                <DebtPaymentList />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
</style>