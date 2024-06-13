<script lang="ts">
interface Props {
    type?: "text" | "number" | "tel" | "email" | "url" | "textarea";
    regex?: string;
    propertyPath?: string;
}
</script>

<script setup lang="ts">
import { withDefaults, inject } from "vue";
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
            inputElement.value = value
                .replace(new RegExp(`[^${props.regex}]`, "g"), "");
        }

        if (props.type === "tel") {
            inputElement.value = value
                .replace(new RegExp("[^$0-9_]", "g"), "");
        }

        if (props.type === "email") {
            inputElement.value = value
                .replace(new RegExp("[^$a-zA-Z0-9!#$%&'*+/=?^_`{|}~@.\\-]", "g"), "");
        }

        model.value = inputElement.value || null;
}

</script>

<template>
    <input class="form-control" :type="type" :value="model"
            @input="onInput"
            :class="propertyPath && modelState?.inputClass(propertyPath)"
            v-if='type !== "textarea"'>
    <textarea class="form-control" :value="model"
            :class="propertyPath && modelState?.inputClass(propertyPath)"
            v-else>
    </textarea>
</template>
