<script setup lang="ts">
import { reactive, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { SupplyListModel } from "@/models/supplyModels";
import { useSupplyService } from "@/services/supplyService";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";
import MainPaginator from "@layouts/MainPaginatorComponent.vue";
import CreatingRouterLink from "@layouts/CreatingRouterLinkComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";
import SortingByFieldSelectInput from "@forms/SortingByFieldSelectInputComponent.vue";
import MonthYearSelectInput from "@forms/MonthYearSelectInputComponent.vue";

// Child components.
import Results from "./ResultsComponent.vue";

// Dependencies.
const supplyService = useSupplyService();

// Model and states.
const { loadingState, initialData } = useViewStates();
const model = reactive(await initialLoadAsync());
const createRoute: RouteLocationRaw = { name: "supplyCreate" };

// Watch.
watch(() => [ model.sortingByAscending, model.sortingByField, model.monthYear ], async () => {
    model.page = 1;
    await reloadAsync();
});

// Functions.
async function initialLoadAsync(): Promise<SupplyListModel> {
    const responseDto = await supplyService.getListAsync();
    return new SupplyListModel(responseDto, initialData.supply);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await supplyService.getListAsync(model.toRequestDto());
    model.mapFromListResponseDto(responseDto);
    loadingState.isLoading = false;
}

async function onPageButtonClicked(page: number): Promise<void> {
    model.page = page;
    await reloadAsync();
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 p-0 justify-content-center">
            <div class="col col-12">
                <!-- Filter -->
                <MainBlock title="Danh sách nhập hàng" :body-padding="[0, 2, 2, 2]"
                            body-class="row g-3">
                    <template #header>
                        <CreatingRouterLink :to="createRoute" :can-create="model.canCreate">
                            <i class="bi bi-plus-lg"></i>
                            Tạo nhập hàng
                        </CreatingRouterLink>
                    </template>
                    <template #body>
                        <!-- OrderByField -->
                        <div class="col col-lg-4 col-md-6 col-sm-12 col-12">
                            <FormLabel text="Trường sắp xếp" />
                            <SortingByFieldSelectInput v-model="model" />
                        </div>

                        <!-- OrderByAscending -->
                        <div class="col col-lg-4 col-md-6 col-sm-12 col-12">
                            <FormLabel text="Thứ tự" />
                            <SelectInput v-model="model.sortingByAscending">
                                <option :value="true">Từ nhỏ đến lớn</option>
                                <option :value="false">Từ lớn đến nhỏ</option>
                            </SelectInput>
                        </div>
                        
                        <!-- MonthYear -->
                        <div class="col col-lg-4 col-md-12 col-sm-12 col-12">
                            <FormLabel text="Tháng và năm" />
                            <MonthYearSelectInput v-model="model" />
                        </div>
                    </template>
                </MainBlock>

                <!-- Pagination -->
                <div class="col col-12 d-flex justify-content-center"
                        v-if="model.pageCount > 1">
                    <MainPaginator :page="model.page" :page-count="model.pageCount"
                            @page-click="onPageButtonClicked" v-if="model.pageCount > 1" />
                </div>

                <!-- Results -->
                <Results v-model="model.items" />

                <!-- Pagination -->
                <div class="col col-12 d-flex justify-content-center mt-3"
                        v-if="model.pageCount > 1">
                    <MainPaginator :page="model.page" :page-count="model.pageCount"
                            @page-click="onPageButtonClicked" v-if="model.pageCount > 1" />
                </div>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
img.supply-thumbnail {
    width: 55px;
    height: 55px;
    object-fit: cover;
    object-position: 50% 50%;
}

img.user-avatar {
    width: 25px;
    height: 25px;
    object-fit: cover;
    object-position: 50% 50%;
}

.user-fullname {
    text-decoration: none;
}

.user-fullname:hover {
    text-decoration: underline;
}

@media (max-width: 576px) {
    img.supply-thumbnail {
        width: 70px;
        height: 70px;
    }
}
</style>