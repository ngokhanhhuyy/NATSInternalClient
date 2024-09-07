<script setup lang="ts">
import { reactive, computed } from "vue";
import { Gender } from "@/services/dtos/enums";
import { useRoute, useRouter } from "vue-router";
import { UserDetailModel } from "@/models";
import { useUserService } from "@/services/userService";
import { useRoleUtility } from "@/utilities/roleUtility";
import { useAlertModalStore } from "@/stores/alertModal";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Dependencies.
const route = useRoute();
const router = useRouter();
const userService = useUserService();
const alertModalStore = useAlertModalStore();
const roleUtility = useRoleUtility();

// Internal states.
const model = await initializeModelAsync();
useViewStates();

// Computed properties.
const roleBadgeClassName = computed(() => {
    let color = roleUtility.getRoleBootstrapColor(model.userInformation!.role.name);
    return `bg-${color}-subtle border-${color}-subtle text-${color}`;
});
const shouldRenderNote = computed<boolean>(() => {
    return model.userInformation?.note != null &&
        model.authorization.canGetNote;
});

// Functions.
async function initializeModelAsync(): Promise<UserDetailModel> {
    const userId = parseInt(route.params.userId as string);
    const responseDto = await userService.getUserDetailAsync(userId);
    return reactive(new UserDetailModel(responseDto));
}

