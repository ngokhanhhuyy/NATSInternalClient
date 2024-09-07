<script lang="ts">
interface Props {
    roundedBottom?: boolean;
}

interface States {
    avatarPreviewSource: string;
    avatarFileUploaded: boolean;
    avatarProcessing: boolean;
}
</script>

<script setup lang="ts">
import { ref, reactive, computed, watch, inject, defineAsyncComponent } from "vue";
import type { ModelState } from "@/services/modelState";
import { UserPersonalInformationUpsertModel } from "@/models";
import { Gender } from "@/services/dtos/enums";
import { useAlertModalStore } from "@/stores/alertModal";
import { usePhotoUtility } from "@/utilities/photoUtility";
import { FileToLargeError } from "@/services/exceptions";

// Layout components.
import SubBlock from "@/views/layouts/SubBlockComponent.vue";

// Form components.
import { FormLabel, TextInput, SelectInput, DateInput } from "@/components/formInputs";

// Async components.
const ValidationMessage = defineAsyncComponent(() =>
    import("@/components/formInputs/ValidationMessage.vue"));

// Dependencies.
const alertModalStore = useAlertModalStore();
const photoUtility = usePhotoUtility();

// Props and emits.
defineProps<Props>();

// Internal states.
const model = defineModel<UserPersonalInformationUpsertModel>({ required: true });
const modelState = inject<ModelState>("modelState")!;
const states = reactive<States>({
    avatarPreviewSource: model.value.avatarUrl ?? photoUtility.getDefaultPhotoUrl(),
    avatarFileUploaded: false,
    avatarProcessing: false,
});
const avatarFileInputElement = ref<HTMLInputElement>(null!);

// Computed properties.
const avatarDeleteButtonVisibility = computed<boolean>(() => {
    if (!model.value.avatarChanged) {
        return model.value.avatarUrl != null;
    }
    return states.avatarFileUploaded;
});

const avatarPreviewClassName = computed<string>(() => {
    const names: string[] = [];
    if (modelState.isValidated) {
        if (modelState.hasError("avatarFile")) {
            names.push("bg-danger bg-opacity-10 border-danger");
        }
        names.push("bg-success bg-opacity-10 border-success");
    }

    if (states.avatarProcessing) {
        names.push("blurred");
    }
    
    return names.join(" ");
});

// Watch.
watch(() => model.value.avatarFile, () => model.value.avatarChanged = true);

// Functions.
async function onAvatarFileInputChanged(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length && files[0]) {
        states.avatarProcessing = true;
        try {
            [states.avatarPreviewSource, model.value.avatarFile] = await photoUtility
                .fileToBase64Strings(files[0]);
            states.avatarFileUploaded = true;
        } catch (error) {
            if (error instanceof FileToLargeError) {
                await alertModalStore.getFileTooLargeConfirmationAsync();
            } else {
                throw error;
            }
        }
        states.avatarProcessing = false;
    } else {
        onAvatarDeleteButtonClicked();
    }
}

function onAvatarDeleteButtonClicked() {
    model.value.avatarFile = null;
    states.avatarFileUploaded = false;
    states.avatarPreviewSource = photoUtility.getDefaultPhotoUrl();
}
</script>

