<script setup lang="ts">
import { inject } from "vue";
import type { RouteLocationRaw } from "vue-router";
import type { CustomerBasicModel } from "@/models/customerModels";
import { useAmountUtility } from "@/utilities/amountUtility";

// Dependency.
const amountUtility = useAmountUtility();

// Model.
const model = defineModel<IProductExportableBasicModel[]>({ required: true });
const resourceType = inject<"Order" | "Treatment">("resourceType")!;
const resourceDisplayName = inject<string>("resourceDisplayName")!;

// Functions.
function getResourceClass(resource: IProductExportableBasicModel): string {
    if (!resource.isLocked) {
        return "bg-primary-subtle text-primary";
    }

    return "bg-danger-subtle text-danger";
}

function getCustomerDetailRoute(customer: CustomerBasicModel): RouteLocationRaw {
    return { name: "customerDetail", params: { customerId: customer.id } };
}

function getResourceDetailRoute(resource: IProductExportableBasicModel): RouteLocationRaw {
    if (resourceType == "Order") {
        return { name: "orderDetail", params: { orderId: resource.id } };
    }
    
    return { name: "treatmentDetail", params: { treatmentId: resource.id } };
}
</script>

<template>
    <div class="bg-white border rounded-3">
        <ul class="list-group list-group-flush" v-if="model.length">
            <li class="list-group-item bg-transparent ps-3 p-2 d-flex align-items-center small"
                    v-for="resource in model" :key="resource.id">
                <!-- Id -->
                <span class="text-primary px-2 py-1 me-xl-5 me-3 rounded small fw-bold"
                        :class="getResourceClass(resource)">
                    #{{ resource.id }}
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
                            {{ amountUtility.getDisplayText(resource.amountAfterVat) }}
                        </span>
                    </div>

                    <!-- StatsDate -->
                    <div class="col col-lg-3 col-md-12 col-12 ustify-content-start ps-0
                                d-xl-block d-lg-none d-md-none d-sm-none d-none">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-calendar-week"></i>
                        </span>
                        <span>{{ resource.statsDateTime.date }}</span>
                    </div>

                    <!-- StatsTime -->
                    <div class="col col-lg-2 col-md-12 col-12 ps-0
                                justify-content-start align-items-center
                                d-xl-block d-lg-none d-md-none d-sm-none d-none">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-clock"></i>
                        </span>
                        <span>{{ resource.statsDateTime.time }}</span>
                    </div>

                    <!-- OrderedDateTime -->
                    <div class="col justify-content-start ps-0 d-xl-none d-lg-block d-block
                                align-items-center mb-sm-0 mb-1">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-calendar-week"></i>
                        </span>
                        <span>{{ resource.statsDateTime.dateTime }}</span>
                    </div>

                    <!-- Customer -->
                    <div class="col col-xl-3 col-lg-4 col-md-12 col-12
                                justify-content-start ps-0 align-items-center">
                        <span class="px-1 rounded text-primary me-2">
                            <i class="bi bi-person-circle"></i>
                        </span>
                        <RouterLink class="customer-fullname"
                                :to="getCustomerDetailRoute(resource.customer)">
                            {{ resource.customer.fullName }}
                        </RouterLink>
                    </div>
                </div>

                <!-- Action button -->
                <RouterLink :to="getResourceDetailRoute(resource)"
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