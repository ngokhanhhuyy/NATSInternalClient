<script setup lang="ts">
import type { ProductListModel } from "@/models/productModels";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";
import FormLabel from "@forms/FormLabelComponent.vue";
import CreatingRouterLink from "@layouts/CreatingRouterLinkComponent.vue";

// Child components.
import OptionsSelectInput from "./OptionsSelectInputComponent.vue";

// Model.
const model = defineModel<ProductListModel>({ required: true });
</script>

<template>
    <MainBlock title="Sản phẩm" :body-padding="[0, 2, 2, 2]"
        body-class="row g-3">
        <template #header>
            <CreatingRouterLink :to="model.createRoute" :can-create="model.canCreate">
                <i class="bi bi-plus-lg"></i>
                Tạo sản phẩm
            </CreatingRouterLink>
        </template>
        <template #body>
            <!-- Brand options -->
            <div class="col col-md-6 col-sm-12 col-12">
                <FormLabel text="Thương hiệu" />
                <OptionsSelectInput v-model="model.brandId"
                        resource-type="brand"
                        :options="model.brandOptions" />
            </div>

            <!-- Category options -->
            <div class="col col-md-6 col-sm-12 col-12">
                <FormLabel text="Phân loại" />
                <OptionsSelectInput v-model="model.categoryId"
                        resource-type="category"
                        :options="model.categoryOptions" />
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
</style>