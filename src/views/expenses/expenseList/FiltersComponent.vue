<script setup lang="ts">
import { ExpenseListModel } from "@/models/expenseModels";
// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";
import CreatingRouterLink from "@layouts/CreatingRouterLinkComponent.vue";

// Form components.
import FormLabel from "@/components/formInputs/FormLabelComponent.vue";
import SelectInput from "@/components/formInputs/SelectInputComponent.vue";

// Model.
const model = defineModel<ExpenseListModel>({ required: true });
</script>

<template>
    <MainBlock title="Danh sách chi phí" :body-padding="[0, 2, 2, 2]"
                :close-button="!model.canCreate">
        <template #header v-if="model.canCreate">
            <CreatingRouterLink :to="model.createRoute">
                <i class="bi bi-plus-lg"></i>
                Tạo chi phí
            </CreatingRouterLink>
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
                    <FormLabel text="Trường sắp xếp" />
                    <SelectInput v-model="model.sortingByField">
                        <option value="PaidDateTime">Ngày thanh toán</option>
                        <option value="Amount">Số tiền</option>
                    </SelectInput>
                </div>

                <!-- OrderByAscending -->
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