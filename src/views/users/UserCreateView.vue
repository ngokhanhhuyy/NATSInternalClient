<script lang="ts">
type ModelAndRoleOptionsResult = Promise<[UserCreateModel, RoleOptionsModel]>;
</script>

<script setup lang="ts">
import { reactive, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { useUserService } from "@/services/userService";
import { UserCreateModel } from "@/models";
import { RoleOptionsModel } from "@/models";
import { useAuthorizationService } from "@/services/authorizationService";
import type { RoleListResponseDto } from "@/services/dtos/responseDtos";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@/views/layouts/MainContainerComponent.vue";
import MainBlock from "@/views/layouts/MainBlockComponent.vue";
import SubBlock from "@/views/layouts/SubBlockComponent.vue";

// Form components.
import { FormLabel, TextInput, PasswordInput } from "@/components/formInputs";

// Async components.
const UserPersonalInfoUpsert = defineAsyncComponent(() =>
    import("@/components/users/userUpsert/UserPersonalInfoUpsert.vue"));
const UserUserInfoUpsert = defineAsyncComponent(() =>
    import("@/components/users/userUpsert/UserUserInfoUpsert.vue"));
const ValidationMessage = defineAsyncComponent(() =>
    import("@/components/formInputs/ValidationMessage.vue"));
const SubmitButton = defineAsyncComponent(() =>
    import("@/components/formInputs/SubmitButtonComponent.vue"));

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
    const responseDto = await userService.createUserAsync(model.toRequestDto());
    model.id = responseDto.id;
}

async function onSubmissionSucceeded() {
    await router.push({ name: "userProfile", params: { userId: model.id } });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <div class="col col-12 my-3">
                <MainBlock title="Tạo nhân viên mới" close-button
                        body-padding="0" :body-border="false">
                    <template #body>
                        <!-- Account information -->
                        <SubBlock title="Thông tin tài khoản" body-class="row gx-3"
                                :body-padding="[2, 3]" border-top="0">
                            <!-- UserName -->
                            <div class="col col-12 mb-3">
                                <div class="form-group">
                                    <FormLabel name="Tên đăng nhập" required />
                                    <div class="input-group">
                                        <span class="input-group-text border-end-0">@</span>
                                        <TextInput property-path="userName" regex="a-zA-Z0-9_"
                                                maxlength="20" placeholder="nguyenvana"
                                                v-model="model.userName"/>
                                    </div>
                                    <ValidationMessage property-path="userName" />
                                </div>
                            </div>

                            <!-- Password -->
                            <div class="col col-sm-6 col-12 mb-sm-0 mb-3">
                                <div class="form-group">
                                    <FormLabel name="Mật khẩu" required />
                                    <PasswordInput property-path="password"
                                            placeholder="Mật khẩu" maxlength="20"
                                            v-model="model.password" />
                                    <ValidationMessage property-path="password" />
                                </div>
                            </div>

                            <!-- Confirmation password -->
                            <div class="col col-sm-6 col-12">
                                <div class="form-group">
                                    <FormLabel name="Xác nhận mật khẩu" required />
                                    <PasswordInput property-path="confirmationPassword"
                                            placeholder="Xác nhận mật khẩu" maxlength="20"
                                            v-model="model.confirmationPassword" />
                                </div>
                                <ValidationMessage property-path="confirmationPassword" />
                            </div>
                        </SubBlock>


                        <!-- Personal information -->
                        <UserPersonalInfoUpsert v-model="model.personalInformation" />

                        <!-- User information -->
                        <UserUserInfoUpsert v-model="model.userInformation"
                                :role-options="roleOptions" />
                    </template>
                </MainBlock>
            </div>
            
            <!-- Action buttons -->
            <div class="col col-auto mb-3">
                <div class="col col-auto p-0">
                    <SubmitButton :callback="submitAsync"
                            @submission-suceeded="onSubmissionSucceeded" />
                </div>
            </div>
        </div>
    </MainContainer>
</template>