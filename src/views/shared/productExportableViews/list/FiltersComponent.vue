<script lang="ts">
interface Props {
    displayName: string;
}
</script>

<script setup lang="ts" generic="TListModel extends OrderListModel | TreatmentListModel">
import type { OrderListModel } from "@/models/orderModels";
import type { TreatmentListModel } from "@/models/treatmentModels";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";
import CreatingRouterLink from "@layouts/CreatingRouterLinkComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";
import SortingByFieldSelectInput from "@forms/SortingByFieldSelectInputComponent.vue";
import MonthYearSelectInput from "@forms/MonthYearSelectInputComponent.vue";

// Props.
const props = defineProps<Props>();

// Model.
const model = defineModel<TListModel>({ required: true });
const blockTitle = `Danh sách ${props.displayName.toLocaleLowerCase()}`;
</script>

<template>
    <MainBlock :title="blockTitle" :body-padding="[0, 2, 2, 2]">
        <template #header>
            <CreatingRouterLink :to="model.createRoute" :can-create="model.canCreate" />
        </template>
        <template #body>
            <div class="row g-3">
                <!-- MonthYear -->
                <div class="col col-lg-4 col-md-12 col-sm-12 col-12">
                    <FormLabel text="Tháng và năm" />
                    <MonthYearSelectInput v-model="model" />
                </div>

                <!-- SortingByField -->
                <div class="col col-lg-4 col-md-6 col-sm-12 col-12">
                    <FormLabel text="Trường sắp xếp" />
                    <SortingByFieldSelectInput v-model="model" />
                </div>

                <!-- SortingByAscending -->
                <div class="col col-lg-4 col-md-6 col-sm-12 col-12">
                    <FormLabel text="Thứ tự sắp xếp" />
                    <SelectInput v-model="model.sortingByAscending">
                        <option :value="false">Từ lớn đến nhỏ</option>
                        <option :value="true">Từ nhỏ đến lớn</option>
                    </SelectInput>
                </div>
            </div>
        </template>
    </MainBlock>
</template>