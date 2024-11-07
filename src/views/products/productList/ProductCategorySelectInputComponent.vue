<script setup lang="ts">
import { ProductCategoryMinimalModel } from "@/models/productCategoryModels";
import { useProductCategoryService } from "@/services/productCategoryService";

// Form components.
import SelectInput from "@/components/formInputs/SelectInputComponent.vue";

// Dependency.
const service = useProductCategoryService();

// Model.
const model = defineModel<number | null>({ required: true });
const options = await loadOptionsAsync();

// Functions.
async function loadOptionsAsync(): Promise<ProductCategoryMinimalModel[]> {
    const responseDto = await service.getAllAsync();
    return responseDto.map(dto => new ProductCategoryMinimalModel(dto));
}
</script>

<template>
    <SelectInput v-model="model" v-if="options.length">
        <template v-if="options?.length">
            <option :value="option.id" v-for="option in options" :key="option.id">
                {{ option.name }}
            </option>
        </template>
        <option :value="null">Tất cả</option>
    </SelectInput>
</template>