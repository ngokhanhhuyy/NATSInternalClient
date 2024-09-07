<script setup lang="ts">
import { reactive, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UserUpdateModel } from "@/models";
import { RoleOptionsModel } from "@/models";
import { useUserService } from "@/services/userService";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form component.
import { SubmitButton } from "@/components/formInputs";

// Async components.
const UserPersonalInfoUpsert = defineAsyncComponent(() =>
    import("@/components/users/userUpsert/UserPersonalInfoUpsert.vue"));
const UserUserInfoUpsert = defineAsyncComponent(() =>
    import("@/components/users/userUpsert/UserUserInfoUpsert.vue"));

// Dependencies.
const route = useRoute();
const router = useRouter();
const userService = useUserService();

// Internal states.
const [model, roleOptions] = await loadAsync();
useUpsertViewStates();

// Functions.
async function loadAsync(): Promise<[UserUpdateModel, RoleOptionsModel]> {
    const userId = parseInt(route.params.userId as string);
    const [userDetailResponseDto, roleListResponseDto] = await Promise.all([
        userService.getUserDetailAsync(userId),
        userService.getRoleListAsync()
    ]);
    if (!userDetailResponseDto.authorization.canEdit) {
        await router.push({ name: "userList" });
    }
    const roleOptions = reactive(new RoleOptionsModel(roleListResponseDto));
    const model = reactive(new UserUpdateModel(userDetailResponseDto));
    return [model, roleOptions];
}

async function submitAysnc(): Promise<void> {
    await userService.updateUserAsync(model.id, model.toRequestDto());
}

async function onSubmissionSucceeded() {
    await router.push({ name: "userProfile", params: { userId: model.id } });
}
</script>

<template>
    <MainContainer v-if="model.authorization.canEdit">
        <div class="row g-3">
            <div class="col col-12 my-3">
                <MainBlock title="Chỉnh sửa nhân viên" close-button
                        body-padding="0" :body-border="false"
                        v-if="model.authorization.canEdit">
                    <template #body>
                        <!-- Personal information -->
                        <UserPersonalInfoUpsert v-model="model.personalInformation"
                                border-top="0"
                                :rounded-bottom="!model.authorization.canEditUserUserInformation" />

                        <!-- User information -->
                        <UserUserInfoUpsert v-model="model.userInformation"
                                :authorization="model.authorization"
                                :role-options="roleOptions"
                                v-if="model.authorization.canEditUserUserInformation" />
                    </template>
                </MainBlock>
            </div>
        </div>
        <div class="row g-3 justify-content-end mb-3">
            <!-- Action buttons -->
            <div class="col col-auto"
                    v-if="model.authorization.canEdit">
                <SubmitButton :callback="submitAysnc"
                        @submission-suceeded="onSubmissionSucceeded" />
            </div>
        </div>
    </MainContainer>
</template>