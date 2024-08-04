<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { SupplyListModel, SupplyBasicModel } from "@/models";
import { useSupplyService } from "@/services/supplyService";
import { useAuthorizationService } from "@/services/authorizationService";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import { MainContainer, MainBlock, MainPaginator } from "@/views/layouts";

// Form components.
import { FormLabel, DateInput, SelectInput } from "@/components/formInputs";

// Dependencies.
const supplyService = useSupplyService();
const authorizationService = useAuthorizationService();

// Model and states.
const model = await initialLoadAsync();
const { loadingState } = useViewStates();
const createRoute: RouteLocationRaw = { name: "supplyCreate" };

// Computed properties.
const rangeFromMax = computed<string | null>(() => model.rangeTo || null);
const rangeToMin = computed<string | null>(() => model.rangeFrom || null);

// Watch.
watch(
    () => [
        model.orderByAscending,
        model.orderByField,
        model.rangeFrom,
        model.rangeTo,
        model.page,
        model.resultsPerPage
    ],
    reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<SupplyListModel> {
    const model = new SupplyListModel();
    const responseDto = await supplyService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    return reactive(model);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await supplyService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

function getItemClass(supply: SupplyBasicModel): string {
    if (!supply.isLocked) {
        return "bg-primary-subtle text-primary";
    }
    return "bg-danger-subtle text-danger";
}

function getSupplyDetailRoute(supply: SupplyBasicModel): RouteLocationRaw {
    return { name: "supplyDetail", params: { supplyId: supply.id } };
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
                <MainBlock title="Danh sách nhập hàng" :body-padding="[2, 2, 0, 2]"
                            body-class="row g-3"
                            :close-button="!authorizationService.canCreateSupply()">
                    <template #header v-if="authorizationService.canCreateSupply()">
                        <RouterLink :to="createRoute" class="btn btn-primary btn-sm">
                            <i class="bi bi-plus-lg"></i>
                            Tạo nhập hàng
                        </RouterLink>
                    </template>
                    <template #body>
                        <!-- Range from -->
                        <div class="col col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
                            <FormLabel name="Từ ngày" />
                            <DateInput v-model="model.rangeFrom" :max="rangeFromMax" />
                        </div>

                        <!-- Range to -->
                        <div class="col col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
                            <FormLabel name="Đến ngày" />
                            <DateInput v-model="model.rangeTo" :min="rangeToMin" />
                        </div>

                        <!-- OrderByField -->
                        <div class="col col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
                            <FormLabel name="Trường sắp xếp" />
                            <SelectInput v-model="model.orderByField">
                                <option value="TotalAmount">Tổng giá tiền</option>
                                <option value="PaidDateTime">Thời gian thanh toán</option>
                                <option value="ShipmentFee">Phí vận chuyển</option>
                                <option value="PaidAmount">Đã thanh toán</option>
                            </SelectInput>
                        </div>

                        <!-- OrderByAscending -->
                        <div class="col col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
                            <FormLabel name="Thứ tự" />
                            <SelectInput v-model="model.orderByAscending">
                                <option :value="true">Từ nhỏ đến lớn</option>
                                <option :value="false">Từ lớn đến nhỏ</option>
                            </SelectInput>
                        </div>
                    </template>
                </MainBlock>

                <!-- Pagination -->
                <div class="col col-12 d-flex justify-content-center mt-3"
                        v-if="model.pageCount > 1">
                    <MainPaginator :page="model.page" :page-count="model.pageCount" />
                </div>

                <!-- Results -->
                <Transition name="fade" mode="out-in">
                    <div class="bg-white border rounded-3 mt-3" v-if="!loadingState.isLoading">
                        <ul class="list-group list-group-flush" v-if="model.items.length">
                            <li class="list-group-item bg-transparent ps-3 p-2
                                        d-flex align-items-center small"
                                    v-for="supply in model.items" :key="supply.id">
                                <!-- Id -->
                                <span class="text-primary px-2 py-1 me-md-5 me-3 rounded
                                            small fw-bold" :class="getItemClass(supply)">
                                    #{{ supply.id }}
                                </span>

                                <!-- Detail -->
                                <div class="row gx-3 flex-fill">
                                    <!-- TotalAmount -->
                                    <div class="col col-sm-5 col-12 justify-content-start ps-0
                                            align-items-center mb-sm-0 mb-1">
                                        <span class="text-primary px-1 rounded me-2">
                                            <i class="bi bi-cash-coin"></i>
                                        </span>
                                        <span>
                                            {{ supply.totalAmount.toLocaleString() }}đ
                                        </span>
                                    </div>

                                    <!-- PaidDate -->
                                    <div class="col col-sm-4 col-12 justify-content-start ps-0
                                            align-items-center mb-sm-0 mb-1">
                                        <span class="px-1 rounded text-primary me-2">
                                            <i class="bi bi-calendar-week"></i>
                                        </span>
                                        <span>{{ supply.paidDate }}</span>
                                    </div>

                                    <!-- PaidTime -->
                                    <div class="col justify-content-start ps-0
                                            align-items-center">
                                        <span class="px-1 rounded text-primary me-2">
                                            <i class="bi bi-clock"></i>
                                        </span>
                                        <span>{{ supply.paidTime }}</span>
                                    </div>
                                </div>

                                <!-- Action button -->
                                <RouterLink :to="getSupplyDetailRoute(supply)"
                                        class="btn btn-outline-primary btn-sm flex-shrink-0 mx-2">
                                    <i class="bi bi-eye"></i>
                                </RouterLink>
                            </li>
                        </ul>

                        <!-- Fallback -->
                        <div class="opacity-50 w-100 text-center m-4" v-else>
                            Không tìm thấy đơn nhập hàng
                        </div>
                    </div>
                </Transition>


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