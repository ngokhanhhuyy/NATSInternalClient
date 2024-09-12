<script setup lang="ts">
// Interface.
interface Props {
    ownerType: "Customer" | "User" | "Product",
    ownerId: number;
}

// Imports.
import { reactive } from 'vue';
import { useTreatmentService } from '@/services/treatmentService';
import { TreatmentListModel } from "@/models";
import type { TreatmentListRequestDto } from '@/services/dtos/requestDtos';

// Props.
const props = defineProps<Props>();

// Dependencies.
const treatmentService = useTreatmentService();

// Model.
const model = await initialLoadAsync();

// Functions.
async function initialLoadAsync(): Promise<TreatmentListModel> {
    let requestDto: Partial<TreatmentListRequestDto> = {
        orderByAscending: false,
        orderByField: "PaidDateTime",
        resultsPerPage: 5,
    };

    switch (props.ownerType) {
        case "Customer":
            requestDto = {
                customerId: props.ownerId,
                ...requestDto
            };
            break;
        case "User":
            requestDto = {
                customerId: props.ownerId,
                ...requestDto
            };
            break;
        default:
        case "Product":
            requestDto = {
                productId: props.ownerId,
                ...requestDto
            };
            break;
    }
    
    const responseDto = await treatmentService.getListAsync(requestDto);
    const model = new TreatmentListModel(responseDto);
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