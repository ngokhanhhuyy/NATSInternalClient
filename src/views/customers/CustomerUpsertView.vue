<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CustomerUpsertModel } from "@/models";
import { useCustomerService } from "@/services/customerService";
import { Gender } from "@/services/dtos/enums";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, TextInput, SelectInput, SubmitButton,
    DateInput, ValidationMessage } from "@/components/formInputs";

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
        const responseDto = await customerService.createAsync(model.toRequestDto());
        model.id = responseDto.id;
    } else {
        await customerService.updateAsync(model.id, model.toRequestDto());
    }
}

async function onSubmissionSuccceededAsync(): Promise<void> {
    await router.push({ name: "customerDetail", params: { customerId: model.id } });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <div class="col col-12">
                <MainBlock :title="blockTitle" close-button
                        body-class="row g-3" :body-padding="[0, 2, 3, 2]">
                    <template #body>
                        <!-- FirstName -->
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel name="Họ" required />
                                <TextInput property-path="firstName"
                                        placeholder="Nguyễn" maxlength="10"
                                        v-model="model.firstName" />
                                <ValidationMessage property-path="firstName" />
                            </div>
                        </div>

                        <!-- MiddleName -->
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel name="Tên đệm" />
                                <TextInput property-path="middleName"
                                        placeholder="Văn" maxlength="20"
                                        v-model="model.middleName" />
                                <ValidationMessage property-path="middleName" />
                            </div>
                        </div>

                        <!-- LastName -->
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel name="Tên" required />
                                <TextInput property-path="lastName"
                                        placeholder="An" maxlength="10"
                                        v-model="model.lastName" />
                                <ValidationMessage property-path="lastName" />
                            </div>
                        </div>

                        <!-- NickName -->
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel name="Biệt danh" />
                                <TextInput property-path="middleName"
                                        placeholder="Biệt danh" maxlength="35"
                                        v-model="model.nickName" />
                                <ValidationMessage property-path="nickName" />
                            </div>
                        </div>

                        <!-- Gender -->
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel name="Giới tính" />
                                <SelectInput property-path="gender" v-model="model.gender">
                                    <option :value="Gender.Male">Nam</option>
                                    <option :value="Gender.Female">Nữ</option>
                                </SelectInput>
                                <ValidationMessage property-path="gender" />
                            </div>
                        </div>

                        <!-- Birthday -->
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel name="Ngày sinh" />
                                <DateInput property-path="birthday" v-model="model.nickName" />
                                <ValidationMessage property-path="birthday" />
                            </div>
                        </div>

                        <!-- PhoneNumber -->
                        <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel name="Số điện thoại" />
                                <TextInput property-path="phoneNumber" type="tel"
                                    v-model="model.phoneNumber" placeholder="0123 456 789"
                                    maxlength="15" />
                                <ValidationMessage property-path="phoneNumber" />
                            </div>
                        </div>

                        <!-- ZaloNumber -->
                        <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel name="Zalo" />
                                <TextInput property-path="zaloNumber" type="tel"
                                    v-model="model.zaloNumber" placeholder="0123 456 789"
                                    maxlength="15" />
                                <ValidationMessage property-path="zaloNumber" />
                            </div>
                        </div>

                        <!-- FacebookUrl -->
                        <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel name="Facebook" />
                                <TextInput property-path="facebookUrl" regex="a-zA-Z0-9-.://_@"
                                        v-model="model.facebookUrl" maxlength="255"
                                        placeholder="https://facebook.com/nguyen.van.a" />
                                <ValidationMessage property-path="facebookUrl" />
                            </div>
                        </div>

                        <!-- Email  -->
                        <div class="col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel name="Email" />
                                <TextInput property-path="email" type="email"
                                        v-model="model.email" maxlength="255"
                                        placeholder="nguyenvana@gmail.com" />
                                <ValidationMessage property-path="email" />
                            </div>
                        </div>

                        <!-- Address  -->
                        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel name="Địa chỉ" />
                                <TextInput property-path="address" v-model="model.email"
                                        maxlength="255" placeholder="123 Nguyễn Tất Thành" />
                                <ValidationMessage property-path="address" />
                            </div>
                        </div>

                        <!-- Note  -->
                        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                            <div class="form-input">
                                <FormLabel name="Ghi chú" />
                                <TextInput property-path="note" type="textarea"
                                        v-model="model.email" maxlength="255"
                                        placeholder="Ghi chú" />
                                <ValidationMessage property-path="note" />
                            </div>
                        </div>
                    </template>
                </MainBlock>

                <div class="row justify-content-end mt-3">
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