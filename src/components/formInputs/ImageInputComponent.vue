<script lang="ts">
interface Props {
    propertyPath?: string;
    defaultSrc: string;
    url?: string | null;
    allowDelete?: boolean;
}

interface Emits {
    (e: "change", file: string | null): void;
}
</script>

<script setup lang="ts">
import { ref, computed, inject, toRef } from "vue";
import type { ModelState } from "@/services/modelState";
import { usePhotoUtility } from "@/utilities/photoUtility";

// Props and emits.
const props = withDefaults(defineProps<Props>(), {
    url: null,
    allowDelete: true
});
const emit = defineEmits<Emits>();

// Dependency.
const photoUtility = usePhotoUtility();
const modelState = inject<ModelState>("modelState");

// Internal states.
const source = toRef(props.url);
const inputElement = ref<HTMLInputElement>();
const defaultSource = photoUtility.getPhotoUrl(props.defaultSrc);
const fileAsBase64 = ref<string | null>(null);

// Computed properties.
const deleteButtonVisible = computed<boolean>(() => {
    return props.allowDelete && fileAsBase64.value != null;
});

const thumbnailPreviewClass = computed<string>(() => {
    const names: string[] = [];
    if (modelState?.isValidated) {
        if (modelState.hasError("avatarFile")) {
            names.push("bg-danger bg-opacity-10 border-danger");
        }
        names.push("bg-success bg-opacity-10 border-success");
    }
    
    return names.join(" ");
});

// Functions.
async function onInputElementValueChanged(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files[0]) {
        const file = files[0];
        let base64ForJson: string;
        [source.value, base64ForJson] = await photoUtility.fileToBase64Strings(file);
        emit("change", base64ForJson);
        fileAsBase64.value = source.value;
    } else {
        source.value = null;
        fileAsBase64.value = null;
        emit("change", null);
    }
}

function onEditButtonClicked() {
    inputElement.value!.click();
}

function onDeleteButtonClicked() {
    source.value = null;
    fileAsBase64.value = null;
    inputElement.value!.value = "";
}
</script>

<template>
    <div class="thumbnail-container">
        <img :src="source ?? defaultSource" class="img-thumbnail"
                :class="thumbnailPreviewClass">
        <input type="file" class="d-none" accept="image/png, image/jpeg, image/jpg"
                ref="inputElement" @change="onInputElementValueChanged">
        <button class="btn btn-outline-primary btn-sm edit-button"
                @click="onEditButtonClicked">
            <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn btn-outline-danger btn-sm delete-button"
                @click="onDeleteButtonClicked"
                v-if="allowDelete" v-show="deleteButtonVisible">
            <i class="bi bi-pencil-square"></i>
        </button>
    </div>
</template>

<style scoped>
.thumbnail-container {
    position: relative;
    overflow: visible;
    width: 150px;
    height: 150px;
}

button {
    position: absolute;
}

button.edit-button {
    top: 0;
    right: 0;
    transform: translate(30%, -30%);
}

button.delete-button {
    bottom: 0;
    right: 0;
    transform: translate(30%, 30%);
}

img.img-thumbnail {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: 50% 50%;
    overflow: hidden;
}
</style>