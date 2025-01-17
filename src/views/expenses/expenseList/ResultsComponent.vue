<script setup lang="ts">
import { RouterLink,type RouteLocationRaw } from "vue-router";
import { ExpenseCategory } from "@enums";
import type { ExpenseBasicModel } from "@/models/expenseModels";
import { useAmountUtility } from "@/utilities/amountUtility";

// Dependency.
const amountUtility = useAmountUtility();

// Models.
const model = defineModel<ExpenseBasicModel[]>({ required: true });

// Functions.
function getIdClass(expense: ExpenseBasicModel): string {
    if (!expense.isLocked) {
        return "bg-primary-subtle text-primary";
    }
    return "bg-danger-subtle text-danger";
}

function getCategoryText(expense: ExpenseBasicModel): string {
    switch (expense.category) {
        case ExpenseCategory.Equipment:
            return "Trang thiết bị";
        case ExpenseCategory.Office:
            return "Thuê mặt bằng";
        case ExpenseCategory.Staff:
            return "Lương/thưởng";
        case ExpenseCategory.Utilities:
            return "Tiện ích";
    }
}
</script>

<template>
    <div class="bg-white border rounded-3">
        <ul class="list-group list-group-flush" v-if="model.length">
            <li class="list-group-item bg-transparent ps-3 p-2
                        d-flex align-items-center small"
                    v-for="expense in model" :key="expense.id">
                <!-- Id -->
                <span class="text-primary px-2 py-1 me-md-5 me-3 rounded small fw-bold"
                        :class="getIdClass(expense)">
                    #{{ expense.id }}
                </span>

                <!-- Detail -->
                <div class="row gx-3 flex-fill">
                    <!-- Amount -->
                    <div class="col col-md-3 col-12 justify-content-start ps-0
                                align-items-center mb-sm-0 mb-1">
                        <span class="text-primary px-1 rounded me-2">
                            <i class="bi bi-cash-coin"></i>
                        </span>
                        <span>
                            {{ amountUtility.getDisplayText(expense.amount) }}
                        </span>
                    </div>

                    <!-- Category -->
                    <div class="col col-lg-3 col-md-12 col-12 justify-content-start ps-0
                                align-items-center mb-sm-0 mb-1">
                        <span class="text-primary px-1 rounded me-2">
                            <i class="bi bi-tag"></i>
                        </span>
                        <span>
                            {{ getCategoryText(expense) }}
                        </span>
                    </div>

                    <!-- StatsDate -->
                    <div class="col col-lg-3 col-md-12 col-12 justify-content-start ps-0
                                d-xl-block d-lg-none d-md-none d-sm-none d-none">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-calendar-week"></i>
                        </span>
                        <span>{{ expense.statsDateTime.date }}</span>
                    </div>

                    <!-- StatsTime -->
                    <div class="col col-lg-3 col-md-12 col-12 justify-content-start
                                ps-0 align-items-center d-xl-block d-lg-none
                                d-md-none d-sm-none d-none">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-clock"></i>
                        </span>
                        <span>{{ expense.statsDateTime.time }}</span>
                    </div>

                    <!-- StatsDateTime -->
                    <div class="col justify-content-start ps-0 d-xl-none d-lg-block d-block
                                align-items-center mb-sm-0 mb-1">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-calendar-week"></i>
                        </span>
                        <span>{{ expense.statsDateTime.dateTime }}</span>
                    </div>
                </div>

                <!-- Action button -->
                <RouterLink :to="expense.detailRoute"
                        class="btn btn-outline-primary btn-sm flex-shrink-0 mx-2">
                    <i class="bi bi-eye"></i>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>