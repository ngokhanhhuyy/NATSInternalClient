<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { useViewStates } from "@/composables/viewStatesComposable";
import { useConsultantService } from "@/services/consultantService";
import { ConsultantListModel } from "@/models/consultantModels";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainPaginator from "@layouts/MainPaginatorComponent.vue";

// Child components.
import Filters, { type Props as FiltersProps } from "./FiltersComponent.vue";
import Results from "./ResultsComponent.vue";

// Dependencies.
const service = useConsultantService();

// Model and states.
const { loadingState, initialData } = useViewStates();
const model = reactive(await initialLoadAsync());

// Computed properties.
const paginatorVisible = computed<boolean>(() => model.pageCount > 1);

// Watch.
watch(() => [model.sortingByAscending, model.sortingByField, model.monthYear], async () => {
    model.page = 1;
    await reloadAsync();
});

// Functions.
async function initialLoadAsync(): Promise<ConsultantListModel> {
    const responseDto = await service.getListAsync();
    return new ConsultantListModel(responseDto, initialData.consultant);
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

            <!-- Top pagination -->
            <div class="col col-12 d-flex justify-content-center" v-if="paginatorVisible">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>

            <!-- Results -->
            <div class="col col-12">
                <Results v-model="model.items" />
            </div>

            <!-- Bottom pagination -->
            <div class="col col-12 d-flex justify-content-center" v-if="paginatorVisible">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>
        </div>
    </MainContainer>
</template>