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
const resultsClass = computed<string | null>(() => {
    if (loadingState.isLoading) {
        return "loading-opacity-enabled";
    }
    return null;
});
const paginationVisible = computed<boolean>(() => model.pageCount > 1);

// Watch.
watch(() => [ model.sortingByField, model.sortingByAscending ], async () => {
    model.page = 1;
    await reloadAsync();
});

// Functions.
async function initialLoadAsync(): Promise<CustomerListModel> {
    const requestDto: RequestDtos.Customer.List = {
        sortingByField: "DebtRemainingAmount",
        sortingByAscending: false,
        hasRemainingDebtAmountOnly: true
    };
    const responseDto = await customerService.getListAsync(requestDto);
    const listModel = new CustomerListModel(responseDto, undefined, requestDto);
    return reactive(listModel);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await customerService.getListAsync(model.toRequestDto());
    model.mapFromListResponseDto(responseDto);
    loadingState.isLoading = false;
}

async function onPageButtonClicked(page: number): Promise<void> {
    model.page = page;
    await reloadAsync();
}
</script>

<template>
    <MainBlock title="Danh sách khoản nợ" :body-padding="[0, 2, 2, 2]">
        <!-- Sorting options -->
        <div class="row g-3">
            <!-- OrderByField -->
            <div class="col col-md-6 col-sm-12 col-12">
                <FormLabel text="Trường sắp xếp" />
                <SelectInput v-model="model.sortingByField">
                    <option value="DebtRemainingAmount">Khoản nợ còn lại</option>
                    <option value="LastName">Tên</option>
                    <option value="FirstName">Họ</option>
                </SelectInput>
            </div>

            <!-- OrderByAscending -->
            <div class="col col-md-6 col-sm-12 col-12">
                <FormLabel text="Thứ tự sắp xếp" />
                <SelectInput v-model="model.sortingByAscending">
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
            <div class="col col-12 loading-opacity" :class="resultsClass">
                <div class="bg-white border rounded-3 overflow-hidden">
                    <ul class="list-group list-group-flush" v-if="model.items.length">
                        <!-- Labels -->
                        <li class="list-group-item py-1 bg-secondary bg-opacity-10
                                    text-secondary-emphasis small">
                            <div class="row g-0">
                                <div class="col col-xl-1 col-2"></div>
                                <div class="col col-xl-5 col-md-4 col-10 text-start">
                                    Họ và tên
                                    <span class="d-md-none d-inline"> / Nợ còn lại</span>
                                </div>
                                <div class="col col-xl-5 col-md-4 d-md-block d-none text-center">
                                    Nợ còn lại
                                </div>
                            </div>
                        </li>

                        <!-- Result list -->
                        <li class="list-group-item bg-transparent ps-3 p-2 small d-flex
                                    align-items-center"
                                v-for="customer in model.items"
                                :key="customer.id">
                            <!-- Avatar -->
                            <img class="img-thumbnail rounded-circle avatar flex-shrink-0 me-3"
                                    :src="customer.avatarUrl">

                            <div class="row gx-3 flex-fill justify-content-start align-items-center">
                                <!-- FullName -->
                                <div class="col col-md-6 col-12
                                            justify-content-start d-flex
                                            flex-column justify-content-stretch
                                            align-items-stretch ps-0">
                                    <span class="fw-bold">
                                        {{ customer.fullName }}
                                    </span>
                                    <span>{{ customer.nickName }}</span>
                                </div>

                                <!-- DebtRemainingAmount -->
                                <div class="col d-md-flex d-none align-items-center p-0">
                                    {{ amountUtility.getDisplayText(customer.debtAmount) }}
                                </div>
                            </div>

                            <!-- Action button -->
                            <RouterLink :to="customer.detailRoute"
                                    class="btn btn-outline-primary btn-sm flex-shrink-0 mx-2">
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

.loading-opacity {
    transition: 0.5s;
}

.loading-opacity-enabled {
    opacity: 0;
}
</style>