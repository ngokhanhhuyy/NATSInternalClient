<script setup lang="ts">
// Interface.
interface Props {
    parentResourceType: "Customer" | "User" | "Product",
    parentResourceId: number;
}

// Imports.
import { reactive } from 'vue';
import { useTreatmentService } from '@/services/treatmentService';
import { TreatmentListModel } from "@/models";
import type { TreatmentListRequestDto } from '@/services/dtos/requestDtos';

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import { SelectInput } from "@/components/formInputs";

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
        ignoreMonthYear: true,
        resultsPerPage: 5,
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
                customerId: props.parentResourceId,
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
    
    const responseDto = await treatmentService.getListAsync(requestDto);
    const model = new TreatmentListModel(responseDto);
    model.ignoreMonthYear = true;
    model.resultsPerPage = 5;
    return reactive(model);
}
</script>

<template>
    <MainBlock title="LIỆU TRÌNH GẦN NHẤT" color="danger"
            class="block-treatment-list mb-3" body-padding="0">
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
                        v-for="treatment in model.items" :key="treatment.id">
                    {{ treatment.id }}
                </li>
            </ul>
            <div class="text-success-emphasis text-center opacity-50 p-4" v-else>
                Không có liệu trình nào chứa sản phẩm này
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.block.block-treatment-list .block-header select.form-select:not(:focus) {
    border-color: var(--bs-danger-border-subtle) !important;
}

.block.block-treatment-list .block-header select.form-select:focus {
    border-color: var(--bs-danger) !important;
    box-shadow: 0 0 0 0.2rem rgba(var(--bs-danger-rgb), 0.25) !important;
}
</style>