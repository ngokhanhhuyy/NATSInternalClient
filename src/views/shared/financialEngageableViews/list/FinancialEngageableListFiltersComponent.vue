<script lang="ts">
interface Props {
    resourceDisplayName: string;
    getCreateRoute(): RouteLocationRaw;
    getListSortingOptionsAsync(): Promise<ListSortingOptionsResponseDto>;
    getListMonthYearOptionsAsync(): Promise<ListMonthYearOptionsResponseDto>;
    getCreatingPermissionAsync(): Promise<boolean>;
}
</script>

<script setup lang="ts" generic="TListModel extends IFinancialEngageableListModel">
import { ref, onMounted } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { ListSortingOptionsModel } from "@/models/listSortingModels";
import { ListMonthYearOptionsModel } from "@/models/listMonthYearModels";

// Layout component.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";

// Props.
const props = defineProps<Props>();

// Model.
const model = defineModel<TListModel>({ required: true });
const sortingOptions = ref<ListSortingOptionsModel>();
const isSortingOptionsLoading = ref<boolean>(true);
const monthYearOptions = ref<ListMonthYearOptionsModel>();
const isMonthYearOptionsLoading = ref<boolean>(true);
const canCreate = ref<boolean>();

// Life cycle hook.
onMounted(() => {
    loadSortingOptionsAsync();
    loadMonthYearOptionsAsync();
    loadCreatingPermissionAsync();
});

async function loadSortingOptionsAsync(): Promise<void> {
    const sortingOptionsResponseDto = await props.getListSortingOptionsAsync();
    sortingOptions.value = new ListSortingOptionsModel(sortingOptionsResponseDto);
    
    // Determine the default sorting option.
    const sortingDefaultOption = sortingOptions.value.fieldOptions
        ?.find(o => o.name == sortingOptions.value?.defaultFieldName);

    if (sortingDefaultOption) {
        model.value.sortingByField = sortingDefaultOption.name;
        model.value.sortingByAscending = sortingOptions.value.defaultAscending;
    }

    isSortingOptionsLoading.value = false;
}

async function loadMonthYearOptionsAsync(): Promise<void> {
    const monthYearOptionsResponseDto = await props.getListMonthYearOptionsAsync();
    monthYearOptions.value = new ListMonthYearOptionsModel(monthYearOptionsResponseDto);

    // Determine the default month year option.
    const monthYearDefaultOption = monthYearOptions.value.options
        ?.find(o => o.year == monthYearOptions.value?.default?.year &&
            o.month == monthYearOptions.value?.default?.month);

    if (monthYearDefaultOption) {
        model.value.monthYear = monthYearDefaultOption;
    }

    isMonthYearOptionsLoading.value = false;
}

async function loadCreatingPermissionAsync(): Promise<void> {
    canCreate.value = await props.getCreatingPermissionAsync();
}
</script>

<template>
    <MainBlock :title="`Danh sách ${resourceDisplayName.toLocaleLowerCase()}`"
                :body-padding="[0, 2, 2, 2]" :close-button="!canCreate">
        <template #header v-if="canCreate">
            <RouterLink :to="getCreateRoute()" class="btn btn-primary btn-sm">
                <i class="bi bi-plus-lg"></i>
                Tạo tư vấn
            </RouterLink>
        </template>
        <template #body>
            <div class="row g-3">
                <!-- MonthYear -->
                <div class="col col-lg-4 col-md-12 col-sm-12 col-12">
                    <FormLabel name="Tháng và năm" />
                    <SelectInput v-model="model.monthYear">
                        <option :value="undefined" v-if="isMonthYearOptionsLoading">
                            Đang tải dữ liệu ...
                        </option>
                        <template v-else>
                            <option :value="undefined">Tất cả</option>
                            <template v-if="monthYearOptions?.options">
                                <option :value="option" :key="index"
                                        v-for="(option, index) in monthYearOptions.options">
                                    Tháng {{ option.month }}, {{ option.year }}
                                </option>
                            </template>
                        </template>
                    </SelectInput>
                </div>

                <!-- OrderByField -->
                <div class="col col-lg-4 col-md-6 col-sm-12 col-12">
                    <FormLabel name="Trường sắp xếp" />
                    <SelectInput v-model="model.sortingByField"
                            :disabled="!model.sortingByField">
                        <option :value="undefined" v-if="isSortingOptionsLoading">
                            Đang tải dữ liệu ...
                        </option>
                        <template v-if="sortingOptions?.fieldOptions">
                            <option :value="option.name" :key="index"
                                    v-for="(option, index) in sortingOptions.fieldOptions">
                                {{ option.displayName }}
                            </option>
                        </template>
                    </SelectInput>
                </div>

                <!-- OrderByAscending -->
                <div class="col col-lg-4 col-md-6 col-sm-12 col-12">
                    <FormLabel name="Thứ tự sắp xếp" />
                    <SelectInput v-model="model.sortingByAscending">
                        <option :value="undefined" v-if="isSortingOptionsLoading"></option>
                        <template v-else>
                            <option :value="false">Từ lớn đến nhỏ</option>
                            <option :value="true">Từ nhỏ đến lớn</option>
                        </template>
                    </SelectInput>
                </div>
            </div>
        </template>
    </MainBlock>
</template>