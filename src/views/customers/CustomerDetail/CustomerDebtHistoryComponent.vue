<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { DebtOperationType } from "@enums";
import { CustomerDetailModel, CustomerDebtOperationModel } from "@/models/customerModels";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Model.
const model = defineModel<CustomerDetailModel>({ required: true });
const debtIncurrenceCreateRoute: RouteLocationRaw = {
    name: "customerDebtIncurrenceCreate",
    params: {
        customerId: model.value.id
    }
};

// Computed properties.
const debtAmountClass = computed<string>(() => {
    if (!model.value.debtAmount) {
        return "opacity-50";
    }
    return "fw-bold";
});

const debtAmountText = computed<string>(() => {
    if (model.value.debtAmount) {
        const amountText = model.value.debtAmount.toLocaleString().replaceAll(".", " ");
        return amountText + " vnđ";
    }
    return "Không có khoản nợ nào";
});

// Functions.
function getIconClass(debtOperation: CustomerDebtOperationModel): string {
    if (debtOperation.operation === DebtOperationType.DebtPayment) {
        return "bi-arrow-down-left";
    }

    return "bi-arrow-up-right";
}

function getTypeText(debtOperation: CustomerDebtOperationModel): string {
    if (debtOperation.operation === DebtOperationType.DebtIncurrence) {
        return "Ghi nợ";
    }
    return "Trả nợ";
}

function getAmountText(debtOperation: CustomerDebtOperationModel): string {
    const amountText = debtOperation.amount.toLocaleString().replaceAll(",", " ");
    return amountText + " vnđ";
}

function getIconAndTypeColumnClass(debtOperation: CustomerDebtOperationModel): string {
    if (debtOperation.operation === DebtOperationType.DebtIncurrence) {
        return "text-danger";
    }
    return "text-success";
}
</script>

<template>
    <MainBlock title="Lịch sử nợ" body-padding="0" :body-border="false"
            body-class="d-flex flex-column">
        <template #header>
            <RouterLink :to="debtIncurrenceCreateRoute" class="btn btn-primary btn-sm me-2">
                <i class="bi bi-plus-lg me-1"></i>
                <span>Ghi nợ</span>
            </RouterLink>
            <button class="btn btn-success btn-sm">
                <i class="bi bi-plus-lg me-1"></i>
                <span>Trả nợ</span>
            </button>
        </template>
        <template #body>
            <template v-if="model.debtOperations.length">
                <div class="list-group-item px-2 bg-secondary bg-opacity-10
                            border border-top-0 border-secondary-subtle">
                    <div class="row g-0">
                        <div class="col col-md-5 col-4">
                            <div class="row gx-3 gy-0">
                                <div class="col col-lg-5 col-12">Phân loại</div>
                                <div class="col d-lg-block d-none">Số tiền</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row gx-3 gy-0 w-100">
                                <div class="col col-xl-7 col-lg-8 col-12
                                            d-lg-block d-none">
                                    Ngày
                                </div>
                                <div class="col d-lg-block d-none">Giờ</div>
                                <div class="col col-12 d-lg-none d-block">Thời gian</div>
                            </div>
                        </div>
                        <div class="col col-md-1 col-12"></div>
                    </div>
                </div>
                <ul class="list-group list-group-flush m-0 border border-top-0
                            border-bottom-0 small">
                    <li class="list-group-item px-2 py-0" :key="index"
                            v-for="(debtOperation, index) in model.debtOperations">
                        <div class="row gx-0 gy-3 align-items-center">
                            <!-- Icon + Type -->
                            <div class="col col-md-5 col-4 py-lg-2 py-0 my-lg-1 my-0"
                                    :class="getIconAndTypeColumnClass(debtOperation)">
                                <div class="row gx-3 h-100 w-100">
                                    <div class="col col-lg-5 col-12 d-flex align-items-center">
                                        <span class="fw-bold">
                                            {{ getTypeText(debtOperation) }}
                                            <i class="bi" :class="getIconClass(debtOperation)">
                                            </i>
                                        </span>
                                    </div>
                                    <div class="col d-flex align-items-center">
                                        {{ getAmountText(debtOperation) }}
                                    </div>
                                </div>
                            </div>

                            <!-- StatsDateTime -->
                            <div class="col d-flex flex-column align-items-start">
                                <div class="row gx-3 gy-0 w-100 h-100">
                                    <!-- OperatedDate + OperatedTime -->
                                    <div class="col col-xl-7 col-lg-8 col-12">
                                        <i class="bi bi-calendar-week me-2 text-primary"></i>
                                        <span>
                                            {{ debtOperation.operatedDateTime.date }}
                                        </span>
                                    </div>
                                    <div class="col">
                                        <i class="bi bi-clock me-2 text-primary"></i>
                                        <span>
                                            {{ debtOperation.operatedDateTime.time }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Action button -->
                            <div class="col col-md-1 col-2 d-flex justify-content-end
                                        align-items-center p-2">
                                <button class="btn btn-outline-primary btn-sm"
                                        v-if="debtOperation.authorization.canEdit">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="bg-secondary bg-opacity-10 border border-secondary-subtle
                            rounded-bottom-3 row gx-3 py-1 px-2">
                    <div class="col text-end">
                        <span>Tổng số nợ còn lại:</span>
                    </div>
                    <div class="col col-auto">
                        <span :class="debtAmountClass">{{ debtAmountText }}</span>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="p-4 border border-top-0 rounded-bottom-3 text-center">
                    <span class="opacity-50">Không có lịch sử nợ nào</span>
                </div>
            </template>
        </template>
    </MainBlock>
</template>