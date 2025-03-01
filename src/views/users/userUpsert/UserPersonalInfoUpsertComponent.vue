<script setup lang="ts">
// Interfaces.
interface Props {
    roundedBottom?: boolean;
}

interface States {
    avatarPreviewSource: string;
    avatarFileUploaded: boolean;
    avatarProcessing: boolean;
}

// Imports.
import { ref, reactive, computed, watch, inject } from "vue";
import type { ModelState } from "@/services/modelState";
import { UserPersonalInformationUpsertModel } from "@/models/userModels";
import { Gender } from "@/services/dtos/enums";
import { useAlertModalStore } from "@/stores/alertModal";
import { usePhotoUtility } from "@/utilities/photoUtility";
import { FileTooLargeError } from "@/errors";

// Layout components.
import SubBlock from "@/views/layouts/SubBlockComponent.vue";

// Form components.
import FormLabel from "@/components/formInputs/FormLabelComponent.vue";
import TextInput from "@/components/formInputs/TextInputComponent.vue";
import SelectInput from "@/components/formInputs/SelectInputComponent.vue";
import DateInput from "@/components/formInputs/DateInputComponent.vue";
import ValidationMessage from "@/components/formInputs/ValidationMessage.vue";

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

const avatarSpinnerClassName = computed<string | null>(() => {
    return states.avatarProcessing ? "visible" : null;
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
            if (error instanceof FileTooLargeError) {
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
    <SubBlock title="Thông tin cá nhân" body-class="row g-0"
            :rounded-bottom="roundedBottom">
        <!-- Left column -->
        <div class="col col-md-auto col-sm-12 col-12 pt-4 pb-2 ps-2 pe-3 d-flex
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
                        @click="onAvatarDeleteButtonClicked"
                        v-show="avatarDeleteButtonVisibility">
                    <i class="bi bi-trash3"></i>
                </button>

                <!-- Avatar spinner -->
                <div class="avatar-spinner" :class="avatarSpinnerClassName">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

            </div>
            <button class="btn w-100 avatar-add-button" v-if="false">
                <i class="bi bi-person-bounding-box me-1"></i>
                Thêm ảnh đại diện
            </button>
            <ValidationMessage name="personalInformation.avatarFile" />
            <input type="file" class="d-none"
                    :class='modelState.inputClass("avatarFile")'
                    accept="image/gif, image/jpeg, image/png"
                    ref="avatarFileInputElement"
                    @change="onAvatarFileInputChanged">
        </div>

        <!-- Right column -->
        <div class="col">
            <div class="row g-3">
                <!-- FirstName -->
                <div class="col col-md-4 col-sm-12 col-12">
                    <div class="form-group">
                        <FormLabel text="Họ" required />
                        <TextInput placeholder="Nguyễn" maxlength="15"
                                v-model="model.firstName"
                                name="personalInformation.firstName"/>
                        <ValidationMessage
                                name="personalInformation.firstName" />
                    </div>
                </div>

                <!-- MiddleName -->
                <div class="col col-md-4 col-sm-12 col-12">
                    <div class="form-group">
                        <FormLabel text="Tên đệm" />
                        <TextInput placeholder="Văn" maxlength="20"
                                v-model="model.middleName"
                                name="personalInformation.middleName" />
                        <ValidationMessage
                                name="personalInformation.middleName" />
                    </div>
                </div>

                <!-- LastName -->
                <div class="col col-md-4 col-sm-12 col-12">
                    <div class="form-group">
                        <FormLabel text="Tên" required />
                        <TextInput placeholder="An" maxlength="15" v-model="model.lastName"
                                name="personalInformation.lastName" />
                        <ValidationMessage name="personalInformation.lastName" />
                    </div>
                </div>

                <!-- Gender -->
                <div class="col col-sm-6 col-12">
                    <div class="form-group">
                        <FormLabel text="Giới tính" required />
                        <SelectInput name="personalInformation.gender" v-model="model.gender">
                            <option :value="Gender.Male">Nam</option>
                            <option :value="Gender.Female">Nữ</option>
                        </SelectInput>
                        <ValidationMessage name="personalInformation.gender" />
                    </div>
                </div>
                
                <!-- Birthday -->
                <div class="col col-sm-6 col-12">
                    <div class="form-group">
                        <FormLabel text="Sinh nhật" />
                        <DateInput name="personalInformation.birthday"
                                v-model="model.birthday" />
                        <ValidationMessage name="personalInformation.birthday" />
                    </div>
                </div>
                
                <!-- PhoneNumber -->
                <div class="col col-sm-6 col-12 mb-sm-0">
                    <div class="form-group">
                        <FormLabel text="Số điện thoại" />
                        <TextInput name="personalInformation.phoneNumber"
                                type="tel" placeholder="0123 456 789" maxlength="12"
                                v-model="model.phoneNumber" />
                        <ValidationMessage
                                name="personalInformation.phoneNumber" />
                    </div>
                </div>
                
                <!-- Email -->
                <div class="col col-sm-6 col-12">
                    <div class="form-group">
                        <FormLabel text="Email" />
                        <TextInput type="email"
                                name="personalInformation.email"
                                placeholder="nguyenvanan@gmail.com" maxlength="255"
                                v-model="model.email" />
                        <ValidationMessage name="personalInformation.email" />
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