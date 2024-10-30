<script lang="ts">
export interface ModelAccessors<
        TModel extends object,
        TProperty extends TModel[keyof TModel]> {
    getModelProperty(getter: (model: TModel) => TProperty): TProperty;
    getModelProperty(propertyPath: keyof TModel): TProperty;
    setModelProperty(setter: (model: TModel) => void): void;
    setModelProperty(propertyPath: keyof TModel, value: TProperty): void;
}
</script>

<script setup lang="ts"
        generic="TModel extends object,
        TProperty extends TModel[keyof TModel]">
import { provide } from "vue";

// Model.
const model = defineModel<TModel>({ required: true });

// Inject.
provide<ModelAccessors<TModel,TProperty>>("model", {
    getModelProperty(arg: ((model: TModel) => TProperty) | keyof TModel): TProperty {
        if (typeof arg === "function") {
            return arg(model.value);
        }

        return model.value[arg] as TProperty;
    },
    
    setModelProperty(arg: ((model: TModel) => void) | keyof TModel, value?: TProperty): void {
        if (typeof arg === "function") {
            arg(model.value);
        } else {
            model.value[arg] = value!;
        }

    }
});
</script>

<template>
    <slot :formModel="model"></slot>
</template>