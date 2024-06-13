<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { reactive, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBrandService } from "@/services/brandService";
import { BrandUpsertModel } from "@/models";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@/views/layouts/MainContainerComponent.vue";

// Async components.
const ValidationMessage = defineAsyncComponent(() =>
    import("@/components/formInputs/ValidationMessage.vue"));
const ImageInput = defineAsyncComponent(() =>
    import("@/components/formInputs/ImageInputComponent.vue"));
const SubmitButton = defineAsyncComponent(() =>
    import("@/components/formInputs/SubmitButtonComponent.vue"));

// Props
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const service = useBrandService();

// Internal states.
const model = await initializeModelAsync();
const { modelState } = useUpsertViewStates();

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
        <div class="row g-3 my-3 justify-content-end">
            <div class="col col-12 mb-3">
                <div class="block bg-white rounded-3">
                    <!-- Header -->
                    <div class="block-header bg-primary-subtle border border-primary-subtle
                                rounded-top-3 p-2 ps-3">
                        <span class="text-primary small fw-bold" v-if="isForCreating">
                            TẠO THƯƠNG HIỆU MỚI
                        </span>
                        <span class="text-primary small fw-bold" v-else>
                            CHỈNH SỬA THƯƠNG HIỆU
                        </span>
                    </div>

                    <!-- Body -->
                    <div class="block-body border border-top-0 rounded-bottom-3 p-2">
                        <div class="row g-3 justify-content-center">
                            <div class="col col-md-auto col-sm-12 col-12 py-3
                                        d-flex align-items-start justify-content-center">
                                <ImageInput default-src="/images/default.jpg"
                                        :url="model.thumbnailUrl"
                                        @change="onThumbnailFileChange" />
                            </div>
                            <div class="col ps-md-2 ps-0 pe-0">
                                <div class="row">
                                    <!-- Brand name -->
                                    <div class="col col-12 mb-3">
                                        <label class="form-label small fw-bold required">Tên thương hiệu</label>
                                        <input class="form-control" :class='modelState.inputClass("name")'
                                                type="text" maxlength="50" placeholder="Tên thương hiệu"
                                                v-model="model.name" />
                                        <ValidationMessage :model-state="modelState" property-path="name" />
                                    </div>

                                    <!-- Website -->
                                    <div class="col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                        <label class="form-label small fw-bold">Website</label>
                                        <div class="input-group">
                                            <span class="input-group-text small border-end-0">https://</span>
                                            <input class="form-control" :class='modelState.inputClass("website")'
                                                    type="text" maxlength="255" placeholder="abc.com"
                                                    v-model="model.website" />
                                        </div>
                                        <ValidationMessage :model-state="modelState" property-path="website" />
                                    </div>

                                    <!-- SocialMediaUrl -->
                                    <div class="col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                        <label class="form-label small fw-bold">Mạng xã hội</label>
                                        <div class="input-group">
                                            <span class="input-group-text small border-end-0">https://</span>
                                            <input class="form-control" :class='modelState.inputClass("website")'
                                                    type="text" maxlength="255" placeholder="facebook.com/abc"
                                                    v-model="model.socialMediaUrl" />
                                        </div>
                                        <ValidationMessage :model-state="modelState" property-path="website" />
                                    </div>

                                    <!-- PhoneNumber -->
                                    <div class="col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                        <label class="form-label small fw-bold">Số điện thoại</label>
                                        <input class="form-control" :class='modelState.inputClass("phoneNumber")'
                                                type="tel" maxlength="15" placeholder="0123 456 789"
                                                v-model="model.phoneNumber" />
                                        <ValidationMessage :model-state="modelState" property-path="phoneNumber" />
                                    </div>

                                    <!-- Email -->
                                    <div class="col col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                        <label class="form-label small fw-bold">Email</label>
                                        <input class="form-control" :class='modelState.inputClass("email")'
                                                type="email" maxlength="255" placeholder="abc@gmail.com"
                                                v-model="model.email" />
                                        <ValidationMessage :model-state="modelState" property-path="email" />
                                    </div>

                                    <!-- Address -->
                                    <div class="col col-xxl-8 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
                                        <label class="form-label small fw-bold">Địa chỉ</label>
                                        <input class="form-control" :class='modelState.inputClass("address")'
                                                type="email" maxlength="255" placeholder="123 Nguyễn Tất Thành"
                                                v-model="model.address" />
                                        <ValidationMessage :model-state="modelState" property-path="address" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col col-auto">
                <!-- Submit button -->
                <SubmitButton :callback="submitAsync"
                        @submission-suceeded="onSubmissionSucceededAsync" />
            </div>
        </div>
    </MainContainer>
</template>