async function deleteUser(): Promise<void> {
    await alertModalStore.getDeleteConfirmationAsync();
    await userService.deleteUserAsync(model.id);
    await alertModalStore.getSubmitSuccessConfirmationAsync();
    await router.push({ name: "userList" });
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 position-relative">
            <!-- Avatar and names -->
            <div class="col col-12 my-3" v-if="model.personalInformation">
                <div class="block block-avatar-name bg-white rounded-3
                            overflow-hidden border border-primary-subtle row">
                    <div class="col col-12 upper bg-primary-subtle
                                border-bottom border-primary p-0">
                        <img :src="model.personalInformation.avatarUrl"
                                class="avatar img-thumbnail border-primary-subtle"
                                v-if="model.personalInformation.avatarUrl">
                        <img src="https://placehold.co/256x256" v-else>
                    </div>
                    <div class="col lower bg-white d-flex">
                        <div class="name d-flex flex-column flex-fill">
                            <span class="fullname">
                                {{ model.personalInformation.fullName }}
                            </span>
                            <span class="username">@{{ model.userName }}</span>
                        </div>
                    </div>
                    <div class="col col-md-auto col-sm-12 col-12 action-buttons-container
                                px-3 pt-md-0 pt-2 pb-md-0 pb-3">
                        <RouterLink :to='{ name: "userUpdate", params: { userId: model.id } }'
                                class="btn btn-outline-primary btn-sm m-1"
                                v-if="model.authorization.canEdit">
                            <i class="bi bi-pencil-square"></i>
                            <span class="ms-2">Chỉnh sửa</span>
                        </RouterLink>
                        <RouterLink :to='{ name: "userPasswordChange", params: { userId: model.id } }'
                                class="btn btn-outline-primary btn-sm m-1"
                                v-if="model.authorization.canChangePassword">
                            <i class="bi bi-key"></i>
                            <span class="ms-2">Đổi mật khẩu</span>
                        </RouterLink>
                        <RouterLink :to='{ name: "userPasswordReset", params: { userId: model.id } }'
                                class="btn btn-outline-primary btn-sm m-1"
                                v-if="model.authorization.canResetPassword">
                            <i class="bi bi-key"></i>
                            <span class="ms-2">Đặt lại mật khẩu</span>
                        </RouterLink>
                        <button class="btn btn-outline-danger btn-sm m-1"
                                v-if="model.authorization.canDelete"
                                @click="deleteUser">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Personal information -->
            <div class="col col-md-6 col-sm-12 col-12 mb-3" v-if="model.personalInformation">
                <MainBlock title="Thông tin cá nhân">
                    <template #body>
                        <!-- Gender -->
                        <div class="row">
                            <div class="col col-lg-4 col-md-12 col-sm-4 col-12 p-0">
                                <label>Giới tính</label>
                            </div>
                            <div class="col col-lg-8 col-md-12 col-sm-8 col-12 p-0">
                                <span v-if="model.personalInformation.gender === Gender.Male">Nam</span>
                                <span v-else>Nữ</span>
                            </div>
                        </div>
                        
                        <!-- Birthday -->
                        <div class="row mt-3">
                            <div class="col col-lg-4 col-md-12 col-sm-4 col-12 p-0">
                                <label>Ngày sinh</label>
                            </div>
                            <div class="col col-lg-8 col-md-12 col-sm-8 col-12 p-0">
                                <span>{{ model.personalInformation.birthday }}</span>
                            </div>
                        </div>

                        <!-- PhoneNumber -->
                        <div class="row mt-3" v-if="model.personalInformation.phoneNumber">
                            <div class="col col-lg-4 col-md-12 col-sm-4 col-12 p-0">
                                <label>Số điện thoại</label>
                            </div>
                            <div class="col col-lg-8 col-md-12 col-sm-8 col-12 p-0">
                                <span>{{ model.personalInformation.phoneNumber }}</span>
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="row mt-3" v-if="model.personalInformation.email">
                            <div class="col col-lg-4 col-md-12 col-sm-4 col-12 p-0">
                                <label>Email</label>
                            </div>
                            <div class="col col-lg-8 col-md-12 col-sm-8 col-12 p-0">
                                <span>{{ model.personalInformation.email }}</span>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>
            

            <!-- User information -->
            <div class="col col-md-6 col-sm-12 col-12 mb-3" v-if="model.userInformation">
                <MainBlock title="Thông tin nhân viên">
                    <template #body>
                        <div class="row">
                            <!-- Role -->
                            <div class="col col-lg-4 col-md-12 col-sm-4 col-12 p-0">
                                <label>Vị trí</label>
                            </div>
                            <div class="col col-lg-8 col-md-12 col-sm-8 col-12 p-0">
                                <span class="badge border"
                                        :class="roleBadgeClassName">
                                    {{ model.userInformation.role!.displayName }}
                                </span>
                            </div>
                        </div>

                        <!-- JoiningDate -->
                        <div class="row mt-3" v-if="model.userInformation.joiningDate">
                            <div class="col col-lg-4 col-md-12 col-sm-4 col-12 p-0">
                                <label>Gia nhập</label>
                            </div>
                            <div class="col col-lg-8 col-md-12 col-sm-8 col-12 p-0">
                                <span>{{ model.userInformation.joiningDate }}</span>
                            </div>
                        </div>

                        <!-- CreatedDateTime -->
                        <div class="row mt-3">
                            <div class="col col-lg-4 col-md-12 col-sm-4 col-12 p-0">
                                <label>Tạo lúc</label>
                            </div>
                            <div class="col col-lg-8 col-md-12 col-sm-8 col-12 p-0">
                                <span>{{ model.userInformation.createdDateTime }}</span>
                            </div>
                        </div>

                        <!-- UpdatedDateTime -->
                        <div class="row mt-3" v-if="model.userInformation.updatedDateTime">
                            <div class="col col-lg-4 col-md-12 col-sm-4 col-12 p-0">
                                <label>Chỉnh sửa lúc</label>
                            </div>
                            <div class="col col-lg-8 col-md-12 col-sm-8 col-12 p-0">
                                <span>{{ model.userInformation.updatedDateTime }}</span>
                            </div>
                        </div>

                        <!-- Note -->
                        <div class="row mt-3" v-if="shouldRenderNote">
                            <div class="col col-lg-4 col-md-12 col-sm-4 col-12 p-0">
                                <label>Note</label>
                            </div>
                            <div class="col col-lg-8 col-md-12 col-sm-8 col-12 p-0">
                                <span>{{ model.userInformation.note }}</span>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
label {
    font-weight: bold;
}

.badge {
    display: flex;
    width: fit-content;
    align-items: center;
}

.block.block-avatar-name {
    --avatar-upper-height: 130px;
    --avatar-size: 160px;
    --avatar-margin-left: 20px;
    --avatar-margin-right: 20px;
    --avatar-margin-top: 0;
    --avatar-margin-bottom: -50px;
}

.block.block-avatar-name .upper {
    --bs-border-opacity: .1;
    height: var(--avatar-upper-height);
    position: relative;
    box-sizing: content-box;
}

.block.block-avatar-name .upper img {
    height: var(--avatar-size);
    width: auto;
    aspect-ratio: 1;
    position: absolute;
    bottom: var(--avatar-margin-bottom);
    left: calc(var(--avatar-margin-left));
}

.block.block-avatar-name .lower {
    padding-left: calc(var(--avatar-size) + var(--avatar-margin-left) + var(--avatar-margin-right));
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    height: fit-content;
}

.block.block-avatar-name .lower .name {
    justify-content: center;
}

.block.block-avatar-name .lower .name .fullname,
.block.block-avatar-name .lower .name .username {
    width: fit-content;
}

.block.block-avatar-name .lower .name .fullname {
    font-size: 1.35em;
    font-weight: bold;
}

.block.block-avatar-name .lower .name .username {
    opacity: 0.75;
}

.block.block-avatar-name .action-buttons-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.block.block.block-avatar-name .action-buttons-container button {
    width: fit-content !important;
    height: fit-content !important;
    aspect-ratio: 1;
}

@media (max-width: 768px) {
    .block.block-avatar-name {
        --avatar-size: 180px;
        --avatar-upper-height: calc(var(--avatar-size) + 20px);
        --avatar-margin: 15px;
    }

    .block.block-avatar-name .upper img {
        top: unset;
        bottom: calc(var(--avatar-margin) * -1);
        left: 50%;
        transform: translateX(-50%);
    }

    .block.block-avatar-name .lower {
        padding: calc(var(--avatar-margin) * 1.5) 0 0 0;
    }

    .block.block-avatar-name .lower .name {
        align-items: center;
    }
}
</style>