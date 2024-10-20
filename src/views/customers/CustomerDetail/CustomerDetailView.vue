<script setup lang="ts">
import { reactive, defineAsyncComponent } from "vue";
import { useRoute, RouterLink, type RouteLocationRaw } from "vue-router";
import { useCustomerService } from "@/services/customerService";
import { CustomerDetailModel } from "@/models";
import { useViewStates } from "@/composables";

// Layout components.
import { MainContainer } from "@/views/layouts";

// Child components.
const ResourceAccess = defineAsyncComponent(() =>
    import("@/views/shared/ResourceAccessComponent.vue"));
const CustomerDetail = defineAsyncComponent(() => import("./CustomerDetailComponent.vue"));
const CustomerDebtHistory = defineAsyncComponent(() =>
    import("./CustomerDebtHistoryComponent.vue"));
const CustomerOrderList = defineAsyncComponent(() =>
    import("./CustomerOrderListComponent.vue"));

// Dependencies.
const route = useRoute();
const customerService = useCustomerService();

// Internal states.
const model = await initialLoadAsync();
useViewStates();
const updateRoute: RouteLocationRaw = {
    name: "customerUpdate",
    params: {
        customerId: model.id
    }
};

// Functions.
async function initialLoadAsync(): Promise<CustomerDetailModel> {
    const customerId: number = parseInt(route.params.customerId as string);
    const responseDto = await customerService.getDetailAsync(customerId);
    return reactive(new CustomerDetailModel(responseDto));
}
</script>

<template>
    <MainContainer>
        <div class="row g-3">

            <!-- ResourceAccess -->
            <div class="col col-12">
                <ResourceAccess resource-type="Customer" :resource-primary-id="model.id"
                        accessMode="Detail" />
            </div>

            <!-- Detail -->
            <div class="col col-12">
                <CustomerDetail v-model="model"/>
            </div>

            <!-- Debt -->
            <div class="col col-12">
                <CustomerDebtHistory v-model="model" />
            </div>

            <!-- OrderList -->
            <div class="col col-lg-6 col-12">
                <CustomerOrderList :customer-id="model.id" />
            </div>
        </div>

        <!-- Action button -->
        <div class="row g-3 justify-content-end">
            <!-- Edit button -->
            <div class="col col-auto">
                <RouterLink :to="updateRoute" class="btn btn-primary px-3"
                        v-if="model.authorization?.canEdit">
                    <i class="bi bi-pencil-square me-1"></i>
                    Sửa
                </RouterLink>
            </div>
        </div>
    </MainContainer>
</template>