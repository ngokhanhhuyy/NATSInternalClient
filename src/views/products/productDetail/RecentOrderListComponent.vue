<script setup lang="ts">
// Interface.
interface Props {
    parentResourceType: "Customer" | "User" | "Product",
    parentResourceId: number;
}

// Imports.
import { reactive } from 'vue';
import { useOrderService } from '@/services/orderService';
import type { OrderListRequestDto } from '@/services/dtos/requestDtos';
import { OrderListModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import { SelectInput } from "@/components/formInputs";

// Props.
const props = defineProps<Props>();

// Dependencies.
const orderService = useOrderService();

// Model.
const model = await initialLoadAsync();

// Functions.
async function initialLoadAsync(): Promise<OrderListModel> {
    let requestDto: Partial<OrderListRequestDto> = {
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
    
    const responseDto = await orderService.getListAsync(requestDto);
    const model = new OrderListModel(responseDto);
    model.resultsPerPage = 5;
    return reactive(model);
}
</script>

<template>
    <MainBlock title="ĐƠN HÀNG GẦN NHẤT" color="success"
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
                <li class="list-group-item bg-transparent d-flex
                            align-items-center justify-content-center"
                        v-for="order in model.items" :key="order.id">
                    {{ order.id }}
                </li>
            </ul>
            <div class="text-success-emphasis text-center opacity-50 p-4" v-else>
                Không có đơn hàng nào chứa sản phẩm này
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