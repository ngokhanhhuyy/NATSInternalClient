<script lang="ts">
interface Props {
    name: string
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
const message = computed(() => modelState.getMessage(props.name));
const cssClass = computed(() => modelState.messageClass(props.name));
</script>

<template>
    <span :class="cssClass" v-show="modelState.isValidated">
        {{ message }}
    </span>
</template>