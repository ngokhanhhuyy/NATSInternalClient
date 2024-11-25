<script lang="ts">
import type { DebtIncurrenceUpsertModel } from "@/models/debtIncurrenceModels";
import type { DebtPaymentUpsertModel } from "@/models/debtPaymentModels";

type DebtUpsertModel = DebtIncurrenceUpsertModel | DebtPaymentUpsertModel;

export interface Props<TUpsertModel extends DebtUpsertModel> {
    type: string;
    displayName: (displayNameGetter: (key: string) => string) => string;
    isForCreating: boolean;
    initializeModelAsync(
        route: ReturnType<typeof useRoute>,
        initialData: ResponseDtos.InitialData): Promise<TUpsertModel>;
    submitAsync(model: Reactive<TUpsertModel>): Promise<void>;
    onSubmissionSucceededAsync(model: Reactive<TUpsertModel>, router: Router): Promise<void>;
    deleteAsync(id: number): Promise<void>;
    onDeletionSucceededAsync(router: Router): Promise<void>;
}
</script>

<script setup lang="ts" generic="TUpsertModel extends DebtUpsertModel">
import { reactive, computed, type Reactive } from "vue";
import { useRoute, useRouter, type Router } from "vue-router";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import MoneyInput from "@forms/MoneyInputComponent.vue";
import StatsDateTimeInput from "@forms/StatsDateTimeInputComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";
import SubmitButton from "@forms/SubmitButtonComponent.vue";
import DeleteButton from "@forms/DeleteButtonComponent.vue";

// Child component.
import CustomerPicker from "@/views/shared/customerPicker/CustomerPickerComponent.vue";

// Props.
const props = defineProps<Props<TUpsertModel>>();

// Dependencies.
const route = useRoute();
const router = useRouter();

// Model and states.
const { initialData, getDisplayName, modelState } = useUpsertViewStates();
const model = reactive(await props.initializeModelAsync(route, initialData));
console.log(model.id);

// Computed property.
const blockTitle = computed<string>(() => {
    if (props.isForCreating) {
        return `Tạo ${props.displayName(getDisplayName)} mới`;
    }

    return `Chỉnh sửa ${props.displayName(getDisplayName)}`;
});

// Functions.
async function triggerSubmitCallbackAsync(): Promise<void> {
    await props.submitAsync(model);
}

async function triggerSubmissionSucceededCallbackAsync(): Promise<void> {
    await props.onSubmissionSucceededAsync(model, router);
}

async function triggerDeleteCallbackAsync(): Promise<void> {
    await props.submitAsync(model);
}

async function triggerDeletionSucceededCallbackAsync(): Promise<void> {
    await props.onDeletionSucceededAsync(router);
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <!-- Resource access -->
            <div class="col col-12" v-if="!props.isForCreating">
                <ResourceAccess :resource-type="type" :resource-primary-id="model.id"
                        access-mode="Update" />
            </div>

            <!-- ModelState errors -->
            <div class="col col-12 text-danger" v-if="!modelState.isValid">
                <div class="bg-white border rounded-3 px-3 py-2">
                    <span v-if="modelState.getAllErrorMessages().length === 1">-</span>&nbsp;
                    <span :key="error" v-for="error in modelState.getAllErrorMessages()">
                        {{ error }}
                    </span><br/>
                </div>
            </div>

            <!-- Consultant information -->
            <div class="col col-12">
                <MainBlock :title="blockTitle" close-button :body-padding="[0, 2, 2, 2]">
                    <template #body>
                        <div class="row g-3">
                            <!-- StatsDateTime -->
                            <div class="col col-md-6 col-12">
                                <FormLabel text="Ngày thống kê" />
                                <StatsDateTimeInput name="statsDateTime"
                                        v-model="model.statsDateTime"
                                        :disabled="!model.canSetStatsDateTime" />
                                <ValidationMessage name="statsDateTime" />
                            </div>

                            <!-- Amount -->
                            <div class="col col-md-6 col-12">
                                <FormLabel text="Số tiền" required />
                                <MoneyInput name="amount" v-model="model.amount"
                                        suffix=" đồng" />
                                <ValidationMessage name="amount" />
                            </div>

                            <!-- Note -->
                            <div class="col col-12">
                                <FormLabel text="Ghi chú" />
                                <TextInput type="textarea" name="note" maxlength="255"
                                        v-model="model.note" placeholder="Ghi chú ..." />
                                <ValidationMessage name="note" />
                            </div>

                            <!-- UpdateReason -->
                            <div class="col col-12" v-if="!props.isForCreating">
                                <FormLabel text="Lý do chỉnh sửa" required />
                                <TextInput type="textarea" name="updatedReason"
                                           v-model="model.updatedReason"
                                           placeholder="Lý do chỉnh sửa" />
                                <ValidationMessage name="updatedReason" />
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Customer picker -->
            <div class="col col-12">
                <CustomerPicker v-model="model.customer" :disabled="!isForCreating" />
            </div>
        </div>

        <!-- Actions button -->
        <div class="row g-3 justify-content-end">
            <!-- Delete button -->
            <div class="col col-auto">
                <DeleteButton :callback="triggerDeleteCallbackAsync"
                        @succeeded="triggerDeletionSucceededCallbackAsync"
                        v-if="model.canDelete" />
            </div>

            <!-- Submit button -->
            <div class="col col-auto">
                <SubmitButton :callback="triggerSubmitCallbackAsync"
                        @succeeded="triggerSubmissionSucceededCallbackAsync" />
            </div>
        </div>
    </MainContainer>
</template>