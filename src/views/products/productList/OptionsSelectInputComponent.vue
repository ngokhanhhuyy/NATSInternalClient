<script lang="ts">
import type { BrandMinimalModel } from "@models/brandModels";
import type { ProductCategoryMinimalModel } from "@models/productCategoryModels";

interface Props {
    resourceType: "brand" | "category";
    options: BrandMinimalModel[] | ProductCategoryMinimalModel[] | undefined;
}
</script>

<script setup lang="ts">
import { useInitialDataStore } from "@/stores/initialData";

// Form components.
import SelectInput from "@/components/formInputs/SelectInputComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependency.
const store = useInitialDataStore();

// Model.
const model = defineModel<number | undefined>({ required: true });
const displayName = store.getDisplayName(props.resourceType);
</script>

<template>
    <SelectInput v-model="model" :disabled="!options?.length">
        <template v-if="options?.length">
            <option :value="option.id" v-for="option in options" :key="option.id">
                {{ option.name }}
            </option>
        </template>
        <option :value="undefined">Tất cả {{ displayName.toLowerCase() }}</option>
    </SelectInput>
</template>

<style scoped>
</style>