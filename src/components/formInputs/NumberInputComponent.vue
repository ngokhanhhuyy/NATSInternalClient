<script lang="ts">
interface Props {
    type?: "text" | "tel" | "number";
    min?: number;
    max?: number;
    name?: string;
    allowNegative?: boolean;
    allowEmpty?: boolean;
    decimalPrecision?: number;
}
</script>

<script setup lang="ts">
import { computed, inject } from "vue";
import type { ModelState } from "@/services/modelState";
import { Mask } from "maska";

// Props and emits
const props = withDefaults(defineProps<Props>(), {
    type: "text",
    min: 0,
    decimalPrecision: 0
});

// Dependency.
const modelState = props.name ? inject<ModelState>("modelState") : undefined;

// External state.
const model = defineModel<number | null>({ default: 0 });
const mask = new Mask({
    number: {
        locale: "vi",
        fraction: props.decimalPrecision,
        unsigned: !props.allowNegative
    }
});

// Computed properties.
const computedModel = computed<string>(() => {
    if (model.value == null) {
        return props.allowEmpty ? "" : "0";
    }
    return mask.masked(model.value.toLocaleString()).replaceAll(".", " ");
});

const className = computed<string>(() => {
    const names: string[] = [];
    if (props.name) {
        const nameFromModelState = modelState?.inputClass(props.name);
        if (nameFromModelState) {
            names.push(nameFromModelState);
        }
    }

    return names.join(" ");
});

// Functions.
function onInput(event: Event): void {
    const inputElement = (event.target as HTMLInputElement);
    if (!inputElement.value.length) {
        inputElement.value = props.allowEmpty ? "" : "0";
    } else {
        inputElement.value = mask.masked(inputElement.value).replaceAll(".", " ");
        inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
    }
}

function onChanged(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const parsedValue = Number(mask.unmasked(inputElement.value));
    if (isNaN(parsedValue)) {
        model.value = props.allowEmpty ? null : 0;
    } else {
        model.value = parsedValue;
    }
}
</script>

<template>
    <input :type="type" :name="name" :value="computedModel"
            @input="onInput" @change="onChanged"
            class="form-control" :class="className">
</template>
