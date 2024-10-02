<script setup lang="ts">
import { reactive, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useViewStates } from "@/composables";
import { useAuthorizationService } from "@/services/authorizationService";
import { useConsultantService } from "@/services/consultantService";
import { ConsultantListModel, ConsultantBasicModel, CustomerBasicModel } from "@/models";

// Layout components.
import { MainContainer, MainBlock, MainPaginator } from "@/views/layouts";

// Form components.
import { FormLabel, SelectInput } from "@/components/formInputs";

// Dependencies.
const authorizationService = useAuthorizationService();
const consultantService = useConsultantService();

// Model and states.
const model = await initialLoadAsync();
const { loadingState } = useViewStates();
const createRoute: RouteLocationRaw = { name: "consultantCreate" };

// Watch.
watch(
    () => [
        model.orderByAscending,
        model.orderByField,
        model.monthYear,
        model.page,
        model.resultsPerPage
    ], reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<ConsultantListModel> {
    const responseDto = await consultantService.getListAsync();
    return reactive(new ConsultantListModel(responseDto));
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await consultantService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

function getConsultantClass(expense: ConsultantBasicModel): string {
    if (!expense.isLocked) {
        return "bg-primary-subtle text-primary";
    }
    return "bg-danger-subtle text-danger";
}

function getConsultantDetailRoute(consultant: ConsultantBasicModel): RouteLocationRaw {
    return {
        name: "consultantDetail",
        params: {
            consultantId: consultant.id
        }
    };
}

function getCustomerDetailRoute(customer: CustomerBasicModel): RouteLocationRaw {
    return {
        name: "customerDetail",
        params: {
            customerId: customer.id
        }
    };
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
                <MainBlock title="Danh sách tư vấn" :body-padding="[2, 1, 0, 1]"
                            body-class="row g-3"
                            :close-button="!authorizationService.canCreateConsultant()">
                    <template #header v-if="authorizationService.canCreateConsultant()">
                        <RouterLink :to="createRoute" class="btn btn-primary btn-sm">
                            <i class="bi bi-plus-lg"></i>
                            Tạo tư vấn
                        </RouterLink>
                    </template>
                    <template #body>
                        <div class="row g-3">
                            <!-- MonthYear -->
                            <div class="col col-lg-4 col-md-12 col-sm-12 col-12 mb-3">
                                <FormLabel name="Tháng và năm" />
                                <SelectInput v-model="model.monthYear">
                                    <option :value="option" :key="index"
                                            v-for="(option, index) in model.monthYearOptions">
                                        Tháng {{ option.month }}, {{ option.year }}
                                    </option>
                                </SelectInput>
                            </div>

                            <!-- OrderByField -->
                            <div class="col col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
                                <FormLabel name="Trường sắp xếp" />
                                <SelectInput v-model="model.orderByField">
                                    <option value="PaidDateTime">Ngày thanh toán</option>
                                    <option value="Amount">Số tiền</option>
                                </SelectInput>
                            </div>

                            <!-- OrderByAscending -->
                            <div class="col col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
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
            <div class="col col-12 mt-3 d-flex justify-content-center"
                    v-if="model.pageCount > 1">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>

            <!-- Results -->
            <div class="col col-12 mt-3">
                <Transition name="fade" mode="out-in">
                    <div class="bg-white border rounded-3" v-if="!loadingState.isLoading">
                        <ul class="list-group list-group-flush" v-if="model.items.length">
                            <li class="list-group-item bg-transparent ps-3 p-2
                                        d-flex align-items-center small"
                                    v-for="consultant in model.items" :key="consultant.id">
                                <!-- Id -->
                                <span class="text-primary px-2 py-1 me-lg-3 me-md-2 me-3
                                            rounded small fw-bold"
                                        :class="getConsultantClass(consultant)">
                                    #{{ consultant.id }}
                                </span>

                                <!-- Detail -->
                                <div class="row gx-3 flex-fill">
                                    <!-- Amount -->
                                    <div class="col col-md-3 col-12 justify-content-start ps-0
                                                align-items-center mb-sm-0 mb-1">
                                        <span class="text-primary px-1 rounded me-2">
                                            <i class="bi bi-cash-coin"></i>
                                        </span>
                                        <span>
                                            {{ consultant.amount.toLocaleString() }}đ
                                        </span>
                                    </div>

                                    <!-- PaidDate -->
                                    <div class="col col-lg-3 col-md-12 col-12 justify-content-start ps-0
                                                d-xl-block d-lg-none d-md-none d-sm-none d-none">
                                        <span class="px-1 rounded text-primary me-2">
                                            <i class="bi bi-calendar-week"></i>
                                        </span>
                                        <span>{{ consultant.paidDate }}</span>
                                    </div>

                                    <!-- PaidTime -->
                                    <div class="col col-lg-3 col-md-12 col-12 justify-content-start
                                                ps-0 align-items-center d-xl-block d-lg-none
                                                d-md-none d-sm-none d-none">
                                        <span class="px-1 rounded text-primary me-2">
                                            <i class="bi bi-clock"></i>
                                        </span>
                                        <span>{{ consultant.paidTime }}</span>
                                    </div>

                                    <!-- PaidDateTime -->
                                    <div class="col col-md-auto col-12 justify-content-start ps-0 d-xl-none
                                                d-lg-block d-block align-items-center
                                                mb-sm-0 mb-1">
                                        <span class="px-1 rounded text-primary me-2">
                                            <i class="bi bi-calendar-week"></i>
                                        </span>
                                        <span>{{ consultant.paidDateTime }}</span>
                                    </div>

                                    <!-- PaidDateTime -->
                                    <div class="col col-md col-12 justify-content-start
                                                ps-0 align-items-center mb-sm-0 mb-1
                                                ms-md-3 ms-0">
                                        <span class="px-1 rounded text-primary me-2">
                                            <i class="bi bi-person-circle"></i>
                                        </span>
                                        <RouterLink :to="getCustomerDetailRoute(consultant.customer)">
                                            {{ consultant.customer.fullName }}
                                        </RouterLink>
                                    </div>
                                </div>

                                <!-- Action button -->
                                <RouterLink :to="getConsultantDetailRoute(consultant)"
                                        class="btn btn-outline-primary btn-sm flex-shrink-0 mx-2">
                                    <i class="bi bi-eye"></i>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </Transition>
            </div>

            <!-- Bottom pagination -->
            <div class="col col-12 mt-3 d-ustify-content-center"
                    v-if="model.pageCount > 1">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>
        </div>
    </MainContainer>
</template>