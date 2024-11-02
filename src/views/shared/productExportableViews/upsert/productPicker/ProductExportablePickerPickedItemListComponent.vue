<script setup lang="ts">
// Interface
interface Emits {
    (event: "unpicked", productId: number): void;
} 

interface Amounts {
    itemsAmount: number;
    vatAmount: number;
    totalAmount: number;
}

// Imports.
import { computed } from "vue";
import { useAmountUtility } from "@/utilities/amountUtility";

// Form components.
import MoneyInput from "@forms/MoneyInputComponent.vue";

// Emits.
const emit = defineEmits<Emits>();

// Dependencies.
const amountUtility = useAmountUtility();

// Model.
const model = defineModel<IProductExportableUpsertItemModel[]>({ required: true });

// Computed properties.
const amounts = computed<Amounts>(() => {
    let itemsAmount = 0, vatAmount = 0;
    model.value?.forEach(i => {
        itemsAmount += i.productAmountPerUnit * i.quantity;
        vatAmount += i.vatAmountPerUnit * i.quantity;
    });

    return {
        itemsAmount: itemsAmount,
        vatAmount: vatAmount,
        totalAmount: itemsAmount + vatAmount
    };
});
</script>

<template>
    <ul class="list-group list-group-flush" v-if="model.length">
        <li class="list-group-item bg-transparent d-flex"
                v-for="(item, index) in model" :key="index">
            <!-- Thumbnail -->
            <img class="img-thumbnail item-product-thumbnail me-2"
                    :src="item.product?.thumbnailUrl" />

            <!-- Detail -->
            <div class="detail w-100">
                <!-- Upper row -->
                <span class="product-name fw-bold">
                    {{ item.product!.name }}
                </span>

                <!-- Lower row -->
                <div class="d-flex justify-content-end w-100">
                    <!-- Inputs -->
                    <div class="input-group input-group-sm flex-fill">
                        <!-- Amount input -->
                        <MoneyInput :name="`items[${index}].amount`"
                                class="text-end amount-input"
                                v-model="item.productAmountPerUnit"
                                suffix=" vnđ" :min="0" />

                        <!-- VatFactor input -->
                        <MoneyInput :name="`items[${index}].vatFactor`"
                                class="text-end vat-factor-input"
                                v-model="item.vatPercentagePerUnit"
                                suffix="%" :min="0" :max="100" />
                        
                        <!-- Quantity input -->
                        <MoneyInput :name="`items[${index}].quantity`"
                                class="text-end quantity-input"
                                v-model="item.quantity" prefix="×" :min="1" :max="99" />
                    </div>

                    <!-- Unpick button -->
                    <button class="btn btn-outline-danger btn-sm ms-2"
                            @click='emit("unpicked", item.product.id)'>
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
            </div>
        </li>

        <!-- Total amount calculation -->
        <li class="list-group-item d-flex flex-column align-items-end small">
            <span>{{ amountUtility.getDisplayText(amounts.itemsAmount) }}</span>
            <span>VAT {{ amountUtility.getDisplayText(amounts.vatAmount) }}</span>
            <div class="border-top">
                <span class="fw-bold me-3">Tổng cộng</span>
                <span class="text-primary">
                    {{ amountUtility.getDisplayText(amounts.totalAmount) }}
                </span>
            </div>
        </li>
    </ul>

    <!-- Fallback -->
    <div class="d-flex justify-content-center align-items-center h-100 p-3" v-else>
        <span class="opacity-50">
            Chưa chọn sản phẩm nào
        </span>
    </div>
</template>

<style scoped>
.img-thumbnail.item-product-thumbnail {
    object-fit: contain;
    object-position: 50% 50%;
    aspect-ratio: 1;
}

.img-thumbnail.item-product-thumbnail {
    width: 55px;
    height: 55px;
}

.vat-factor-input, .quantity-input {
    max-width: 60px;
    flex-shrink: 0;
    margin-left: -1px !important;
}
</style>