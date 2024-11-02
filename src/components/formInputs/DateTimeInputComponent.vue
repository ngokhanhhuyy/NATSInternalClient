<script lang="ts">
interface Props {
    name?: string;
}
</script>

<script setup lang="ts" generic="T">
import { ref, inject } from "vue";
import type { ModelState } from "@/services/modelState";

// Props.
const props = defineProps<Props>();

// States.
const modelState = props.name ? inject<ModelState>("modelState") : undefined;

// Model and internal states.
const model = defineModel<IDateTimeInputModel>({ required: true });
const inputElement = ref<HTMLInputElement>(null!);
</script>

<template>
    <input type="datetime-local" class="form-control"
            v-model="model.inputDateTime" ref="inputElement"
            :class="name && modelState?.inputClass(name)">
</template>