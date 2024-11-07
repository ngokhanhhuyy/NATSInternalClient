<script lang="ts">
interface Props<TBasicModel extends IHasCustomerBasicModel> {
    resourceDisplayName: string;
    getDetailRoute(id: number): RouteLocationRaw;
    getAmount(basicModel: TBasicModel): number;
}
</script>

<script setup lang="ts" generic="TBasicModel extends IHasCustomerBasicModel">
import { RouterLink, type RouteLocationRaw } from "vue-router";
import type { CustomerBasicModel } from "@/models/customerModels";
import { useAmountUtility } from "@/utilities/amountUtility";

// Props.
defineProps<Props<TBasicModel>>();

// Dependency.
const amountUtility = useAmountUtility();

// Model.
const model = defineModel<TBasicModel[]>({ required: true });

// Functions.
function getClass(item: TBasicModel): string {
    if (!item.isLocked) {
        return "bg-primary-subtle text-primary";
    }

    return "bg-danger-subtle text-danger";
}

function getCustomerDetailRoute(customer: CustomerBasicModel): RouteLocationRaw {
    return { name: "customerDetail", params: { customerId: customer.id } };
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
                            {{ amountUtility.getDisplayText(getAmount(item)) }}
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
                        <RouterLink class="customer-fullname"
                                :to="getCustomerDetailRoute(item.customer)">
                            {{ item.customer.fullName }}
                        </RouterLink>
                    </div>
                </div>

                <!-- Action button -->
                <RouterLink :to="getDetailRoute(item.id)"
                        class="btn btn-outline-primary btn-sm flex-shrink-0 mx-2">
                    <i class="bi bi-eye"></i>
                </RouterLink>
            </li>
        </ul>

        <!-- Fallback -->
        <div class="p-4 text-center" v-else>
            <span class="opacity-50">
                Không có dữ liệu {{ resourceDisplayName.toLocaleLowerCase() }}
            </span>
        </div>
    </div>
</template>