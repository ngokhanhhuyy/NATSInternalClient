<script lang="ts">
interface Props {
    name?: string;
    min?: string | null;
    max?: string | null;
}
</script>

<script setup lang="ts" generic="T">
import { ref, watch, inject } from "vue";
import type { ModelState } from "@/services/modelState";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

// Props.
const props = defineProps<Props>();

// Dependencies.
const dateTimeUtility = useDateTimeUtility();

// States.
const modelState = props.name ? inject<ModelState>("modelState") : undefined;

// Model and internal states.
const model = defineModel<IDateInputModel>({ required: true });
const inputElement = ref<HTMLInputElement>(null!);

// Watch.
watch(() => [props.min, props.max], () => {
    enforceMinValue();
    enforceMaxValue();
});

// Functions
function enforceMinValue(): void {
    if (props.min == null || !inputElement.value.value.length) {
        return;
    }

    if (dateTimeUtility.compareDates(inputElement.value.value, props.min) === -1) {
        inputElement.value.value = props.min;
    }
}

function enforceMaxValue(): void {
    if (props.max == null || !inputElement.value.value.length) {
        return;
    }

    if (dateTimeUtility.compareDates(inputElement.value.value, props.max) === 1) {
        inputElement.value.value = props.max;
    }
}

function onFocusOut(event: Event): void {
    enforceMinValue();
    enforceMaxValue();
    const value = (event.target as HTMLInputElement).value as unknown as string;
    model.value.inputDate = value;
}

function onEnterKeyPressed(): void {
    enforceMinValue();
    enforceMaxValue();
    model.value.inputDate = inputElement.value.value as unknown as string;
}
</script>

<template>
    <input type="date" class="form-control" :value="model.inputDate"
            :name="name" ref="inputElement"
            @focusout="onFocusOut"
            @keypress.enter="onEnterKeyPressed"
            :class="name && modelState?.inputClass(name)">
</template>