<script lang="ts">
interface Props {
    name?: string;
}
</script>

<script setup lang="ts">
import { inject } from "vue";
import type { ModelState } from "@/services/modelState";

// Dependency.
const modelState = inject<ModelState>("modelState");

// Props.
defineProps<Props>();

// Model.
const model = defineModel<string | null>();

// Functions
function onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    model.value = value || null;
}
</script>

<template>
    <input type="password" class="form-control" :name="name"
            :value="model" @input="onInput"
            :class="name && modelState?.inputClass(name)">
</template>