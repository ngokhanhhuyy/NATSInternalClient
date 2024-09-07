<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBrandService } from "@/services/brandService";
import { BrandUpsertModel } from "@/models";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import { FormLabel, TextInput, ImageInput, SubmitButton,
    ValidationMessage } from "@/components/formInputs";

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

async function onSubmissionSucceededAsync() {
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
            <div class="col col-12 mb-3">
                <MainBlock :title="blockTitle" close-button
                        body-class="row g-3 justify-content-center"
                        :body-padding="[2, 2, 3, 2]">
                    <template #body>
                        <div class="col col-md-auto col-sm-12 col-12 py-3
                                    d-flex flex-column align-items-center justify-content-start">
                            <ImageInput property-path="thumbnailFile" default-src="/images/default.jpg"
                                    :url="model.thumbnailUrl" @change="onThumbnailFileChange" />
                            <ValidationMessage property-path="thumbnailFile" />
                        </div>
                        <div class="col ps-md-2 ps-0 pe-0">
                            <div class="row gx-3">
                                <!-- Brand name -->
                                <div class="col col-12 mb-3">
                                    <FormLabel name="Tên thương hiệu" required />
                                    <TextInput property-path="name" placeholder="Tên thương hiệu"
                                            maxlength="20" v-model="model.name" />
                                    <ValidationMessage property-path="name" />
                                </div>

                                <!-- Website -->
                                <div class="col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                    <FormLabel name="Website" />
                                    <TextInput property-path="website" maxlength="255"
                                            placeholder="abc.com" v-model="model.website" />
                                    <ValidationMessage property-path="website" />
                                </div>

                                <!-- SocialMediaUrl -->
                                <div class="col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                    <FormLabel name="Mạng xã hội" />
                                    <TextInput property-path="socialMediaUrl" maxlength="255"
                                            placeholder="facebook.com/abc" v-model="model.socialMediaUrl" />
                                    <ValidationMessage property-path="socialMediaUrl" />
                                </div>

                                <!-- PhoneNumber -->
                                <div class="col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                    <FormLabel name="Số điện thoại" />
                                    <TextInput type="tel" property-path="phoneNumber" maxlength="15"
                                            placeholder="0123 456 789" v-model="model.phoneNumber" />
                                    <ValidationMessage property-path="phoneNumber" />
                                </div>

                                <!-- Email -->
                                <div class="col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12
                                            mb-lg-0 mb-md-3 mb-sm-3 mb-3">
                                    <FormLabel name="Email" />
                                    <TextInput type="email" property-path="email" maxlength="255"
                                            placeholder="abc@gmail.com" v-model="model.email" />
                                    <ValidationMessage property-path="email" />
                                </div>

                                <!-- Address -->
                                <div class="col col-xxl-8 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <FormLabel name="Địa chỉ" />
                                    <TextInput property-path="address" maxlength="255"
                                            placeholder="123 Nguyễn Tất Thành" v-model="model.address" />
                                    <ValidationMessage property-path="address" />
                                </div>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <div class="col col-auto">
                <!-- Submit button -->
                <SubmitButton :callback="submitAsync"
                        @submission-suceeded="onSubmissionSucceededAsync" />
            </div>
        </div>
    </MainContainer>
</template>