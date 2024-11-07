<script setup lang="ts">
import { BrandMinimalModel } from "@/models/brandModels";
import { useBrandService } from "@/services/brandService";

// Form components.
import SelectInput from "@/components/formInputs/SelectInputComponent.vue";

// Dependency.
const service = useBrandService();

// Model.
const model = defineModel<number | null>({ required: true });
const options = await loadOptionsAsync();

// Functions.
async function loadOptionsAsync(): Promise<BrandMinimalModel[]> {
    const responseDto = await service.getAllAsync();
    return responseDto.map(dto => new BrandMinimalModel(dto));
}
</script>

<template>
    <SelectInput v-model="model" v-if="options.length">
        <template v-if="options?.length">
            <option :value="option.id" v-for="option in options" :key="option.id">
                {{ option.name }}
            </option>
        </template>
        <option :value="null">Tất cả thương hiệu</option>
    </SelectInput>
</template>