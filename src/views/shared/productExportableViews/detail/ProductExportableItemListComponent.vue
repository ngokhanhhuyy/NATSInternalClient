<script setup lang="ts" generic="TItemModel extends IProductExportableDetailItemModel">
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Dependency.
const amountUtility = useAmountUtility();

// Model.
const model = defineModel<TItemModel[]>({ required: true });

// Computed property.
const productAmountBeforeVat = computeProductAmountBeforeVat();
const vatAmount = computeVatAmount();

console.log(productAmountBeforeVat, vatAmount);

// Function.
function getItemDetailText(item: IProductExportableDetailItemModel): string {
    const amount = amountUtility.getDisplayText(item.productAmountPerUnit);
    const quantity = item.quantity.toString();
    const unit = item.product!.unit.toLowerCase();
    const vatAmountPerUnit = item.vatAmountPerUnit;
    const productAmountPerUnit = item.productAmountPerUnit;
    const vatPercentage = Math.round(vatAmountPerUnit / productAmountPerUnit);
    return `${amount} × ${quantity} ${unit} (${vatPercentage}% VAT)`;
}

function computeProductAmountBeforeVat(): number {
    return model.value
        .reduce((vatAmount, item) => vatAmount + item.productAmountPerUnit * item.quantity, 0);
}

function computeVatAmount(): number {
    return model.value
        .reduce((vatAmount, item) => vatAmount + item.vatAmountPerUnit * item.quantity, 0);
}
</script>

<template>
    <MainBlock title="Sản phẩm" body-padding="0" class="h-100">
        <template #body>
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-transparent d-flex
                            justify-content-start align-items-center"
                        v-for="(item, index) in model" :key="index">
                    <!-- Index -->
                    <span class="bg-primary-subtle border border-primary-subtle rounded
                                px-2 py-1 text-primary small fw-bold">
                        #{{ index + 1 }}
                    </span>

                    <!-- Thumbnail -->
                    <img class="img-thumbnail product-thumbnail mx-3"
                            :src="item.product!.thumbnailUrl">

                    <!-- Detail -->
                    <div class="detail d-flex flex-column small flex-fill
                                align-self-stretch py-1">
                        <!-- ProductName -->
                        <span class="product-name fw-bold">
                            {{ item.product!.name }}
                        </span>

                        <!-- ItemDetail -->
                        <span>{{ getItemDetailText(item) }}</span>
                    </div>
                </li>
                <li class="list-group-item bg-primary bg-opacity-10 rounded-bottom-3
                            text-primary d-flex justify-content-end px-3 py-1">
                    {{ amountUtility.getDisplayText(productAmountBeforeVat) }} +&nbsp;
                    {{ amountUtility.getDisplayText(vatAmount) }} VAT =&nbsp;
                    <strong>
                        {{ amountUtility.getDisplayText(productAmountBeforeVat + vatAmount) }}
                    </strong>
                </li>
            </ul>
        </template>
    </MainBlock>
</template>

<style scoped>
.product-thumbnail {
    object-fit: contain;
    object-position: 50% 50%;
    width: 55px;
    height: 55px;
}

.margin-negative-1px {
    margin: -1px;
}
</style>