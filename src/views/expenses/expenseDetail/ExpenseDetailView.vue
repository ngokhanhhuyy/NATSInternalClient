<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, type RouteLocationRaw, useRouter } from "vue-router";
import { ExpenseDetailModel } from "@/models";
import { useExpenseService } from "@/services/expenseService";
import { useViewStates } from "@/composables/viewStatesComposable";
import { useAlertModalStore } from "@/stores/alertModal";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import { FormLabel } from "@/components/formInputs";
import { ExpenseCategory } from "@/services/dtos/enums";
import { OperationError } from "@/services/exceptions";

// Dependencies.
const route = useRoute();
const router = useRouter();
const expenseService = useExpenseService();
const alertModalStore = useAlertModalStore();

// Model and internal states.
const model = await initialLoadAsync();
useViewStates();
const updateRoute: RouteLocationRaw = {
    name: "expenseUpdate",
    params: {
        expenseId: model.id
    }
};
const labelColumnClass = "col col-xl-2 col-lg-2 col-md-3 col-sm-4 col-12";

// Computed properties.
const idClass = computed<string>(() => {
    const color = model.isClosed ? "danger" : "primary";
    return `bg-${color}-subtle border border-${color}-subtle \
            rounded px-2 py-1 text-${color} small fw-bold`;
});

const categoryText = computed<string>(() => {
    switch (model.category) {
        case ExpenseCategory.Equipment:
            return "Trang thiết bị";
        case ExpenseCategory.Office:
            return "Thuê mặt bằng";
        case ExpenseCategory.Staff:
            return "Lương/thưởng";
        default:
        case ExpenseCategory.Utilities:
            return "Tiện ích";
    }
});

const userProfileRoute = computed<RouteLocationRaw>(() => ({
    name: "userProfile",
    params: {
        userId: model.user.id
    }
}));

const isClosedClass = computed<string>(() => model.isClosed ? "text-danger" : "text-primary");
const isClosedText = computed<string>(() => model.isClosed ? "Đã khoá" : "Chưa khoá");

// Functions.
async function initialLoadAsync(): Promise<ExpenseDetailModel> {
    const expenseId = parseInt(route.params.expenseId as string);
    const responseDto = await expenseService.getDetailAsync(expenseId);
    return reactive(new ExpenseDetailModel(responseDto));
}

async function deleteAsync(): Promise<void> {
    const answer = await alertModalStore.getDeleteConfirmationAsync();
    if (answer) {
        try {
            await expenseService.deleteAsync(model.id);
            await alertModalStore.getSubmitSuccessConfirmationAsync();
            await router.push({ name: "expenseList" });
        } catch (error) {
            if (error instanceof OperationError) {
                await alertModalStore.getSubmitErrorConfirmationAsync(error.errors);
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
            <!-- Expense detail -->
            <div class="col col-12">
                <MainBlock title="Chi tiết chi phí" close-button>
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

                        <!-- PaidDate -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Ngày thanh toán" />
                            </div>
                            <div class="col">
                                <span>{{ model.paidDate }}</span>
                            </div>
                        </div>

                        <!-- PaidTime -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Giờ thanh toán" />
                            </div>
                            <div class="col">
                                <span>{{ model.paidTime }}</span>
                            </div>
                        </div>

                        <!-- Category -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Phân loại" />
                            </div>
                            <div class="col">
                                <span>{{ categoryText }}</span>
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

                        <!-- PayeeName -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Thanh toán cho" />
                            </div>
                            <div class="col">
                                <span>{{ model.payeeName }}</span>
                            </div>
                        </div>

                        <!-- IsClosed -->
                        <div class="row g-3 mt-3">
                            <div :class="labelColumnClass">
                                <FormLabel name="Tình trạng" />
                            </div>
                            <div class="col">
                                <span :class="isClosedClass">{{ isClosedText }}</span>
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
                                <RouterLink :to="userProfileRoute" class="user-fullname">
                                    {{ model.user.fullName }}
                                </RouterLink>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>
        </div>

        <!-- Action buttons -->
        <div class="row g-3 justify-content-end mt-3">
            <!-- Delete button -->
            <div class="col col-auto">
                <button class="btn btn-outline-danger" @click="deleteAsync">
                    <i class="bi bi-trash3 me-2"></i>
                    <span>Xoá</span>
                </button>
            </div>
            
            <!-- Edit button -->
            <div class="col col-auto">
                <RouterLink :to="updateRoute" class="btn btn-primary">
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
</style>