<script setup lang="ts" generic="
    TListModel extends IHasStatsListModel<TBasicModel, TAuthorizationModel>,
    TBasicModel extends IHasStatsBasicModel<TAuthorizationModel>,
    TAuthorizationModel extends IHasStatsExistingAuthorizationModel">

// Form component.
import SelectInput from "./SelectInputComponent.vue";

// Model.
const model = defineModel<TListModel>({ required: true });
</script>

<template>
    <SelectInput v-model="model.monthYear" :disabled="!model.monthYearOptions">
        <option :value="undefined">{{ "Tất cả" }}</option>
        <template v-if="model.monthYearOptions?.options">
            <option :value="option" v-for="option in model.monthYearOptions.options"
                    :key="option.toString()">
                {{ option.toString() }}
            </option>
        </template>
    </SelectInput>
</template>