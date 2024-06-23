<script lang="ts">
interface Props {
    propertyPath?: string;
}
</script>

<script setup lang="ts" generic="T">
import { ref, inject } from "vue";
import type { ModelState } from "@/services/modelState";

// Props.
const props = defineProps<Props>();

// States.
const modelState = props.propertyPath ? inject<ModelState>("modelState") : undefined;

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
    <input type="date" class="form-control" :value="model"
            ref="inputElement"
            @focusout="onFocusOut"
            @keypress.enter="onEnterKeyPressed"
            :class="propertyPath && modelState?.inputClass(propertyPath)">
</template>