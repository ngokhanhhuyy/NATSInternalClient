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
const createRoute: RouteLocationRaw = { name: "orderCreate" };

// Watch.
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

async function onPageButtonClicked(page: number): Promise<void> {
    model.page = page;
    await reloadAsync();
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
                        <button class="btn btn-primary btn-sm">
                            <i class="bi bi-plus-lg"></i>
                            Tạo đơn bán lẻ
                        </button>
                    </template>
                    <template #body>
                        <div class="row g-3">
                            <!-- RangeFrom -->
                            <div class="col col-3">
                                <FormLabel name="Từ ngày" />
                                <DateInput v-model="model.rangeFrom" :max="model.rangeTo" />
                            </div>

                            <!-- RangeTo -->
                            <div class="col col-3">
                                <FormLabel name="Đến ngày" />
                                <DateInput v-model="model.rangeTo" :min="model.rangeTo" />
                            </div>

                            <!-- OrderByField -->
                            <div class="col col-3">
                                <FormLabel name="Trường sắp xếp" />
                                <SelectInput v-model="model.orderByField">
                                    <option value="OrderedDateTime">Ngày đặt hàng</option>
                                    <option value="Amount">Số tiền</option>
                                </SelectInput>
                            </div>

                            <!-- OrderByAscending -->
                            <div class="col col-3">
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
                        @page-click="onPageButtonClicked" />
            </div>
        </div>
    </MainContainer>
</template>