<script setup lang="ts">
// Interfaces.
interface Props {
    isForCreating: boolean;
}

// Imports.
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBrandService } from "@/services/brandService";
import { BrandUpsertModel } from "@/models/brandModels";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import ImageInput from "@forms/ImageInputComponent.vue";
import SubmitButton from "@forms/SubmitButtonComponent.vue";
import DeleteButton from "@forms/DeleteButtonComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";

// Props
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const service = useBrandService();

// Internal states.
const model = await initializeModelAsync();
useUpsertViewStates();

// Computed properties.
const blockTitle = computed<string>(() => {
    if (props.isForCreating) {
        return "Tạo thương hiệu mới";
    }
    return "Chỉnh sửa thương hiệu";
});

// Functions.
async function initializeModelAsync(): Promise<BrandUpsertModel> {
    if (props.isForCreating) {
        return reactive(new BrandUpsertModel());
    } else {
        const id = parseInt(route.params.brandId as string);
        const responseDto = await service.getDetailAsync(id);
        if (!responseDto.authorization.canEdit) {
            await router.push({ name: "productList" });
        }
        return reactive(new BrandUpsertModel(responseDto));
    }
}

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        model.id = await service.createAsync(model.toRequestDto());
    } else {
        await service.updateAsync(model.id, model.toRequestDto());
    }
}

async function deleteAsync(): Promise<void> {
    await service.deleteAsync(model.id);
}

async function onSubmissionOrDeletionSucceededAsync() {
    await router.push({ name: "productList" });
}

function onThumbnailFileChange(file: string | null) {
    model.thumbnailFile = file;
    model.thumbnailChanged = true;
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <div class="col col-12" v-if="!props.isForCreating">
                <ResourceAccess resource-type="Brand" :resource-primary-id="model.id"
                        access-mode="Update" />
            </div>
            <div class="col col-12">
                <MainBlock :title="blockTitle" close-button
                        body-class="row g-3 justify-content-center"
                        :body-padding="[2, 2, 0, 2]">
                    <template #body>
                        <div class="col col-md-auto col-sm-12 col-12 py-3 d-flex flex-column
                                    align-items-center justify-content-start">
                            <ImageInput name="thumbnailFile"
                                    default-src="images/default.jpg"
                                    :url="model.thumbnailUrl"
                                    @change="onThumbnailFileChange" />
                            <ValidationMessage name="thumbnailFile" />
                        </div>
                        <div class="col ps-md-2 ps-0 pe-0">
                            <div class="row g-3">
                                <!-- Brand name -->
                                <div class="col col-12">
                                    <FormLabel text="Tên thương hiệu" required />
                                    <TextInput name="name"
                                            placeholder="Tên thương hiệu" maxlength="20"
                                            v-model="model.name" />
                                    <ValidationMessage name="name" />
                                </div>

                                <!-- Website -->
                                <div class="col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12
                                            col-12">
                                    <FormLabel text="Website" />
                                    <TextInput name="website" maxlength="255"
                                            placeholder="abc.com" v-model="model.website" />
                                    <ValidationMessage name="website" />
                                </div>

                                <!-- SocialMediaUrl -->
                                <div class="col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12
                                            col-12">
                                    <FormLabel text="Mạng xã hội" />
                                    <TextInput name="socialMediaUrl" maxlength="255"
                                            placeholder="facebook.com/abc"
                                            v-model="model.socialMediaUrl" />
                                    <ValidationMessage name="socialMediaUrl" />
                                </div>

                                <!-- PhoneNumber -->
                                <div class="col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12
                                            col-12">
                                    <FormLabel text="Số điện thoại" />
                                    <TextInput type="tel" name="phoneNumber"
                                            maxlength="15" placeholder="0123 456 789"
                                            v-model="model.phoneNumber" />
                                    <ValidationMessage name="phoneNumber" />
                                </div>

                                <!-- Email -->
                                <div class="col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12
                                            col-12">
                                    <FormLabel text="Email" />
                                    <TextInput type="email" name="email"
                                            maxlength="255" placeholder="abc@gmail.com"
                                            v-model="model.email" />
                                    <ValidationMessage name="email" />
                                </div>

                                <!-- Address -->
                                <div class="col col-xxl-8 col-xl-12 col-lg-12 col-md-12
                                            col-sm-12 col-12">
                                    <FormLabel text="Địa chỉ" />
                                    <TextInput name="address" maxlength="255"
                                            placeholder="123 Nguyễn Tất Thành"
                                            v-model="model.address" />
                                    <ValidationMessage name="address" />
                                </div>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <div class="col col-auto" v-if="!isForCreating">
                <!-- Submit button -->
                <DeleteButton :callback="deleteAsync"
                        @deletion-suceeded="onSubmissionOrDeletionSucceededAsync" />
            </div>

            <div class="col col-auto">
                <!-- Submit button -->
                <SubmitButton :callback="submitAsync"
                        @submission-suceeded="onSubmissionOrDeletionSucceededAsync" />
            </div>
        </div>
    </MainContainer>
</template>