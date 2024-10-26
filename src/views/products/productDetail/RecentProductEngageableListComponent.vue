<script setup lang="ts">
// Interface and type.
interface Props {
    resourceType: "Supply" | "Order" | "Treatment";
    requestDtoInitializer: () => Partial<IProductEngageableListRequestDto>;
}

// Imports.
import { reactive, watch, inject } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useSupplyService } from "@/services/supplyService";
import { useOrderService } from "@/services/orderService";
import { useTreatmentService } from "@/services/treatmentService";
import { SupplyListModel } from "@/models/supplyModels";
import { OrderListModel } from "@/models/orderModels";
import { TreatmentListModel } from "@/models/treatmentModels";
import type { LoadingState } from "@/composables";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import SelectInput from "@/components/formInputs/SelectInputComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const supplyService = useSupplyService();
const orderService = useOrderService();
const treatmentService = useTreatmentService();

// Model and states.
const model: IProductEngageableListModel = await initialLoadAsync();
const loadingState = inject<LoadingState>("loadingState")!;

// Computed properties.
const resourceDisplayName = getResourceDisplayName();
const blockColor = getBlockColor();

// Watch.
watch(() => model.resultsPerPage, reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<IProductEngageableListModel> {
    const requestDto = props.requestDtoInitializer();

    let model: IProductEngageableListModel;
    switch (props.resourceType) {
        case "Supply":
            model = new SupplyListModel(await supplyService.getListAsync(requestDto));
            break;
        case "Order":
            model = new OrderListModel(await orderService.getListAsync(requestDto));
            break;
        case "Treatment":
            model = new TreatmentListModel(await treatmentService.getListAsync(requestDto));
            break;
    }
    model.ignoreMonthYear = true;
    model.resultsPerPage = 5;
    
    return reactive(model);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    let requestDto: IProductEngageableListRequestDto = model.toRequestDto();
    switch (props.resourceType) {
        case "Supply":
            requestDto;
            model.mapFromResponseDto(await supplyService.getListAsync(requestDto));
            break;
        case "Order":
            model.mapFromResponseDto(await orderService.getListAsync(requestDto));
            break;
        case "Treatment":
            model.mapFromResponseDto(await treatmentService.getListAsync(requestDto));
            break;
    }
    const responseDto = await orderService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

function getDetailRoute(id: number): RouteLocationRaw {
    switch (props.resourceType) {
        case "Supply":
            return {
                name: "supplyDetail",
                params: {
                    supplyId: id
                }
            };
        case "Order":
            return {
                name: "orderDetail",
                params: {
                    orderId: id
                }
            };
        case "Treatment":
            return {
                name: "home",
            };
    }
}

function getIdClass(basicModel: IFinancialEngageableBasicModel): string {
    let classNames = [ "fw-bold px-2 py-1 rounded" ];
    if (!basicModel.isLocked) {
        classNames.push("bg-danger-subtle text-danger");
    } else {
        classNames.push("bg-primary-subtle text-primary");
    }

    return classNames.join(" ");
}

function getResourceDisplayName(): string {
    switch (props.resourceType) {
        case "Supply":
            return "Đơn nhập hàng";
        case "Order":
            return "Đơn bán lẻ";
        case "Treatment":
            return "Liệu trình";
    }
}

function getBlockColor(): "primary" | "success" | "danger" {
    switch (props.resourceType) {
        case "Supply":
            return "primary";
        case "Order":
            return "success";
        case "Treatment":
            return "danger";
    }
}
</script>

<template>
    <MainBlock title="ĐƠN HÀNG GẦN NHẤT" :color="blockColor"
            class="block-order-list mb-3" body-padding="0">
        <template #header>
            <SelectInput class="form-select-sm w-auto"
                    v-model="model.resultsPerPage">
                <option value="5" selected>5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </SelectInput>
        </template>
        <template #body>
            <ul class="list-group list-group-flush" v-if="model.items.length">
                <li class="list-group-item bg-transparent px-1"
                        v-for="basicModel in model.items" :key="basicModel.id">
                    <div class="row small">
                        <!-- Id -->
                        <div class="col col-1 d-flex justify-content-start align-items-center">
                            <span :class="getIdClass(basicModel)">
                                #{{ basicModel.id }}
                            </span>
                        </div>

                        <!-- PaidDate -->
                        <div class="col col-6 justify-content-center align-items-center
                                    d-xl-flex d-none">
                            <i class="bi bi-calendar-week text-primary me-2"></i>
                            <span>{{ basicModel.statsDateTime.date }}</span>
                        </div>

                        <!-- StatsTime -->
                        <div class="col col-3 justify-content-center align-items-center
                                    d-xl-flex d-none">
                            <i class="bi bi-clock text-primary me-2"></i>
                            <span>{{ basicModel.statsDateTime.time }}</span>
                        </div>

                        <!-- StatsDateTime -->
                        <div class="col col-9 justify-content-center align-items-center
                                    d-xl-none d-flex">
                            <i class="bi bi-calendar-week text-primary me-2"></i>
                            <span class="">{{ basicModel.statsDateTime.dateTime }}</span>
                        </div>

                        <!-- Link -->
                        <div class="col col-2 d-flex justify-content-end">
                            <RouterLink class="btn btn-outline-primary btn-sm"
                                    :to="getDetailRoute(basicModel.id)">
                                <i class="bi bi-eye"></i>
                            </RouterLink>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="text-success-emphasis text-center opacity-50 p-4" v-else>
                Không có {{ resourceDisplayName.toLowerCase() }} nào chứa sản phẩm này
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.block.block-order-list .block-header select.form-select:not(:focus) {
    border-color: var(--bs-success-border-subtle) !important;
}

.block.block-order-list .block-header select.form-select:focus {
    border-color: var(--bs-success) !important;
    box-shadow: 0 0 0 0.2rem rgba(var(--bs-success-rgb), 0.25) !important;
}
</style>