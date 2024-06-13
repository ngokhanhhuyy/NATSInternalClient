<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserService } from "@/services/userService";
import { UserPasswordChangeModel } from "@/models";
import { useAuthorizationService } from "@/services/authorizationService";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, PasswordInput, SubmitButton,
    ValidationMessage } from "@/components/formInputs";

// Dependency.
const route = useRoute();
const router = useRouter();
const userService = useUserService();
const authorizationService = useAuthorizationService();

// Internal states.
const model = await initializeModel();
useUpsertViewStates();

// Functions.
async function initializeModel(): Promise<UserPasswordChangeModel> {
    const userId = parseInt(route.params.userId as string);
    const canChangeUserPassword = authorizationService
        .canChangeUserPassword(userId);
    if (!canChangeUserPassword) {
        await router.push({ name: "userList" });
    }

    const model = reactive<UserPasswordChangeModel>(new UserPasswordChangeModel(userId));
    return model;
}

async function submitAsync(): Promise<void> {
    model.currentPassword = "";
    model.newPassword = "";
    model.confirmationPassword = "";
    await userService.changeUserPasswordAsync(model.id, model.toRequestDto());
}

async function onSubmissionSucceeded(): Promise<void> {
    await router.push({ name: "userProfile", params: { userId: model.id } });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <div class="col col-12 my-3">
                <MainBlock title="Đổi mật khẩu" close-button
                        body-class="row g-3" :body-padding="[2, 2, 3, 2]">
                    <template #body>
                        <!-- Current Password -->
                        <div class="col col-12 mb-3">
                            <div class="form-group">
                                <FormLabel name="Mật khẩu hiện tại" required />
                                <PasswordInput property-path="currentPassword"
                                        placeholder="Mật khẩu" maxlength="20"
                                        v-model="model.currentPassword" />
                                <ValidationMessage property-path="currentPassword" />
                            </div>
                        </div>

                        <!-- New Password -->
                        <div class="col col-sm-6 col-12 mb-sm-0 mb-3">
                            <div class="form-group">
                                <FormLabel name="Mật khẩu mới" required />
                                <PasswordInput property-path="newPassword"
                                        placeholder="Mật khẩu mới" maxlength="20"
                                        v-model="model.newPassword" />
                                <ValidationMessage property-path="newPassword" />
                            </div>
                        </div>

                        <!-- Confirmation Password -->
                        <div class="col col-sm-6 col-12 mb-sm-0 mb-3">
                            <div class="form-group">
                                <FormLabel name="Mật khẩu xác nhận" required />
                                <PasswordInput property-path="confirmationPassword"
                                        placeholder="Mật khẩu xác nhận" maxlength="20"
                                        v-model="model.confirmationPassword" />
                                <ValidationMessage property-path="confirmationPassword" />
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Submit button -->
            <div class="col col-auto">
                <SubmitButton :callback="submitAsync"
                        @submission-suceeded="onSubmissionSucceeded" />
            </div>
        </div>
    </MainContainer>
</template>
