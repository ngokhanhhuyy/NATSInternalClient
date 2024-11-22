<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, RouterLink, type RouteLocationRaw } from "vue-router";
import { ExpenseCategory } from "@enums";
import { ExpenseDetailModel } from "@/models/expenseModels";
import { useExpenseService } from "@/services/expenseService";
import { useViewStates } from "@/composables/viewStatesComposable";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";

// Dependencies.
const route = useRoute();
const expenseService = useExpenseService();
const amountUtility = useAmountUtility();

// Model and internal states.
const model = await initialLoadAsync();
useViewStates();
const labelColumnClass = "col col-12";

// Computed properties.
const idClass = computed<string>(() => {
    const color = model.isLocked ? "danger" : "primary";
    return `bg-${color}-subtle border border-${color}-subtle \
            rounded px-2 py-1 text-${color} small fw-bold`;
});

const categoryText = computeCategoryText();
const isClosedClass = computed<string>(() => model.isLocked ? "text-danger" : "text-primary");
const isClosedText = computed<string>(() => model.isLocked ? "Đã khoá" : "Chưa khoá");

// Functions.
async function initialLoadAsync(): Promise<ExpenseDetailModel> {
    const expenseId = parseInt(route.params.expenseId as string);
    const responseDto = await expenseService.getDetailAsync(expenseId);
    return reactive(new ExpenseDetailModel(responseDto));
}

function computeCategoryText(): string {
    switch (model.category) {
        case ExpenseCategory.Equipment:
            return "Trang thiết bị";
        case ExpenseCategory.Office:
            return "Thuê mặt bằng";
        case ExpenseCategory.Staff:
            return "Lương/thưởng";
        case ExpenseCategory.Utilities:
            return "Tiện ích";
    }
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-center">
            <!-- ResourceAccess -->
            <div class="col col-12">
                <ResourceAccess resource-type="Expense" :resource-primary-id="model.id"
                        accessMode="Detail" />
            </div>

            <!-- Expense detail -->
            <div class="col col-12">
                <MainBlock title="Chi tiết chi phí" close-button :body-padding="[2, 2, 2, 2]">
                    <template #body>
                        <!-- Id -->
                        <div class="row gx-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Mã số" />
                            </div>
                            <div class="col field">
                                <span :class="idClass">
                                    #{{ model.id }}
                                </span>
                            </div>
                        </div>

                        <!-- Amount -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Số tiền thanh toán" />
                            </div>
                            <div class="col field">
                                <span>
                                    {{ amountUtility.getDisplayText(model.amountAfterVat) }}
                                </span>
                            </div>
                        </div>

                        <!-- CreatedDateTime -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Ngày giờ tạo" />
                            </div>
                            <div class="col field">
                                <span>{{ model.createdDateTime.dateTime }}</span>
                                <span class="text-default opacity-50">
                                    ({{ model.createdDateTime.deltaText }})
                                </span>
                            </div>
                        </div>

                        <!-- StatsDateTime -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Ngày giờ thống kê" />
                            </div>
                            <div class="col field">
                                <span>{{ model.statsDateTime.dateTime }}</span>
                                <span class="text-default opacity-50">
                                    ({{ model.statsDateTime.deltaText }})
                                </span>
                            </div>
                        </div>

                        <!-- Category -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Phân loại" />
                            </div>
                            <div class="col field">
                                <span>{{ categoryText }}</span>
                            </div>
                        </div>

                        <!-- Note -->
                        <div class="row gx-3 mt-3" v-if="model.note">
                            <div :class="labelColumnClass">
                                <FormLabel text="Ghi chú" />
                            </div>
                            <div class="col field">
                                <span>{{ model.note }}</span>
                            </div>
                        </div>

                        <!-- PayeeName -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Thanh toán cho" />
                            </div>
                            <div class="col field">
                                <span>{{ model.payeeName }}</span>
                            </div>
                        </div>

                        <!-- IsClosed -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Tình trạng" />
                            </div>
                            <div class="col field">
                                <span :class="isClosedClass">{{ isClosedText }}</span>
                            </div>
                        </div>
                        
                        <!-- User -->
                        <div class="row gx-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Người tạo" />
                            </div>
                            <div class="col d-flex justify-content-start align-items-center">
                                <img :src="model.createdUser.avatarUrl"
                                        class="img-thumbnail rounded-circle avatar me-2">
                                <RouterLink :to="model.createdUser.detailRoute"
                                        class="user-fullname">
                                    {{ model.createdUser.fullName }}
                                </RouterLink>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>
        </div>

        <!-- Action buttons -->
        <div class="row g-3 justify-content-end">
            <!-- Edit button -->
            <div class="col col-auto">
                <RouterLink :to="model.updateRoute" class="btn btn-primary">
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

.user-fullname {
    text-decoration: none;
}

.user-fullname:hover {
    text-decoration: underline;
}

.field {
    color: var(--bs-primary);
}
</style>