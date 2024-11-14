<script setup lang="ts">
import { useDebtIncurrenceService } from "@/services/debtIncurrenceService";
import { useDebtPaymentService } from "@/services/debtPaymentService";
import { DebtIncurrenceListModel } from "@/models/debtIncurrenceModels";
import { DebtPaymentListModel } from "@/models/debtPaymentModels";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";

// Child components.
import CustomerList from "./CustomerListComponent.vue";
import DebtList, { type Props as DebtListProps } from "./DebtListComponent.vue";

// Dependencies.
const debtIncurrenceService = useDebtIncurrenceService();
const debtPaymentService = useDebtPaymentService();

// States.
const { initialData, getDisplayName } = useViewStates();

// Child component props.
const debtIncurrenceListProps: DebtListProps<DebtIncurrenceListModel> = {
    displayName: getDisplayName("debtIncurrence"),
    color: "danger",
    listRoute: { name: "debtIncurrenceList" },
    async initializeModelAsync(requestDto) {
        const responseDto = await debtIncurrenceService.getListAsync(requestDto);
        return new DebtIncurrenceListModel(
            responseDto,
            initialData.debtIncurrence,
            requestDto);
    },
    async reloadModelAsync(model) {
        const responseDto = await debtIncurrenceService.getListAsync(model.toRequestDto());
        model.mapFromListResponseDto(responseDto);
    }
}

const debtPaymentListProps: DebtListProps<DebtPaymentListModel> = {
    displayName: getDisplayName("debtPayment"),
    color: "success",
    listRoute: { name: "debtPaymentList" },
    async initializeModelAsync(requestDto) {
        const responseDto = await debtPaymentService.getListAsync(requestDto);
        return new DebtPaymentListModel(
            responseDto,
            initialData.debtPayment,
            requestDto);
    },
    async reloadModelAsync(model) {
        const responseDto = await debtPaymentService.getListAsync(model.toRequestDto());
        model.mapFromListResponseDto(responseDto);
    }
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-start">
            <!-- Filter -->
            <div class="col col-12">
                <CustomerList />
            </div>

            <!-- DebtIncurrences -->
            <div class="col col-xl-6 col-12">
                <DebtList v-bind="debtIncurrenceListProps" />
            </div>

            <!-- DebtPayment -->
            <div class="col col-xl-6 col-12">
                <DebtList v-bind="debtPaymentListProps" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
</style>