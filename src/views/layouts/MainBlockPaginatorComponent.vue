<script setup lang="ts">
// Interface.
interface Props {
    color?: "primary" | "success" | "danger";
}

interface Emits {
    (event: "previousButtonClicked"): void;
    (event: "nextButtonClicked"): void;
}

// Imports.
import { computed } from "vue";

// Props and emits.
withDefaults(defineProps<Props>(), {
    color: "primary"
});

const emit = defineEmits<Emits>();

// Models.
const page = defineModel<number>("page", { required: true });
const pageCount = defineModel<number>("pageCount", { required: true });

// Computed properties.
const previousButtonDisabled = computed<boolean>(() =>
    pageCount.value === 0 || page.value === 1);

const nextButtonDisabled = computed<boolean>(() =>
    pageCount.value === 0 || page.value === pageCount.value);

// Functions.
function onPreviousButtonClicked(): void {
    page.value -= 1;
    emit("previousButtonClicked");
}

function onNextButtonClicked(): void {
    page.value += 1;
    emit("nextButtonClicked");
}
</script>

<template>
    <button class="btn btn-sm" :class="`btn-outline-${color}`" 
            :disabled="previousButtonDisabled" @click="onPreviousButtonClicked">
        <i class="bi bi-chevron-left"></i>
    </button>

    <div class="bg-white border rounded rounded-1 mx-1 p-1 px-2 small"
            :class="`border-${color} text-${color}`">
        Trang {{ page }}/{{ pageCount }}
    </div>

    <button class="btn btn-sm" :class="`btn-outline-${color}`"
            :disabled="nextButtonDisabled" @click="onNextButtonClicked">
        <i class="bi bi-chevron-right"></i>
    </button>
</template>