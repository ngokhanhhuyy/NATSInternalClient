<script setup lang="ts">
import { reactive } from 'vue';
import { useSupplyService } from '@/services/supplyService';
import { SupplyListModel } from "@/models";

// Dependencies.
const supplyService = useSupplyService();

// Model.
const model = await initialLoadAsync();

// Functions.
async function initialLoadAsync(): Promise<SupplyListModel> {
    const responseDto = await supplyService.getListAsync(5);
    const model = new SupplyListModel(responseDto);
    model.resultsPerPage = 5;
    return reactive(model);
}
</script>

<template>
    <MainBlock title="ĐƠN NHẬP HÀNG GẦN NHẤT" color="success"
            class="block-order-list mb-3" body-padding="4">
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
                            align-items-center justify-content-center">
                            
                </li>
            </ul>
            <span class="text-success-emphasis opacity-50" v-else>
                Không có đơn nhập hàng nào chứa sản phẩm này
            </span>
        </template>
    </MainBlock>
</template>