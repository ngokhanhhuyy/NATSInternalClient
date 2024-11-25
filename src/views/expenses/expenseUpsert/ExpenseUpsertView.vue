<script setup lang="ts">
// Interfaces.
interface Props {
    isForCreating: boolean;
}

// Imports.
import { reactive, computed, type Reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useExpenseService } from "@/services/expenseService";
import { ExpenseCategory } from "@enums";
import { ExpenseUpsertModel } from "@/models/expenseModels";
import { AuthorizationError } from "@/errors";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import MoneyInput from "@forms/MoneyInputComponent.vue";
import StatsDateTimeInput from "@forms/StatsDateTimeInputComponent.vue";
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
const { initialData } = useUpsertViewStates();
const model = await initialLoadAsync();

// Computed properties
const blockTitle = computed<string>(() => {
    if (props.isForCreating) {
        return "Tạo chi phí mới";
    }
    return "Chỉnh sửa chi phí";
});

const deleteButtonVisible = computed<boolean>(() => {
    return !props.isForCreating && !!model.canDelete;
});

// Functions.
async function initialLoadAsync(): Promise<Reactive<ExpenseUpsertModel>> {
    if (props.isForCreating) {
        const { canSetStatsDateTime } = initialData.expense.creatingAuthorization;
        reactive(new ExpenseUpsertModel(canSetStatsDateTime, false));
    }

    const expenseId = parseInt(route.params.expenseId as string);
    const responseDto = await expenseService.getDetailAsync(expenseId);
    if (!responseDto.authorization.canEdit) {
        throw new AuthorizationError;
    }

    return reactive(new ExpenseUpsertModel(responseDto));
}

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        await expenseService.createAsync(model.toRequestDto());
    } else {
        await expenseService.updateAsync(model.id, model.toRequestDto());
    }
}

async function deleteAsync(): Promise<void> {
    await expenseService.deleteAsync(model.id);
}

async function onDeletionSucceeded(): Promise<void> {
    await router.push({ name: "expenseList" });
}

async function onSubmissionSucceeded(): Promise<void> {
    await router.push({ name: "expenseDetail", params: { expenseId: model.id } });
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
                    <div class="row g-3">
                        <!-- Amount -->
                        <div class="col col-xxl-4 col-md-6 col-12">
                            <FormLabel text="Số tiền thanh toán" required />
                            <MoneyInput name="amount" v-model="model.amount"
                                    suffix=" đồng" />
                            <ValidationMessage name="amount" />
                        </div>

                        <!-- Category -->
                        <div class="col col-xxl-4 col-md-6 col-12">
                            <FormLabel text="Phân loại" required />
                            <SelectInput name="category" v-model="model.category">
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
                            <ValidationMessage name="category" />
                        </div>

                        <!-- PayeeName -->
                        <div class="col col-xxl-4 col-md-6 col-12">
                            <FormLabel text="Tên người/tổ chức nhận" required />
                            <TextInput name="payeeName" v-model="model.payeeName"
                                    placeholder="Công ty TNHH ABC" maxlength="100" />
                            <ValidationMessage name="payeeName" />
                        </div>

                        <!-- StatsDateTime -->
                        <div class="col col-12" v-if="model.canSetStatsDateTime">
                            <FormLabel text="Ngày thanh toán" />
                            <StatsDateTimeInput name="statsDateTime"
                                    v-model="model.statsDateTime" />
                            <ValidationMessage name="statsDateTime" />
                        </div>

                        <!-- Note -->
                        <div class="col col-12">
                            <FormLabel text="Ghi chú" />
                            <TextInput type="textarea" name="note"
                                    maxlength="255" placeholder="Ghi chú ..."
                                    v-model="model.note"  />
                            <ValidationMessage name="note" />
                        </div>

                        <!-- Note -->
                        <div class="col col-12" v-if="!isForCreating">
                            <FormLabel text="Lý do chỉnh sửa" required />
                            <TextInput type="textarea" name="updatedReason"
                                    maxlength="255" placeholder="Lý do chỉnh sửa ..."
                                    v-model="model.updatedReason"  />
                            <ValidationMessage name="updatedReason" />
                        </div>
                    </div>
                </MainBlock>
            </div>

            <!-- Action buttons -->
            <div class="col col-auto" v-if="deleteButtonVisible">
                <DeleteButton :callback="deleteAsync"
                        @succeeded="onDeletionSucceeded" />
            </div>

            <div class="col col-auto">
                <SubmitButton :callback="submitAsync"
                        @succeeded="onSubmissionSucceeded" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
textarea {
    min-height: 150px;
}
</style>