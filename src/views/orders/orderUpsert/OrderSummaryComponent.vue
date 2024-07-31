<script setup lang="ts">
// Interface.
interface Props {
    isForCreating: boolean;
}

// Imports.
import { computed } from "vue";
import { Gender } from "@/services/dtos/enums";
import { OrderItemModel, OrderUpsertModel } from "@/models";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

// Layout components.
import { MainBlock, SubBlock } from "@/views/layouts";

// Form components.
import { FormLabel } from "@/components/formInputs";

// Dependencies.
const dateTimeUtility = useDateTimeUtility();

// Props.
defineProps<Props>();

// Model and states.
const model = defineModel<OrderUpsertModel>({ required: true });
const labelColumnClass = "col col-lg-3 col-md-4 col-12";

// Computed properties.
const orderedDateTimeText = computed<string | null>(() => {
    let requestDtoText = "";
    if (model.value.paidDateTime) {
        requestDtoText = dateTimeUtility.getRequestDtoDateTimeString(model.value.paidDateTime);
        return dateTimeUtility.getDisplayDateTimeString(requestDtoText); 
    }
    return null;
});

const totalAmountBeforeVAT = computed<number>(() => {
    return model.value.items
        .map(i => (i.amount + (i.amount * (i.vatPercentage / 100))) * i.quantity)
        .reduce((totalAmount, amount) => totalAmount + amount, 0);
});

const vatAmount = computed<number>(() => {
    return model.value.items
        .map(i => (i.amount * (i.vatPercentage / 100)) * i.quantity)
        .reduce((totalAmount, amount) => totalAmount + amount, 0);
});

const totalAmountAfterVAT = computed<number>(() => totalAmountBeforeVAT.value + vatAmount.value);

const totalPaidAmount = computed<number>(() => {
    return model.value.paidAmount + (model.value.payment?.amount ?? 0);
});

const customerGenderClass = computed<string | null>(() => {
    if (model.value.customer != null) {
        if (model.value.customer!.gender === Gender.Male) {
            return "text-primary";
        }
        return "text-danger";
    }
    return null;
});

const customerGenderText = computed<string>(() => {
    return model.value.customer!.gender === Gender.Male
        ? "Nam"
        : "Nữ";
});

// Functions.
function getAmountText(amount: number): string {
    return amount.toLocaleString().replaceAll(".", " ") + " vnđ";
};

function getItemDetailText(item: OrderItemModel): string {
    const amountPerUnit = getAmountText(item.amount);
    const vatAmountText = getAmountText(item.amount * (item.vatPercentage / 100));
    const amountAfterVATText = getAmountText((item.amount +
            (item.amount * (item.vatPercentage / 100))) * item.quantity);
    const quantityText = item.quantity.toString() + " " + item.product!.unit.toLowerCase();
    return `${amountPerUnit} + ${vatAmountText} (VAT) x ${quantityText} = ${amountAfterVATText}`;
}
</script>

