<script setup lang="ts">
// Interfaces and types.
interface Props { isForCreating: boolean };

// Imports.
import { ref, reactive, onMounted, provide, type Reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSupplyService } from "@/services/supplyService";
import { useAuthorizationService } from "@/services/authorizationService";
import { SupplyUpsertModel } from "@/models/supplyModels";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import StatsDateTimeInput from "@forms/StatsDateTimeInputComponent.vue";
import MoneyInput from "@forms/MoneyInputComponent.vue";
import SubmitButton from "@forms/SubmitButtonComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";

// Child components.
import ProductPicker from "./productPicker/ProductPickerComponent.vue";
import SupplyItemList from "./SupplyItemListComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const service = useSupplyService();
const authorizationService = useAuthorizationService();

// Model and states.
const model = await initialLoadAsync();
const isInitialLoad = ref<boolean>(true);
useUpsertViewStates();

// Life cycle hooks.
onMounted(() => isInitialLoad.value = false);

// Provide.
provide("isInitialLoad", isInitialLoad);

// Functions.
async function initialLoadAsync(): Promise<Reactive<SupplyUpsertModel>> {
    if (props.isForCreating) {
        const canSetStatsDateTime = authorizationService.canSetSupplyStatsDateTime();
        return reactive(new SupplyUpsertModel(canSetStatsDateTime));
    }

    const supplyId = parseInt(route.params.supplyId as string);
    const responseDto = await service.getDetailAsync(supplyId);
    if (!responseDto.authorization.canEdit) {
        router.back();
    }

    return reactive(new SupplyUpsertModel(responseDto));
}

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        model.id = await service.createAsync(model.toRequestDto());
    } else {
        await service.updateAsync(model.id, model.toRequestDto());
    }
}

async function onSubmissionSucceeded(): Promise<void> {
    await router.push({ name: "supplyDetail", params: { supplyId: model.id } });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <!-- Supply detail -->
            <div class="col col-12">
                <MainBlock title="Thông tin đơn nhập hàng" :body-padding="[0, 2, 2, 2]">
                    <div class="row g-3">
                        <!-- SuppliedDateTime-->
                        <div class="col col-12" v-if="model.authorization.canSetStatsDateTime">
                            <FormLabel text="Ngày giờ nhập hàng" required />
                            <StatsDateTimeInput name="suppliedDateTime"
                                    v-model="model.statsDateTime" />
                            <ValidationMessage name="suppliedDateTime" />
                        </div>
                        
                        <!-- ShipmentFee-->
                        <div class="col col-12 mt-3">
                            <FormLabel text="Phí vận chuyển" />
                            <MoneyInput name="shipmentFee" suffix=" vnđ"
                                    v-model="model.shipmentFee" />
                            <ValidationMessage name="shipmentFee" />
                        </div>

                        <!-- Note -->
                        <div class="col col-12 mt-3">
                            <FormLabel text="Ghi chú" />
                            <TextInput type="textarea" name="note"
                                    placeholder="Ghi chú ..."
                                    v-model="model.note" />
                            <ValidationMessage name="note" />
                        </div>

                        <!-- UpdateReason -->
                        <div class="col col-12 mt-3" v-if="!isForCreating">
                            <FormLabel text="Lý do chỉnh sửa" required />
                            <TextInput type="textarea" name="updatedReason"
                                    placeholder="Lý do chỉnh sửa ..."
                                    v-model="model.updatedReason" />
                            <ValidationMessage name="updatedReason" />
                        </div>
                    </div>
                </MainBlock>
            </div>
        </div>

        <div class="row g-3 align-items-stretch">
            <!-- Product picker -->
            <div class="col col-lg-6 col-12">
                <ProductPicker v-model="model.items" />
            </div>

            <!-- Supply items -->
            <div class="col col-lg-6 col-12">
                <SupplyItemList v-model="model.items" />
            </div>
        </div>

        <div class="row g-3 justify-content-end">
            <div class="col col-auto">
                <!-- Submit button -->
                <div class="d-flex justify-content-end">
                    <SubmitButton :callback="submitAsync" class="flex-grow-0 flex-shrink-0"
                            :disabled="!model.items.length"
                            @succeeded="onSubmissionSucceeded" />
                </div>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
textarea {
    min-height: 130px;
}
</style>