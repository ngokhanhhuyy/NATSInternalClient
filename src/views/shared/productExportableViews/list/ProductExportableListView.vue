<script lang="ts">
export interface Props<TListModel extends OrderListModel | TreatmentListModel>  {
    displayName: string;
    initializeModelAsync(intialData: ResponseDtos.InitialData): Promise<TListModel>;
    reloadModelAsync(model: Reactive<TListModel>): Promise<void>
}
</script>

<script setup lang="ts" generic="TListModel extends OrderListModel | TreatmentListModel">
// Imports.
import { reactive, watch, type Reactive } from "vue";
import type { OrderListModel } from "@/models/orderModels";
import type { TreatmentListModel } from "@/models/treatmentModels";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainPaginator from "@layouts/MainPaginatorComponent.vue";

// Child component.
import Filters from "./FiltersComponent.vue";
import Results from "./ResultsComponent.vue";

// Props.
const props = defineProps<Props<TListModel>>();

// Model and states.
const { loadingState, initialData } = useViewStates();
const model = reactive(await initialLoadAsync());

// Watch.
watch(() => [model.sortingByField, model.sortingByAscending, model.monthYear], async () => {
    model.page = 1;
    await reloadAsync();
});

// Functions.
async function initialLoadAsync(): Promise<TListModel> {
    return await props.initializeModelAsync(initialData);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    await props.reloadModelAsync(model);
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
                <Filters v-model="model" :display-name="displayName" />
            </div>

            <!-- Top pagination -->
            <div class="col col-12 d-flex justify-content-center"
                    v-if="model.pageCount > 1">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>

            <!-- Results -->
            <div class="col col-12">
                <Results v-model="model.items" :display-name="displayName" :isLoading="loadingState.isLoading" />
            </div>

            <!-- Bottom pagination -->
            <div class="col col-12 d-flex justify-content-center" v-if="model.pageCount > 1">
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