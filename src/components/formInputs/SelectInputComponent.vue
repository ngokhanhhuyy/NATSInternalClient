<script lang="ts">
interface Props {
    name?: string;
}
</script>

<script setup lang="ts">
import { inject } from "vue";
import type { ModelState } from "@/services/modelState";

// Props.
const props = defineProps<Props>();

// States.
const modelState = props.name ? inject<ModelState>("modelState") : undefined;


// Model.
const model = defineModel();
</script>

<template>
    <select class="form-select"
            :class="name && modelState?.inputClass(name)"
            v-model="model">
        <slot></slot>
    </select>
</template>