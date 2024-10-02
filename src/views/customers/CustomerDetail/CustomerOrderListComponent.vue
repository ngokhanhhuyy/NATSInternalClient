<script setup lang="ts">
// Interface
interface Props {
    customerId: number;
}

// Imports.
import { reactive, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useLoadingState } from "@/composables";
import { useOrderService } from "@/services/orderService";
import { OrderBasicModel, OrderListModel } from "@/models";

// Layout component.
import { MainBlock } from "@/views/layouts";

// Props.
const props = defineProps<Props>();

// Dependencies.
const orderService = useOrderService();

// Model and states.
const model = await initialLoadAsync();
const loadingState = useLoadingState();

// Functions.
async function initialLoadAsync(): Promise<OrderListModel> {
    const requestDto = {
        orderByAscending: false,
        customerId: props.customerId,
        resultsPerPage: 5
    };
    const responseDto = await orderService.getListAsync(requestDto);
    const listModel = reactive(new OrderListModel(responseDto));
    listModel.orderByAscending = requestDto.orderByAscending;
    listModel.customerId = requestDto.customerId,
    listModel.resultsPerPage = requestDto.resultsPerPage;
    return listModel;
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await orderService.getListAsync(model.toRequestDto());
    const 
}
</script>

<template>
    <MainBlock title="Đơn bán lẻ" body-padding="0">
        <template #body>
            <ul class="list-group list-group-flush">
                <li class="list-group-item p-0">
                    <div class="row g-3">

                    </div>
                </li>
            </ul>
        </template>
    </MainBlock>
</template>