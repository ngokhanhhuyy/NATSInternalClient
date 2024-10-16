<script setup lang="ts">
// Interfaces.
interface Props {
    isForCreating: boolean;
}

// Imports.
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useExpenseService } from "@/services/expenseService";
import { AuthorizationError } from "@/services/exceptions";
import { ExpenseUpsertModel } from "@/models";
import { useUpsertViewStates } from "@/composables";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, MoneyInput, DateTimeInput, TextInput, SelectInput,
    ValidationMessage, SubmitButton } from "@/components/formInputs";
import { ExpenseCategory } from "@/services/dtos/enums";

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const expenseService = useExpenseService();

// Model and states.
let expenseId: number;
const model = await initialLoadAsync();
useUpsertViewStates();

// Computed properties
const blockTitle = computed<string>(() => {
    if (props.isForCreating) {
        return "Tạo chi phí mới";
    }
    return "Chỉnh sửa chi phí";
});

// Functions.
async function initialLoadAsync(): Promise<ExpenseUpsertModel> {
    if (props.isForCreating) {
        return reactive(new ExpenseUpsertModel());
    }

    expenseId = parseInt(route.params.expenseId as string);
    const responseDto = await expenseService.getDetailAsync(expenseId);
    if (!responseDto.authorization?.canEdit) {
        throw new AuthorizationError;
    }
    return reactive(new ExpenseUpsertModel(responseDto));
}

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        expenseId = await expenseService.createAsync(model.toRequestDto());
    } else {
        await expenseService.updateAsync(expenseId, model.toRequestDto());
    }
}

async function onSubmissionSucceeded(): Promise<void> {
    await router.push({ name: "expenseDetail", params: { expenseId: expenseId } });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <!-- Expense detail -->
            <div class="col col-12">
                <MainBlock :title="blockTitle" close-button :body-padding="[2, 2, 3, 2]">
                    <template #body>
                        <div class="row g-3">
                            <!-- Amount -->
                            <div class="col col-xl-3 col-md-6 col-12">
                                <FormLabel name="Số tiền thanh toán" required />
                                <MoneyInput property-path="amount" v-model="model.amount"
                                        suffix=" đồng" />
                                <ValidationMessage property-path="amount" />
                            </div>

                            <!-- Category -->
                            <div class="col col-xl-3 col-md-6 col-12 mt-xl-0 mt-md-0 mt-sm-3 mt-3">
                                <FormLabel name="Phân loại" required />
                                <SelectInput property-path="category" v-model="model.category">
                                    <option :value="ExpenseCategory.Equipment">Trang thiết bị</option>
                                    <option :value="ExpenseCategory.Office">Thuê mặt bằng</option>
                                    <option :value="ExpenseCategory.Staff">Lương/thưởng</option>
                                    <option :value="ExpenseCategory.Utilities">Tiện ích</option>
                                </SelectInput>
                                <ValidationMessage property-path="category" />
                            </div>

                            <!-- PayeeName -->
                            <div class="col col-xl-3 col-md-6 col-12 mt-xl-0 mt-md-3 mt-3">
                                <FormLabel name="Tên người/tổ chức nhận" required />
                                <TextInput property-path="payeeName" v-model="model.payeeName"
                                        placeholder="Công ty TNHH ABC" maxlength="100" />
                                <ValidationMessage property-path="payeeName" />
                            </div>

                            <!-- PaidDateTime -->
                            <div class="col col-xl-3 col-md-6 col-12 mt-xl-0 mt-md-3 mt-3">
                                <FormLabel name="Ngày thanh toán" />
                                <DateTimeInput property-path="paidDateTime"
                                        v-model="model.statsDateTime" />
                                <ValidationMessage property-path="paidDateTime" />
                            </div>

                            <!-- Note -->
                            <div class="col col-12 mt-3">
                                <FormLabel name="Ghi chú" />
                                <TextInput type="textarea" property-path="note" maxlength="255"
                                        v-model="model.note" placeholder="Ghi chú ..." />
                                <ValidationMessage property-path="note" />
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <div class="col col-auto mt-3">
                <SubmitButton :callback="submitAsync" @submission-suceeded="onSubmissionSucceeded" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>

</style>