<script lang="ts">
export interface Props<TListModel extends DebtIncurrenceListModel | DebtPaymentListModel> {
    getDisplayName(store: ReturnType<typeof useInitialDataStore>): string;
    initializeModelAsync(initialData: ResponseDtos.InitialData): Promise<TListModel>;
    reloadModelAsync(model: Reactive<TListModel>): Promise<void>;
}
</script>

<script setup lang="ts" generic="
    TListModel extends DebtIncurrenceListModel | DebtPaymentListModel">
import { reactive, watch , type Reactive } from "vue";
import { useViewStates } from "@/composables/viewStatesComposable";
import type { DebtIncurrenceListModel } from "@/models/debtIncurrenceModels";
import type { DebtPaymentListModel } from "@/models/debtPaymentModels";
import { useInitialDataStore } from "@/stores/initialData";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainPaginator from "@layouts/MainPaginatorComponent.vue";

// Child component.
import Filters from "./FiltersComponent.vue";
import Results from "./ResultsComponent.vue";

// Props.
const props = defineProps<Props<TListModel>>();

// Dependencies.
const store = useInitialDataStore();

// Model and states.
const { loadingState, initialData } = useViewStates();
const model = reactive(await initialLoadAsync());

// Watch.
watch(() => [ model.sortingByAscending, model.sortingByField, model.monthYear ], async () => {
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

async function onPaginationButtonClick(page: number): Promise<void> {
    model.page = page;
    await reloadAsync();
}
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <div class="col col-12">
                <Filters v-model="model" :display-name="getDisplayName(store)" />
            </div>
        
            <div class="col col-12">
                <Results v-model="model.items" :display-name="getDisplayName(store)" />
            </div>

            <!-- Pagination -->
            <div class="col col-12 d-flex flex-row justify-content-center"
                    v-if="model.pageCount > 1">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPaginationButtonClick" />
            </div>
        </div>
    </MainContainer>
</template>