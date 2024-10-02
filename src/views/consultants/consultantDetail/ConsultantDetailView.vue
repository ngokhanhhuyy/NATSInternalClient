<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, type RouteLocationRaw } from "vue-router";
import { ConsultantDetailModel } from "@/models";
import { useConsultantService } from "@/services/consultantService";
import { useAuthorizationService } from "@/services/authorizationService";
import { useViewStates } from "@/composables";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import { FormLabel } from "@/components/formInputs";

// Child component.
import ConsultantUpdateHistory from "./ConsultantUpdateHistoryComponent.vue";

// Dependencies.
const route = useRoute();
const consultantService = useConsultantService();
const authorizationService = useAuthorizationService();

// Model and internal states.
const model = await initialLoadAsync();
useViewStates();
const updateRoute: RouteLocationRaw = {
    name: "consultantUpdate",
    params: {
        consultantId: model.id
    }
};
const labelColumnClass = "col col-xl-2 col-lg-2 col-md-3 col-sm-4 col-12";

// Computed properties.
const idClass = computed<string>(() => {
    const color = model.isLocked ? "danger" : "primary";
    return `bg-${color}-subtle border border-${color}-subtle \
            rounded px-2 py-1 text-${color} small fw-bold`;
});

const userProfileRoute = computed<RouteLocationRaw>(() => ({
    name: "userProfile",
    params: {
        userId: model.user.id
    }
}));

const customerDetailRoute = computed<RouteLocationRaw>(() => ({
    name: "customerDetail",
    params: {
        customerId: model.customer.id
    }
}));

const isClosedClass = computed<string>(() => model.isLocked ? "text-danger" : "text-primary");
const isClosedText = computed<string>(() => model.isLocked ? "Đã khoá" : "Chưa khoá");

const updateHistoriesVisible = computed<boolean>(() => {
    return !!(model.authorization.canAccessUpdateHistories
        && model.updateHistories && model.updateHistories.length);
});

// Functions.
async function initialLoadAsync(): Promise<ConsultantDetailModel> {
    const expenseId = parseInt(route.params.consultantId as string);
    const responseDto = await consultantService.getDetailAsync(expenseId);
    return reactive(new ConsultantDetailModel(responseDto));
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-center">
            <!-- Consultant detail -->
            <div class="col col-12">
                <MainBlock title="Chi tiết tư vấn" close-button>
                    <template #body>
                        <!-- Id -->
                        <div class="row g-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Mã số" />
                            </div>
                            <div class="col">
                                <span :class="idClass">
                                    #{{ model.id }}
                                </span>
                            </div>
                        </div>

                        <!-- Amount -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Số tiền thanh toán" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ model.amount.toLocaleString().replaceAll(".", " ") }}đ
                                </span>
                            </div>
                        </div>

                        <!-- PaidDateTime -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Thanh toán lúc" />
                            </div>
                            <div class="col">
                                <span>{{ model.paidDateTime }}</span>
                            </div>
                        </div>

                        <!-- Note -->
                        <div class="row g-3 mt-3" v-if="model.note">
                            <div :class="labelColumnClass">
                                <FormLabel name="Ghi chú" />
                            </div>
                            <div class="col">
                                <span>{{ model.note }}</span>
                            </div>
                        </div>

                        <!-- IsLocked -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Tình trạng" />
                            </div>
                            <div class="col">
                                <span :class="isClosedClass">{{ isClosedText }}</span>
                            </div>
                        </div>
                        
                        <!-- Customer -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Khách hàng" />
                            </div>
                            <div class="col">
                                <RouterLink :to="customerDetailRoute" class="customer-fullname">
                                    {{ model.customer.fullName }}
                                </RouterLink>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Created user and datetime -->
            <div class="col col-12 mt-3">
                <MainBlock title="Ngày giờ, nhân viên tạo">
                    <template #body>
                        <!-- User -->
                        <div class="row g-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Nhân viên tạo" />
                            </div>
                            <div class="col">
                                <RouterLink :to="userProfileRoute" class="user-username">
                                    {{ model.user.userName }}
                                </RouterLink>
                            </div>
                        </div>

                        <!-- CreatedDateTime -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Được tạo lúc" />
                            </div>
                            <div class="col">
                                <span>{{ model.createdDateTime }}</span>
                            </div>
                        </div>

                        <!-- LastUpdatedDateTime -->
                        <div class="row g-3 mt-3" v-if="model.lastUpdatedDateTime">
                            <div :class="labelColumnClass">
                                <FormLabel name="Cập nhật lúc" />
                            </div>
                            <div class="col">
                                <span>{{ model.lastUpdatedDateTime }}</span>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Consultant update histories -->
            <div class="col col-12 mt-3" v-if="updateHistoriesVisible">
                <ConsultantUpdateHistory v-model="model.updateHistories!" />
            </div>
        </div>

        <!-- Action buttons -->
        <div class="row g-3 justify-content-end mt-3">
            <!-- Edit button -->
            <div class="col col-auto">
                <RouterLink :to="updateRoute" class="btn btn-primary"
                        v-if="authorizationService.canEditConsultant()">
                    <i class="bi bi-pencil-square me-2"></i>
                    <span>Sửa</span>
                </RouterLink>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
.avatar {
    width: 35px;
    height: 35px;
}

.customer-fullname, .user-username {
    text-decoration: none;
}

.customer-fullname:hover, .user-username:hover {
    text-decoration: underline;
}
</style>