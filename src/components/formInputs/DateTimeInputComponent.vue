<script lang="ts">
interface Props {
    propertyPath?: string;
}
</script>

<script setup lang="ts" generic="T">
import { ref, computed, inject } from "vue";
import type { ModelState } from "@/services/modelState";

// Dependency.
const modelState = inject<ModelState>("modelState");

// Props.
defineProps<Props>();

// Model and internal states.
const model = defineModel<string>();
const inputElement = ref<HTMLInputElement>(null!);

// Computed properties.
const computedModel = computed<string>({
    get(): string {
        return model.value || "";
    },
    set(value: string): void {
        model.value = value.length ? value.length + ":00" : "";
    }
});
</script>

<template>
    <input type="datetime-local" class="form-control"
            v-model="computedModel" ref="inputElement"
            :class="propertyPath && modelState?.inputClass(propertyPath)">
</template>