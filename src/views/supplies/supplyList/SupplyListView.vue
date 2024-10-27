<script setup lang="ts">
import { reactive, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { SupplyListModel } from "@/models/supplyModels";
import { useSupplyService } from "@/services/supplyService";
import { useAuthorizationService } from "@/services/authorizationService";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";
import MainPaginator from "@layouts/MainPaginatorComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";

// Child components.
import Results from "./SupplyListResultsComponent.vue";

// Dependencies.
const supplyService = useSupplyService();
const authorizationService = useAuthorizationService();

// Model and states.
const model = await initialLoadAsync();
const { loadingState } = useViewStates();
const createRoute: RouteLocationRaw = { name: "supplyCreate" };

// Watch.
watch(
    () => [
        model.orderByAscending,
        model.orderByField,
        model.monthYear,
        model.page,
        model.resultsPerPage
    ],
    reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<SupplyListModel> {
    const responseDto = await supplyService.getListAsync();
    const model = new SupplyListModel(responseDto);
    model.mapFromResponseDto(responseDto);
    return reactive(model);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await supplyService.getListAsync(model.toRequestDto());
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
        <div class="row g-3 p-0 justify-content-center">
            <div class="col col-12">
                <!-- Filter -->
                <MainBlock title="Danh sách nhập hàng" :body-padding="[0, 2, 2, 2]"
                            body-class="row g-3"
                            :close-button="!authorizationService.canCreateSupply()">
                    <template #header v-if="authorizationService.canCreateSupply()">
                        <RouterLink :to="createRoute" class="btn btn-primary btn-sm">
                            <i class="bi bi-plus-lg"></i>
                            Tạo nhập hàng
                        </RouterLink>
                    </template>
                    <template #body>
                        <!-- MonthYear -->
                        <div class="col col-lg-4 col-md-12 col-sm-12 col-12">
                            <FormLabel name="Tháng và năm" />
                            <SelectInput v-model="model.monthYear">
                                <option :value="null">Tất cả</option>
                                <option :value="option" :key="index"
                                        v-for="(option, index) in model.monthYearOptions">
                                    Tháng {{ option.month }}, {{ option.year }}
                                </option>
                            </SelectInput>
                        </div>

                        <!-- OrderByField -->
                        <div class="col col-lg-4 col-md-6 col-sm-12 col-12">
                            <FormLabel name="Trường sắp xếp" />
                            <SelectInput v-model="model.orderByField">
                                <option value="TotalAmount">Tổng giá tiền</option>
                                <option value="StatsDateTime">Thời gian thống kê</option>
                                <option value="ShipmentFee">Phí vận chuyển</option>
                                <option value="PaidAmount">Đã thanh toán</option>
                            </SelectInput>
                        </div>

                        <!-- OrderByAscending -->
                        <div class="col col-lg-4 col-md-6 col-sm-12 col-12">
                            <FormLabel name="Thứ tự" />
                            <SelectInput v-model="model.orderByAscending">
                                <option :value="true">Từ nhỏ đến lớn</option>
                                <option :value="false">Từ lớn đến nhỏ</option>
                            </SelectInput>
                        </div>
                    </template>
                </MainBlock>

                <!-- Pagination -->
                <div class="col col-12 d-flex justify-content-center"
                        v-if="model.pageCount > 1">
                    <MainPaginator :page="model.page" :page-count="model.pageCount"
                            @page-click="onPageButtonClicked" v-if="model.pageCount > 1" />
                </div>

                <!-- Results -->
                <Results v-model="model.items" />

                <!-- Pagination -->
                <div class="col col-12 d-flex justify-content-center mt-3"
                        v-if="model.pageCount > 1">
                    <MainPaginator :page="model.page" :page-count="model.pageCount"
                            @page-click="onPageButtonClicked" v-if="model.pageCount > 1" />
                </div>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
img.supply-thumbnail {
    width: 55px;
    height: 55px;
    object-fit: cover;
    object-position: 50% 50%;
}

img.user-avatar {
    width: 25px;
    height: 25px;
    object-fit: cover;
    object-position: 50% 50%;
}

.user-fullname {
    text-decoration: none;
}

.user-fullname:hover {
    text-decoration: underline;
}

@media (max-width: 576px) {
    img.supply-thumbnail {
        width: 70px;
        height: 70px;
    }
}
</style>