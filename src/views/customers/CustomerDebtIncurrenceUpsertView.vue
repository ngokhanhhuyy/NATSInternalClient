<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    useCustomerDebtIncurrenceService } from "@/services/customerDebtIncurrenceService";
import { DebtIncurrenceUpsertModel } from "@/models";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, TextInput, SelectInput, SubmitButton,
    DateInput, ValidationMessage } from "@/components/formInputs";

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const debtIncurrenceService = useCustomerDebtIncurrenceService();

// Internal states.
let customerId: number;
let debtIncurrenceId: number;
const model = await initialLoadAsync();

// Computed properties.
const blockTitle = computed<string>(() => {
    return props.isForCreating ? "Tạo khoản nợ mới" : "Chỉnh sửa khoản nợ";
});

// Functions.
async function initialLoadAsync(): Promise<DebtIncurrenceUpsertModel> {
    if (!props.isForCreating) {
        customerId = parseInt(route.params.customerId as string);
        debtIncurrenceId = parseInt(route.params.debtIncurrenceId as string);
        const responseDto = await debtIncurrenceService
            .getDetailAsync(customerId, debtIncurrenceId);
        return reactive(new DebtIncurrenceUpsertModel(responseDto));
    }

    return reactive(new DebtIncurrenceUpsertModel());
}
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <div class="col col-12">
                <MainBlock :title="blockTitle" close-button
                    body-class="row g-3" :body-padding="[0, 2, 3, 2]">

                </MainBlock>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
</style>