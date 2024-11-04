<script setup lang="ts">
import { reactive, computed, watch, inject } from "vue";
import { type RouteLocationRaw } from "vue-router";
import { useCustomerService } from "@/services/customerService";
import { CustomerBasicModel, CustomerListModel } from "@/models/customerModels";
import type { LoadingState } from "@/composables/loadingStateComposable";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";
import MainPaginator from "@layouts/MainPaginatorComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";

// Dependencies.
const customerService = useCustomerService();
const amountUtility = useAmountUtility();

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
        sortByField: "DebtRemainingAmount",
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
</script>

<template>
    <MainBlock title="Danh sách khoản nợ" :body-padding="[0, 2, 2, 2]">
        <!-- Sorting options -->
        <div class="row g-3">
            <!-- OrderByField -->
            <div class="col col-md-6 col-sm-12 col-12">
                <FormLabel text="Trường sắp xếp" />
                <SelectInput v-model="model.orderByField">
                    <option value="DebtRemainingAmount">Khoản nợ còn lại</option>
                    <option value="LastName">Tên</option>
                    <option value="FirstName">Họ</option>
                </SelectInput>
            </div>

            <!-- OrderByAscending -->
            <div class="col col-md-6 col-sm-12 col-12">
                <FormLabel text="Thứ tự sắp xếp" />
                <SelectInput v-model="model.orderByAscending">
                    <option :value="false">Từ lớn đến nhỏ</option>
                    <option :value="true">Từ nhỏ đến lớn</option>
                </SelectInput>
            </div>
        </div>

        <!-- Results and pagination buttons -->
        <div class="row g-3">
            <!-- Top pagination -->
            <div class="col col-12 d-flex justify-content-center"
                    v-if="paginationVisible">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>

            <!-- Results -->
            <div class="col col-12">
                <Transition name="fade" mode="out-in">
                    <div class="bg-white border rounded-3 overflow-hidden"
                            v-if="!loadingState.isLoading">
                        <ul class="list-group list-group-flush"
                                v-if="model.items.length">
                            <!-- Labels -->
                            <li class="list-group-item py-1 bg-secondary bg-opacity-10
                                        text-secondary-emphasis small">
                                <div class="row g-0">
                                    <div class="col col-xl-1 col-2"></div>
                                    <div class="col col-xl-5 col-4 text-start">
                                        Họ và tên
                                    </div>
                                    <div class="col col-xl-5 col-4 text-center">
                                        Nợ còn lại
                                    </div>
                                </div>
                            </li>

                            <!-- Result list -->
                            <li class="list-group-item bg-transparent ps-3 p-2 small"
                                    v-for="customer in model.items"
                                    :key="customer.id">
                                <div class="row g-0">
                                    <!-- Avatar -->
                                    <div class="col col-xl-1 col-2 pe-3 d-flex
                                                justify-content-center align-items-center">
                                        <img class="img-thumbnail rounded-circle avatar"
                                                :src="customer.avatarUrl">
                                    </div>

                                    <!-- FullName -->
                                    <div class="col col-xl-5 col-4
                                                justify-content-start d-flex
                                                flex-column justify-content-center
                                                align-items-start ps-0 mb-sm-0 mb-1">
                                        <span class="fw-bold">
                                            {{ customer.fullName }}
                                        </span>
                                        <span>{{ customer.nickName }}</span>
                                    </div>

                                    <!-- DebtRemainingAmount -->
                                    <div class="col col-xl-5 col-4 d-flex flex-column
                                                justify-content-center align-items-center">
                                        {{ amountUtility.getDisplayText(customer.debtAmount) }}
                                    </div>

                                    <!-- Action button -->
                                    <div class="col col-xl-1 col-2 d-flex
                                                justify-content-end align-items-center">
                                        <RouterLink :to="getCustomerDetailRoute(customer)"
                                                class="btn btn-outline-primary btn-sm
                                                        flex-shrink-0 mx-2">
                                            <i class="bi bi-eye"></i>
                                        </RouterLink>
                                    </div>
                                </div>
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
    </MainBlock>
</template>

<style scoped>
.avatar {
    width: 50px;
    height: 50px;
    aspect-ratio: 1;
}
</style>