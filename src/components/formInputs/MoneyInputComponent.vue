<script setup lang="ts">
// Interfaces.
interface Props {
    propertyPath?: string;
    min?: number;
    max?: number;
    prefix?: string;
    suffix?: string;
}

// Imports
import { ref, computed, withDefaults, inject } from "vue";
import { ModelState } from "@/services/modelState";
import { Mask } from "maska";

// Props and emits
const props = withDefaults(defineProps<Props>(), {
    type: "text",
    min: 0
});

// Model and states.
const model = defineModel<number>({ default: 0 });
const modelState = props.propertyPath ? inject<ModelState>("modelState") : undefined;
const inputElement = ref<HTMLInputElement>(null!);
const mask = new Mask({
    number: {
        locale: "uk",
        fraction: 0,
        unsigned: true
    }
});

// Computed property.
const computedModel = computed<string>(() => {
    let value: string = mask.masked(model.value.toString());
    return addPrefixAndSuffix(value);
});

const className = computed<string | null>(() => {
    if (props.propertyPath) {
        return modelState!.inputClass(props.propertyPath);
    }
    return null;
});

// Functions.
function onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const defaultValue = addPrefixAndSuffix("");
    if (inputElement.value.length && inputElement.value !== defaultValue) {
        inputElement.value = mask.masked(inputElement.value);
        let parsedValue = Number(mask.unmasked(inputElement.value));
        if (props.max && parsedValue > props.max) {
            parsedValue = props.max;
            inputElement.value = mask.masked(parsedValue.toString());
        }
    } else {
        inputElement.value = "0";
    }
    inputElement.value = addPrefixAndSuffix(inputElement.value);

    resetCaret(event);
}

function onChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let parsedValue = Number(mask.unmasked(inputElement.value));
    if (props.min && parsedValue < props.min) {
        parsedValue = props.min;
    }
    model.value = parsedValue;
    inputElement.value = mask.masked(parsedValue.toString());
    addPrefixAndSuffix(inputElement.value);
}

function onKeyDown(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const expectedPosition = getExpectedCaretPosition(event);
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;
    const isArrowKey = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key);
    if (start === expectedPosition && end === expectedPosition && isArrowKey) {
        event.preventDefault();
    } else {
        setTimeout(() => resetCaret(event), 0);
    }
}

function onMouseUp(event: MouseEvent) {
    const inputElement = event.target as HTMLInputElement;
    const expectedPosition = getExpectedCaretPosition(event);
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;
    if (start !== expectedPosition || end !== expectedPosition) {
        resetCaret(event);
    }
}

function onMouseDown(event: MouseEvent) {
    const inputElement = event.target as HTMLInputElement;
    event.preventDefault();
    inputElement.focus();
}

function resetCaret(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const expectedPosition: number = getExpectedCaretPosition(event);
    inputElement.selectionStart = expectedPosition;
    inputElement.selectionEnd = expectedPosition;
}

function addPrefixAndSuffix(value: string): string {
    let newValue = value;
    if (props.prefix) {
        newValue = props.prefix + value;
    }
    if (props.suffix) {
        newValue += props.suffix;
    }
    return newValue;
}

function getExpectedCaretPosition(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (props.suffix) {
        return inputElement.value.length - props.suffix.length;
    }
    return inputElement.value.length;
}
</script>

<template>
    <input :value="computedModel" @input="onInput"
            @beforeinput="resetCaret" @change="onChange"
            @keydown="onKeyDown" @keyup="onKeyDown" @focus="resetCaret"
            @mousedown="onMouseDown" @mouseup="onMouseUp"
            class="form-control" :class="className" ref="inputElement">
</template>

<style scoped>
    .increment-button {
        margin-right: -1px !important;
    }

    .decrement-button {
        margin-left: -1px !important;
    }
</style>
