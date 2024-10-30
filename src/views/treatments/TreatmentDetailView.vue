<script setup lang="ts">
import type { RouteLocationRaw, RouteLocationNormalizedLoadedGeneric } from "vue-router";
import { useTreatmentService } from "@/services/treatmentService";
import { TreatmentDetailModel } from "@/models/treatmentModels";
import { useAmountUtility } from "@/utilities/amountUtility";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";

// Shared component.
import ProductExportableDetail
    from "../shared/productExportableViews/detail/ProductExportableDetailView.vue";

// Dependency.
const service = useTreatmentService();
const amountUtility = useAmountUtility();

// Functions.
async function initialLoadAsync(route: RouteLocationNormalizedLoadedGeneric)
        : Promise<TreatmentDetailModel> {
    const treatmentId = parseInt(route.params.treatmentId as string);
    return new TreatmentDetailModel(await service.getDetailAsync(treatmentId));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getUpdateRoute(id: number): RouteLocationRaw {
    return { name: "treatmentUpdate", params: { treatmentId: id } };
}

function getTherapistDetailRoute(therapistId: number): RouteLocationRaw {
    return { name: "userProfile", params: { userId: therapistId } };
}
</script>

<template>
    <ProductExportableDetail resource-type="Treatment"
            resource-display-name="Liệu trình"
            :initial-load-async="initialLoadAsync"
            :get-update-route="getUpdateRoute">
        <template #detail-middle="{ model, labelColumnClass }">
            <!-- ServiceAmount -->
            <div class="row gx-3 mt-3">
                <div :class="labelColumnClass">
                    <FormLabel name="Số tiền dịch vụ trước thuế" />
                </div>
                <div class="col">
                    <span>
                        {{ amountUtility.getDisplayText(model.serviceAmountBeforeVat) }}
                    </span>
                </div>
            </div>

            <!-- ServiceVatAmount -->
            <div class="row gx-3 mt-3">
                <div :class="labelColumnClass">
                    <FormLabel name="Thuế dịch vụ" />
                </div>
                <div class="col">
                    <span>
                        {{ amountUtility.getDisplayText(model.serviceVatAmount) }}
                    </span>
                </div>
            </div>
        </template>
        <template #detail-bottom="{ model, labelColumnClass }">
            <div class="row gx-3 mt-3">
                <div :class="labelColumnClass">
                    <FormLabel name="Người đảm nhiệm" />
                </div>
                <div class="col d-flex justify-content-start align-items-center">
                    <img :src="model.therapist.avatarUrl"
                            class="img-thumbnail rounded-circle avatar me-2">
                    <RouterLink :to="getTherapistDetailRoute(model.therapist.id)"
                            class="therapist-fullname">
                        {{ model.therapist.fullName }}
                    </RouterLink>
                </div>
            </div>
        </template>
    </ProductExportableDetail>
</template>

<style scoped>
.avatar {
    object-fit: contain;
    object-position: 50% 50%;
    width: 35px;
    height: 35px;
}

.therapist-fullname:not(:hover):not(:active) {
    text-decoration: none;
}

.therapist-fullname:hover {
    text-decoration: underline;
}
</style>