<script lang="ts">
interface Props {
    name?: string;
}
</script>

<script setup lang="ts">
import { inject } from "vue";
import type { ModelState } from "@/services/modelState";

// Form components.
import DateTimeInput from "./DateTimeInputComponent.vue";

// Props.
defineProps<Props>();

// Model and internal states.
const model = defineModel<IStatsDateTimeInputModel>({ required: true });
const modelState = inject<ModelState>("modelState");
</script>

<template> 
    <div class="input-group" v-if="model.isSpecified">
        <DateTimeInput :name="name" v-model="model" class="border-end-0"
                :disabled="!model.isSpecified" />
        <button class="btn btn-danger" @click="model.isSpecified = false">
            <i class="bi bi-x-lg"></i>
            <span class="d-sm-inline d-none ms-2">Huỷ</span>
        </button>
    </div>
    <div class="input-group" v-else>
        <input type="text" :name="name" class="form-control" disabled
                :value="model.initialDisplayText"
                :class="name && modelState?.inputClass(name)">
        <button class="btn btn-primary" @click="model.isSpecified = true">
            <i class="bi bi-pencil-square"></i>
            <span class="d-sm-inline d-none ms-2">Sửa</span>
        </button>
    </div>
</template>