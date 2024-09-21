<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter, type RouteLocationRaw } from "vue-router";
import { useCustomerService } from "@/services/customerService";
import { useAuthorizationService } from "@/services/authorizationService";
import { useAlertModalStore } from "@/stores/alertModal";
import { CustomerDetailModel } from "@/models";
import { NotFoundError } from "@/services/exceptions";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import { MainContainer } from "@/views/layouts";

// Child components.
import CustomerDetail from "./CustomerDetailComponent.vue";
import CustomerDebtHistory from "./CustomerDebtHistoryComponent.vue";
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";

// Dependencies.
const route = useRoute();
const router = useRouter();
const customerService = useCustomerService();
const authorizationService = useAuthorizationService();
const alertModalStore = useAlertModalStore();

// Internal states.
const model = await initializeModelAsync();
const permissions = {
    canEdit: authorizationService.hasPermission(p => p.EditCustomer),
    canDelete: authorizationService.hasPermission(p => p.DeleteCustomer)
};
useViewStates();
const updateRoute: RouteLocationRaw = {
    name: "customerUpdate",
    params: {
        customerId: model.id
    }
};

// Functions.
async function initializeModelAsync(): Promise<CustomerDetailModel> {
    const customerId: number = parseInt(route.params.customerId as string);
    const responseDto = await customerService.getDetailAsync(customerId);
    return reactive(new CustomerDetailModel(responseDto));
}

async function onDeleteButtonClicked(): Promise<void> {
    const answer = await alertModalStore.getDeleteConfirmationAsync();
    if (answer) {
        try {
            await customerService.deleteAsync(model.id);
            await alertModalStore.getSubmitSuccessConfirmationAsync();
            await router.push({ name: "customerList" });
        } catch (error) {
            if (error instanceof NotFoundError) {
                await alertModalStore.getSubmitErrorConfirmationAsync();
            } else {
                throw error;
            }
        }
    }
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <div class="col col-12">
                <ResourceAccess resource-type="Customer" :resource-primary-id="model.id"
                        accessMode="Detail" />
            </div>
            <div class="col col-12 mt-3">
                <CustomerDetail v-model="model"/>
            </div>

            <!-- Debt -->
            <div class="col col-12 mt-3">
                <CustomerDebtHistory v-model="model" />
            </div>

            <!-- Delete button -->
            <div class="col col-auto mt-3">
                <button class="btn btn-outline-danger px-3" @click="onDeleteButtonClicked"
                        v-if="permissions.canDelete">
                    <i class="bi bi-trash3 me-1"></i>
                    Xoá
                </button>
            </div>

            <!-- Edit button -->
            <div class="col col-auto mt-3">
                <RouterLink :to="updateRoute" class="btn btn-primary px-3"
                        v-if="permissions.canEdit">
                    <i class="bi bi-pencil-square me-1"></i>
                    Sửa
                </RouterLink>
            </div>
        </div>
    </MainContainer>
</template>