<script setup lang="ts">
import { inject } from "vue";
import { RouterLink, type RouteLocationRaw } from "vue-router";
import { useAuthorizationService } from "@/services/authorizationService";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";

// Dependency.
const authorizationService = useAuthorizationService();

// Model.
const model = defineModel<IProductExportableListModel>({ required: true });
const resourceType = inject<"Order" | "Treatment">("resourceType")!;
const resourceDisplayName = inject<string>("resourceDisplayName")!;
const createRoute = computeCreateRoute();
const blockTitle = `Danh sách ${resourceDisplayName.toLocaleLowerCase()}`;

// Functions.
function computeCreateRoute(): RouteLocationRaw {
    if (resourceType === "Order") {
        return { name: "orderCreate" };
    }

    return { name: "home" };
}
</script>

<template>
    <MainBlock :title="blockTitle" :body-padding="[0, 2, 2, 2]"
            :close-button="!authorizationService.canCreateOrder()">
        <template #header v-if="authorizationService.canCreateOrder()">
            <RouterLink :to="createRoute" class="btn btn-primary btn-sm">
                <i class="bi bi-plus-lg"></i>
                Tạo đơn bán lẻ
            </RouterLink>
        </template>
        <template #body>
            <div class="row g-3">
                <!-- MonthYear -->
                <div class="col col-lg-4 col-md-12 col-sm-12 col-12">
                    <FormLabel name="Tháng và năm" />
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
                    <SelectInput v-model="model.orderByField">
                        <option value="StatsDateTime">Ngày thống kê</option>
                        <option value="Amount">Số tiền</option>
                    </SelectInput>
                </div>

                <!-- OrderByAscending -->
                <div class="col col-lg-4 col-md-6 col-sm-12 col-12">
                    <FormLabel name="Thứ tự sắp xếp" />
                    <SelectInput v-model="model.orderByAscending">
                        <option :value="false">Từ lớn đến nhỏ</option>
                        <option :value="true">Từ nhỏ đến lớn</option>
                    </SelectInput>
                </div>
            </div>
        </template>
    </MainBlock>
</template>