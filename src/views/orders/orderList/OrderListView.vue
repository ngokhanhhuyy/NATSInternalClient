<script setup lang="ts">
import { reactive, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useViewStates } from "@/composables/viewStatesComposable";
import { useAuthorizationService } from "@/services/authorizationService";
import { useOrderService } from "@/services/orderService";
import { OrderBasicModel, OrderListModel } from "@/models/orderModels";

// Layout components.
import { MainContainer, MainBlock, MainPaginator } from "@/views/layouts";

// Form components.
import { FormLabel, SelectInput, DateInput } from "@/components/formInputs";

// Dependencies.
const authorizationService = useAuthorizationService();
const orderService = useOrderService();

// Model and states.
const model = await initialLoadAsync();
const { loadingState } = useViewStates();
const orderCreateRoute: RouteLocationRaw = { name: "orderCreate" };

// Watch.
watch(
    () => [
        model.orderByAscending,
        model.orderByField,
        model.rangeFrom,
        model.rangeTo,
        model.resultsPerPage
    ], () => { model.page = 1; });
watch(
    () => [
        model.orderByAscending,
        model.orderByField,
        model.rangeFrom,
        model.rangeTo,
        model.page,
        model.resultsPerPage
    ], reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<OrderListModel> {
    const model = reactive(new OrderListModel());
    const responseDto = await orderService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    return model;
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await orderService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

function getOrderClass(expense: OrderBasicModel): string {
    if (!expense.isClosed) {
        return "bg-primary-subtle text-primary";
    }
    return "bg-danger-subtle text-danger";
}

function getCustomerDetailRoute(customerId: number): RouteLocationRaw {
    return {
        name: "customerDetail",
        params: {
            customerId: customerId
        }
    };
}

function getOrderDetailRoute(orderId: number): RouteLocationRaw {
    return {
        name: "orderDetail",
        params: {
            orderId: orderId
        }
    };
}

async function onPageButtonClicked(page: number): Promise<void> {
    model.page = page;
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-center">
            <!-- Filter -->
            <div class="col col-12">
                <MainBlock title="Danh sách đơn bán lẻ" :body-padding="[2, 1, 3, 1]"
                            body-class="row g-3"
                            :close-button="!authorizationService.canCreateOrder()">
                    <template #header v-if="authorizationService.canCreateOrder()">
                        <RouterLink :to="orderCreateRoute" class="btn btn-primary btn-sm">
                            <i class="bi bi-plus-lg"></i>
                            Tạo đơn bán lẻ
                        </RouterLink>
                    </template>
                    <template #body>
                        <div class="row g-3">
                            <!-- RangeFrom -->
                            <div class="col col-xl-3 col-md-6 col-12">
                                <FormLabel name="Từ ngày" />
                                <DateInput v-model="model.rangeFrom" :max="model.rangeTo" />
                            </div>

                            <!-- RangeTo -->
                            <div class="col col-xl-3 col-md-6 col-12 mt-md-0 mt-3">
                                <FormLabel name="Đến ngày" />
                                <DateInput v-model="model.rangeTo" :min="model.rangeTo" />
                            </div>

                            <!-- OrderByField -->
                            <div class="col col-xl-3 col-md-6 col-12 mt-xl-0 mt-3">
                                <FormLabel name="Trường sắp xếp" />
                                <SelectInput v-model="model.orderByField">
                                    <option value="OrderedDateTime">Ngày đặt hàng</option>
                                    <option value="Amount">Số tiền</option>
                                </SelectInput>
                            </div>

                            <!-- OrderByAscending -->
                            <div class="col col-xl-3 col-md-6 col-12 mt-xl-0 mt-3">
                                <FormLabel name="Thứ tự sắp xếp" />
                                <SelectInput v-model="model.orderByAscending">
                                    <option :value="false">Từ lớn đến nhỏ</option>
                                    <option :value="true">Từ nhỏ đến lớn</option>
                                </SelectInput>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Top pagination -->
            <div class="col col-12 mt-3 d-flex justify-content-center">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked"
                        v-if="model.pageCount > 1" />
            </div>

            <!-- Results -->
            <div class="col col-12 mt-3">
                <Transition name="fade" mode="out-in">
                    <div class="bg-white border rounded-3" v-if="!loadingState.isLoading">
                        <ul class="list-group list-group-flush" v-if="model.items.length">
                            <li class="list-group-item bg-transparent ps-3 p-2
                                        d-flex align-items-center small"
                                    v-for="order in model.items" :key="order.id">
                                <!-- Id -->
                                <span class="text-primary px-2 py-1 me-xl-5 me-3 rounded
                                            small fw-bold"
                                        :class="getOrderClass(order)">
                                    #{{ order.id }}
                                </span>

                                <!-- Detail -->
                                <div class="row gx-3 flex-fill">
                                    <!-- Amount -->
                                    <div class="col col-lg-3 col-md-12 col-12
                                                justify-content-start ps-0
                                                align-items-center mb-sm-0 mb-1">
                                        <span class="text-primary px-1 rounded me-2">
                                            <i class="bi bi-cash-coin"></i>
                                        </span>
                                        <span>
                                            {{ order.amount.toLocaleString().replaceAll(".", " ") }}đ
                                        </span>
                                    </div>

                                    <!-- OrderedDate -->
                                    <div class="col col-lg-3 col-md-12 col-12
                                                justify-content-start ps-0 d-xl-block d-lg-none
                                                d-md-none d-sm-none d-none">
                                        <span class="px-1 rounded text-primary me-2">
                                            <i class="bi bi-calendar-week"></i>
                                        </span>
                                        <span>{{ order.orderedDate }}</span>
                                    </div>

                                    <!-- OrderedTime -->
                                    <div class="col col-lg-2 col-md-12 col-12
                                                justify-content-start ps-0 align-items-center
                                                d-xl-block d-lg-none d-md-none d-sm-none d-none">
                                        <span class="px-1 rounded text-primary me-2">
                                            <i class="bi bi-clock"></i>
                                        </span>
                                        <span>{{ order.orderedTime }}</span>
                                    </div>

                                    <!-- OrderedDateTime -->
                                    <div class="col justify-content-start ps-0 d-xl-none
                                                d-lg-block d-block align-items-center
                                                mb-sm-0 mb-1">
                                        <span class="px-1 rounded text-primary me-2">
                                            <i class="bi bi-calendar-week"></i>
                                        </span>
                                        <span>{{ order.orderedDateTime }}</span>
                                    </div>

                                    <!-- Customer -->
                                    <div class="col col-xl-3 col-lg-4 col-md-12 col-12
                                                justify-content-start ps-0 align-items-center">
                                        <span class="px-1 rounded text-primary me-2">
                                            <i class="bi bi-person-circle"></i>
                                        </span>
                                        <RouterLink :to="getCustomerDetailRoute(order.customer.id)"
                                                class="customer-fullname">
                                            {{ order.customer.fullName }}
                                        </RouterLink>
                                    </div>
                                </div>

                                <!-- Action button -->
                                <RouterLink :to="getOrderDetailRoute(order.id)"
                                        class="btn btn-outline-primary btn-sm flex-shrink-0 mx-2">
                                    <i class="bi bi-eye"></i>
                                </RouterLink>
                            </li>
                        </ul>

                        <!-- Fallback -->
                        <div class="p-4 text-center" v-else>
                            <span class="opacity-50">Không có dữ liệu đơn bán lẻ</span>
                        </div>
                    </div>
                </Transition>
            </div>

            <!-- Bottom pagination -->
            <div class="col col-12 mt-3 d-flex justify-content-center">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked"
                        v-if="model.pageCount > 1" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
.customer-fullname:not(:hover) {
    text-decoration: none;
}
</style>