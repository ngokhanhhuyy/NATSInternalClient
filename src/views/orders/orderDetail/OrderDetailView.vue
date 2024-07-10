<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, type RouteLocationRaw } from "vue-router";
import { OrderDetailModel } from "@/models";
import { useOrderService } from "@/services/orderService";
import { useAuthorizationService } from "@/services/authorizationService";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import { FormLabel } from "@/components/formInputs";

// Child components.
import OrderPayment from "./OrderPaymentComponent.vue";
import OrderItem from "./OrderItemComponent.vue";

// Dependencies.
const route = useRoute();
const orderService = useOrderService();
const authorizationService = useAuthorizationService();

// Model and internal states.
const model = await initialLoadAsync();
useViewStates();
const labelColumnClass = "col col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12";

// Computed properties.
const orderUpdateRoute = computed<RouteLocationRaw>(() => ({
    name: "orderUpdate",
    params: {
        orderId: model.id
    }
}));

const customerDetailRoute = computed<RouteLocationRaw>(() => ({
    name: "customerDetail",
    params: {
        customerId: model.customer.id
    }
}));

// Functions.
async function initialLoadAsync(): Promise<OrderDetailModel> {
    const orderId = parseInt(route.params.orderId as string);
    const responseDto = await orderService.getDetailAsync(orderId);
    return reactive(new OrderDetailModel(responseDto));
}

function getIdClass(isClosed: boolean): string {
    const color = isClosed ? "danger" : "primary";
    return `bg-${color}-subtle border border-${color}-subtle \
            rounded px-2 py-1 text-${color} small fw-bold`;
}

function getAmountText(amount: number): string {
    return amount.toLocaleString().replaceAll(".", " ") + "vnđ";
}

function getIsClosedClass(isClosed: boolean): string {
    return isClosed ? "text-danger" : "text-primary";
}

function getIsClosedText(isClosed: boolean): string {
    return isClosed ? "Đã khoá" : "Chưa khoá";
}

function getUserProfileRoute(userId: number): RouteLocationRaw {
    return {
        name: "userProfile",
        params: {
            userId: userId
        }
    };
};
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-start">
            <!-- Order detail -->
            <div class="col col-12">
                <MainBlock title="Chi tiết đơn đặt hàng" close-button>
                    <template #body>
                        <!-- Id -->
                        <div class="row g-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Mã số" />
                            </div>
                            <div class="col">
                                <span :class="getIdClass(model.isClosed)">
                                    #{{ model.id }}
                                </span>
                            </div>
                        </div>

                        <!-- OrderedDate -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Ngày đặt hàng" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ model.orderedDate }}
                                </span>
                            </div>
                        </div>

                        <!-- OrderedTime -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Giờ đặt hàng" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ model.orderedTime }}
                                </span>
                            </div>
                        </div>

                        <!-- ItemAmount -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Tổng giá tiền" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ getAmountText(model.itemAmount) }}
                                </span>
                            </div>
                        </div>

                        <!-- PaidAmount -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Đã thanh toán" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ getAmountText(model.paidAmount) }}
                                </span>
                            </div>
                        </div>

                        <!-- Note -->
                        <div class="row g-3 mt-3" v-if="model.note">
                            <div :class="labelColumnClass">
                                <FormLabel name="Ghi chú" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ model.note }}
                                </span>
                            </div>
                        </div>

                        <!-- IsClosed -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Tình trạng" />
                            </div>
                            <div class="col">
                                <span :class="getIsClosedClass(model.isClosed)">
                                    {{ getIsClosedText(model.isClosed) }}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Customer -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Khách hàng" />
                            </div>
                            <div class="col d-flex justify-content-start align-items-center">
                                <img :src="model.customer.avatarUrl"
                                        class="img-thumbnail rounded-circle avatar me-2">
                                <RouterLink :to="customerDetailRoute" class="customer-fullname">
                                    {{ model.customer.fullName }}
                                </RouterLink>
                            </div>
                        </div>
                        
                        <!-- User -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Người tạo" />
                            </div>
                            <div class="col d-flex justify-content-start align-items-center">
                                <img :src="model.user.avatarUrl"
                                        class="img-thumbnail rounded-circle avatar me-2">
                                <RouterLink :to="getUserProfileRoute(model.user.id)"
                                        class="user-fullname">
                                    {{ model.user.fullName }}
                                </RouterLink>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Order items -->
            <div class="col col-12 mt-3">
                <MainBlock title="Sản phẩm" body-padding="0" class="h-100">
                    <template #body>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item bg-transparent d-flex
                                        justify-content-start align-items-center"
                                    v-for="(item, index) in model.items" :key="item.id!">
                                <OrderItem :item="item" :index="index" />
                            </li>
                        </ul>
                    </template>
                </MainBlock>
            </div>

            <!-- Order payments -->
            <div class="col col-12 mt-3">
                <MainBlock title="Thanh toán" body-padding="0" class="h-100">
                    <template #body>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item bg-transparent d-flex
                                        flex-column align-items-stretch"
                                    v-for="payment in model.payments" :key="payment.id">
                                <OrderPayment :payment="payment"
                                        :label-column-class="labelColumnClass" />
                            </li>
                        </ul>
                    </template>
                </MainBlock>
            </div>
        </div>
        
        <!-- Action buttons -->
        <div class="row gx-3 justify-content-end mt-3" v-if="authorizationService.canEditOrder()">
            <div class="col col-auto">
                <RouterLink :to="orderUpdateRoute" class="btn btn-primary">
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