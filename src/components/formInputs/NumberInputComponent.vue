<script lang="ts">
interface Props {
    type?: "text" | "tel" | "number";
    min?: number;
    max?: number;
    propertyPath?: string;
    allowNegative?: boolean;
    allowEmpty?: boolean;
    decimalPrecision?: 0;
}
</script>

<script setup lang="ts">
import { ref, watch, inject, withDefaults } from "vue";
import type { ModelState } from "@/services/modelState";

// Props and emits
const props = withDefaults(defineProps<Props>(), {
    type: "text"
});

// Dependency.
const modelState = inject<ModelState>("modelState");

// External state.
const externalModel = defineModel<number | null>({ default: 0 });

// Internal model.
const currentValue = ref<number | null>(null);
const previousInputElementValue = ref<string>(null!);
if (externalModel.value !== undefined) {
    currentValue.value = externalModel.value;
}

// Watch.
watch(() => externalModel.value, value => currentValue.value = value, { immediate: true });
watch(() => currentValue.value, newValue => {
    if (externalModel.value !== undefined) {
        externalModel.value = newValue;
    }
});

// Functions.
function getRegex(): RegExp {
    // Regex signed numbers.
    if (props.allowNegative) {
        if (props.decimalPrecision) {
            return new RegExp(`^-?(\\d+(\\.\\d{0,${props.decimalPrecision}})?|\\d*|\\d*\\.\\d{0,${props.decimalPrecision}})?$`);
        }
        return new RegExp(/^-?\d+$/);
    }

    // Regex for unsigned numbers.
    if (props.decimalPrecision) {
        return new RegExp(`^(\\d+(\\.\\d{0,${props.decimalPrecision}})?|\\d*|\\d*\\.\\d{0,${props.decimalPrecision}})?$`);
    }
    return new RegExp(/^\d*$/);
}

function onBeforeInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    previousInputElementValue.value = inputElement.value;
}

function onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    let regex = getRegex();
    if (!regex.test(value)) {
        inputElement.value = previousInputElementValue.value;
        return;
    }

    if (value.length === 0) {
        if (props.allowEmpty) {
            currentValue.value = null;
        } else {
            currentValue.value = 0;
            inputElement.value = "0";
        }
        return;
    }

    let parsedValue = Number(value);
    if (value.endsWith(".") || isNaN(parsedValue)) {
        return;
    }

    if (value === "-0") {
        return;
    }

    if (props.min != undefined && parsedValue < props.min) {
        parsedValue = props.min;
    }

    if (props.max != undefined && parsedValue > props.max) {
        parsedValue = props.max;
    }

    inputElement.value = parsedValue.toString();
    currentValue.value = parsedValue;

    inputElement.scrollLeft = inputElement.scrollWidth;
}

function onChanged(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const parsedValue = Number(inputElement.value);

    if (props.allowEmpty && isNaN(parsedValue)) {
        inputElement.value = "";
    }
}
</script>

<template>
    <input :type="type" :value="currentValue" @beforeinput="onBeforeInput" @input="onInput" @change="onChanged"
        class="form-control" :class="propertyPath && modelState?.inputClass(propertyPath)">
</template>
