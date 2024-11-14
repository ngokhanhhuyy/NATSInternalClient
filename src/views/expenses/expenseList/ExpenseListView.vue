<script setup lang="ts">
import { reactive, watch } from "vue";
import { useViewStates } from "@/composables/viewStatesComposable";
import { useExpenseService } from "@/services/expenseService";
import { ExpenseListModel } from "@/models/expenseModels";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainPaginator from "@layouts/MainPaginatorComponent.vue";

// Child component.
import Filters, { type Props as FiltersProps } from "./FiltersComponent.vue";
import Results from "./ResultsComponent.vue";

// Dependencies.
const service = useExpenseService();

// Model and states.
const { loadingState, initialData } = useViewStates();
const model = reactive(await initialLoadAsync());

// Watch.
watch(
    () => [
        model.sortingByAscending,
        model.sortingByField,
        model.monthYear,
        model.category,
        model.resultsPerPage],
    async () => {
        model.page = 1;
        await reloadAsync();
    });

// Functions.
async function initialLoadAsync(): Promise<ExpenseListModel> {
    const responseDto = await service.getListAsync();
    const model = new ExpenseListModel(responseDto, initialData.expense);
    return model;
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await service.getListAsync(model.toRequestDto());
    model.mapFromListResponseDto(responseDto);
    loadingState.isLoading = false;
}

async function onPageButtonClicked(page: number): Promise<void> {
    model.page = page;
    await reloadAsync();
}

// Props for child components.
const filtersProps: FiltersProps = {
    getSortingOptionsAsync: service.getListSortingOptionsAsync,
    getMonthYearOptionsAsync: service.getListMonthYearOptionsAsync,
    getCreatingPermissionAsync: service.getCreatingPermissionAsync
};
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-center">
            <!-- Filter -->
            <div class="col col-12">
                <Filters v-model="model" v-bind="filtersProps" />
            </div>

            <!-- Results -->
            <div class="col col-12">
                <Transition name="fade" mode="out-in">
                    <Results v-model="model.items" v-if="!loadingState.isLoading" />
                </Transition>
            </div>

            <!-- Pagination -->
            <div class="col col-12 d-flex justify-content-center" v-if="model.pageCount > 1">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>
        </div>
    </MainContainer>
</template>