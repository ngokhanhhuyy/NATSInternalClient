<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserService } from "@/services/userService";
import { UserPasswordResetModel } from "@/models";
import { useAuthorizationService } from "@/services/authorizationService";
import { useUpsertViewStates } from "@/composables";

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
const model = await initializeModelAsync();
useUpsertViewStates();

// Functions.
async function initializeModelAsync(): Promise<UserPasswordResetModel> {
    const userId = parseInt(route.params.userId as string);
    const responseDto = await userService.getUserRoleAsync(userId);
    const canResetUserPassword = authorizationService
        .canResetUserPassword(userId, responseDto.powerLevel);
    if (!canResetUserPassword) {
        await router.push({ name: "userList" });
    }

    return reactive<UserPasswordResetModel>(new UserPasswordResetModel(userId));
}

async function submitAsync(): Promise<void> {
    await userService.resetUserPasswordAsync(model.id, model.toRequestDto());
}

async function onSubmissionSucceeded(): Promise<void> {
    await router.push({ name: "userProfile", params: { userId: model.id } });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <div class="col col-12">
                <MainBlock title="Đặt lại mật khẩu" body-class="row g-3" close-button>
                    <template #body>
                        <!-- New Password -->
                        <div class="col col-sm-6 col-12">
                            <div class="form-group">
                                <FormLabel name="Mật khẩu mới" required />
                                <PasswordInput property-path="newPassword"
                                        placeholder="Mật khẩu mới" maxlength="20"
                                        v-model="model.newPassword" />
                                <ValidationMessage property-path="newPassword" />
                            </div>
                        </div>

                        <!-- Confirmation Password -->
                        <div class="col col-sm-6 col-12">
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