<template>
    <SubBlock title="Thông tin cá nhân" body-class="row gx-3"
            :body-padding="[2, 3]" :rounded-bottom="roundedBottom">
        <!-- Left column -->
        <div class="col col-md-auto col-sm-12 col-12 py-3 d-flex
                    flex-column justify-content-start align-items-center">
            <div class="avatar-preview-container">
                <!-- Avatar preview -->
                <img :src="states.avatarPreviewSource"
                        class="img-thumbnail avatar-preview"
                        :class="avatarPreviewClassName" />
                
                <!-- Avatar edit button -->
                <button class="btn btn-outline-primary btn-sm avatar-edit-button"
                        @click="avatarFileInputElement!.click()"
                        :disabled="states.avatarProcessing">
                    <i class="bi bi-pencil-square"></i>
                </button>

                <!-- Avatar delete button -->
                <button class="btn btn-outline-danger btn-sm avatar-delete-button"
                        @click='onAvatarDeleteButtonClicked'
                        v-show="avatarDeleteButtonVisibility">
                    <i class="bi bi-trash3"></i>
                </button>

                <!-- Avatar spinner -->
                <div class="avatar-spinner" :class="{ visible: states.avatarProcessing }">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

            </div>
            <button class="btn w-100 avatar-add-button" v-if="false">
                <i class="bi bi-person-bounding-box me-1"></i>
                Thêm ảnh đại diện
            </button>
            <ValidationMessage property-path="personalInformation.avatarFile" />
            <input type="file" class="d-none"
                    :class='modelState.inputClass("avatarFile")'
                    accept="image/gif, image/jpeg, image/png"
                    ref="avatarFileInputElement"
                    @change="onAvatarFileInputChanged">
        </div>

        <!-- Right column -->
        <div class="col p-0 ps-sm-3 ps-0">
            <div class="row g-3">
                <!-- FirstName -->
                <div class="col col-md-4 col-sm-12 col-12 mb-3">
                    <div class="form-group">
                        <FormLabel name="Họ" required />
                        <TextInput placeholder="Nguyễn" maxlength="15" v-model="model.firstName"
                                property-path="personalInformation.firstName"/>
                        <ValidationMessage property-path="personalInformation.firstName" />
                    </div>
                </div>

                <!-- MiddleName -->
                <div class="col col-md-4 col-sm-12 col-12 mb-3">
                    <div class="form-group">
                        <FormLabel name="Tên đệm" />
                        <TextInput placeholder="Văn" maxlength="20" v-model="model.middleName"
                                property-path="personalInformation.middleName" />
                        <ValidationMessage property-path="personalInformation.middleName" />
                    </div>
                </div>

                <!-- LastName -->
                <div class="col col-md-4 col-sm-12 col-12 mb-3">
                    <div class="form-group">
                        <FormLabel name="Tên" required />
                        <TextInput placeholder="An" maxlength="15" v-model="model.lastName"
                                property-path="personalInformation.lastName" />
                        <ValidationMessage property-path="personalInformation.lastName" />
                    </div>
                </div>

                <!-- Gender -->
                <div class="col col-sm-6 col-12 mb-3">
                    <div class="form-group">
                        <FormLabel name="Giới tính" required />
                        <SelectInput property-path="personalInformation.gender"
                                v-model="model.gender">
                            <option :value="Gender.Male">Nam</option>
                            <option :value="Gender.Female">Nữ</option>
                        </SelectInput>
                        <ValidationMessage property-path="personalInformation.gender" />
                    </div>
                </div>
                
                <!-- Birthday -->
                <div class="col col-sm-6 col-12 mb-3">
                    <div class="form-group">
                        <FormLabel name="Sinh nhật" />
                        <DateInput property-path="personalInformation.birthday"
                                v-model="model.birthday" />
                        <ValidationMessage property-path="personalInformation.birthday" />
                    </div>
                </div>
                
                <!-- PhoneNumber -->
                <div class="col col-sm-6 col-12 mb-sm-0 mb-3">
                    <div class="form-group">
                        <FormLabel name="Số điện thoại" />
                        <TextInput type="tel" property-path="personalInformation.phoneNumber"
                                placeholder="0123 456 789" maxlength="12"
                                v-model="model.phoneNumber" />
                        <ValidationMessage property-path="personalInformation.phoneNumber" />
                    </div>
                </div>
                
                <!-- Email -->
                <div class="col col-sm-6 col-12">
                    <div class="form-group">
                        <FormLabel name="Email" />
                        <TextInput type="email" property-path="personalInformation.email"
                                placeholder="nguyenvanan@gmail.com" maxlength="255"
                                v-model="model.email" />
                        <ValidationMessage property-path="personalInformation.email" />
                    </div>
                </div>
            </div>
        </div>
    </SubBlock>
</template>

<style scoped>
.avatar-preview-container {
    --avatar-size: 150px;
    width: var(--avatar-size);
    height: var(--avatar-size);
    position: relative;
}

.avatar-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    overflow: hidden;
    transition: opacity 0.5s;
}

.avatar-preview.blurred {
    opacity: 0.5;
}

.avatar-add-button {
    background: rgba(var(--bs-primary-rgb), 0.07) !important;
    border: 1px dashed rgba(var(--bs-primary-rgb), 0.25) !important;
    width: var(--avatar-size);
    height: var(--avatar-size);
}

.avatar-add-button:hover {
    color: var(--bs-primary) !important;
    background: rgba(var(--bs-primary-rgb), 0.25) !important;
    border: 1px dashed rgba(var(--bs-primary-rgb), 0.5) !important;
}

.avatar-add-button:active {
    color: var(--bs-primary-text-emphasis) !important;
    background: rgba(var(--bs-primary-rgb), 0.5) !important;
    border: 1px dashed rgba(var(--bs-primary-rgb), 0.75) !important;
}

.avatar-edit-button, .avatar-delete-button {
    position: absolute;
    right: 0;
}

.avatar-edit-button {
    top: 0;
    transform: translate(35%, -35%);
}

.avatar-delete-button {
    bottom: 0;
    transform: translate(35%, 35%);
}

.avatar-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity .5s;
    opacity: 0;
}

.avatar-spinner.visible {
    opacity: 1;
}
</style>