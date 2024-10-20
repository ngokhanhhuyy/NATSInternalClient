<script setup lang="ts">
// Interface and type.
interface Props {
    resourceType: "Supply" | "Order" | "Treatment";
    customerId?: number;
    productId?: number;
    createdUserId?: number;
}

type ListModel = SupplyListModel | OrderListModel | TreatmentListModel;
type ListRequestDto = SupplyListRequestDto | OrderListRequestDto | TreatmentListRequestDto;
type ListResponseDto = SupplyListResponseDto | OrderListResponseDto | TreatmentListResponseDto;

// Imports.
import { reactive, watch, inject } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useSupplyService } from "@/services/supplyService";
import { useOrderService } from "@/services/orderService";
import { useTreatmentService } from "@/services/treatmentService";
import type {
    OrderListRequestDto,
    SupplyListRequestDto,
    TreatmentListRequestDto } from "@/services/dtos/requestDtos";
import type {
    SupplyListResponseDto,
    OrderListResponseDto,
    TreatmentListResponseDto } from "@/services/dtos/responseDtos";
import {
    SupplyListModel,
    SupplyBasicModel,
    OrderListModel,
    OrderBasicModel,
    TreatmentListModel,
    TreatmentBasicModel } from "@/models";
import type { LoadingState } from "@/composables";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import { SelectInput } from "@/components/formInputs";
import type { IProductEngageableListModel } from "@/models/interfaces";

// Props.
const props = defineProps<Props>();

// Dependencies.
const supplyService = useSupplyService();
const orderService = useOrderService();
const treatmentService = useTreatmentService();

// Model and states.
const model: IProductEngageableListModel = await initialLoadAsync();
const loadingState = inject<LoadingState>("loadingState")!;

// Watch.
watch(() => model.resultsPerPage, reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<ListModel> {
    let requestDto: Partial<ListRequestDto> = {
        orderByAscending: false,
        orderByField: "StatsDateTime",
        ignoreMonthYear: true,
        resultsPerPage: 5,
        customerId: props.customerId,
        productId: props.productId,
        createdUserId: props.createdUserId
    };

    let model: ListModel;
    switch (props.resourceType) {
        case "Supply":
            model = new SupplyListModel(await supplyService.getListAsync(requestDto));
            break;
        case "Order":
            model = new OrderListModel(await orderService.getListAsync(requestDto));
            break;
        case "Treatment":
            model = new TreatmentListModel(await treatmentService.getListAsync(requestDto));
            break;
    }
    model.ignoreMonthYear = true;
    model.resultsPerPage = 5;
    
    return reactive(model);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    switch (props.resourceType) {
        case "Supply":
            model.mapFromResponseDto(await supplyService.getListAsync(model.toRequestDto()));
            break;
        case "Order":
            model = new OrderListModel(await orderService.getListAsync(requestDto));
            break;
        case "Treatment":
            model = new TreatmentListModel(await treatmentService.getListAsync(requestDto));
            break;
    }
    const responseDto = await orderService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

function getOrderDetailRoute(orderId: number): RouteLocationRaw {
    return {
        name: "orderDetail",
        params: {
            orderId: orderId
        }
    };
}

function getOrderIdClass(supply: OrderBasicModel): string {
    let classNames = [ "fw-bold px-2 py-1 rounded" ];
    if (!supply.isLocked) {
        classNames.push("bg-danger-subtle text-danger");
    } else {
        classNames.push("bg-primary-subtle text-primary");
    }

    return classNames.join(" ");
}
</script>

<template>
    <MainBlock title="ĐƠN HÀNG GẦN NHẤT" color="success"
            class="block-order-list mb-3" body-padding="0">
        <template #header>
            <SelectInput class="form-select-sm w-auto"
                    v-model="model.resultsPerPage">
                <option value="5" selected>5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </SelectInput>
        </template>
        <template #body>
            <ul class="list-group list-group-flush" v-if="model.items.length">
                <li class="list-group-item bg-transparent px-1"
                        v-for="order in model.items" :key="order.id">
                    <div class="row small">
                        <!-- Id -->
                        <div class="col col-1 d-flex justify-content-start align-items-center">
                            <span :class="getOrderIdClass(order)">
                                #{{ order.id }}
                            </span>
                        </div>

                        <!-- PaidDate -->
                        <div class="col col-6 justify-content-center align-items-center
                                    d-xl-flex d-none">
                            <i class="bi bi-calendar-week text-primary me-2"></i>
                            <span>{{ order.statsDateTime.date }}</span>
                        </div>

                        <!-- PaidTime -->
                        <div class="col col-3 justify-content-center align-items-center
                                    d-xl-flex d-none">
                            <i class="bi bi-clock text-primary me-2"></i>
                            <span>{{ order.statsDateTime.time }}</span>
                        </div>

                        <!-- PaidDateTime -->
                        <div class="col col-9 justify-content-center align-items-center
                                    d-xl-none d-flex">
                            <i class="bi bi-calendar-week text-primary me-2"></i>
                            <span class="">{{ order.statsDateTime }}</span>
                        </div>

                        <!-- Link -->
                        <div class="col col-2 d-flex justify-content-end">
                            <RouterLink class="btn btn-outline-primary btn-sm"
                                    :to="getOrderDetailRoute(order.id)">
                                <i class="bi bi-eye"></i>
                            </RouterLink>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="text-success-emphasis text-center opacity-50 p-4" v-else>
                Không có đơn hàng nào chứa sản phẩm này
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.block.block-order-list .block-header select.form-select:not(:focus) {
    border-color: var(--bs-success-border-subtle) !important;
}

.block.block-order-list .block-header select.form-select:focus {
    border-color: var(--bs-success) !important;
    box-shadow: 0 0 0 0.2rem rgba(var(--bs-success-rgb), 0.25) !important;
}
</style>