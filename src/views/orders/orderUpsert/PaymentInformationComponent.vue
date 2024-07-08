<script setup lang="ts">
// Interfaces.
interface Props {
    orderTotalAmount: number;
}

// Imports
import { computed, watch } from "vue";
import { OrderPaymentUpsertModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import { FormLabel, TextInput, MoneyInput, ValidationMessage } from "@/components/formInputs";

// Props.
const props = defineProps<Props>();

// Models.
const model = defineModel<OrderPaymentUpsertModel>({ required: true });

// Computed properties.
const totalAmountText = computed<string>(() => {
    return props.orderTotalAmount.toLocaleString().replaceAll(".", " ");
});

// Watch.
watch(model.value, () => model.value.hasBeenChanged = true);
</script>

<template>
    <MainBlock title="Thông tin thanh toán" :body-padding="[2, 3, 3, 3]">
        <template #body>
            <!-- Amount -->
            <div class="form-group">
                <FormLabel name="Số tiền đã thanh toán" required />
                <MoneyInput property-path="payment.amount" v-model="model.amount"
                        suffix=" vnđ" :min="0" />
                <ValidationMessage property-path="payment.amount" />
                <span class="opacity-50">
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
        </template>
    </MainBlock>
</template>