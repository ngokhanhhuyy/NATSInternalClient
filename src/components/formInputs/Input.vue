<script lang="ts">
interface Props {
    name: string;
}
</script>

<script setup lang="ts">
import { useModelStateStore } from "@/stores/modelState";

const modelState = useModelStateStore();
const props = defineProps<Props>();
</script>

<template>
    <input class="form-control" :class="modelState.getInputClassName(props.name)">
</template>