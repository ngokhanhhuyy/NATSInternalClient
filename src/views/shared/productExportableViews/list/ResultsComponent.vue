<script lang="ts">
interface Props {
    displayName: string;
    isLoading: boolean;
}
</script>

<script setup lang="ts" generic="TItemModel extends OrderBasicModel | TreatmentBasicModel">
import { RouterLink } from "vue-router";
import type { OrderBasicModel } from "@/models/orderModels";
import type { TreatmentBasicModel } from "@/models/treatmentModels";
import { useLoadingState } from "@/composables/loadingStateComposable"
import { useAmountUtility } from "@/utilities/amountUtility";

// Props.
defineProps<Props>();

// Dependency.
const amountUtility = useAmountUtility();

// Model and state.
const model = defineModel<TItemModel[]>({ required: true });

// Functions.
function getClass(item: TItemModel): string {
    if (!item.isLocked) {
        return "bg-primary-subtle text-primary";
    }

    return "bg-danger-subtle text-danger";
}
</script>

<template>
    <div class="bg-white border rounded-3">
        <ul class="list-group list-group-flush" v-if="model.length">
            <li class="list-group-item bg-transparent ps-3 p-2 d-flex align-items-center small"
                    v-for="item in model" :key="item.id">
                <!-- Id -->
                <span class="text-primary px-2 py-1 me-xl-5 me-3 rounded small fw-bold"
                        :class="getClass(item)">
                    #{{ item.id }}
                </span>

                <!-- Detail -->
                <div class="row gx-3 flex-fill">
                    <!-- Amount -->
                    <div class="col col-lg-3 col-md-12 col-12 justify-content-start ps-0
                                align-items-center mb-sm-0 mb-1">
                        <span class="text-primary px-1 rounded me-2">
                            <i class="bi bi-cash-coin"></i>
                        </span>
                        <span>
                            {{ amountUtility.getDisplayText(item.amount) }}
                        </span>
                    </div>

                    <!-- StatsDate -->
                    <div class="col col-lg-3 col-md-12 col-12 ustify-content-start ps-0
                                d-xl-block d-lg-none d-md-none d-sm-none d-none">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-calendar-week"></i>
                        </span>
                        <span>{{ item.statsDateTime.date }}</span>
                    </div>

                    <!-- StatsTime -->
                    <div class="col col-lg-2 col-md-12 col-12 ps-0
                                justify-content-start align-items-center
                                d-xl-block d-lg-none d-md-none d-sm-none d-none">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-clock"></i>
                        </span>
                        <span>{{ item.statsDateTime.time }}</span>
                    </div>

                    <!-- OrderedDateTime -->
                    <div class="col justify-content-start ps-0 d-xl-none d-lg-block d-block
                                align-items-center mb-sm-0 mb-1">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-calendar-week"></i>
                        </span>
                        <span>{{ item.statsDateTime.dateTime }}</span>
                    </div>

                    <!-- Customer -->
                    <div class="col col-xl-3 col-lg-4 col-md-12 col-12
                                justify-content-start ps-0 align-items-center">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-person-circle"></i>
                        </span>
                        <RouterLink class="customer-fullname" :to="item.customer.detailRoute">
                            {{ item.customer.fullName }}
                        </RouterLink>
                    </div>
                </div>

                <!-- Action button -->
                <RouterLink :to="item.detailRoute"
                        class="btn btn-outline-primary btn-sm flex-shrink-0 mx-2">
                    <i class="bi bi-eye"></i>
                </RouterLink>
            </li>
        </ul>

        <!-- Fallback -->
        <div class="p-4 text-center" v-else>
            <span class="opacity-50">
                Không có dữ liệu {{ displayName.toLocaleLowerCase() }}
            </span>
        </div>
    </div>
</template>