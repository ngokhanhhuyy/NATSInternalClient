<script setup lang="ts">
// Interfaces.
interface Props {
  type?: "text" | "number" | "tel" | "email" | "url" | "textarea";
  regex?: string;
  name?: string;
}

// Imports.
import { inject } from "vue";
import type { ModelState } from "@/services/modelState";

// Dependency.
const modelState = inject<ModelState>("modelState");

// Props.
const props = withDefaults(defineProps<Props>(), {
    type: "text"
});

// Model.
const model = defineModel<string | null>();

// Functions.
function onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    
    if (props.regex != null) {
        inputElement.value = value.replace(new RegExp(`[^${props.regex}]`, "g"), "");
    }

    if (props.type === "tel") {
        inputElement.value = value
            .replace(new RegExp("[^$0-9_]", "g"), "");
    }

    if (props.type === "email") {
        inputElement.value = value
            .replace(new RegExp("[^$a-zA-Z0-9!#$%&'*+/=?^_`{|}~@.\\-]", "g"), "");
    }

    model.value = inputElement.value;
}

</script>

<template>
    <input class="form-control" :type="type" :name="name" :value="model"
            @input="onInput"
            :class="name && modelState?.inputClass(name)"
            v-if='type !== "textarea"'>
    <textarea class="form-control" :value="model" :name="name"
            @input="onInput"
            :class="name && modelState?.inputClass(name)"
            v-else>
    </textarea>
</template>

<style scoped>
textarea {
    min-height: 150px;
}
</style>