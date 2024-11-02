<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import type { SupplyBasicModel } from "@/models/supplyModels";
import { useAmountUtility } from "@/utilities/amountUtility";

// Dependencies.
const amountUtility = useAmountUtility();

// Model.
const model = defineModel<SupplyBasicModel[]>({ required: true });

// Functions.
function getItemClass(supply: SupplyBasicModel): string {
    if (!supply.isLocked) {
        return "bg-primary-subtle text-primary";
    }
    return "bg-danger-subtle text-danger";
}

function getSupplyDetailRoute(supply: SupplyBasicModel): RouteLocationRaw {
    return { name: "supplyDetail", params: { supplyId: supply.id } };
}
</script>

<template>
    <div class="bg-white border rounded-3 mt-3">
        <ul class="list-group list-group-flush" v-if="model.length">
            <li class="list-group-item bg-transparent ps-3 p-2 d-flex align-items-center small"
                    v-for="supply in model" :key="supply.id">
                <!-- Id -->
                <span class="text-primary px-2 py-1 me-md-3 me-3 rounded
                            small fw-bold" :class="getItemClass(supply)">
                    #{{ supply.id }}
                </span>

                <!-- Detail -->
                <div class="row gx-3 flex-fill">
                    <!-- TotalAmount -->
                    <div class="col col-md-4 col-sm-5 col-12 justify-content-start ps-0
                            align-items-center mb-sm-0 mb-1">
                        <span class="text-primary px-1 rounded me-2">
                            <i class="bi bi-cash-coin"></i>
                        </span>
                        <span>
                            {{ amountUtility.getDisplayText(supply.amount) }}
                        </span>
                    </div>

                    <!-- PaidDate -->
                    <div class="col col-sm-5 col-12 justify-content-start ps-0
                            align-items-center mb-sm-0 mb-1 d-md-block d-none">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-calendar-week"></i>
                        </span>
                        <span>{{ supply.statsDateTime.date }}</span>
                    </div>

                    <!-- PaidTime -->
                    <div class="col justify-content-start ps-0
                            align-items-center d-md-block d-none">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-clock"></i>
                        </span>
                        <span>{{ supply.statsDateTime.time }}</span>
                    </div>

                    <!-- PaidDateTime -->
                    <div class="col justify-content-start ps-0
                            align-items-center d-md-none d-flex
                            flex-row">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-clock"></i>
                        </span>
                        <span class="d-block">
                            {{ supply.statsDateTime.dateTime }}
                        </span>
                    </div>
                </div>

                <!-- Action button -->
                <RouterLink :to="getSupplyDetailRoute(supply)"
                        class="btn btn-outline-primary btn-sm flex-shrink-0 mx-2">
                    <i class="bi bi-eye"></i>
                </RouterLink>
            </li>
        </ul>

        <!-- Fallback -->
        <div class="opacity-50 w-100 text-center m-4" v-else>
            Không tìm thấy đơn nhập hàng
        </div>
    </div>
</template>