<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthenticationService } from "@/services/authenticationService";
import { UserDetailModel } from "@/models/userModels";
import { useAuthenticationStore } from "@/stores/authentication";
import { useInitialDataStore } from "@/stores/initialData";
import { useAvatarUtility } from "@/utilities/avatarUtility";

// Dependencies.
const router = useRouter();
const authenticationService = useAuthenticationService();
const avatarUtility = useAvatarUtility();
const authStore = useAuthenticationStore();
const initialDataStore = useInitialDataStore();

// Model.
const model = reactive(new UserDetailModel(initialDataStore.data.user.detail));

// Computed properties.
const avatarUrl = computed(() => {
    if (model!.personalInformation?.avatarUrl == null) {
        return avatarUtility
            .getDefaultAvatarUrlByFullName(model.personalInformation!.fullName!);
    }
    return model!.personalInformation!.avatarUrl;
});

// Functions.
function onProfileButtonClicked(): void {
    router.push({ name: "userProfile", params: { userId: model.id } });
}

function onUpdateButtonClicked(): void {
    router.push({ name: "userUpdate", params: { userId: model.id } });
}

function onPasswordChangeButtonClicked(): void {
    router.push({ name: "userPasswordChange", params: { userId: model.id } });
}

async function onLogoutButtonClick() {
    await authenticationService.signOutAsync();
    authStore.clearAuthenticationStatus();
    initialDataStore.clearData();

    await router.push({ name: "login" });
}

</script>

<template>
    <div class="current-user-container dropdown d-flex flex-row h-100
                justify-content-end align-items-center">
        <div class="d-md-flex d-sm-none d-none flex-column align-items-end
                    justify-content-center">
            <div class="fullname">{{ model!.personalInformation!.fullName }}</div>
            <div class="username">@{{ model!.userName }}</div>
        </div>
        <button class="btn p-0 ms-2 avatar-container focus-ring" type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="avatarUrl" class="avatar">
        </button>
        <div class="dropdown-menu dropdown-menu-end border-primary-subtle
                    shadow p-0 overflow-hidden">
            <ul class="list-group list-group-flush">
                <li class="list-group-item"
                        @click="onProfileButtonClicked">
                    <i class="bi bi-person-badge me-3"></i>
                    <span>Trang cá nhân</span>
                </li>
                <li class="list-group-item"
                        @click="onUpdateButtonClicked">
                    <i class="bi bi-box-arrow-right me-3"></i>
                    <span>Sửa hồ sơ</span>
                </li>
                <li class="list-group-item"
                        @click="onPasswordChangeButtonClicked">
                    <i class="bi bi-asterisk me-3"></i>
                    <span>Đổi mật khẩu</span>
                </li>
                <li class="list-group-item" @click="onLogoutButtonClick">
                    <i class="bi bi-box-arrow-right me-3"></i>
                    <span class="text-danger">Đăng xuất</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.current-user-container {
    width: fit-content;
}

.avatar-container {
    height: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 50% !important;
    border: none;
}

.avatar-container img.avatar {
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 50% !important;
    overflow: hidden;
}

.fullname {
    font-weight: bold;
}

.username {
    font-size: 0.85em;
    opacity: 0.7;
    margin-top: -5px !important;
}

.dropdown-menu {
    width: fit-content;
    min-width: 200px;
    top: calc(100% + 5px);
}

.dropdown-menu ul li:hover {
    background: var(--bs-primary);
    border-color: var(--bs-primary);
    cursor: pointer;
}

.dropdown-menu ul li:hover i,
.dropdown-menu ul li:hover span {
    color: white !important;
}

.dropdown-menu ul li:has(.text-danger):hover {
    background: var(--bs-danger);
    border-color: var(--bs-danger);
}
</style>