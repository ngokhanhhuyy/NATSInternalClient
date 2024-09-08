<script setup lang="ts">
import { computed } from 'vue';
import { DebtOperationType } from '@/services/dtos/enums';
import { CustomerDetailModel, CustomerDebtOperationModel } from '@/models';

// Layout components.
import { MainBlock } from '@/views/layouts';

// Model.
const model = defineModel<CustomerDetailModel>({ required: true });

// Computed properties.
const debtAmountText = computed<string>(() => {
    const amountText = model.value.debtAmount
        .toLocaleString()
        .replaceAll(".", " ");
    return amountText + " vnđ";
});

// Functions.
function getDebtOperationClass(debtOperation: CustomerDebtOperationModel, index: number): string {
    let color: string;
    if (debtOperation.operation === DebtOperationType.DebtIncurrence) {
        color = "danger";
    } else {
        color = "success";
    }
    let classNames: string[] = [`bg-${color} border-${color}-subtle text-${color}-emphasis`];
    if (index < model.value.debtOperations.length) {
        classNames.push("mb-2");
    }

    return classNames.join(" ");
}

function getDebtOperationIconClass(debtOperation: CustomerDebtOperationModel): string {
    if (debtOperation.operation === DebtOperationType.DebtPayment) {
        return "bi-arrow-left-circle-fill";
    }
    return "bi-arrow-right-circle-fill";
}

function getDebtOperationTypeText(debtOperation: CustomerDebtOperationModel): string {
    if (debtOperation.operation === DebtOperationType.DebtIncurrence) {
        return "Ghi nợ";
    }
    return "Trả nợ";
}

function getDebtOperationAmountText(debtOperation: CustomerDebtOperationModel): string {
    const amountText = debtOperation.amount
        .toLocaleString()
        .replaceAll(".", " ");
    return amountText + " vnđ";
}
</script>

<template>
    <MainBlock title="Lịch sử nợ" body-padding="0">
        <template #body>
            <!-- DebtRemainingAmount -->
            <div class="row mt-3 px-3">
                <div class="col col-lg-2 col-md-3 col-sm-12 col-12">
                    <label class="opacity-50">Số nợ còn lại</label>
                </div>
                <div class="col col-lg-4 col-md-3 col-sm-12 col-12">
                    <span class="field">{{ debtAmountText }}</span>
                </div>
            </div>

            <!-- DebtOperations -->
            <div class="row mt-3 mb-2 px-3">
                <div class="col col-lg-2 col-md-3 col-12">
                    <label class="opacity-50">Lịch sử</label>
                </div>
                <div class="col col-md col-12">
                    <div class="border rounded-3 ps-3 pe-1 py-1 small bg-opacity-10
                                d-flex justify-content-center align-items-center"
                            :key="index"
                            :class="getDebtOperationClass(debtOperation, index)"
                            v-for="(debtOperation, index) in model.debtOperations">
                        <div class="d-flex flex-fill justify-content-start
                                    align-items-center">
                            <!-- Icon -->
                            <i class="bi me-2"
                                    :class="getDebtOperationIconClass(debtOperation)"></i>

                            <!-- Text -->
                            <span>
                                {{ getDebtOperationTypeText(debtOperation) }}
                            </span>
                                <span class="fw-bold">
                                &nbsp;{{ getDebtOperationAmountText(debtOperation) }}
                            </span>
                                <span class="opacity-50 ms-2">
                                ({{ debtOperation.operatedDateTime }})
                            </span>

                            <!-- Lock icon -->
                            <i class="bi bi-lock" v-if="debtOperation.isLocked"></i>
                        </div>

                        <!-- DebtOperation action buttons -->
                        <!-- Edit button -->
                        <button class="btn btn-outline-primary btn-sm"
                                v-if="debtOperation.authorization.canEdit">
                            <i class="bi bi-pencil-square"></i>
                        </button>

                        <!-- Delete button -->
                        <button class="btn btn-outline-danger btn-sm ms-1"
                                v-if="debtOperation.authorization.canDelete">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </MainBlock>
</template>