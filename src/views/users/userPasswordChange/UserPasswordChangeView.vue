<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserService } from "@/services/userService";
import { UserPasswordChangeModel } from "@/models/userModels";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";
import { useCurrentUserStore } from "@/stores/currentUser";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import PasswordInput from "@forms/PasswordInputComponent.vue";
import SubmitButton from "@forms/SubmitButtonComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";

// Dependency.
const router = useRouter();
const service = useUserService();
const currentUserStore = useCurrentUserStore();

// Internal states.
const model = await initializeModel();
useUpsertViewStates();

// Functions.
async function initializeModel(): Promise<UserPasswordChangeModel> {
    return reactive(new UserPasswordChangeModel());
}

async function submitAsync(): Promise<void> {
    model.currentPassword = "";
    model.newPassword = "";
    model.confirmationPassword = "";
    await service.changePasswordAsync(model.toRequestDto());
}

async function onSubmissionSucceeded(): Promise<void> {
    await router.push({ name: "userProfile", params: { userId: currentUserStore.user!.id } });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <div class="col col-12">
                <MainBlock title="Đổi mật khẩu" body-class="row g-3" close-button>
                    <template #body>
                        <!-- Current Password -->
                        <div class="col col-12">
                            <div class="form-group">
                                <FormLabel text="Mật khẩu hiện tại" required />
                                <PasswordInput name="currentPassword"
                                        placeholder="Mật khẩu" maxlength="20"
                                        v-model="model.currentPassword" />
                                <ValidationMessage name="currentPassword" />
                            </div>
                        </div>

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
                        @submission-suceeded="onSubmissionSucceeded" />
            </div>
        </div>
    </MainContainer>
</template>
