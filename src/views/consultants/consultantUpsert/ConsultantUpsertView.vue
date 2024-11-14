<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useConsultantService } from "@/services/consultantService";
import { ConsultantUpsertModel } from "@/models/consultantModels";
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
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const service = useConsultantService();

// Model and states.
const { initialData, AuthorizationError } = useUpsertViewStates();
const model = reactive(await initialLoadAsync());

// Functions.
async function initialLoadAsync(): Promise<ConsultantUpsertModel> {
    if (props.isForCreating) {
        const authorizationResponseDto = initialData.consultant.creatingAuthorization;
        if (!authorizationResponseDto) {
            throw new AuthorizationError();
        }

        return new ConsultantUpsertModel(authorizationResponseDto.canSetStatsDateTime);
    }

    const consultantId = parseInt(route.params.consultantId as string);
    const responseDto = await service.getDetailAsync(consultantId);
    if (!responseDto.authorization?.canEdit) {
        throw new AuthorizationError;
    }
    
    return new ConsultantUpsertModel(responseDto);
}

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        model.id = await service.createAsync(model.toRequestDto());
    } else {
        await service.updateAsync(model.id, model.toRequestDto());
    }
}

async function deleteAsync(): Promise<void> {
    await service.deleteAsync(model.id);
}

async function onSubmissionSucceeded(): Promise<void> {
    await router.push({ name: "consultantDetail", params: { consultantId: model.id } });
}

async function onDeletionSucceeded(): Promise<void> {
    await router.push({ name: "consultantList" });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <!-- Resource access -->
            <div class="col col-12" v-if="!props.isForCreating">
                <ResourceAccess resource-type="Consultant" :resource-primary-id="model.id"
                        access-mode="Update" />
            </div>

            <!-- Consultant information -->
            <div class="col col-12">
                <MainBlock title="Thông tin tư vấn" close-button :body-padding="[0, 2, 2, 2]">
                    <template #body>
                        <div class="row g-3">
                            <!-- StatsDateTime -->
                            <div class="col col-md-6 col-12">
                                <FormLabel text="Ngày thanh toán" />
                                <StatsDateTimeInput name="statsDateTime"
                                        v-model="model.statsDateTime"
                                        v-if="model.canSetStatsDateTime" />
                                <ValidationMessage name="paidDateTime" />
                            </div>

                            <!-- Amount -->
                            <div class="col col-md-6 col-12">
                                <FormLabel text="Số tiền thanh toán" required />
                                <MoneyInput name="amount" v-model="model.amountBeforeVat"
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
                                <TextInput type="textarea" name="updateReason"
                                           v-model="model.updatedReason"
                                           placeholder="Lý do chỉnh sửa" />
                                <ValidationMessage name="updateReason" />
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Customer picker -->
            <div class="col col-12">
                <CustomerPicker v-model="model.customer" />
            </div>
        </div>

        <!-- Actions button -->
        <div class="row g-3 justify-content-end">
            <!-- Delete button -->
            <div class="col col-auto">
                <DeleteButton :callback="deleteAsync" v-if="model.canDelete"
                        @deletion-succeeded="onDeletionSucceeded" />
            </div>

            <!-- Submit button -->
            <div class="col col-auto">
                <SubmitButton :callback="submitAsync"
                        @submission-suceeded="onSubmissionSucceeded" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>

</style>