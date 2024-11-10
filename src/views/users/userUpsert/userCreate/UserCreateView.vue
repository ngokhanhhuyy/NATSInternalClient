<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserService } from "@/services/userService";
import { useRoleService } from "@/services/roleService";
import { UserCreateModel } from "@/models/userModels";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@/views/layouts/MainContainerComponent.vue";
import MainBlock from "@/views/layouts/MainBlockComponent.vue";

// Form components.
import SubmitButton from "@forms/SubmitButtonComponent.vue";

// Async components.
import AccountInformation from "./AccountInformationComponent.vue";
import UserPersonalInfoUpsert from "../UserPersonalInfoUpsertComponent.vue";
import UserUserInfoUpsert from "../UserUserInfoUpsertComponent.vue";

// Dependencies.
const router = useRouter();
const userService = useUserService();
const roleService = useRoleService();

// Internal states.
const model = reactive(await initialLoadAsync());
const { AuthorizationError } = useUpsertViewStates();

// Functions.
async function initialLoadAsync(): Promise<UserCreateModel> {
    const [canCreate, roleOptionsResponseDto] = await Promise.all([
        userService.getCreatingPermissionAsync(),
        roleService.getAllAsync()
    ]);

    if (!canCreate) {
        throw new AuthorizationError();
    }

    return new UserCreateModel(roleOptionsResponseDto);
}

async function submitAsync(): Promise<void> {
    const createdUserId = await userService.createUserAsync(model.toRequestDto());
    model.id = createdUserId;
}

async function onSubmissionSucceeded() {
    await router.push({ name: "userProfile", params: { userId: model.id } });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <div class="col col-12">
                <MainBlock title="Tạo nhân viên mới" close-button
                        body-padding="0" :body-border="false">
                    <template #body>
                        <!-- Account information -->
                        <AccountInformation v-model="model" />

                        <!-- Personal information -->
                        <UserPersonalInfoUpsert v-model="model.personalInformation" />

                        <!-- User information -->
                        <UserUserInfoUpsert v-model="model.userInformation" />
                    </template>
                </MainBlock>
            </div>
            
            <!-- Action buttons -->
            <div class="col col-auto">
                <div class="col col-auto p-0">
                    <SubmitButton :callback="submitAsync"
                            @submission-suceeded="onSubmissionSucceeded" />
                </div>
            </div>
        </div>
    </MainContainer>
</template>