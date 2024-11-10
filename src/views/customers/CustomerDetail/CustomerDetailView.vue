<script lang="ts">
import type {
    ConsultantBasicModel,
    ConsultantExistingAuthorizationModel } from "@/models/consultantModels";
import type {
    OrderBasicModel,
    OrderExistingAuthorizationModel } from "@/models/orderModels";
import type {
    TreatmentBasicModel,
    TreatmentExistingAuthorizationModel } from "@models/treatmentModels";
import type { Props } from "./CustomerEngageableListComponent.vue";

type ConsultantProps = Props<
    ConsultantListModel,
    ConsultantBasicModel,
    ConsultantExistingAuthorizationModel>;
type OrderProps = Props<
    OrderListModel,
    OrderBasicModel,
    OrderExistingAuthorizationModel>;
type TreatmentProps = Props<
    TreatmentListModel,
    TreatmentBasicModel,
    TreatmentExistingAuthorizationModel>
</script>

<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, RouterLink, type RouteLocationRaw } from "vue-router";
import { useCustomerService } from "@/services/customerService";
import { useConsultantService } from "@/services/consultantService";
import { useOrderService } from "@/services/orderService";
import { useTreatmentService } from "@/services/treatmentService";
import { CustomerDetailModel } from "@/models/customerModels";
import { ConsultantListModel } from "@/models/consultantModels";
import { OrderListModel } from "@/models/orderModels";
import { TreatmentListModel } from "@models/treatmentModels";
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
const consultantService = useConsultantService();
const orderService = useOrderService();
const treatmentService = useTreatmentService();

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
// Props for child components.
const consultantProps: ConsultantProps = {
    resourceType: "consultant",
    blockColor: "primary",
    idPrefix: "TV",
    async initializeModelAsync(resultsPerPage) {
        const requestDto: RequestDtos.Consultant.List = { resultsPerPage: resultsPerPage };
        const responseDto = await consultantService.getListAsync(requestDto);
        return new ConsultantListModel(
            responseDto,
            undefined,
            undefined,
            undefined,
            requestDto);
    },
    async reloadModelAsync(model) {
        const responseDto = await consultantService.getListAsync(model.toRequestDto());
        model.mapFromResponseDto(responseDto);
    }
};

const orderProps: OrderProps = {
    resourceType: "order",
    blockColor: "success",
    idPrefix: "BL",
    async initializeModelAsync(resultsPerPage) {
        const requestDto: RequestDtos.Order.List = { resultsPerPage: resultsPerPage };
        const responseDto = await orderService.getListAsync(requestDto);
        return new OrderListModel(
            responseDto,
            undefined,
            undefined,
            undefined,
            requestDto);
    },
    async reloadModelAsync(model) {
        const responseDto = await orderService.getListAsync(model.toRequestDto());
        model.mapFromResponseDto(responseDto);
    }
};

const treatmentProps: TreatmentProps = {
    resourceType: "treatment",
    blockColor: "danger",
    idPrefix: "LT",
    async initializeModelAsync(resultsPerPage) {
        const requestDto: RequestDtos.Treatment.List = { resultsPerPage: resultsPerPage };
        const responseDto = await treatmentService.getListAsync(requestDto);
        return new TreatmentListModel(
            responseDto,
            undefined,
            undefined,
            undefined,
            requestDto);
    },
    async reloadModelAsync(model) {
        const responseDto = await treatmentService.getListAsync(model.toRequestDto());
        model.mapFromResponseDto(responseDto);
    }
};
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

            <!-- Consultant -->
            <div class="col col-12">
                <CustomerEngageableList v-bind="consultantProps" />
            </div>

            <!-- OrderList -->
            <div class="col col-12">
                <CustomerEngageableList v-bind="orderProps" />
            </div>

            <!-- TreatmentList -->
            <div class="col col-12">
                <CustomerEngageableList v-bind="treatmentProps" />
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