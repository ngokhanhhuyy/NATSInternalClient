<script setup lang="ts">
// Interface
interface Props {
    customerId: number;
}

// Imports.
import { reactive, watch } from "vue";
import { RouterLink, type RouteLocationRaw } from "vue-router";
import { useLoadingState } from "@/composables";
import type { OrderListRequestDto } from "@/services/dtos/requestDtos";
import { useOrderService } from "@/services/orderService";
import { OrderBasicModel, OrderListModel } from "@/models";

// Layout component.
import { MainBlock } from "@/views/layouts";

// Props.
const props = defineProps<Props>();

// Dependencies.
const orderService = useOrderService();

// Model and states.
const model = await initialLoadAsync();
const loadingState = useLoadingState();

// Watch.
watch(() => model.page, reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<OrderListModel> {
    const requestDto: Partial<OrderListRequestDto> = {
        orderByAscending: false,
        ignoreMonthYear: true,
        customerId: props.customerId,
        resultsPerPage: 5,
    };
    const responseDto = await orderService.getListAsync(requestDto);
    const listModel = reactive(new OrderListModel(responseDto, requestDto));
    return listModel;
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await orderService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

function getIdClass(order: OrderBasicModel): string {
    const color = order.isLocked ? "primary" : "danger";
    return `bg-${color} border-${color}-subtle text-${color}`;
}

function getAmountText(order: OrderBasicModel): string {
    return order.amount.toLocaleString().replaceAll(".", " ") + " vnđ";
}

function getDetailRoute(order: OrderBasicModel): RouteLocationRaw {
    return { name: "orderDetail", params: { orderId: order.id } };
}
</script>

<template>
    <MainBlock title="Đơn bán lẻ" body-padding="0">
        <template #body>
            <ul class="list-group list-group-flush">
                <template v-if="model.items.length">
                    <li class="list-group-item p-0 bg-transparent"
                            v-for="order in model.items" :key="order.id">
                        <div class="row g-3 px-2">
                            <div class="col col-auto d-flex align-items-center">
                                <!-- Id -->
                                <span class="bg-opacity-10 border rounded-3 px-2 small"
                                        :class="getIdClass(order)">
                                    {{ order.id }}
                                </span>
                            </div>
                            <div class="col">
                                <!-- Detail -->
                                <div class="row gx-3 gy-0 flex-fill">
                                    <!-- Amount -->
                                    <div class="col col-lg-5 col-md-12 col-sm-5 col-12
                                            d-flex justify-content-center align-items-center">
                                        <i class="bi bi-cash me-2 text-primary"></i>
                                        <span class="small">{{ getAmountText(order) }}</span>
                                    </div>

                                    <!-- DateTime -->
                                    <div class="col d-flex flex-column justify-items-center">
                                        <div class="d-lg-block d-none">
                                            <i class="bi bi-calendar-week me-2 text-primary">
                                            </i>
                                            <span class="small">{{ order.paidDate }}</span>
                                        </div>
                                        <div class="d-lg-block d-none">
                                            <i class="bi bi-clock me-2 text-primary">
                                            </i>
                                            <span class="small">{{ order.paidTime }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Route -->
                            <div class="col col-auto d-flex align-items-center">
                                <RouterLink :to="getDetailRoute(order)"
                                        class="btn btn-outline-primary btn-sm">
                                    <i class="bi bi-eye"></i>
                                </RouterLink>
                            </div>
                        </div>
                    </li>
                </template>
                <li class="list-group-item p-4 bg-transparent d-flex justify-content-center
                            align-items-center opacity-50">
                    Không có đơn bán lẻ nào
                </li>
            </ul>
        </template>
    </MainBlock>
</template>