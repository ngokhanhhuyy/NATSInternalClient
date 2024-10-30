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
import { AuthorizationError } from "@/services/exceptions";
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
const service = useTreatmentService();
const amountUtility = useAmountUtility();

// Functions.
async function initialLoadAsync(isForCreating: boolean): Promise<TreatmentUpsertModel> {
    if (isForCreating) {
        return new TreatmentUpsertModel();
    }

    const treatmentId = parseInt(route.params.treatmentId as string);
    const responseDto = await service.getDetailAsync(treatmentId);
    if (!responseDto.authorization?.canEdit) {
        throw new AuthorizationError();
    }

    const model = new TreatmentUpsertModel(responseDto);
    model.id = responseDto.id;
    return model;
}

function initializeItem(product: ProductBasicModel): TreatmentUpsertItemModel {
    return new TreatmentUpsertItemModel(product);
}

async function submitAsync(
        model: TreatmentUpsertModel,
        isForCreating: boolean): Promise<void> {
    if (isForCreating) {
        const createdId = await service.createAsync(model.toRequestDto());
        model.id = createdId;
        return;
    }

    await service.updateAsync(model.id, model.toRequestDto());
}

async function deleteAsync(id: number): Promise<void> {
    await service.deleteAsync(id);
}

function getListRoute(): RouteLocationRaw {
    return { name: "treatmentList" };
}

function getDetailRoute(id: number): RouteLocationRaw {
    return { name: "treatmentDetail", params: { treatmentId: id } };
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
                <FormLabel name="Giá tiền dịch vụ" />
                <MoneyInput property-path="serviceAmountBeforeVat"
                        v-model="model.serviceAmountBeforeVat"
                        :min="0"
                        suffix=" vnđ" />
                <ValidationMessage property-path="serviceAmountBeforeVat" />
            </div>

            <!-- ServiceVatAmount -->
            <div class="col col-12">
                <FormLabel name="Thuế dịch vụ" />
                <MoneyInput property-path="serviceVatAmount"
                        v-model="model.serviceVatPercentage"
                        suffix="%" :min="0" :max="100" />
                <ValidationMessage property-path="serviceVatAmount" />
            </div>
        </template>
        
        <!-- Summary -->
        <template #summary="{ model, labelColumnClass }">
            <!-- ProductAmountBeforeVat -->
            <div class="row gx-3 gy-0 mt-3">
                <div :class="labelColumnClass">
                    <FormLabel name="Giá sản phẩm (trước thuế)" />
                </div>
                <div class="col">
                    <span :class='!model.productAmountBeforeVat ? "text-danger" : null'>
                        {{ amountUtility.getDisplayText(model.productAmountBeforeVat) }}
                    </span>
                </div>
            </div>

            <!-- ProductVatAmount -->
            <div class="row gx-3 gy-0 mt-3">
                <div :class="labelColumnClass">
                    <FormLabel name="Thuế sản phẩm" />
                </div>
                <div class="col">
                    <span>
                        {{ amountUtility.getDisplayText(model.productVatAmount) }}
                    </span>
                </div>
            </div>

            <!-- ProductAmountAfterVat -->
            <div class="row gx-3 gy-0 mt-3">
                <div :class="labelColumnClass">
                    <FormLabel name="Giá sản phẩm (sau thuế)" />
                </div>
                <div class="col">
                    <span :class='!model.productAmountAfterVat ? "text-danger" : null'>
                        {{ amountUtility.getDisplayText(model.productAmountAfterVat) }}
                    </span>
                </div>
            </div>

            <!-- ServiceAmount -->
            <div class="row gx-3 gy-0 mt-3">
                <div :class="labelColumnClass">
                    <FormLabel name="Giá dịch vụ (trước thuế)" />
                </div>
                <div class="col">
                    <span :class='!model.serviceAmountBeforeVat ? "text-danger" : null'>
                        {{ amountUtility.getDisplayText(model.serviceAmountBeforeVat) }}
                    </span>
                </div>
            </div>

            <!-- ServiceVatAmount -->
            <div class="row gx-3 gy-0 mt-3">
                <div :class="labelColumnClass">
                    <FormLabel name="Thuế dịch vụ" />
                </div>
                <div class="col">
                    <span :class='!model.serviceVatAmount ? "text-danger" : null'>
                        {{ amountUtility.getDisplayText(model.serviceVatAmount) }}
                    </span>
                </div>
            </div>
        </template>
    </ProductExportableUpsertView>
</template>