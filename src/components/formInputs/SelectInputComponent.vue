<script lang="ts">
interface Props {
    propertyPath?: string;
}
</script>

<script setup lang="ts" generic="T">
import { inject } from "vue";
import type { ModelState } from "@/services/modelState";

// Dependency.
const modelState = inject<ModelState>("modelState");

// Props.
defineProps<Props>();

// Model.
const model = defineModel<T>();
</script>

<template>
    <select class="form-select"
            :class='propertyPath && modelState?.inputClass(propertyPath)'
            v-model="model">
        <slot></slot>
    </select>
</template>