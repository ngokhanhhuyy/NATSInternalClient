<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserService } from "@/services/userService";
import { UserPasswordResetModel } from "@/models/userModels";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import PasswordInput from "@forms/PasswordInputComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";
import SubmitButton from "@forms/SubmitButtonComponent.vue";

// Dependency.
const route = useRoute();
const router = useRouter();
const userService = useUserService();

// Internal states.
const model = await initialLoadAsync();
const { AuthorizationError } = useUpsertViewStates();

// Functions.
async function initialLoadAsync(): Promise<UserPasswordResetModel> {
    const userId = parseInt(route.params.userId as string);
    if (!await userService.getResetPasswordPermission(userId)) {
        throw new AuthorizationError();
    }

    return reactive(new UserPasswordResetModel(userId));
}

async function submitAsync(): Promise<void> {
    await userService.resetPasswordAsync(model.id, model.toRequestDto());
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
                                <FormLabel text="Mật khẩu mới" required />
                                <PasswordInput name="newPassword"
                                        placeholder="Mật khẩu mới" maxlength="20"
                                        v-model="model.newPassword" />
                                <ValidationMessage name="newPassword" />
                            </div>
                        </div>

                        <!-- Confirmation Password -->
                        <div class="col col-sm-6 col-12">
                            <div class="form-group">
                                <FormLabel text="Mật khẩu xác nhận" required />
                                <PasswordInput name="confirmationPassword"
                                        placeholder="Mật khẩu xác nhận" maxlength="20"
                                        v-model="model.confirmationPassword" />
                                <ValidationMessage name="confirmationPassword" />
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>
            
            <!-- Submit button -->
            <div class="col col-auto">
                <SubmitButton :callback="submitAsync"
                        @succeeded="onSubmissionSucceeded" />
            </div>
        </div>
    </MainContainer>
</template>
