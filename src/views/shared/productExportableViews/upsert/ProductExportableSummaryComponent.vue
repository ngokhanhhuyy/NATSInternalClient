<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts" generic="TUpsertModel extends IProductExportableUpsertModel">
import { computed, inject } from "vue";
import { Gender } from "@/services/dtos/enums";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";
import SubBlock from "@layouts/SubBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const amountUtility = useAmountUtility();

// Model and states.
const model = defineModel<TUpsertModel>({ required: true });
const labelColumnClass = "col col-lg-3 col-md-4 col-12";
const resourceDisplayName = inject<string>("resourceDisplayName")!;

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

function getItemDetailText(item: IProductExportableUpsertItemModel): string {
    const amountPerUnit = amountUtility.getDisplayText(
        item.productAmountPerUnit + item.vatAmountPerUnit);
    const vatPercentagePerUnit = item.vatPercentagePerUnit;
    const amountAfterVATText = amountUtility.getDisplayText(
        (item.productAmountPerUnit + item.vatAmountPerUnit) * item.quantity);
    const quantityText = item.quantity.toString() + " " + item.product!.unit.toLowerCase();
    return `${amountPerUnit} (${vatPercentagePerUnit}% VAT) x ${quantityText}` +
        ` = ${amountAfterVATText}`;
}
</script>

<template>
    <MainBlock :title="`Tổng quan ${resourceDisplayName.toLowerCase()}`"
            body-padding="0" :body-border="false">
        <template #body>
            <!-- Information -->
            <SubBlock :title="`Thông tin ${resourceDisplayName.toLowerCase()}`" border-top="0"
                    body-padding="2">
                <!-- StatsDateTime -->
                <div class="row gx-3 gy-0">
                    <div :class="labelColumnClass">
                        <FormLabel name="Ngày đặt hàng" />
                    </div>
                    <div class="col">
                        <span v-if="model.statsDateTime.displayText">
                            {{ model.statsDateTime.dateDisplayText }}
                        </span>
                        <span class="opacity-50" v-else>Chưa nhập ngày đặt hàng</span>
                    </div>
                </div>
                
                <!-- Note -->
                <div class="row gx-3 gy-0 mt-3">
                    <div :class="labelColumnClass">
                        <FormLabel name="Ghi chú" />
                    </div>
                    <div class="col">
                        <span v-if="model.note">{{ model.note }}</span>
                        <span class="opacity-50" v-else>Không có ghi chú</span>
                    </div>
                </div>

                <slot :model="model" :labelColumnClass="labelColumnClass">
                </slot>

                <!-- AmountBeforeVat -->
                <div class="row gx-3 gy-0 mt-3">
                    <div :class="labelColumnClass">
                        <FormLabel name="Tổng giá (trước thuế)" />
                    </div>
                    <div class="col">
                        <span :class='!model.amountBeforeVat ? "text-danger" : null'>
                            {{ amountUtility.getDisplayText(model.amountBeforeVat) }}
                        </span>
                    </div>
                </div>

                <!-- VatAmount -->
                <div class="row gx-3 gy-0 mt-3">
                    <div :class="labelColumnClass">
                        <FormLabel name="Tổng thuế" />
                    </div>
                    <div class="col">
                        <span>
                            {{ amountUtility.getDisplayText(model.vatAmount) }}
                        </span>
                    </div>
                </div>

                <!-- AmountAfterVat -->
                <div class="row gx-3 gy-0 mt-3">
                    <div :class="labelColumnClass">
                        <FormLabel name="Tổng giá (sau thuế)" />
                    </div>
                    <div class="col">
                        <span :class='!model.amountAfterVat ? "text-danger" : null'>
                            {{ amountUtility.getDisplayText(model.amountAfterVat) }}
                        </span>
                    </div>
                </div>

                <!-- UpdateReason -->
                <div class="row gx-3 gy-0 mt-3" v-if="!props.isForCreating">
                    <div :class="labelColumnClass">
                        <FormLabel name="Lý do chỉnh sửa" />
                    </div>
                    <div class="col">
                        <span :class='!model.updatedReason ? "text-danger" : null'>
                            {{ model.updatedReason || "Chưa khai báo" }}
                        </span>
                    </div>
                </div>
            </SubBlock>

            <!-- Customer information -->
            <SubBlock title="Thông tin khách hàng" body-padding="2">
                <div class="w-100" v-if="model.customer != null">
                    <!-- FullName -->
                    <div class="row gx-3 gy-0">
                        <div :class="labelColumnClass">
                            <FormLabel name="Tên đầy đủ" />
                        </div>
                        <div class="col">
                            <span>{{ model.customer?.fullName }}</span>
                        </div>
                    </div>

                    <!-- NickName -->
                    <div class="row gx-3 gy-0 mt-3" v-if="model.customer.nickName">
                        <div :class="labelColumnClass">
                            <FormLabel name="Biệt danh" />
                        </div>
                        <div class="col">
                            <span>{{ model.customer?.nickName }}</span>
                        </div>
                    </div>

                    <!-- Gender -->
                    <div class="row gx-3 gy-0 mt-3">
                        <div :class="labelColumnClass">
                            <FormLabel name="Giới tính" />
                        </div>
                        <div class="col">
                            <span :class="customerGenderClass">{{ customerGenderText }}</span>
                        </div>
                    </div>

                    <!-- PhoneNumber -->
                    <div class="row gx-3 gy-0 mt-3" v-if="model.customer.phoneNumber">
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
            <SubBlock title="Danh sách sản phẩm" body-padding="2" rounded-bottom>
                <div v-if="model.items.length">
                    <div class="row gx-3 gy-0" v-for="(item, index) in model.items"
                            :key="index">
                        <div class="col col-1 d-flex align-items-center">
                            {{ index + 1 }}.
                        </div>
                        <div class="col col-auto py-2">
                            <img class="img-thumbnail product-thumbnail"
                                    :src="item.product.thumbnailUrl" />
                        </div>
                        <div class="col d-flex flex-column justify-content-center">
                            <span class="fw-bold d-block">{{ item.product!.name }}</span>
                            <span class="small d-block">{{ getItemDetailText(item) }}</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center
                            p-4 text-danger" v-else>
                    Chưa chọn sản phẩm
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

.product-thumbnail {
    width: 50px;
    height: 50px;
}
</style>