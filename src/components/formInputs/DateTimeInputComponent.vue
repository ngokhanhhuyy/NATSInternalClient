<script lang="ts">
interface Props {
    propertyPath?: string;
}
</script>

<script setup lang="ts" generic="T">
import { ref, inject } from "vue";
import type { ModelState } from "@/services/modelState";

// Dependency.
const modelState = inject<ModelState>("modelState");

// Props.
defineProps<Props>();

// Model and internal states.
const model = defineModel<string | null>();
const inputElement = ref<HTMLInputElement>(null!);

// Functions
function onFocusOut(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    model.value = value || null;
}

function onEnterKeyPressed(): void {
    model.value = inputElement.value.value;
}
</script>

<template>
    <input type="datetime-local" class="form-control" :value="model"
            ref="inputElement"
            @focusout="onFocusOut"
            @keypress.enter="onEnterKeyPressed"
            :class="propertyPath && modelState?.inputClass(propertyPath)">
</template>