<script lang="ts">
interface Props {
    isForCreating: boolean;
}

type InitialLoadResult = [CustomerBasicModel, DebtIncurrenceUpsertModel];
</script>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, type RouteLocationRaw } from "vue-router";
import { useCustomerService } from "@/services/customerService";
import { useDebtIncurrenceService } from "@/services/debtIncurrenceService";
import { CustomerBasicModel } from "@/models/customerModels";
import { DebtIncurrenceUpsertModel } from "@/models/debtIncurrenceModels";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@/views/layouts/MainContainerComponent.vue";
import MainBlock from "@/views/layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import MoneyInput from "@forms/MoneyInputComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import DateTimeInput from "@forms/DateTimeInputComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";

// Child components.
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const customerService = useCustomerService();
const debtIncurrenceService = useDebtIncurrenceService();

// Internal states.
const customerId: number = parseInt(route.params.customerId as string);
let debtIncurrenceId: number;
const [customerModel, debtIncurrenceModel] = await initialLoadAsync();
useUpsertViewStates();

// Computed properties.
const blockTitle = computed<string>(() => {
    return props.isForCreating ? "Tạo khoản ghi nợ mới" : "Chỉnh sửa khoản ghi nợ";
});

const customerDetailRoute = computed<RouteLocationRaw>(() => {
    return {
        name: "customerDetail",
        params: {
            customerId: customerId
        }
    };
});

// Functions.
async function initialLoadAsync(): Promise<InitialLoadResult> {
    if (!props.isForCreating) {
        debtIncurrenceId = parseInt(route.params.debtIncurrenceId as string);
        const [customerResponseDto, debtIncurrenceResponseDto] = await Promise.all([
            customerService.getBasicAsync(customerId),
            debtIncurrenceService.getDetailAsync(debtIncurrenceId)
        ]);
        return [
            reactive(new CustomerBasicModel(customerResponseDto)),
            reactive(new DebtIncurrenceUpsertModel(debtIncurrenceResponseDto))];
    }

    const customerResponseDto = await customerService.getBasicAsync(customerId);
    return [
        reactive(new CustomerBasicModel(customerResponseDto)),
        reactive(new DebtIncurrenceUpsertModel())];
}
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <!-- Resource Access -->
            <div class="col col-12" v-if="!props.isForCreating">
                <ResourceAccess resource-type="CustomerDebtIncurrence"
                        :resource-primary-id="customerId"
                        :resource-secondary-id="debtIncurrenceId"
                        access-mode="Update" />
            </div>

            <div class="col col-12">
                <MainBlock :title="blockTitle" close-button
                        body-class="row g-3" :body-padding="[2, 2, 3, 2]">
                    <template #body>
                        <!-- Customer -->
                        <div class="col col-12">
                            <FormLabel text="Khách hàng" />
                            <RouterLink :to="customerDetailRoute"
                                    class="d-flex justify-content-start align-items-center">
                                <img :src="customerModel.avatarUrl"
                                        class="img-thumbnail rounded-circle customer-avatar">
                                <span class="fw-bold ms-2">
                                    {{ customerModel.fullName }}
                                </span>
                            </RouterLink>
                        </div>

                        <!-- Amount -->
                        <div class="col col-lg-6 col-12 mt-3">
                            <FormLabel text="Số tiền" required />
                            <MoneyInput name="amount" :min="0" suffix=" đ"
                                    v-model="debtIncurrenceModel.amount" />
                            <ValidationMessage name="amount" />
                        </div>
                        
                        <!-- IncurredDateTime -->
                        <div class="col col-lg-6 col-12 mt-3">
                            <FormLabel text="Thời điểm ghi nợ" />
                            <DateTimeInput name="incurredDateTime"
                                    v-model="debtIncurrenceModel.statsDateTime" />
                            <ValidationMessage name="incurredDateTime" /> 
                        </div>

                        <!-- Note -->
                        <div class="col col-12 mt-3">
                            <FormLabel text="Ghi chú" />
                            <TextInput type="textarea" name="note" maxlength="255"
                                    placeholder="Ghi chú ..."
                                    v-model="debtIncurrenceModel.note" />
                            <ValidationMessage name="note" />
                        </div>

                        <!-- UpdatingReason -->
                        <div class="col col-12 mt-3" v-if="!props.isForCreating">
                            <FormLabel text="Lý do chỉnh sửa" />
                            <TextInput type="textarea" name="updatingReason"
                                    maxlength="255" placeholder="Lý do chỉnh sửa ..."
                                    v-model="debtIncurrenceModel.updatedReason" />
                            <ValidationMessage name="updatingReason" />
                        </div>
                    </template>
                </MainBlock>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
.customer-avatar {
    width: 40px;
    height: 40px;
    aspect-ratio: 1;
}
</style>