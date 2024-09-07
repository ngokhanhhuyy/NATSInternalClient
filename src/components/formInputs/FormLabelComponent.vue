<script lang="ts">
interface Props {
    name: string;
    required?: boolean;
}
</script>

<script setup lang="ts">
defineProps<Props>();
</script>

<template>
    <label class="form-label small fw-bold" :class="{ required: required }">
        {{ name }}
    </label>
</template>