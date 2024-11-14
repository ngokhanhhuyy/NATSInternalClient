<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { ConsultantDetailModel } from "@/models/consultantModels";
import { useConsultantService } from "@/services/consultantService";
import { useViewStates } from "@/composables/viewStatesComposable";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";

// Child component.
import UpdateHistories from "./UpdateHistoriesComponent.vue";

// Dependencies.
const route = useRoute();
const service = useConsultantService();
const amountUtility = useAmountUtility();

// Model and internal states.
const model = await initialLoadAsync();
useViewStates();
const labelColumnClass = "col col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-4 col-12";

// Computed properties.
const idClass = computed<string>(() => {
    const color = model.isLocked ? "danger" : "primary";
    return `bg-${color}-subtle border border-${color}-subtle \
            rounded px-2 py-1 text-${color} small fw-bold`;
});

const isClosedClass = computed<string>(() => model.isLocked ? "text-danger" : "text-primary");
const isClosedText = computed<string>(() => model.isLocked ? "Đã khoá" : "Chưa khoá");

// Functions.
async function initialLoadAsync(): Promise<ConsultantDetailModel> {
    const expenseId = parseInt(route.params.consultantId as string);
    const responseDto = await service.getDetailAsync(expenseId);
    return reactive(new ConsultantDetailModel(responseDto));
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-center">
            <!-- Consultant detail -->
            <div class="col col-12">
                <MainBlock title="Chi tiết tư vấn" :body-padding="[0, 2, 2, 2]" close-button>
                    <template #body>
                        <!-- Id -->
                        <div class="row gx-3 mt-2">
                            <div :class="labelColumnClass">
                                <FormLabel text="Mã số" />
                            </div>
                            <div class="col">
                                <span :class="idClass">
                                    #{{ model.id }}
                                </span>
                            </div>
                        </div>

                        <!-- AmountBeforeVat -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Số tiền trước thuế" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ amountUtility.getDisplayText(model.amountBeforeVat) }}
                                </span>
                            </div>
                        </div>

                        <!-- AmountBeforeVat -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Thuế VAT" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ amountUtility.getDisplayText(model.vatAmount) }}
                                </span>
                            </div>
                        </div>

                        <!-- StatsDateTime -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Thanh toán lúc" />
                            </div>
                            <div class="col">
                                <span>{{ model.statsDateTime.dateTime }}</span>
                            </div>
                        </div>

                        <!-- Note -->
                        <div class="row gx-3 mt-3" v-if="model.note">
                            <div :class="labelColumnClass">
                                <FormLabel text="Ghi chú" />
                            </div>
                            <div class="col">
                                <span>{{ model.note }}</span>
                            </div>
                        </div>

                        <!-- IsLocked -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Tình trạng" />
                            </div>
                            <div class="col">
                                <span :class="isClosedClass">{{ isClosedText }}</span>
                            </div>
                        </div>
                        
                        <!-- Customer -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Khách hàng" />
                            </div>
                            <div class="col">
                                <RouterLink :to="model.customer.detailRoute"
                                        class="customer-fullname">
                                    {{ model.customer.fullName }}
                                </RouterLink>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Created user and datetime -->
            <div class="col col-12">
                <MainBlock title="Ngày giờ, nhân viên tạo" :body-padding="[0, 2, 2, 2]">
                    <template #body>
                        <!-- User -->
                        <div class="row gx-3 mt-2">
                            <div :class="labelColumnClass">
                                <FormLabel text="Nhân viên tạo" />
                            </div>
                            <div class="col">
                                <RouterLink :to="model.createdUser.detailRoute"
                                        class="user-username">
                                  {{ model.createdUser.userName }}
                                </RouterLink>
                            </div>
                        </div>

                        <!-- CreatedDateTime -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Được tạo lúc" />
                            </div>
                            <div class="col">
                                <span>{{ model.createdDateTime.dateTime }}</span>
                            </div>
                        </div>

                        <!-- LastUpdatedDateTime -->
                        <div class="row gx-3 mt-3" v-if="model.lastUpdatedDateTime">
                            <div :class="labelColumnClass">
                                <FormLabel text="Cập nhật lúc" />
                            </div>
                            <div class="col">
                                <span>{{ model.lastUpdatedDateTime.dateTime }}</span>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Consultant update histories -->
            <div class="col col-12"
                    v-if="model.updateHistories && model.updateHistories.length">
                <UpdateHistories v-model="model.updateHistories" />
            </div>
        </div>

        <!-- Action buttons -->
        <div class="row g-3 justify-content-end">
            <!-- Edit button -->
            <div class="col col-auto">
                <RouterLink :to="model.updateRoute" class="btn btn-primary"
                        v-if="model.authorization.canEdit">
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