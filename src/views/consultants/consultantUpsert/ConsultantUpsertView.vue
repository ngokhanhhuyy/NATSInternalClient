<script setup lang="ts">
// Interfaces.
interface Props {
    isForCreating: boolean;
}

// Imports.
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useConsultantService } from "@/services/consultantService";
import { AuthorizationError } from "@/services/exceptions";
import { ConsultantUpsertModel } from "@/models";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, MoneyInput, DateTimeInput, TextInput,
    ValidationMessage, SubmitButton, DeleteButton } from "@/components/formInputs";

// Child component.
import CustomerPickerComponent from "@/views/shared/CustomerPickerComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const consultantService = useConsultantService();

// Model and states.
let consultantId: number;
const model = await initialLoadAsync();
useUpsertViewStates();

// Functions.
async function initialLoadAsync(): Promise<ConsultantUpsertModel> {
    if (props.isForCreating) {
        return reactive(new ConsultantUpsertModel());
    }

    consultantId = parseInt(route.params.consultantId as string);
    const responseDto = await consultantService.getDetailAsync(consultantId);
    if (!responseDto.authorization?.canEdit) {
        throw new AuthorizationError;
    }
    return reactive(new ConsultantUpsertModel(responseDto));
}

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        consultantId = await consultantService.createAsync(model.toRequestDto());
    } else {
        await consultantService.updateAsync(consultantId, model.toRequestDto());
    }
}

async function deleteAsync(): Promise<void> {
    await consultantService.deleteAsync(consultantId);
}

async function onSubmissionSucceeded(): Promise<void> {
    await router.push({ name: "consultantDetail", params: { consultantId: consultantId } });
}

async function onDeletionSucceeded(): Promise<void> {
    await router.push({ name: "consultantList" });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <!-- Consultant information -->
            <div class="col col-12">
                <MainBlock title="Thông tin tư vấn" close-button :body-padding="[2, 2, 3, 2]">
                    <template #body>
                        <div class="row g-3">
                            <!-- PaidDateTime -->
                            <div class="col col-md-6 col-12 mt-xl-0 mt-md-3 mt-3">
                                <FormLabel name="Ngày thanh toán" />
                                <div class="input-group">
                                    <DateTimeInput property-path="paidDateTime"
                                            v-model="model.paidDateTime"
                                            :disabled="!model.paidDateTimeSpecified" />
                                    <button class="btn btn-danger"
                                            @click="model.paidDateTimeSpecified = false"
                                            v-if="model.paidDateTimeSpecified">
                                        <i class="bi bi-x-lg"></i>
                                        <span class="d-sm-inline d-none ms-2">Huỷ</span>
                                    </button>
                                    <button class="btn btn-primary"
                                            @click="model.paidDateTimeSpecified = true"
                                            v-else>
                                        <i class="bi bi-pencil-square"></i>
                                        <span class="d-sm-inline d-none ms-2">Sửa</span>
                                    </button>
                                </div>
                                <ValidationMessage property-path="paidDateTime" />
                            </div>

                            <!-- Amount -->
                            <div class="col col-md-6 col-12">
                                <FormLabel name="Số tiền thanh toán" required />
                                <MoneyInput property-path="amount" v-model="model.amount"
                                        suffix=" đồng" />
                                <ValidationMessage property-path="amount" />
                            </div>

                            <!-- Note -->
                            <div class="col col-12 mt-3">
                                <FormLabel name="Ghi chú" />
                                <TextInput type="textarea" property-path="note" maxlength="255"
                                        v-model="model.note" placeholder="Ghi chú ..." />
                                <ValidationMessage property-path="note" />
                            </div>

                            <!-- UpdateReason -->
                            <div class="col col-12 mt-3" v-if="!props.isForCreating">
                                <FormLabel name="Lý do chỉnh sửa" required />
                                <TextInput type="textarea" property-path="updateReason"
                                        v-model="model.updateReason" placeholder="Lý do chỉnh sửa" />
                                <ValidationMessage property-path="updateReason" />
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Customer picker -->
            <div class="col col-12 mt-3">
                <CustomerPickerComponent v-model="model.customer" />
            </div>
        </div>

        <!-- Actions button -->
        <div class="row g-3 mt-3 justify-content-end">
            <!-- Delete button -->
            <div class="col col-auto">
                <DeleteButton :callback="deleteAsync" @deletion-succeeded="onDeletionSucceeded" />
            </div>

            <!-- Submit button -->
            <div class="col col-auto">
                <SubmitButton :callback="submitAsync" @submission-suceeded="onSubmissionSucceeded" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>

</style>