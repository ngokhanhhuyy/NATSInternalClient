<script lang="ts">
type DetailModel = OrderDetailModel | TreatmentDetailModel;

interface Props<TModel extends DetailModel> {
    resourceType: string;
    resourceDisplayName: string;
    initialLoadAsync: (route: ReturnType<typeof useRoute>) => Promise<TModel>;
    getUpdateRoute(id: number): RouteLocationRaw;
}
</script>

<script setup lang="ts" generic="TModel extends DetailModel">
import { useRoute, type RouteLocationRaw } from "vue-router";
import { useViewStates } from "@/composables/viewStatesComposable";
import { useAmountUtility } from "@/utilities/amountUtility";
import type { OrderDetailModel } from "@/models/orderModels";
import type { TreatmentDetailModel } from "@/models/treatmentModels";

// Layout components
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";

// Child components.
import ItemList from "./ItemListComponent.vue";
import UpdateHistories from "./UpdateHistoriesComponent.vue";

// Props.
const props = defineProps<Props<TModel>>();

// Dependencies.
const route = useRoute();
const amountUtility = useAmountUtility();

// Model and internal states.
const model = await props.initialLoadAsync(route);
useViewStates();
const labelColumnClass = "col col-xl-3 col-lg-3 col-md-4 col-12";

// Computed properties.
const customerDetailRoute = {
    name: "customerDetail",
    params: {
        customerId: model.customer.id
    }
};

// Functions.
function getIdClass(isLocked: boolean): string {
    const color = isLocked ? "danger" : "primary";
    return `bg-${color}-subtle border border-${color}-subtle \
            rounded px-2 py-1 text-${color} small fw-bold`;
}

function getIsClosedClass(isLocked: boolean): string {
    return isLocked ? "text-danger" : "text-primary";
}

function getIsClosedText(isLocked: boolean): string {
    return isLocked ? "Đã khoá" : "Chưa khoá";
}

function getUserProfileRoute(userId: number): RouteLocationRaw {
    return {
        name: "userProfile",
        params: {
            userId: userId
        }
    };
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-start">
            <!-- ResourceAccess -->
            <div class="col col-12">
                <ResourceAccess :resource-type="props.resourceType"
                        :resource-primary-id="model.id" accessMode="Detail" />
            </div>

            <!-- Detail -->
            <div class="col col-12">
                <MainBlock :title="`Chi tiết ${resourceDisplayName}`" close-button
                        :body-padding="[2, 2, 2, 2]">
                    <template #body>
                        <!-- Id -->
                        <div class="row gx-3 mt-2">
                            <div :class="labelColumnClass">
                                <FormLabel text="Mã số" />
                            </div>
                            <div class="col">
                                <span :class="getIdClass(model.isLocked)">
                                    #{{ model.id }}
                                </span>
                            </div>
                        </div>

                        <!-- CreatedDate -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Ngày tạo" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ model.createdDateTime.date }}
                                </span>
                            </div>
                        </div>

                        <!-- CreatedTime -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Giờ tạo" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ model.createdDateTime.time }}
                                </span>
                            </div>
                        </div>

                        <!-- StatsDate -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Ngày thống kê" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ model.statsDateTime.date }}
                                </span>
                            </div>
                        </div>

                        <!-- StatsTime -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Giờ thống kê" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ model.statsDateTime.time }}
                                </span>
                            </div>
                        </div>

                        <slot name="detail-middle"
                                :model="model"
                                :labelColumnClass="labelColumnClass"></slot>

                        <!-- BeforeVatAmount -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Tổng giá tiền trước thuế" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ amountUtility.getDisplayText(model.amountBeforeVat) }}
                                </span>
                            </div>
                        </div>

                        <!-- VatAmount -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Tổng thuế" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ amountUtility.getDisplayText(model.vatAmount) }}
                                </span>
                            </div>
                        </div>

                        <!-- VatAmount -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Tổng giá tiền sau thuế" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ amountUtility.getDisplayText(model.amountAfterVat) }}
                                </span>
                            </div>
                        </div>

                        <!-- Note -->
                        <div class="row gx-3 mt-3" v-if="model.note">
                            <div :class="labelColumnClass">
                                <FormLabel text="Ghi chú" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ model.note }}
                                </span>
                            </div>
                        </div>

                        <!-- IsLocked -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Tình trạng" />
                            </div>
                            <div class="col">
                                <span :class="getIsClosedClass(model.isLocked)">
                                    {{ getIsClosedText(model.isLocked) }}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Customer -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Khách hàng" />
                            </div>
                            <div class="col d-flex justify-content-start align-items-center">
                                <img :src="model.customer.avatarUrl"
                                        class="img-thumbnail rounded-circle avatar me-2">
                                <RouterLink :to="customerDetailRoute"
                                        class="customer-fullname">
                                    {{ model.customer.fullName }}
                                </RouterLink>
                            </div>
                        </div>
                        
                        <!-- Therapist -->
                        <slot name="detail-bottom" :model="model"
                                :labelColumnClass="labelColumnClass"></slot>
                        
                        <!-- CreatedUser -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Người tạo" />
                            </div>
                            <div class="col d-flex justify-content-start align-items-center">
                                <img :src="model.createdUser.avatarUrl"
                                        class="img-thumbnail rounded-circle avatar me-2">
                                <RouterLink :to="getUserProfileRoute(model.createdUser.id)"
                                        class="user-fullname">
                                    {{ model.createdUser.fullName }}
                                </RouterLink>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Order items -->
            <div class="col col-12">
                <ItemList v-model="model.items" />
            </div>

            <!-- UpdateHistories -->
            <div class="col col-12" v-if="model.updateHistories?.length">
                <UpdateHistories v-model="model.updateHistories"/>
            </div>
        </div>
        
        <!-- Action buttons -->
        <div class="row g-3 justify-content-end" v-if="model.authorization?.canEdit">
            <div class="col col-auto">
                <RouterLink :to="getUpdateRoute(model.id)" class="btn btn-primary">
                    <i class="bi bi-pencil-square"></i>
                    <span class="ms-2">Sửa</span>
                </RouterLink>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
.avatar {
    object-fit: contain;
    object-position: 50% 50%;
    width: 35px;
    height: 35px;
}

.customer-fullname:not(:hover):not(:active),
.user-fullname:not(:hover):not(:active) {
    text-decoration: none;
}

.user-fullname:hover {
    text-decoration: underline;
}
</style>