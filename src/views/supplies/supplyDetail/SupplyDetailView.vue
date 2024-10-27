<script setup lang="ts">
import { reactive, computed } from "vue";
import { RouterLink, useRoute, useRouter, type RouteLocationRaw } from "vue-router";
import { SupplyDetailModel } from "@/models/supplyModels";
import { useSupplyService } from "@/services/supplyService";
import { OperationError } from "@/services/exceptions";
import { useViewStates } from "@/composables/viewStatesComposable";
import { useAlertModalStore } from "@/stores/alertModal";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";

// Child component.
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";
import SupplyItem from "./SupplyDetailItemComponent.vue";

// Dependencies.
const route = useRoute();
const router = useRouter();
const supplyService = useSupplyService();
const alertModalStore = useAlertModalStore();
const amountUtility = useAmountUtility();

// Model and internal state.
const model = await initialLoadAsync();
useViewStates();
const updateRoute: RouteLocationRaw = { name: "supplyUpdate", params: { supplyId: model.id } };

// Computed properties.
const isLockedClass = computed<string>(() => model.isLocked ? "text-danger" : "text-success");

// Functions.
async function initialLoadAsync(): Promise<SupplyDetailModel> {
    const supplyId = parseInt(route.params.supplyId as string);
    const responseDto = await supplyService.getDetailAsync(supplyId);
    return reactive(new SupplyDetailModel(responseDto));
}

async function deleteAsync(): Promise<void> {
    const answer = await alertModalStore.getDeleteConfirmationAsync();
        if (answer) {
        try {
            await supplyService.deleteAsync(model.id);
            await alertModalStore.getSubmitSuccessConfirmationAsync();
            await router.push({ name: "supplyList" });
        } catch (error) {
            if (error instanceof OperationError) {
                await alertModalStore.getSubmitErrorConfirmationAsync();
            } else {
                throw error;
            }
        }
    }
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-center">
            <!-- ResourceAccess -->
            <div class="col col-12">
                <ResourceAccess resource-type="Customer" :resource-primary-id="model.id"
                        accessMode="Detail" />
            </div>

            <!-- Supply detail -->
            <div class="col col-md-6 col-sm-12 col-12">
                <MainBlock title="Chi tiết nhập hàng" close-button body-padding="2">
                    <template #body>
                        <!-- PaidDate-->
                        <div class="row gx-3">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Ngày thanh toán" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span>{{ model.statsDateTime.date }}</span>
                            </div>
                        </div>

                        <!-- PaidTime -->
                        <div class="row gx-3 mt-3">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Giờ thanh toán" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span>{{ model.statsDateTime.time }}</span>
                            </div>
                        </div>

                        <!-- Shipment fee -->
                        <div class="row gx-3 mt-3">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Phí vận chuyển" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                {{ amountUtility.getDisplayText(model.shipmentFee) }}
                            </div>
                        </div>

                        <!-- Total amount -->
                        <div class="row gx-3 mt-3">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Tổng giá tiền" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span>
                                    {{ amountUtility.getDisplayText(model.amount) }}
                                </span>
                            </div>
                        </div>

                        <!-- CreatedDateTime -->
                        <div class="row gx-3 mt-3">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Tạo lúc" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span>{{ model.createdDateTime.dateTime }}</span>
                            </div>
                        </div>

                        <!-- StatsDateTime -->
                        <div class="row gx-3 mt-3">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Thời gian thống kê" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span>{{ model.statsDateTime.dateTime }}</span>
                            </div>
                        </div>

                        <!-- UpdatedDateTime -->
                        <div class="row gx-3 mt-3" v-if="model.lastUpdatedDateTime">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Chỉnh sửa lúc" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span>{{ model.lastUpdatedDateTime }}</span>
                            </div>
                        </div>

                        <!-- Note -->
                        <div class="row gx-3 mt-3" v-if="model.note">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Ghi chú" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span>{{ model.note }}</span>
                            </div>
                        </div>

                        <!-- IsClosed -->
                        <div class="row gx-3 mt-3">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Tình trạng" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span :class="isLockedClass">
                                    {{ model.isLocked ? "Đã khoá" : "Chưa khoá" }}
                                </span>
                            </div>
                        </div>

                        <!-- Photos -->
                        <div class="row gx-3 mt-3 justify-content-center"
                                v-if="model.photos.length">
                            <div class="col col-12 mb-2">
                                <FormLabel name="Hình ảnh" />
                            </div>
                            <div class="col col-auto mb-2" v-for="index in 10" :key="index">
                                <img :src="model.items[0].product.thumbnailUrl"
                                        class="img-thumbnail supply-photo" />
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Supply items -->
            <div class="col col-md-6 col-sm-12 col-12">
                <!-- Filter -->
                <MainBlock title="Danh sách sản phẩm" class="h-100"
                        body-class="overflow-hidden" body-padding="0">
                    <template #body>
                        <ul class="list-group list-group-flush">
                            <SupplyItem :model="item" v-for="item in model.items"
                                    :key="item.id" />
                        </ul>
                    </template>
                </MainBlock>
            </div>

            <!-- Action buttons -->
            <div class="col col-12 d-flex justify-content-end"
                    v-if="model.authorization.canEdit && model.authorization.canDelete">
                <!-- Delete button -->
                <button class="btn btn-outline-danger me-3" @click="deleteAsync"
                        v-if="model.authorization.canDelete">
                    <i class="bi bi-trash me-1"></i>
                    <span>Xoá</span>
                </button>

                <!-- Edit button -->
                <RouterLink class="btn btn-primary" :to="updateRoute"
                        v-if="model.authorization.canEdit">
                    <i class="bi bi-pencil-square me-2"></i>
                    <span>Sửa</span>
                </RouterLink>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
img.supply-photo {
    object-fit: cover;
    object-position: 50% 50%;
    width: 70px; 
    height: 70px;
}
</style>