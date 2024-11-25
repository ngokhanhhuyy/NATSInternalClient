<script setup lang="ts">
import type { ConsultantBasicModel } from "@/models/consultantModels";
import { useAmountUtility } from "@/utilities/amountUtility";

// Dependency.
const amountUtility = useAmountUtility();

// Model.
const model = defineModel<ConsultantBasicModel[]>({ required: true });

// Functions.
function getConsultantClass(consultant: ConsultantBasicModel): string {
    if (!consultant.isLocked) {
        return "bg-primary-subtle text-primary";
    }
    return "bg-danger-subtle text-danger";
}
</script>

<template>
    <div class="bg-white border rounded-3">
        <ul class="list-group list-group-flush" v-if="model.length">
            <li class="list-group-item bg-transparent ps-3 p-2
                        d-flex align-items-center small"
                    v-for="consultant in model" :key="consultant.id">
                <!-- Id -->
                <span class="text-primary px-2 py-1 me-lg-3 me-md-2 me-3 rounded small fw-bold"
                        :class="getConsultantClass(consultant)">
                    #{{ consultant.id }}
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
                            {{ amountUtility.getDisplayText(consultant.amount) }}
                        </span>
                    </div>

                    <!-- PaidDate -->
                    <div class="col col-lg-3 col-md-12 col-12
                                justify-content-start ps-0 d-xl-block d-lg-none
                                d-md-none d-sm-none d-none">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-calendar-week"></i>
                        </span>
                        <span>{{ consultant.statsDateTime.date }}</span>
                    </div>

                    <!-- PaidTime -->
                    <div class="col col-lg-3 col-md-12 col-12 ps-0
                                justify-content-start align-items-center
                                d-xl-block d-lg-none d-md-none d-sm-none
                                d-none">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-clock"></i>
                        </span>
                        <span>{{ consultant.statsDateTime.time }}</span>
                    </div>

                    <!-- StatsDateTime -->
                    <div class="col col-md-auto col-12 justify-content-start
                                ps-0 d-xl-none d-lg-block d-block
                                align-items-center mb-sm-0 mb-1">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-calendar-week"></i>
                        </span>
                        <span>{{ consultant.statsDateTime.dateTime }}</span>
                    </div>

                    <!-- Customer -->
                    <div class="col col-md col-12 justify-content-start
                                ps-0 align-items-center mb-sm-0 mb-1
                                ms-md-3 ms-0">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-person-circle"></i>
                        </span>
                        <RouterLink :to="consultant.customer.detailRoute">
                            {{ consultant.customer.fullName }}
                        </RouterLink>
                    </div>
                </div>

                <!-- Action button -->
                <RouterLink :to="consultant.detailRoute"
                        class="btn btn-outline-primary btn-sm flex-shrink-0 mx-2">
                    <i class="bi bi-eye"></i>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>