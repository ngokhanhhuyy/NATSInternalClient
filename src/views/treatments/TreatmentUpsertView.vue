<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { useRoute, type RouteLocationRaw } from "vue-router";
import { TreatmentUpsertModel } from "@/models/treatmentModels";
import { TreatmentUpsertItemModel } from "@/models/treatmentItemModels";
import type { ProductBasicModel } from "@/models/productModels";
import { useTreatmentService } from "@/services/treatmentService";
import { useAuthorizationService } from "@/services/authorizationService";
import { AuthorizationError } from "@/errors";
import { useAmountUtility } from "@/utilities/amountUtility";

// Shared component.
import ProductExportableUpsertView
    from "@/views/shared/productExportableViews/upsert/ProductExportableUpsertView.vue";

// Form components.
import FormLabel from "@/components/formInputs/FormLabelComponent.vue";
import MoneyInput from "@/components/formInputs/MoneyInputComponent.vue";
import ValidationMessage from "@/components/formInputs/ValidationMessage.vue";

// Props.
defineProps<Props>();

// Dependency.
const route = useRoute();
const authorizationService = useAuthorizationService();
const treatmentService = useTreatmentService();
const amountUtility = useAmountUtility();

// Functions.
async function initialLoadAsync(isForCreating: boolean): Promise<TreatmentUpsertModel> {
    if (isForCreating) {
        return new TreatmentUpsertModel(authorizationService.canSetTreatmentStatsDateTime());
    }

    const treatmentId = parseInt(route.params.treatmentId as string);
    const responseDto = await treatmentService.getDetailAsync(treatmentId);
    if (!responseDto.authorization?.canEdit) {
        throw new AuthorizationError();
    }

    return new TreatmentUpsertModel(responseDto);;
}

function initializeItem(product: ProductBasicModel): TreatmentUpsertItemModel {
    return new TreatmentUpsertItemModel(product);
}

async function submitAsync(
        model: TreatmentUpsertModel,
        isForCreating: boolean): Promise<void> {
    if (isForCreating) {
        const createdId = await treatmentService.createAsync(model.toRequestDto());
        model.id = createdId;
        return;
    }

    await treatmentService.updateAsync(model.id, model.toRequestDto());
}

async function deleteAsync(id: number): Promise<void> {
    await treatmentService.deleteAsync(id);
}

function getListRoute(): RouteLocationRaw {
    return { name: "treatmentList" };
}

function getDetailRoute(id: number): RouteLocationRaw {
    return { name: "treatmentDetail", params: { treatmentId: id } };
}

function getProductAmountClass(model: TreatmentUpsertModel): string | null {
    return model.productAmountBeforeVat ? null : "text-danger";
}

function getServiceAmountClass(model: TreatmentUpsertModel): string | null {
    return model.serviceAmountBeforeVat ? null : "text-danger";
}
</script>

<template>
    <ProductExportableUpsertView resource-display-name="Liệu trình" resource-type="Treatment"
            :is-for-creating="isForCreating"
            :initial-load-async="initialLoadAsync"
            :initialize-item="initializeItem"
            :submit-async="submitAsync"
            :delete-async="deleteAsync"
            :get-list-route="getListRoute"
            :get-detail-route="getDetailRoute">
        <!-- Form -->
        <template #form="{ model }">
            <!-- ServiceAmountBeforeVat -->
            <div class="col col-12">
                <FormLabel text="Giá tiền dịch vụ" />
                <MoneyInput name="serviceAmountBeforeVat"
                        v-model="model.serviceAmountBeforeVat"
                        :min="0"
                        suffix=" vnđ" />
                <ValidationMessage name="serviceAmountBeforeVat" />
            </div>

            <!-- ServiceVatAmount -->
            <div class="col col-12">
                <FormLabel text="Thuế dịch vụ" />
                <MoneyInput name="serviceVatAmount"
                        v-model="model.serviceVatPercentage"
                        suffix="%" :min="0" :max="100" />
                <ValidationMessage name="serviceVatAmount" />
            </div>
        </template>
        
        <!-- Summary -->
        <template #summary="{ model, labelColumnClass }">
            <!-- ProductAmountAfterVat -->
            <div class="row gx-3 gy-0 mt-3">
                <div :class="labelColumnClass">
                    <FormLabel text="Giá sản phẩm" />
                </div>
                <div class="col" :class="getProductAmountClass(model)">
                    <span>
                        {{ amountUtility.getDisplayText(model.productAmountAfterVat) }}
                    </span>
                    <span class="opacity-50 small">
                        ({{ amountUtility.getDisplayText(model.productAmountBeforeVat) }} +
                        {{ amountUtility.getDisplayText(model.productVatAmount) }} VAT)
                    </span>
                </div>
            </div>

            <!-- ServiceAmount -->
            <div class="row gx-3 gy-0 mt-3">
                <div :class="labelColumnClass">
                    <FormLabel text="Giá dịch vụ" />
                </div>
                <div class="col" :class="getServiceAmountClass(model)">
                    <span>
                        {{ amountUtility.getDisplayText(model.serviceAmountAfterVat) }}
                    </span>
                    <span class="opacity-50 small">
                        ({{ amountUtility.getDisplayText(model.serviceAmountBeforeVat) }} +
                        {{ amountUtility.getDisplayText(model.serviceVatAmount) }} VAT)
                    </span>
                </div>
            </div>
        </template>
    </ProductExportableUpsertView>
</template>