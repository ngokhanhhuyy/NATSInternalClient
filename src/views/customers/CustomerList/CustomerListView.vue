<script setup lang="ts">
import { reactive } from "vue";
import { useCustomerService } from "@/services/customerService";
import { CustomerListModel } from "@/models/customerModels";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainPaginator from "@/views/layouts/MainPaginatorComponent.vue";

// Child components.
import FiltersBlock, { type Props as FiltersBlockProps } from "./FiltersComponent.vue";
import Results from "./ResultsComponent.vue";

// Dependencies.
const service = useCustomerService();

// Internal states.
const { loadingState, initialData } = useViewStates();
const model = await initializeModel();

// Functions.
async function initializeModel(): Promise<CustomerListModel> {
    const responseDto = await service.getListAsync();
    return reactive(new CustomerListModel(responseDto, initialData.customer));
}

async function reloadListAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await service.getListAsync(model.toRequestDto());
    model.mapFromListResponseDto(responseDto);
    loadingState.isLoading = false;
}

async function onSearchButtonClicked(): Promise<void> {
    model.page = 1;
    if (!model.searchByContent || model.searchByContent.length >=3) {
        await reloadListAsync();
    }
}

async function onPaginationButtonClick(page: number): Promise<void> {
    model.page = page;
    await reloadListAsync();
}

// Filters block props.
const filtersBlockProps: FiltersBlockProps = {
    getSortingOptionsAsync: service.getListSortingOptionAsync,
    getCreatingPermissionAsync: service.getCreatingPermissionAsync
};
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <!-- Search -->
            <div class="col col-12">
                <FiltersBlock v-model="model" v-bind="filtersBlockProps"
                        @search-button-clicked="onSearchButtonClicked" />
            </div>

            <!-- Pagination -->
            <div class="col col-12 d-flex flex-row justify-content-center"
                    v-if="model.pageCount > 1">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPaginationButtonClick" />
            </div>

            <!-- Results -->
            <div class="col col-12">
                <div class="block block-customer-list bg-white p-0 h-100 d-flex
                            flex-column overflow-hidden rounded-3 border overflow-hidden">
                    <Results v-model="model.items" />
                </div>
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

<style scoped>
.block.block-customer-list .block-body {
    overflow-y: auto;
}

.img-thumbnail {
    width: 60px;
    height: 60px;
}

.fullname {
    text-decoration: none;
}

.fullname:hover, .fullname.active {
    text-decoration: underline
}

@media (max-width: 768px) {
    .block.block-customer-list .block-body:has(ul) {
        border-bottom: 1px solid var(--border-color) !important;
    }
}
</style>