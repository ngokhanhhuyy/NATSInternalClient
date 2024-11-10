<script lang="ts">
import type { BrandMinimalModel } from "@models/brandModels";
import type { ProductCategoryMinimalModel } from "@models/productCategoryModels";

interface Props {
    resourceType: "brand" | "category";
    options: BrandMinimalModel[] | ProductCategoryMinimalModel[] | undefined;
    loadOptionsAsync(): Promise<void>;
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// Form components.
import SelectInput from "@/components/formInputs/SelectInputComponent.vue";
import { useDisplayNamesStore } from "@/stores/displayNames";

// Props.
const props = defineProps<Props>();

// Dependency.
const displayNamesStore = useDisplayNamesStore();

// Model.
const model = defineModel<number | undefined>({ required: true });
const isLoading = ref(true);
const displayName = ref("");

const textWhenUndefined = computed<string>(() => {
    if (isLoading.value) {
        return "Đang tải ...";
    }

    return `Tất cả ${displayName.value.toLowerCase()}`;
});

// Life cycle hook.
onMounted(async () => {
    const [, displayNameResult] = await Promise.all([
        props.loadOptionsAsync(),
        displayNamesStore.getDisplayName(props.resourceType)
    ]);
    displayName.value = displayNameResult;
    isLoading.value = false;
});
</script>

<template>
    <SelectInput v-model="model" :disabled="!options?.length">
        <template v-if="options?.length">
            <option :value="option.id" v-for="option in options" :key="option.id">
                {{ option.name }}
            </option>
        </template>
        <option :value="undefined">{{ textWhenUndefined }}</option>
    </SelectInput>
</template>

<style scoped>
</style>