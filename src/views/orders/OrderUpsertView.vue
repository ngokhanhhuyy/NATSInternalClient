<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { useRoute, type RouteLocationRaw } from "vue-router";
import { OrderUpsertModel } from "@/models/orderModels";
import { OrderUpsertItemModel } from "@/models/orderItemModels";
import type { ProductBasicModel } from "@/models/productModels";
import { useOrderService } from "@/services/orderService";
import { useAuthorizationService } from "@/services/authorizationService";
import { AuthorizationError } from "@/errors"
// Shared component.
import ProductExportableUpsertView
    from "@/views/shared/productExportableViews/upsert/ProductExportableUpsertView.vue";

// Props.
defineProps<Props>();

// Dependency.
const route = useRoute();
const authorizationService = useAuthorizationService();
const orderService = useOrderService();

// Functions.
async function initialLoadAsync(isForCreating: boolean): Promise<OrderUpsertModel> {
    if (isForCreating) {
        return new OrderUpsertModel(authorizationService.canSetTreatmentStatsDateTime());
    }

    const treatmentId = parseInt(route.params.orderId as string);
    const responseDto = await orderService.getDetailAsync(treatmentId);
    if (!responseDto.authorization?.canEdit) {
        throw new AuthorizationError();
    }

    return new OrderUpsertModel(responseDto);;
}

function initializeItem(product: ProductBasicModel): OrderUpsertItemModel {
    return new OrderUpsertItemModel(product);
}

async function submitAsync(model: OrderUpsertModel, isForCreating: boolean): Promise<void> {
    if (isForCreating) {
        const createdId = await orderService.createAsync(model.toRequestDto());
        model.id = createdId;
        return;
    }

    await orderService.updateAsync(model.id, model.toRequestDto());
}

async function deleteAsync(id: number): Promise<void> {
    await orderService.deleteAsync(id);
}

function getListRoute(): RouteLocationRaw {
    return { name: "orderList" };
}

function getDetailRoute(id: number): RouteLocationRaw {
    return { name: "orderDetail", params: { orderId: id } };
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
            :get-detail-route="getDetailRoute" />
</template>