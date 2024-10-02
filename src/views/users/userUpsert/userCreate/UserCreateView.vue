<script setup lang="ts">
// Type.
type ModelAndRoleOptionsResult = Promise<[UserCreateModel, RoleOptionsModel]>;

// Imports.
import { reactive, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { useUserService } from "@/services/userService";
import { UserCreateModel } from "@/models";
import { RoleOptionsModel } from "@/models";
import { useAuthorizationService } from "@/services/authorizationService";
import type { RoleListResponseDto } from "@/services/dtos/responseDtos";
import { useUpsertViewStates } from "@/composables";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import { SubmitButton } from "@/components/formInputs";

// Async components.
const AccountInformation = defineAsyncComponent(() =>
    import ("./AccountInformationComponent.vue"));
const UserPersonalInfoUpsert = defineAsyncComponent(() =>
    import("@/views/users/userUpsert/UserPersonalInfoUpsertComponent.vue"));
const UserUserInfoUpsert = defineAsyncComponent(() =>
    import("@/views/users/userUpsert/UserUserInfoUpsertComponent.vue"));

// Dependencies.
const router = useRouter();
const userService = useUserService();
const authorizationService = useAuthorizationService();

// Internal states.
const [model, roleOptions] = await initializeModelAndRoleOptionsAsync();
useUpsertViewStates();

// Functions.
async function initializeModelAndRoleOptionsAsync(): ModelAndRoleOptionsResult {
    // Fetch data from api.
    const responseDto = await userService.getRoleListAsync();
    const filteredResponseDto: RoleListResponseDto = {
        items: responseDto.items
            .filter(r => authorizationService.canAssignToRole(r.powerLevel))
            .map(r => ({
                id: r.id,
                name: r.name,
                displayName: r.displayName,
                powerLevel: r.powerLevel
            }))
    };

    // Initialize model and options.
    const roleOptions = new RoleOptionsModel(filteredResponseDto);
    const model = reactive(new UserCreateModel(roleOptions.items[1]));
    return [model, roleOptions];
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
                        <UserUserInfoUpsert v-model="model.userInformation"
                                :role-options="roleOptions" />
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