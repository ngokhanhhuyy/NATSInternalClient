<script setup lang="ts">
// Interface.
interface Props {
    isForCreating: boolean;
}

// Imports.
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CustomerUpsertModel } from "@/models/customerModels";
import { useCustomerService } from "@/services/customerService";
import { Gender } from "@/services/dtos/enums";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";
import DeleteButton from "@forms/DeleteButtonComponent.vue";
import SubmitButton from "@forms/SubmitButtonComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";

// Child components.
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const customerService = useCustomerService();

// Internal states.
const model = await intializeModelAsync();
useUpsertViewStates();
useViewStates();

// Computed properties.
const blockTitle = computed<string>(() => {
    if (props.isForCreating) {
        return "TẠO KHÁCH HÀNG";
    }
    return "CHỈNH SỬA KHÁCH HÀNG";
});

const deleteButtonVisible = computed<boolean | null | undefined>(() => {
    return !props.isForCreating && model.authorization?.canDelete;
});

// Functions.
async function intializeModelAsync(): Promise<CustomerUpsertModel> {
    if (props.isForCreating) {
        return reactive(new CustomerUpsertModel());
    } else {
        const customerId = parseInt(route.params.customerId as string);
        const responseDto = await customerService.getDetailAsync(customerId);
        return reactive(new CustomerUpsertModel(responseDto));
    }
}

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        model.id = await customerService.createAsync(model.toRequestDto());
    } else {
        await customerService.updateAsync(model.id, model.toRequestDto());
    }
}

async function onSubmissionSuccceededAsync(): Promise<void> {
    await router.push({ name: "customerDetail", params: { customerId: model.id } });
}

async function deleteAsync(): Promise<void> {
    await customerService.deleteAsync(model.id);
}

async function onDeletionSucceededAsync(): Promise<void> {
    await router.push({ name: "customerList" });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <div class="col col-12 mb-3">
                <ResourceAccess resource-type="Customer" :resource-primary-id="model.id"
                        access-mode="Update" />
            </div>
            <div class="col col-12">
                <MainBlock :title="blockTitle" close-button
                        body-class="row g-3" :body-padding="[0, 2, 3, 2]">
                    <template #body>
                        <!-- FirstName -->
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel text="Họ" required />
                                <TextInput name="firstName"
                                        placeholder="Nguyễn" maxlength="10"
                                        v-model="model.firstName" />
                                <ValidationMessage name="firstName" />
                            </div>
                        </div>

                        <!-- MiddleName -->
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel text="Tên đệm" />
                                <TextInput name="middleName"
                                        placeholder="Văn" maxlength="20"
                                        v-model="model.middleName" />
                                <ValidationMessage name="middleName" />
                            </div>
                        </div>

                        <!-- LastName -->
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel text="Tên" required />
                                <TextInput name="lastName"
                                        placeholder="An" maxlength="10"
                                        v-model="model.lastName" />
                                <ValidationMessage name="lastName" />
                            </div>
                        </div>

                        <!-- NickName -->
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel text="Biệt danh" />
                                <TextInput name="middleName"
                                        placeholder="Biệt danh" maxlength="35"
                                        v-model="model.nickName" />
                                <ValidationMessage name="nickName" />
                            </div>
                        </div>

                        <!-- Gender -->
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel text="Giới tính" />
                                <SelectInput property-path="gender" v-model="model.gender">
                                    <option :value="Gender.Male">Nam</option>
                                    <option :value="Gender.Female">Nữ</option>
                                </SelectInput>
                                <ValidationMessage name="gender" />
                            </div>
                        </div>

                        <!-- Birthday -->
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel text="Ngày sinh" />
                                <DateInput property-path="birthday" v-model="model.nickName" />
                                <ValidationMessage name="birthday" />
                            </div>
                        </div>

                        <!-- PhoneNumber -->
                        <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel text="Số điện thoại" />
                                <TextInput name="phoneNumber" type="tel"
                                    v-model="model.phoneNumber" placeholder="0123 456 789"
                                    maxlength="15" />
                                <ValidationMessage name="phoneNumber" />
                            </div>
                        </div>

                        <!-- ZaloNumber -->
                        <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel text="Zalo" />
                                <TextInput name="zaloNumber" type="tel"
                                    v-model="model.zaloNumber" placeholder="0123 456 789"
                                    maxlength="15" />
                                <ValidationMessage name="zaloNumber" />
                            </div>
                        </div>

                        <!-- FacebookUrl -->
                        <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel text="Facebook" />
                                <TextInput name="facebookUrl" regex="a-zA-Z0-9-.://_@"
                                        v-model="model.facebookUrl" maxlength="255"
                                        placeholder="https://facebook.com/nguyen.van.a" />
                                <ValidationMessage name="facebookUrl" />
                            </div>
                        </div>

                        <!-- Email  -->
                        <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel text="Email" />
                                <TextInput name="email" type="email"
                                        v-model="model.email" maxlength="255"
                                        placeholder="nguyenvana@gmail.com" />
                                <ValidationMessage name="email" />
                            </div>
                        </div>

                        <!-- Address  -->
                        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel text="Địa chỉ" />
                                <TextInput name="address" v-model="model.email"
                                        maxlength="255" placeholder="123 Nguyễn Tất Thành" />
                                <ValidationMessage name="address" />
                            </div>
                        </div>

                        <!-- Note  -->
                        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel text="Ghi chú" />
                                <TextInput name="note" type="textarea"
                                        v-model="model.email" maxlength="255"
                                        placeholder="Ghi chú" />
                                <ValidationMessage name="note" />
                            </div>
                        </div>
                    </template>
                </MainBlock>

                <div class="row justify-content-end mt-3">
                    <!-- Delete button -->
                    <div class="col col-auto p-0 me-3">
                        <DeleteButton :callback="deleteAsync" v-if="deleteButtonVisible"
                                @deletion-succeeded="onDeletionSucceededAsync" />
                    </div>

                    <!-- Submit button -->
                    <div class="col col-auto p-0">
                        <SubmitButton :callback="submitAsync"
                                @submission-suceeded="onSubmissionSuccceededAsync" />
                    </div>
                </div>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
textarea.note-input {
    min-height: 150px;
}

.close-button {
    cursor: pointer;
}
</style>