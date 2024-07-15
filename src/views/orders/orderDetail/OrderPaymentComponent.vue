<script setup lang="ts">
// Interface
interface Props {
    payment: DebtPaymentBasicModel;
    labelColumnClass: string;
}

// Imports.
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { DebtPaymentBasicModel } from "@/models";

// Form components.
import { FormLabel } from "@/components/formInputs";

// Props
const props = defineProps<Props>();

// Computed properties.
const idClass = computed<string>(() => {
    const color = props.payment.isClosed ? "danger" : "primary";
    return `bg-${color}-subtle border border-${color}-subtle \
            rounded px-2 py-1 text-${color} small fw-bold`;
});

const amountText = computed<string>(() => {
    return props.payment.amount.toLocaleString().replaceAll(".", " ") + "vnđ";
});

const isClosedClass = computed<string>(() => {
    return props.payment.isClosed ? "text-danger" : "text-primary";
});

const isClosedText = computed<string>(() => {
    return props.payment.isClosed ? "Đã khoá" : "Chưa khoá";
});

const userProfileRoute = computed<RouteLocationRaw>(() => {
    return {
        name: "userProfile",
        params: {
            userId: props.payment.user.id
        }
    };
});
</script>

<template><!-- PaymentId -->
    <div class="row g-3">
        <div :class="labelColumnClass">
            <FormLabel name="Mã số" />
        </div>
        <div class="col d-flex align-items-center">
            <!-- Id -->
            <span :class="idClass" class="me-4">
                #{{ payment.id }}
            </span>

            <!-- Edit button --> 
            <div class="col col-auto me-2" v-if="payment.authorization.canEdit">
                <button class="btn btn-outline-primary btn-sm">
                    <i class="bi bi-pencil-square"></i>
                </button>
            </div>

            <!-- Delete button --> 
            <div class="col col-auto" v-if="payment.authorization.canDelete">
                <button class="btn btn-outline-danger btn-sm">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- PaymentAmount -->
    <div class="row g-3 mt-3">
        <div :class="labelColumnClass">
            <FormLabel name="Số tiền" />
        </div>
        <div class="col">
            <span>{{ amountText }}</span>
        </div>
    </div>

    <!-- PaymentPaidDate -->
    <div class="row g-3 mt-3">
        <div :class="labelColumnClass">
            <FormLabel name="Ngày thanh toán" />
        </div>
        <div class="col">
            <span>{{ payment.paidDate }}</span>
        </div>
    </div>

    <!-- PaymentPaidTime -->
    <div class="row g-3 mt-3">
        <div :class="labelColumnClass">
            <FormLabel name="Giờ thanh toán" />
        </div>
        <div class="col">
            <span>{{ payment.paidTime }}</span>
        </div>
    </div>

    <!-- PaymentNote -->
    <div class="row g-3 mt-3" v-if="payment.note">
        <div :class="labelColumnClass">
            <FormLabel name="Ghi chú" />
        </div>
        <div class="col">
            <span>{{ payment.note }}</span>
        </div>
    </div>

    <!-- IsClosed -->
    <div class="row g-3 mt-3">
        <div :class="labelColumnClass">
            <FormLabel name="Tình trạng" />
        </div>
        <div class="col">
            <span :class="isClosedClass">
                {{ isClosedText }}
            </span>
        </div>
    </div>

    <!-- UserInCharge -->
    <div class="row gx-3 mt-3">
        <div :class="labelColumnClass" class="d-flex align-items-center">
            <FormLabel name="Nhân viên thu tiền" />
        </div>
        <div class="col d-flex justify-content-start
                    align-items-center h-100">
            <img :src="payment.user.avatarUrl"
                    class="img-thumbnail rounded-circle avatar me-2">
            <RouterLink :to="userProfileRoute"
                    class="user-fullname">
                {{ payment.user.fullName }}
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.avatar {
    object-fit: contain;
    object-position: 50% 50%;
    width: 35px;
    height: 35px;
}

.user-fullname:not(:hover):not(:active) {
    text-decoration: none;
}
</style>