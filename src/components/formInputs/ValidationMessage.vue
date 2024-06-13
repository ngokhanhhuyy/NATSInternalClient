<script lang="ts">
interface Props {
    propertyPath: string
}
</script>

<script setup lang="ts">
import { computed, inject } from "vue";
import { type IModelState } from "@/services/modelState";

// Props.
const props = defineProps<Props>();

// States.
const modelState = inject<IModelState>("modelState")!;

// Computed properties.
const message = computed(() => modelState.getMessage(props.propertyPath));
const cssClass = computed(() => modelState.messageClass(props.propertyPath));
</script>

<template>
    <span :class="cssClass" v-show="modelState.isValidated">
        {{ message }}
    </span>
</template>