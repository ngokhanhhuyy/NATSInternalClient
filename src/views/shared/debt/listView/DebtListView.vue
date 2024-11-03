<script lang="ts">
interface Props<
        TListModel extends IDebtListModel,
        TListRequestDto extends IDebtListRequestDto,
        TListResponseDto extends IDebtListResponseDto> {
    resourceDisplayName: string;
    getListAsync(requestDto?: Partial<TListRequestDto>): Promise<TListResponseDto>;
    initializeModel(responseDto: TListResponseDto): TListModel;
    modelToRequestDto(model: Reactive<TListModel>): TListRequestDto;
    // getCreateRoute(): RouteLocationRaw;
    // getUpdateRoute(id: number): RouteLocationRaw;
}
</script>

<script setup lang="ts" generic="
        TListModel extends IDebtListModel,
        TListRequestDto extends IDebtListRequestDto,
        TListResponseDto extends IDebtListResponseDto">
import { reactive, watch , type Reactive } from "vue";
// import type { RouteLocationRaw } from "vue-router";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@/components/formInputs/FormLabelComponent.vue";
import SelectInput from "@/components/formInputs/SelectInputComponent.vue";

// Child component.
import Results from "./DebtListResultsComponent.vue";

// Props.
const props = defineProps<Props<TListModel, TListRequestDto, TListResponseDto>>();

// Model and states.
const model = await initialLoadAsync();
const { loadingState } = useViewStates();

// Watch.
watch(
    () => [
        model.orderByAscending,
        model.orderByField,
        model.monthYear,
    ],
    async () => {
        model.page = 1;
        await reloadAsync();
    });

// Functions.
async function initialLoadAsync(): Promise<Reactive<TListModel>> {
    const responseDto = await props.getListAsync();
    return reactive(props.initializeModel(responseDto));
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await props.getListAsync(props.modelToRequestDto(model));
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <div class="col col-12">
                <MainBlock :title="`Danh sách ${resourceDisplayName}`"
                        :body-padding="[0, 2, 2, 2]" body-class="row g-3">
                    <!-- Header -->
                    <template #header>
                        <button class="btn btn-primary btn-sm">
                            <i class="bi bi-plus-lg me-2"></i>
                            <span>Tạo {{ resourceDisplayName.toLowerCase() }} mới</span>
                        </button>
                    </template>

                    <!-- Body -->
                    <template #body>
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
                            <FormLabel text="Trường sắp xếp" />
                            <SelectInput v-model="model.orderByField">
                                <option value="StatsDateTime">Ngày thống kê</option>
                                <option value="Amount">Số tiền</option>
                            </SelectInput>
                        </div>

                        <!-- OrderByAscending -->
                        <div class="col col-lg-4 col-md-6 col-sm-12 col-12">
                            <FormLabel text="Thứ tự sắp xếp" />
                            <SelectInput v-model="model.orderByAscending">
                                <option :value="false">Từ lớn đến nhỏ</option>
                                <option :value="true">Từ nhỏ đến lớn</option>
                            </SelectInput>
                        </div>
                    </template>
                </MainBlock>
            </div>
        
            <div class="col col-12">
                <Results v-model="model.items" :resource-display-name="resourceDisplayName" />
            </div>
        </div>
    </MainContainer>
</template>