<template>
    <MainBlock title="Tổng quan đơn hàng" body-padding="0" :body-border="false">
        <template #body>
            <!-- OrderInformation -->
            <SubBlock title="Thông tin đơn hàng" border-top="0">
                <!-- OrderedDateTime -->
                <div class="row g-3">
                    <div :class="labelColumnClass">
                        <FormLabel name="Ngày đặt hàng" />
                    </div>
                    <div class="col">
                        <span v-if="orderedDateTimeText">{{ orderedDateTimeText }}</span>
                        <span class="opacity-50" v-else>Chưa nhập ngày đặt hàng</span>
                    </div>
                </div>
                
                <!-- Note -->
                <div class="row g-3 mt-3">
                    <div :class="labelColumnClass">
                        <FormLabel name="Ghi chú" />
                    </div>
                    <div class="col">
                        <span v-if="model.note">{{ model.note }}</span>
                        <span class="opacity-50" v-else>Không có ghi chú</span>
                    </div>
                </div>

                <!-- TotalAmountBeforeVAT -->
                <div class="row g-3 mt-3">
                    <div :class="labelColumnClass">
                        <FormLabel name="Tổng giá đơn hàng (trước thuế)" />
                    </div>
                    <div class="col">
                        <span :class='!totalAmountBeforeVAT ? "text-danger" : null'>
                            {{ getAmountText(totalAmountBeforeVAT) }}
                        </span>
                    </div>
                </div>

                <!-- VATAmount -->
                <div class="row g-3 mt-3">
                    <div :class="labelColumnClass">
                        <FormLabel name="Tổng thuế" />
                    </div>
                    <div class="col">
                        <span>
                            {{ getAmountText(vatAmount) }}
                        </span>
                    </div>
                </div>

                <!-- TotalAmountAfterVAT -->
                <div class="row g-3 mt-3">
                    <div :class="labelColumnClass">
                        <FormLabel name="Tổng giá đơn hàng (sau thuế)" />
                    </div>
                    <div class="col">
                        <span :class='!totalAmountAfterVAT ? "text-danger" : null'>
                            {{ getAmountText(totalAmountAfterVAT) }}
                        </span>
                    </div>
                </div>
            </SubBlock>

            <!-- Customer information -->
            <SubBlock title="Thông tin khách hàng">
                <div class="w-100" v-if="model.customer != null">
                    <!-- FullName -->
                    <div class="row g-3">
                        <div :class="labelColumnClass">
                            <FormLabel name="Tên đầy đủ" />
                        </div>
                        <div class="col">
                            <span>{{ model.customer?.fullName }}</span>
                        </div>
                    </div>

                    <!-- NickName -->
                    <div class="row g-3 mt-3" v-if="model.customer.nickName">
                        <div :class="labelColumnClass">
                            <FormLabel name="Biệt danh" />
                        </div>
                        <div class="col">
                            <span>{{ model.customer?.nickName }}</span>
                        </div>
                    </div>

                    <!-- Gender -->
                    <div class="row g-3 mt-3">
                        <div :class="labelColumnClass">
                            <FormLabel name="Giới tính" />
                        </div>
                        <div class="col">
                            <span :class="customerGenderClass">{{ customerGenderText }}</span>
                        </div>
                    </div>

                    <!-- PhoneNumber -->
                    <div class="row g-3 mt-3" v-if="model.customer.phoneNumber">
                        <div :class="labelColumnClass">
                            <FormLabel name="Số điện thoại" />
                        </div>
                        <div class="col">
                            <span>{{ model.customer.phoneNumber }}</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center
                            p-4 text-danger" v-else>
                    Chưa chọn khách hàng
                </div>
            </SubBlock>

            <!-- Product information -->
            <SubBlock title="Danh sách sản phẩm">
                <div v-if="model.items.length">
                    <div class="row g-3" v-for="(item, index) in model.items" :key="index">
                        <div class="col col-1 d-flex align-items-center">
                            {{ index + 1 }}.
                        </div>
                        <div class="col d-flex flex-column">
                            <span class="fw-bold">{{ item.product!.name }}</span>
                            <span class="small">{{ getItemDetailText(item) }}</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center
                            p-4 text-danger" v-else>
                    Chưa chọn sản phẩm
                </div>
            </SubBlock>

            <!-- Payment information -->
            <SubBlock title="Thông tin thanh toán" rounded-bottom>
                <!-- TotalPaidAmount -->
                <div class="row g-3">
                    <div :class="labelColumnClass">
                        <FormLabel name="Tổng số tiền đã thanh toán" />
                    </div>
                    <div class="col">
                        <span>{{ getAmountText(totalPaidAmount) }}</span>
                    </div>
                </div>
            </SubBlock>
        </template>
    </MainBlock>
</template>

<style scoped>
.customer-avatar {
    width: 80px;
    height: 80px;
    object-fit: cover;
    object-position: 50% 50%;
    aspect-ratio: 1;
}
</style>