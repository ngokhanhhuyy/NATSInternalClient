<script setup lang="ts">
import { reactive, computed, watch, defineAsyncComponent } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useViewStates } from "@/composables/viewStatesComposable";
import { useAuthorizationService } from "@/services/authorizationService";
import { useConsultantService } from "@/services/consultantService";
import { ConsultantListModel } from "@/models/consultantModels";

// Layout components.
const MainContainer = defineAsyncComponent(() =>
    import("@layouts/MainContainerComponent.vue"));
const MainBlock = defineAsyncComponent(() => import("@layouts/MainBlockComponent.vue"));
const MainPaginator = defineAsyncComponent(() =>
    import("@layouts/MainPaginatorComponent.vue"));

// Form components.
const FormLabel = defineAsyncComponent(() => import("@forms/FormLabelComponent.vue"));
const SelectInput = defineAsyncComponent(() => import("@forms/SelectInputComponent.vue"));

// Child components.
const ConsultantListResults = defineAsyncComponent(() =>
    import("./ConsultantListResultsComponent.vue"));

// Dependencies.
const authorizationService = useAuthorizationService();
const consultantService = useConsultantService();

// Model and states.
const model = await initialLoadAsync();
const { loadingState } = useViewStates();
const createRoute: RouteLocationRaw = { name: "consultantCreate" };

// Computed properties.
const paginatorVisible = computed<boolean>(() => model.page > 1);

// Watch.
watch(
    () => [
        model.sortingByAscending,
        model.sortingByField,
        model.monthYear,
        model.page,
        model.resultsPerPage
    ], reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<ConsultantListModel> {
    const responseDto = await consultantService.getListAsync();
    return reactive(new ConsultantListModel(responseDto));
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await consultantService.getListAsync(model.toRequestDto());
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
                <MainBlock title="Danh sách tư vấn" :body-padding="[0, 2, 2, 2]"
                            :close-button="!authorizationService.canCreateConsultant()">
                    <template #header v-if="authorizationService.canCreateConsultant()">
                        <RouterLink :to="createRoute" class="btn btn-primary btn-sm">
                            <i class="bi bi-plus-lg"></i>
                            Tạo tư vấn
                        </RouterLink>
                    </template>
                    <template #body>
                        <div class="row g-3">
                            <!-- MonthYear -->
                            <div class="col col-lg-4 col-md-12 col-sm-12 col-12">
                                <FormLabel text="Tháng và năm" />
                                <SelectInput v-model="model.monthYear">
                                    <option :value="option" :key="index"
                                            v-for="(option, index) in model.monthYearOptions">
                                        Tháng {{ option.month }}, {{ option.year }}
                                    </option>
                                </SelectInput>
                            </div>

                            <!-- OrderByField -->
                            <div class="col col-lg-4 col-md-6 col-sm-12 col-12">
                                <FormLabel name="Trường sắp xếp" />
                                <SelectInput v-model="model.sortingByField">
                                    <option value="StatsDateTime">Ngày thống kê</option>
                                    <option value="Amount">Số tiền</option>
                                </SelectInput>
                            </div>

                            <!-- OrderByAscending -->
                            <div class="col col-lg-4 col-md-6 col-sm-12 col-12">
                                <FormLabel name="Thứ tự sắp xếp" />
                                <SelectInput v-model="model.sortingByAscending">
                                    <option :value="false">Từ lớn đến nhỏ</option>
                                    <option :value="true">Từ nhỏ đến lớn</option>
                                </SelectInput>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Top pagination -->
            <div class="col col-12 d-flex justify-content-center" v-if="paginatorVisible">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>

            <!-- Results -->
            <div class="col col-12">
                <ConsultantListResults v-model="model.items" />
            </div>

            <!-- Bottom pagination -->
            <div class="col col-12 d-flex justify-content-center" v-if="paginatorVisible">
                <MainPaginator :page="model.page" :page-count="model.pageCount"
                        @page-click="onPageButtonClicked" />
            </div>
        </div>
    </MainContainer>
</template>