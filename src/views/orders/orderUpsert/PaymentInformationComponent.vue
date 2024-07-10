<script setup lang="ts">
// Interfaces.
interface Props {
    orderTotalAmount: number;
}

interface Emits {
    (event: "paymentCreateRequested"): void;
    (event: "paymentDeleteRequested"): void;
}

// Imports
import { computed } from "vue";
import { OrderPaymentUpsertModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, TextInput, MoneyInput,
    ValidationMessage } from "@/components/formInputs";

// Props and emits.
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Models.
const model = defineModel<OrderPaymentUpsertModel | null>({ required: true });

// Computed properties.
const totalAmountText = computed<string>(() => {
    return props.orderTotalAmount.toLocaleString().replaceAll(".", " ");
});

// Functions.
function onCreateButtonClicked(): void {
    emit("paymentCreateRequested");
}

function onDeleteButtonClicked(): void {
    emit("paymentDeleteRequested");
}
</script>

<template>
    <MainBlock title="Thông tin thanh toán" body-padding="0">
        <!-- Header -->
        <template #header>
            <!-- Delete button -->
            <button class="btn btn-danger btn-sm" @click="onDeleteButtonClicked"
                    v-if="model">
                <i class="bi bi-trash3"></i>
                <span class="ms-2">Xoá thanh toán</span>
            </button>
            <button class="btn btn-primary btn-sm" @click="onCreateButtonClicked" v-else>
                <i class="bi bi-plus-lg"></i>
                <span class="ms-2">Thêm thanh toán</span>
            </button>
        </template>

        <!-- Body -->
        <template #body>
            <div class="p-3 pt-2" v-if="model != null">
                <!-- Amount -->
                <div class="form-group">
                    <FormLabel name="Số tiền đã thanh toán" required />
                    <MoneyInput property-path="payment.amount" v-model="model.amount"
                            suffix=" vnđ" :min="0" />
                    <ValidationMessage property-path="payment.amount" />
                    <span class="opacity-50 d-block">
                        Tổng số tiền đơn hàng: {{ totalAmountText }} vnđ
                    </span>
                </div>

                <!-- Note -->
                <div class="form-group mt-3">
                    <FormLabel name="Ghi chú" />
                    <TextInput type="textarea" property-path="payment.note"
                            v-model="model.note" maxlength="255"
                            placeholder="Ghi chú ..." />
                </div>
            </div>
            
            <!-- Fallback -->
            <div class="p-4 text-center" v-else>
                <span class="opacity-50">Không có thông tin thanh toán</span>
            </div>
        </template>
    </MainBlock>
</template>