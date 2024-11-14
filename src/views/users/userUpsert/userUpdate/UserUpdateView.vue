<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UserUpdateModel } from "@/models/userModels";
import { useUserService } from "@/services/userService";
import { useRoleService } from "@/services/roleService";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@/views/layouts/MainContainerComponent.vue";
import MainBlock from "@/views/layouts/MainBlockComponent.vue";

// Form component.
import SubmitButton from "@/components/formInputs/SubmitButtonComponent.vue";
import DeleteButton from "@/components/formInputs/DeleteButtonComponent.vue";

// Async components.
import UserPersonalInfoUpsert from "../UserPersonalInfoUpsertComponent.vue";
import UserUserInfoUpsert from "../UserUserInfoUpsertComponent.vue";

// Dependencies.
const route = useRoute();
const router = useRouter();
const userService = useUserService();
const roleService = useRoleService();

// Internal states.
const model= await initialLoadAsync();
const { AuthorizationError } = useUpsertViewStates();

// Computed properties.
const isPersonalInformationBlockRounded = computed<boolean>(() => {
    return !model.authorization.canEditUserUserInformation;
});

// Functions.
async function initialLoadAsync(): Promise<UserUpdateModel> {
    const [userDetailResponseDto, roleListResponseDto] = await Promise.all([
        userService.getDetailAsync(parseInt(route.params.userId as string)),
        roleService.getAllAsync()]);

    if (!userDetailResponseDto.authorization.canEdit) {
        throw new AuthorizationError();
    }

    return reactive(new UserUpdateModel(userDetailResponseDto, roleListResponseDto));
}

async function submitAysnc(): Promise<void> {
    await userService.updateAsync(model.id, model.toRequestDto());
}

async function onSubmissionSucceededAsync() {
    await router.push({ name: "userProfile", params: { userId: model.id } });
}

async function deleteAsync(): Promise<void> {
    await userService.deleteAsync(model.id);
}

async function onDeletionSucceededAsync(): Promise<void> {
    await router.push({ name: "userList", params: { userId: model.id } });
}
</script>

<template>
    <MainContainer v-if="model.authorization.canEdit">
        <div class="row g-3">
            <div class="col col-12">
                <MainBlock title="Chỉnh sửa nhân viên" close-button
                        body-padding="0" :body-border="false"
                        v-if="model.authorization.canEdit">
                    <template #body>
                        <!-- Personal information -->
                        <UserPersonalInfoUpsert v-model="model.personalInformation"
                                border-top="0"
                                :rounded-bottom="isPersonalInformationBlockRounded" />

                        <!-- User information -->
                        <UserUserInfoUpsert v-model="model.userInformation"
                                v-if="model.authorization.canEditUserUserInformation" />
                    </template>
                </MainBlock>
            </div>
        </div>
        <div class="row g-3 justify-content-end">
            <!-- Action buttons -->
            <div class="col col-auto" v-if="model.authorization.canDelete">
                <DeleteButton :callback="deleteAsync"
                        @submission-suceeded="onDeletionSucceededAsync" />
            </div>
            <div class="col col-auto" v-if="model.authorization.canEdit">
                <SubmitButton :callback="submitAysnc"
                        @submission-suceeded="onSubmissionSucceededAsync" />
            </div>
        </div>
    </MainContainer>
</template>