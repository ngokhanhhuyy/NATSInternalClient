<script lang="ts">
export interface Props {
    getAllBrandAsync(): Promise<ResponseDtos.Brand.Minimal[]>;
    getAllProductCategoryAsync(): Promise<ResponseDtos.ProductCategory.Minimal[]>;
    getCreatingPermissionAsync(): Promise<boolean>;
}
</script>

<script setup lang="ts">
import type { ProductListModel } from "@/models/productModels";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";
import FormLabel from "@forms/FormLabelComponent.vue";
import CreatingRouterLink from "@layouts/CreatingRouterLinkComponent.vue";

// Child components.
import OptionsSelectInput from "./OptionsSelectInputComponent.vue";

// Props.
const props = defineProps<Props>();

// Model.
const model = defineModel<ProductListModel>({ required: true });

// Functions.
async function loadBrandOptionsAsync() {
    const responseDtos = await props.getAllBrandAsync();
    model.value.mapFromBrandOptionsResponseDto(responseDtos);
}

async function loadCategoryOptionsAsync() {
    const responseDtos = await props.getAllProductCategoryAsync();
    model.value.mapFromCategoryOptionsResponseDto(responseDtos);
}
</script>

<template>
    <MainBlock title="Sản phẩm" :body-padding="[0, 2, 2, 2]"
        body-class="row g-3">
        <template #header>
            <CreatingRouterLink :to="model.createRoute"
                    :get-permission-async="getCreatingPermissionAsync">
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
                    :options="model.brandOptions"
                    :load-options-async="loadBrandOptionsAsync" />
            </div>

            <!-- Category options -->
            <div class="col col-md-6 col-sm-12 col-12">
                <FormLabel text="Phân loại" />
                <OptionsSelectInput v-model="model.categoryId"
                        resource-type="category"
                        :options="model.categoryOptions"
                        :load-options-async="loadCategoryOptionsAsync" />
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
</style>