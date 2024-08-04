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
const model = defineModel<string>();
const inputElement = ref<HTMLInputElement>(null!);
</script>

<template>
    <input type="datetime-local" class="form-control"
            v-model="model" ref="inputElement"
            :class="propertyPath && modelState?.inputClass(propertyPath)">
</template>