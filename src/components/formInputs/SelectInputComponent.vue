<script lang="ts">
interface Props {
    propertyPath?: string;
}
</script>

<script setup lang="ts">
import { inject } from "vue";
import type { ModelState } from "@/services/modelState";

// Props.
const props = defineProps<Props>();

// States.
const modelState = props.propertyPath ? inject<ModelState>("modelState") : undefined;


// Model.
const model = defineModel();
</script>

<template>
    <select class="form-select"
            :class="propertyPath && modelState?.inputClass(propertyPath)"
            v-model="model">
        <slot></slot>
    </select>
</template>