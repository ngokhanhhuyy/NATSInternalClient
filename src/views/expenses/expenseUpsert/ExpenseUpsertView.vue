<script setup lang="ts">
// Interfaces.
interface Props {
    isForCreating: boolean;
}

// Imports.
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useExpenseService } from "@/services/expenseService";
import { ExpenseCategory } from "@enums";
import { ExpenseUpsertModel } from "@/models/expenseModels";
import { AuthorizationError } from "@/services/exceptions";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import MoneyInput from "@forms/MoneyInputComponent.vue";
import DateTimeInput from "@forms/DateTimeInputComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";
import SubmitButton from "@forms/SubmitButtonComponent.vue";
import DeleteButton from "@forms/DeleteButtonComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";

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

const defaultStatsDateTimeDisplayText = computed<string>(() => {
    if (props.isForCreating && !model.statsDateTimeSpecified) {
        return "Hiện tại";
    }

    return model.statsDateTime.displayText ?? "Để trống";
});

const deleteButtonVisible = computed<boolean>(() => {
    return !props.isForCreating && !!model.authorization?.canDelete;
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

async function deleteAsync(): Promise<void> {
    await expenseService.deleteAsync(model.id);
}

async function onDeletionSucceeded(): Promise<void> {
    await router.push({ name: "expenseList" });
}

async function onSubmissionSucceeded(): Promise<void> {
    await router.push({ name: "expenseDetail", params: { expenseId: expenseId } });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <!-- ResourceAccess -->
            <div class="col col-12">
                <ResourceAccess resource-type="Expense" :resource-primary-id="model.id"
                        accessMode="Update" />
            </div>

            <!-- Expense detail -->
            <div class="col col-12">
                <MainBlock :title="blockTitle" close-button :body-padding="[0, 2, 2, 2]">
                    <template #body>
                        <div class="row g-3">
                            <!-- Amount -->
                            <div class="col col-xxl-4 col-md-6 col-12">
                                <FormLabel name="Số tiền thanh toán" required />
                                <MoneyInput property-path="amount" v-model="model.amount"
                                        suffix=" đồng" />
                                <ValidationMessage property-path="amount" />
                            </div>

                            <!-- Category -->
                            <div class="col col-xxl-4 col-md-6 col-12">
                                <FormLabel name="Phân loại" required />
                                <SelectInput property-path="category" v-model="model.category">
                                    <option :value="ExpenseCategory.Equipment">
                                        Trang thiết bị
                                    </option>
                                    <option :value="ExpenseCategory.Office">
                                        Thuê mặt bằng
                                    </option>
                                    <option :value="ExpenseCategory.Staff">
                                        Lương/thưởng
                                    </option>
                                    <option :value="ExpenseCategory.Utilities">
                                        Tiện ích
                                    </option>
                                </SelectInput>
                                <ValidationMessage property-path="category" />
                            </div>

                            <!-- PayeeName -->
                            <div class="col col-xxl-4 col-md-6 col-12">
                                <FormLabel name="Tên người/tổ chức nhận" required />
                                <TextInput property-path="payeeName" v-model="model.payeeName"
                                        placeholder="Công ty TNHH ABC" maxlength="100" />
                                <ValidationMessage property-path="payeeName" />
                            </div>

                            <!-- StatsDateTime -->
                            <div class="col col-12">
                                <FormLabel name="Ngày thanh toán" />
                                <div class="input-group" v-if="model.statsDateTimeSpecified">
                                    <DateTimeInput property-path="statsDateTime"
                                            class="border-end-0"
                                            v-model="model.statsDateTime" />
                                    <button class="btn btn-outline-danger"
                                            @click="model.statsDateTimeSpecified = false">
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <div class="input-group" v-else>
                                    <input class="form-control" disabled
                                            :value="defaultStatsDateTimeDisplayText">
                                    <button class="btn btn-outline-primary"
                                            @click="model.statsDateTimeSpecified = true">
                                        <i class="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                                <ValidationMessage property-path="statsDateTime" />
                            </div>

                            <!-- Note -->
                            <div class="col col-12">
                                <FormLabel name="Ghi chú" />
                                <TextInput type="textarea" property-path="note"
                                        maxlength="255" placeholder="Ghi chú ..."
                                        v-model="model.note"  />
                                <ValidationMessage property-path="note" />
                            </div>

                            <!-- Note -->
                            <div class="col col-12" v-if="!isForCreating">
                                <FormLabel name="Lý do chỉnh sửa" required />
                                <TextInput type="textarea" property-path="updatedReason"
                                        maxlength="255" placeholder="Lý do chỉnh sửa ..."
                                        v-model="model.updatedReason"  />
                                <ValidationMessage property-path="updatedReason" />
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Action buttons -->
            <div class="col col-auto" v-if="deleteButtonVisible">
                <DeleteButton :callback="deleteAsync"
                        @deletion-succeeded="onDeletionSucceeded" />
            </div>

            <div class="col col-auto">
                <SubmitButton :callback="submitAsync"
                        @submission-suceeded="onSubmissionSucceeded" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
textarea {
    min-height: 150px;
}
</style>