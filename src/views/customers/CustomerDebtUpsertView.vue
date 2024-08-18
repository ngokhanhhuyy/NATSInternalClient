<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDebtService } from "@/services/debtService";
import { DebtUpsertModel } from "@/models";
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
const debtService = useDebtService();

// Internal states.
let customerId: number;
let debtId: number;

// Functions.
async function initialLoadAsync(): Promise<DebtUpsertModel> {
    if (props.isForCreating) {
        customerId = parseInt(route.params.customerId as string);
        debtId = parseInt(route.params.debtId as string);
        const responseDto = await _
    }
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