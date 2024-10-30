<script lang="ts">
interface Props<
        TModel extends IFinancialEngageableUpsertModel,
        TProperty extends IStatsDateTimeInputModel & TModel[keyof TModel]> {
    property: () => TProperty;
}
</script>

<script setup lang="ts"
        generic="TModel extends IFinancialEngageableUpsertModel,
                TProperty extends IStatsDateTimeInputModel & TModel[keyof TModel]">
import { computed, inject } from "vue";
import type { ModelState } from "@/services/modelState";
import type { ModelAccessors } from "./FormComponent.vue";

// Form components.
import FormLabel from "./FormLabelComponent.vue";
import DateTimeInput from "./DateTimeInputComponent.vue";
import ValidationMessage from "./ValidationMessage.vue";

// Props.
const props = defineProps<Props<TModel, TProperty>>();

// Model and internal states.
const { getModelProperty, setModelProperty } =
    inject<ModelAccessors<TModel, TProperty>>("model")!;
const propertyPath = computePropertyPath();
const modelState = inject<ModelState>("modelState");

// Computed property.
const propertyReference = computed<TProperty>({
    get(): TProperty {
        return getModelProperty(propertyPath);
    },
    set(value: TProperty): void {
        setModelProperty(propertyPath, value);
    }
});

// Functions.
function computePropertyPath(): keyof TModel & string {
    const propertySelector = props.property.toString();
    let regex: RegExp;
    regex = /^\(\)\s?=>\s?\$setup\.[a-zA-Z0-9._$]+\.(?<propertyPath>[a-z][A-Za-z0-9._]+)/g;
    const groups = regex.exec(propertySelector)?.groups;
    console.log(groups);
    if (groups && groups["propertyPath" as keyof typeof groups]) {
        return groups["propertyPath"] as keyof TModel & string;
    }

    throw new Error("Specified property selector is not supported.");
}
</script>

<template>
    <FormLabel name="Ngày giờ thanh toán" />
    <div class="input-group" v-if="propertyReference.isSpecified">
        <DateTimeInput :property-path="propertyPath"
                v-model="propertyReference"
                :disabled="!propertyReference.isSpecified" />
        <button class="btn btn-danger" @click="propertyReference.isSpecified = false">
            <i class="bi bi-x-lg"></i>
            <span class="d-sm-inline d-none ms-2">Huỷ</span>
        </button>
    </div>
    <div class="input-group" v-else>
        <input type="text" class="form-control" disabled
                :value="propertyReference.displayText ?? 'Hiện tại'"
                :class="modelState?.inputClass(propertyPath)">
        <button class="btn btn-primary" @click="propertyReference.isSpecified = true">
            <i class="bi bi-pencil-square"></i>
            <span class="d-sm-inline d-none ms-2">Sửa</span>
        </button>
    </div>
    <ValidationMessage :property-path="propertyPath" />
    <pre class="m-0">{{ JSON.stringify(propertyReference, null, 4) }}</pre>
</template>