<script setup lang="ts">
// Interface.
interface Props {
    parentResourceType: "Customer" | "User" | "Product",
    parentResourceId: number;
}

// Imports.
import { reactive, watch, inject } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useSupplyService } from "@/services/supplyService";
import type { SupplyListRequestDto } from "@/services/dtos/requestDtos";
import { SupplyListModel, SupplyBasicModel } from "@/models";
import type { LoadingState } from "@/composables/viewStatesComposable";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import { SelectInput } from "@/components/formInputs";

// Props.
const props = defineProps<Props>();

// Dependencies.
const supplyService = useSupplyService();
const loadingState = inject<LoadingState>("loadingState")!;

// Model.
const model = await initialLoadAsync();

// Watch.
watch(() => model.resultsPerPage, reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<SupplyListModel> {
    let requestDto: Partial<SupplyListRequestDto> = {
        orderByAscending: false,
        orderByField: "PaidDateTime",
        ignoreMonthYear: true,
        resultsPerPage: 5
    };

    switch (props.parentResourceType) {
        case "User":
            requestDto = {
                userId: props.parentResourceId,
                ...requestDto
            };
            break;
        default:
        case "Product":
            requestDto = {
                productId: props.parentResourceId,
                ...requestDto
            };
            break;
    }

    const responseDto = await supplyService.getListAsync(requestDto);
    const model = new SupplyListModel(responseDto);
    model.ignoreMonthYear = true;
    model.resultsPerPage = 5;

    switch (props.parentResourceType) {
        case "User":
            model.userId = props.parentResourceId;
            break;
        default:
        case "Product":
            model.productId = props.parentResourceId;
            break;
    }

    return reactive(model);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await supplyService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

function getSupplyDetailRoute(supplyId: number): RouteLocationRaw {
    return { name: "supplyDetail", params: { supplyId: supplyId } };
}

function getSupplyIdClass(supply: SupplyBasicModel): string {
    let classNames = [ "fw-bold px-2 py-1 rounded" ];
    if (!supply.isLocked) {
        classNames.push("bg-danger-subtle text-danger");
    } else {
        classNames.push("bg-primary-subtle text-primary");
    }

    return classNames.join(" ");
}
</script>

<template>
    <MainBlock title="ĐƠN NHẬP HÀNG GẦN NHẤT" color="primary"
            class="block-supply-list mb-3" body-padding="0">
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
                        v-for="supply in model.items" :key="supply.id">
                    <div class="row small">
                        <!-- Id -->
                        <div class="col col-1 d-flex justify-content-start align-items-center">
                            <span :class="getSupplyIdClass(supply)">
                                #{{ supply.id }}
                            </span>
                        </div>

                        <!-- PaidDate -->
                        <div class="col col-6 justify-content-center align-items-center
                                    d-xl-flex d-none">
                            <i class="bi bi-calendar-week text-primary me-2"></i>
                            <span>{{ supply.paidDate }}</span>
                        </div>

                        <!-- PaidTime -->
                        <div class="col col-3 justify-content-center align-items-center
                                    d-xl-flex d-none">
                            <i class="bi bi-clock text-primary me-2"></i>
                            <span>{{ supply.paidTime }}</span>
                        </div>

                        <!-- PaidDateTime -->
                        <div class="col col-9 justify-content-center align-items-center
                                    d-xl-none d-flex">
                            <i class="bi bi-calendar-week text-primary me-2"></i>
                            <span class="">{{ supply.paidDateTime }}</span>
                        </div>

                        <!-- Link -->
                        <div class="col col-2 d-flex justify-content-end">
                            <RouterLink class="btn btn-outline-primary btn-sm"
                                    :to="getSupplyDetailRoute(supply.id)">
                                <i class="bi bi-eye"></i>
                            </RouterLink>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="text-success-emphasis text-center opacity-50 p-4" v-else>
                Không có đơn nhập hàng nào chứa sản phẩm này
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.block.block-supply-list .block-header select.form-select:not(:focus) {
    border-color: var(--bs-primary-border-subtle) !important;
}
</style>