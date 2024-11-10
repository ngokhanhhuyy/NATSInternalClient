<script lang="ts">
interface Props {
    getSortingOptionsAsync(): Promise<ResponseDtos.List.SortingOptions | null>;
}
</script>

<script setup lang="ts" generic="
    TModel extends ISortableListModel<TBasic>,
    TBasic extends IBasicModel">
import { ref, onMounted } from "vue";

// Form component.
import SelectInput from "./SelectInputComponent.vue";

// Props.
const props = defineProps<Props>();

// Model.
const model = defineModel<TModel>({ required: true });
const isLoading = ref(true);

// Life-cycle hook.
onMounted(async () => {
    const responseDto = await props.getSortingOptionsAsync();
    if (responseDto) {
        model.value.mapFromSortingOptionsResponseDto(responseDto);
    }
    isLoading.value = true;
});
</script>

<template>
    <SelectInput v-model="model.sortingByField" :disabled="!model.sortingOptions">
        <template v-if="model.sortingOptions">
            <option :value="option.name" v-for="option in model.sortingOptions.fieldOptions"
                    :key="option.name">
                {{ option.displayName }}
            </option>
        </template>
        <option :value="undefined" v-if="!model.sortingOptions">
            {{ isLoading ? "Đang tải" : "Mặc định" }}
        </option>
    </SelectInput>
</template>