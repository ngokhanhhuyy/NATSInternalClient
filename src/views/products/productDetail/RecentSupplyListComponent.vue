<script setup lang="ts">
// Interface.
interface Props {
    parentResourceType: "Customer" | "User" | "Product",
    parentResourceId: number;
}

// Imports.
import { reactive } from "vue";
// import type { RouteLocationRaw } from "vue-router";
import { useSupplyService } from "@/services/supplyService";
import type { SupplyListRequestDto } from "@/services/dtos/requestDtos";
import { SupplyListModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import { SelectInput } from "@/components/formInputs";

// Props.
const props = defineProps<Props>();

// Dependencies.
const supplyService = useSupplyService();

// Model.
const model = await initialLoadAsync();

// Functions.
async function initialLoadAsync(): Promise<SupplyListModel> {
    let requestDto: Partial<SupplyListRequestDto> = {
        orderByAscending: false,
        orderByField: "PaidDateTime",
        resultsPerPage: 5
    };

    switch (props.parentResourceType) {
        case "Customer":
            requestDto = {
                customerId: props.parentResourceId,
                ...requestDto
            };
            break;
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
    model.resultsPerPage = 5;
    return reactive(model);
}

// function getSupplyDetailRoute(supplyId: number): RouteLocationRaw {
//     return { name: "supplyDetail", params: { supplyId: supplyId } };
// }
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
                <li class="list-group-item bg-transparent d-flex
                            align-items-center justify-content-center"
                        v-for="supply in model.items" :key="supply.id">
                    {{ supply.id }}
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