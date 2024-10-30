<script lang="ts">
interface Props<
        TModel extends IProductExportableListModel,
        TRequestDto extends IProductExportableListRequestDto,
        TResponseDto extends IFinancialEngageableListResponseDto>  {
    resourceDisplayName: string;
    initializeModel: (responseDto: TResponseDto, requestDto?: Partial<TRequestDto>) => TModel;
    getListAsync: (requestDto?: Partial<TRequestDto>) => Promise<TResponseDto>;
    getCreateRoute: () => RouteLocationRaw;
    getDetailRoute: (id: number) => RouteLocationRaw;
}
</script>

<script setup lang="ts"
        generic="TModel extends IProductExportableListModel,
                TRequestDto extends IProductExportableListRequestDto,
                TResponseDto extends IFinancialEngageableListResponseDto">
// Imports.
import { reactive, watch, provide, type Reactive } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainPaginator from "@layouts/MainPaginatorComponent.vue";

// Child component.
import Filters from "./ProductExportableListFiltersComponent.vue";
import Results from "./ProductExportableListResultsComponent.vue";

// Props.
const props = defineProps<Props<TModel, TRequestDto, TResponseDto>>();

// Model and states.
const model = await initialLoadAsync();
const { loadingState } = useViewStates();

// Provide.
provide("resourceType", props.initializeModel);
provide("resourceDisplayName", props.resourceDisplayName);
provide("getCreateRoute", props.getCreateRoute);
provide("getDetailRoute", props.getDetailRoute);

// Watch.
watch(
    () => [
        model.orderByAscending,
        model.orderByField,
        model.monthYear,
        model.resultsPerPage
    ], () => { model.page = 1; });
watch(
    () => [
        model.orderByAscending,
        model.orderByField,
        model.monthYear,
        model.page,
        model.resultsPerPage
    ], reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<Reactive<TModel>> {
    return reactive(props.initializeModel(await props.getListAsync()));
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await props.getListAsync(model.toRequestDto() as TRequestDto);
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

async function onPageButtonClicked(page: number): Promise<void> {
    model.page = page;
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-center">
            <!-- Filter -->
            <div class="col col-12">
                <Filters v-model="model" />
            </div>

            <!-- Top pagination -->
            <div class="col col-12 d-flex justify-content-center"
                    v-if="model.pageCount > 1">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>

            <!-- Results -->
            <div class="col col-12">
                <Results v-model="model.items"
                        :resource-type="initializeModel"
                        :resource-display-name="resourceDisplayName" />
            </div>

            <!-- Bottom pagination -->
            <div class="col col-12 mt-3 d-flex justify-content-center"
                    v-if="model.pageCount > 1">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
.customer-fullname:not(:hover) {
    text-decoration: none;
}
</style>