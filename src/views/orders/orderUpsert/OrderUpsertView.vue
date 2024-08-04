<script setup lang="ts">
// Interfaces.
interface Props {
    isForCreating: boolean;
}

// Imports.
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useOrderService } from "@/services/orderService";
import { AuthorizationError } from "@/services/exceptions";
import { OrderUpsertModel } from "@/models";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import { MainContainer } from "@/views/layouts";

// Form components.
import { SubmitButton, DeleteButton } from "@/components/formInputs";

// Child components.
import CustomerPicker from "./CustomerPickerComponent.vue";
import ProductPicker from "./ProductPickerComponent.vue";
import OrderInformation from "./OrderInformationComponent.vue";
import OrderSummary from "./OrderSummaryComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const orderService = useOrderService();

// Model and states.
const model = await initialLoadAsync();
const { modelState } = useUpsertViewStates();
const stepNames: string[] = ["Đơn hàng", "Khách hàng", "Sản phẩm", "Xác nhận"];
const currentStepIndex = ref<number>(0);

// Functions.
async function initialLoadAsync(): Promise<OrderUpsertModel> {
    if (props.isForCreating) {
        return reactive(new OrderUpsertModel());
    }

    const orderId = parseInt(route.params.orderId as string);
    const responseDto = await orderService.getDetailAsync(orderId);
    if (!responseDto.authorization?.canEdit) {
        throw new AuthorizationError;
    }

    const model = reactive(new OrderUpsertModel(responseDto));
    model.id = responseDto.id;
    return model;
}

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        model.id = await orderService.createAsync(model.toRequestDto());
    } else {
        await orderService.updateAsync(model.id, model.toRequestDto());
    }
}

async function deleteAsync(): Promise<void> {
    await orderService.deleteAsync(model.id);
}

async function onSubmissionSucceeded(): Promise<void> {
    await router.push({ name: "orderDetail", params: { orderId: model.id } });
}

async function onDeletionSucceeded(): Promise<void> {
    await router.push({ name: "orderList" });
}

function getStepClass(stepIndex: number): string {
    if (stepIndex === currentStepIndex.value) {
        return "btn-primary text-white fw-bold rounded";
    }
    return "";
}

function getStepIconClass(stepIndex: number): string {
    return `bi bi-${stepIndex + 1}-circle-fill`;
}
</script>

<template>
    <MainContainer>
        <!-- Step bar and error summary -->
        <div class="row g-3 justify-content-center">
            <!-- Step bar-->
            <div class="col col-12=">
                <div class="row g-0 w-100 bg-white px-2 py-2 rounded-3 border text-primary">
                    <div class="col col-md-auto col-12 me-2 d-flex justify-content-start"
                            v-for="(stepName, index) in stepNames" :key="index">
                        <button class="btn btn-sm px-2 d-flex align-items-center w-100"
                                :class="getStepClass(index)"
                                @click="currentStepIndex = index">
                            <i :class="getStepIconClass(index)"></i>
                            <span class="ms-2">
                                {{ stepName }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Error summary -->
            <div class="col col-12 mt-3" v-if="modelState.hasAnyError()">
                <div class="alert alert-danger">
                    <div class="text-danger" :key="index"
                            v-for="(message, index) in modelState.getAllErrorMessages()">
                        <i class="bi bi-x-circle-fill"></i>
                        <span class="ms-2">{{ message }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Step content blocks -->
        <div class="row g-3 justify-content-center mt-3">
            <!-- OrderInformation -->
            <div class="col col-12" v-show="currentStepIndex === 0">
                <OrderInformation v-model="model" :is-for-creating="props.isForCreating" />
            </div>

            <!-- Customer selector -->
            <div class="col col-12" v-show="currentStepIndex === 1">
                <CustomerPicker v-model="model.customer" />
            </div>

            <!-- Product selector -->
            <div class="col col-12" v-show="currentStepIndex === 2">
                <ProductPicker v-model="model.items" />
            </div>

            <!-- Order Summary -->
            <div class="col col-12" v-show="currentStepIndex === stepNames.length - 1">
                <OrderSummary v-model="model" :is-for-creating="isForCreating" />
            </div>
        </div>

        <!-- Action buttons -->
        <div class="row g-3 justify-content-end mt-3">
            <!-- Back button -->
            <div class="col col-auto" @click="currentStepIndex -= 1"
                    v-if="currentStepIndex !== 0">
                <button class="btn btn-outline-primary">
                    <i class="bi bi-chevron-left"></i>
                    <span class="ms-2">Quay lại</span>
                </button>
            </div>

            <!-- Next button -->
            <div class="col col-auto" v-if="currentStepIndex !== stepNames.length - 1">
                <button class="btn btn-outline-primary" @click="currentStepIndex += 1">
                    <span class="me-2">Tiếp theo</span>
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>

            <!-- Delete button -->
            <div class="col col-auto" v-if="!isForCreating">
                <DeleteButton :callback="deleteAsync"
                        @deletion-succeeded="onDeletionSucceeded" />
            </div>

            <!-- Save button -->
            <div class="col col-auto" v-if="currentStepIndex === stepNames.length - 1">
                <SubmitButton :callback="submitAsync"
                        @submission-suceeded="onSubmissionSucceeded" />
            </div>
        </div>
    </MainContainer>
</template>