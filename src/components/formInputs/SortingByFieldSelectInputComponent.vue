<script setup lang="ts" generic="
    TListModel extends ISortableListModel<TBasicModel>,
    TBasicModel extends IBasicModel">
// Form component.
import SelectInput from "./SelectInputComponent.vue";

// Model.
const model = defineModel<TListModel>({ required: true });
</script>

<template>
    <SelectInput v-model="model.sortingByField">
        <template v-if="model.sortingOptions?.fieldOptions">
            <option :value="option.name" v-for="option in model.sortingOptions.fieldOptions"
                    :key="option.name">
                {{ option.displayName }}
            </option>
        </template>
        <option :value="undefined">Mặc định</option>
    </SelectInput>
</template>