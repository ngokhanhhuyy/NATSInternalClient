<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, RouterLink, type RouteLocationRaw } from "vue-router";
import { useCustomerService } from "@/services/customerService";
import { CustomerDetailModel } from "@/models/customerModels";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";

// Child components.
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";
import CustomerDetail from "./CustomerDetailComponent.vue";
import CustomerDebtHistory from "./CustomerDebtHistoryComponent.vue";
import CustomerEngageableList from "./CustomerEngageableListComponent.vue";

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
}

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
            <div class="col col-12" v-if="model.debtOperations?.length">
                <CustomerDebtHistory v-model="model" />
            </div>

            <!-- OrderList -->
            <div class="col col-lg-6 col-12">
                <CustomerEngageableList :customer-id="model.id" resource-type="Order" />
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