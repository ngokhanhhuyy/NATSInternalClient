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
import DateTimeInput from "@forms/DateTimeInputComponent.vue";
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
        if (!authorizationService.canCreateSupply()) {
            router.back();
        }
        return reactive(new SupplyUpsertModel());
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
        <div class="row g-3 justify-content-end">
            <!-- Supply detail -->
            <div class="col col-12">
                <MainBlock title="Thông tin đơn nhập hàng"
                        :body-padding="[0, 2, 2, 2]">
                    <template #body>
                        <div class="row g-3">
                            <!-- SuppliedDateTime-->
                            <div class="col col-12">
                                <FormLabel name="Ngày giờ nhập hàng" required />
                                <DateTimeInput property-path="suppliedDateTime"
                                        v-model="model.statsDateTime" />
                                <ValidationMessage property-path="suppliedDateTime" />
                            </div>
                            
                            <!-- ShipmentFee-->
                            <div class="col col-12 mt-3">
                                <FormLabel name="Phí vận chuyển" />
                                <MoneyInput property-path="shipmentFee" suffix=" vnđ"
                                        v-model="model.shipmentFee" />
                                <ValidationMessage property-path="shipmentFee" />
                            </div>

                            <!-- Note -->
                            <div class="col col-12 mt-3">
                                <FormLabel name="Ghi chú" />
                                <TextInput type="textarea" property-path="note"
                                        placeholder="Ghi chú ..."
                                        v-model="model.note" />
                                <ValidationMessage property-path="note" />
                            </div>

                            <!-- UpdateReason -->
                            <div class="col col-12 mt-3" v-if="!isForCreating">
                                <FormLabel name="Lý do chỉnh sửa" required />
                                <TextInput type="textarea" property-path="updateReason"
                                        placeholder="Lý do chỉnh sửa ..."
                                        v-model="model.updatedReason" />
                                <ValidationMessage property-path="updateReason" />
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Product picker -->
            <div class="col col-lg-6 col-12 h-100">
                <ProductPicker v-model="model.items" />
            </div>

            <!-- Supply items -->
            <div class="col col-lg-6 col-12 h-100">
                <SupplyItemList v-model="model.items" />
            </div>

            <div class="col col-auto">
                <!-- Submit button -->
                <div class="d-flex justify-content-end mt-3">
                    <SubmitButton :callback="submitAsync" class="flex-grow-0 flex-shrink-0"
                            :disabled="!model.items.length"
                            @submission-suceeded="onSubmissionSucceeded" />
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