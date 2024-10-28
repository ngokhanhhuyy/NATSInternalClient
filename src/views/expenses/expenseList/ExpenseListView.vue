<script setup lang="ts">
import { reactive, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useViewStates } from "@/composables/viewStatesComposable";
import { useAuthorizationService } from "@/services/authorizationService";
import { useExpenseService } from "@/services/expenseService";
import { ExpenseListModel } from "@/models/expenseModels";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";
import MainPaginator from "@layouts/MainPaginatorComponent.vue";

// Form components.
import FormLabel from "@/components/formInputs/FormLabelComponent.vue";
import SelectInput from "@/components/formInputs/SelectInputComponent.vue";

// Child component.
import ExpenseListResults from "./ExpenseListResultsComponent.vue";

// Dependencies.
const authorizationService = useAuthorizationService();
const expenseService = useExpenseService();

// Model and states.
const model = await initialLoadAsync();
const { loadingState } = useViewStates();
const createRoute: RouteLocationRaw = { name: "expenseCreate" };

// Watch.
watch(
    () => [
        model.orderByAscending,
        model.orderByField,
        model.monthYear,
        model.category,
        model.page,
        model.resultsPerPage
    ], reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<ExpenseListModel> {
    const responseDto = await expenseService.getListAsync();
    const model = reactive(new ExpenseListModel(responseDto));
    return model;
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await expenseService.getListAsync(model.toRequestDto());
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
                <MainBlock title="Danh sách chi phí" :body-padding="[2, 2, 0, 2]"
                            body-class="row g-3"
                            :close-button="!authorizationService.canCreateExpense()">
                    <template #header v-if="authorizationService.canCreateExpense()">
                        <RouterLink :to="createRoute" class="btn btn-primary btn-sm">
                            <i class="bi bi-plus-lg"></i>
                            Tạo chi phí
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
            <div class="col col-12 d-flex justify-content-center" v-if="model.pageCount > 1">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>

            <!-- Results -->
            <div class="col col-12">
                <Transition name="fade" mode="out-in">
                    <ExpenseListResults v-model="model.items" v-if="!loadingState.isLoading" />
                </Transition>
            </div>

            <!-- Bottom pagination -->
            <div class="col col-12 d-flex justify-content-center" v-if="model.pageCount > 1">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>
        </div>
    </MainContainer>
</template>