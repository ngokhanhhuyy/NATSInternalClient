<script lang="ts">
interface Props<
        TUpsertModel extends IProductExportableUpsertModel,
        TUpsertItemModel extends IProductExportableUpsertItemModel> {
    resourceType: string;
    resourceDisplayName: string;
    isForCreating: boolean;
    initialLoadAsync: (isForCreating: boolean) => Promise<TUpsertModel>;
    initializeItem: (product: ProductBasicModel) => TUpsertItemModel;
    submitAsync(model: TUpsertModel, isForCreating: boolean): Promise<void>;
    deleteAsync(id: number): Promise<void>
    getListRoute(): RouteLocationRaw;
    getDetailRoute(id: number): RouteLocationRaw;
}
</script>

<script setup lang="ts" generic="TUpsertModel extends IProductExportableUpsertModel,
                                TUpsertItemModel extends IProductExportableUpsertItemModel">
import { ref, reactive, provide } from "vue";
import { useRouter, type RouteLocationRaw } from "vue-router";
import type { ProductBasicModel } from "@/models/productModels";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";

// Form components.
import SubmitButton from "@forms/SubmitButtonComponent.vue";
import DeleteButton from "@forms/DeleteButtonComponent.vue";

// Child components.
import CustomerPicker from "@/views/shared/customerPicker/CustomerPickerComponent.vue";
import ProductPicker from "./productPicker/ProductExportablePickerComponent.vue";
import Information from "./ProductExportableInformationComponent.vue";
import Summary from "./ProductExportableSummaryComponent.vue";

// Props.
const props = defineProps<Props<TUpsertModel, TUpsertItemModel>>();

// Dependencies.
const router = useRouter();

// Model and states.
const model = reactive(await props.initialLoadAsync(props.isForCreating));
const { modelState } = useUpsertViewStates();
const stepNames: string[] = [ "Thông tin", "Khách hàng", "Sản phẩm", "Xác nhận" ];
const currentStepIndex = ref<number>(0);

// Provide.
provide("resourceDisplayName", props.resourceDisplayName);

// Functions.
async function onSubmissionSucceeded(): Promise<void> {
    await router.push(props.getDetailRoute(model.id));
}

async function onDeletionSucceeded(): Promise<void> {
    await router.push(props.getListRoute());
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
            <!-- ResourceAccess -->
            <div class="col col-12" v-if="!props.isForCreating">
                <ResourceAccess :resource-type="resourceType" :resource-primary-id="model.id"
                        accessMode="Update" />
            </div>

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
            <div class="col col-12" v-if="modelState.hasAnyError()">
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
        <div class="row g-3 justify-content-center">
            <!-- OrderInformation -->
            <div class="col col-12" v-show="currentStepIndex === 0">
                <Information v-model="model" :is-for-creating="isForCreating">
                    <slot name="form" :model="model"></slot>
                </Information>
            </div>

            <!-- Customer selector -->
            <div class="col col-12" v-show="currentStepIndex === 1">
                <CustomerPicker v-model="model.customer" />
            </div>

            <!-- Product selector -->
            <div class="col col-12" v-show="currentStepIndex === 2">
                <ProductPicker v-model="model.items"
                        :item-initializer="initializeItem" />
            </div>

            <!-- Summary -->
            <div class="col col-12" v-show="currentStepIndex === stepNames.length - 1">
                <Summary v-model="model" :is-for-creating="isForCreating">
                    <template #default="{ model, labelColumnClass }">
                        <slot name="summary" :model="model"
                                :labelColumnClass="labelColumnClass">
                        </slot>
                    </template>
                </Summary>
            </div>
        </div>

        <!-- Action buttons -->
        <div class="row g-3 justify-content-end">
            <!-- Delete button -->
            <div class="col col-auto" v-if="!isForCreating">
                <DeleteButton :callback="deleteAsync"
                        @deletion-succeeded="onDeletionSucceeded" />
            </div>

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

            <!-- Save button -->
            <div class="col col-auto" v-if="currentStepIndex === stepNames.length - 1">
                <SubmitButton :callback="submitAsync"
                        @submission-suceeded="onSubmissionSucceeded" />
            </div>
        </div>
    </MainContainer>
</template>