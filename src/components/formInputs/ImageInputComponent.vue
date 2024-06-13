<script lang="ts">
interface Props {
    defaultSrc: string;
    url?: string | null;
    allowDelete?: boolean;
}

interface Emits {
    (e: "change", file: string | null): void;
}
</script>

<script setup lang="ts">
import { ref, computed, toRef, withDefaults } from "vue";
import { usePhotoUtility } from "@/utilities/photoUtility";

const props = withDefaults(defineProps<Props>(), {
    url: null,
    allowDelete: true
});
const emit = defineEmits<Emits>();

const photoUtility = usePhotoUtility();
const source = toRef(props.url);
const inputElement = ref<HTMLInputElement>();
const defaultSource = photoUtility.getPhotoUrl(props.defaultSrc);
const fileAsBase64 = ref<string | null>(null);

const deleteButtonVisible = computed<boolean>(() => {
    return props.allowDelete && fileAsBase64.value != null;
});

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
        <img :src="source ?? defaultSource"
                class="img-thumbnail">
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