<script setup lang="ts">
// Interfaces.
interface Emits {
    (event: "updateRequested", item: SupplyItemModel): void;
}

// Imports.
import { SupplyItemModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Child components.
import SupplyItem from "./SupplyItemComponent.vue";

// Emits.
const emit = defineEmits<Emits>();

// Model and state.
const model = defineModel<SupplyItemModel[]>({ required: true });
</script>

<template>
    <MainBlock title="Sản phẩm đã chọn" class="h-100 min-height" body-padding="0"
            body-class="d-flex justify-content-center align-items-start">
        <template #body>
            <!-- Item list -->
            <ul class="list-group list-group-flush w-100" v-if="model.length">
                <SupplyItem v-model="model[index]"
                        :key="item.product.id" :index="index"
                        v-for="(item, index) in model"
                        @update-requested='emit("updateRequested", item)' />
            </ul>
            
            <!-- Fallback -->
            <span class="opacity-50 align-self-center" v-else>Chưa chọn sản phẩm</span>
        </template>
    </MainBlock>
</template>

<style scoped>
.min-height {
    min-height: 600px !important;
}

@media (max-width: 992px) {
    .min-height {
        min-height: 200px !important;
    };
}
</style>