<script setup lang="ts">
import { reactive, computed, watch, inject } from "vue";
import { type RouteLocationRaw } from "vue-router";
import { useCustomerService } from "@/services/customerService";
import { CustomerBasicModel, CustomerListModel } from "@/models";
import type { LoadingState } from "@/composables/viewStatesComposable";

// Layout components.
import { MainBlock, MainPaginator } from "@/views/layouts";

// Form components.
import { FormLabel, SelectInput } from "@/components/formInputs";

// Dependencies.
const customerService = useCustomerService();

// Model and states.
const model = await initialLoadAsync();
const loadingState = inject<LoadingState>("loadingState")!;

// Computed properties.
const paginationVisible = computed<boolean>(() => model.pageCount > 1);

// Watch.
watch(
    () => [
        model.orderByAscending,
        model.orderByField,
        model.page,
        model.resultsPerPage
    ], reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<CustomerListModel> {
    const responseDto = await customerService.getListAsync({
        orderByField: "DebtRemainingAmount",
        hasRemainingDebtAmountOnly: true
    });
    const listModel = new CustomerListModel(responseDto);
    listModel.orderByField = "DebtRemainingAmount";
    listModel.hasRemainingDebtAmountOnly = true;
    return reactive(listModel);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await customerService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

async function onPageButtonClicked(page: number): Promise<void> {
    model.page = page;
    await reloadAsync();
}

function getCustomerDetailRoute(customer: CustomerBasicModel): RouteLocationRaw {
    return {
        name: "customerDetail",
        params: {
            customerId: customer.id
        }
    };
}

function getCustomerDebtAmountText(customer: CustomerBasicModel): string {
    const amountText = customer.debtAmount.toLocaleString().replaceAll(",", " ");
    return `${amountText} vnđ`;
}
</script>

<template>
    <MainBlock title="Danh sách khoản nợ" :body-padding="[2, 1, 3, 1]"
            body-class="row g-3">
        <template #body>
            <!-- Sorting options -->
            <div class="row g-3">
                <!-- OrderByField -->
                <div class="col col-md-6 col-sm-12 col-12">
                    <FormLabel name="Trường sắp xếp" />
                    <SelectInput v-model="model.orderByField">
                        <option value="DebtRemainingAmount">Khoản nợ còn lại</option>
                        <option value="LastName">Tên</option>
                        <option value="FirstName">Họ</option>
                    </SelectInput>
                </div>

                <!-- OrderByAscending -->
                <div class="col col-md-6 col-sm-12 col-12 mt-md-0 mt-3">
                    <FormLabel name="Thứ tự sắp xếp" />
                    <SelectInput v-model="model.orderByAscending">
                        <option :value="false">Từ lớn đến nhỏ</option>
                        <option :value="true">Từ nhỏ đến lớn</option>
                    </SelectInput>
                </div>
            </div>

            <!-- Results and pagination buttons -->
            <div class="row g-3">
                <!-- Top pagination -->
                <div class="col col-12 mt-3 d-flex justify-content-center"
                        v-if="paginationVisible">
                    <MainPaginator :page="model.page" :page-count="model.pageCount"
                            @page-click="onPageButtonClicked" />
                </div>

                <!-- Results -->
                <div class="col col-12 mt-3">
                    <Transition name="fade" mode="out-in">
                        <div class="bg-white border rounded-3"
                                v-if="!loadingState.isLoading">
                            <ul class="list-group list-group-flush"
                                    v-if="model.results.length">
                                <li class="list-group-item bg-transparent ps-3 p-2
                                            d-flex align-items-center small"
                                        v-for="customer in model.results"
                                                :key="customer.id">
                                    <!-- Avatar -->
                                    <img class="img-thumbnail rounded-circle avatar
                                                me-3"
                                            :src="customer.avatarUrl">

                                    <!-- Detail -->
                                    <div class="row gx-3 flex-fill">
                                        <!-- FullName -->
                                        <div class="col col-6 justify-content-start
                                                    d-flex flex-column
                                                    ps-0 align-items-start mb-sm-0 mb-1">
                                            <span class="fw-bold">
                                                {{ customer.fullName }}
                                            </span>
                                            <span>{{ customer.nickName }}</span>
                                        </div>

                                        <!-- DebtRemainingAmount -->
                                        <div class="col col-6 d-flex flex-column
                                                    justify-content-center align-items-center">
                                            <span class="fw-bold">Nợ còn lại</span>
                                            <span>
                                                {{ getCustomerDebtAmountText(customer) }}
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Action button -->
                                    <RouterLink :to="getCustomerDetailRoute(customer)"
                                            class="btn btn-outline-primary btn-sm
                                                    flex-shrink-0 mx-2">
                                        <i class="bi bi-eye"></i>
                                    </RouterLink>
                                </li>
                            </ul>
                            
                            <!-- Fallback when the result is empty -->
                            <div class="d-flex justify-content-center align-items-center m-4"
                                    v-else>
                                <span class="opacity-50">
                                    Không có khoản nợ nào vào thời điểm hiện tại
                                </span>
                            </div>
                        </div>
                    </Transition>
                </div>

                <!-- Bottom pagination -->
                <div class="col col-12 mt-3 d-flex justify-content-center"
                        v-if="paginationVisible">
                    <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
                </div>
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.avatar {
    width: 50px;
    height: 50px;
    aspect-ratio: 1;
}
</style>