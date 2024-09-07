<script setup lang="ts">
import { useRoleUtility } from "@/utilities/roleUtility";
import { useAvatarUtility } from "@/utilities/avatarUtility";

const roleUtility = useRoleUtility();
const avatarUtility = useAvatarUtility();

const props = defineProps<{
    id: number;
    userName: string;
    fullName: string;
    avatarUrl: string | null;
    roleName: string;
    roleDisplayName: string;
}>();

const bodyClassName = (() => {
    let baseClassName = "border-{color}";
    return baseClassName.replaceAll(
        "{color}",
        roleUtility.getRoleBootstrapColor(props.roleName));
})();

const footerClassName = (() => {
    let baseClassName = "text-{color} bg-{color} bg-opacity-10 border-{color}-subtle";
    return baseClassName.replaceAll(
        "{color}",
        roleUtility.getRoleBootstrapColor(props.roleName));
})();

const iconClassName = (() => {
    return roleUtility.getRoleBootstrapIconClassName(props.roleName);
})();
</script>

<template>
    <div class="block bg-white d-flex flex-column bg-body rounded-3 h-100">
        <div class="block-body flex-fill row
                    border border-bottom-0 border-default rounded-top"
                :class="bodyClassName" style="--bs-border-opacity: .25">
            <div class="col col-12 d-flex justify-content-center p-3">
                <div class="avatar-container">
                    <RouterLink :to='{ name: "userProfile", params: { userId: id } }'>
                        <img :src="avatarUrl ?? avatarUtility.getDefaultAvatarUrlByFullName(fullName)" />
                    </RouterLink>
                </div>
            </div>
            <div class="col col-12 pb-3">
                <div class="identity-container d-flex flex-column
                            align-items-center text-center">
                    <RouterLink :to='{ name: "userProfile", params: { userId: id } }'>
                        <span class="fullname fw-bold text-center">{{ fullName }}</span>
                    </RouterLink>
                    <span class="username small opacity-75">@{{ userName }}</span>
                </div>
            </div>
        </div>
        <div class="block-footer d-flex flex-row justify-content-center rounded-bottom p-0">
            <div class="d-flex h-100 w-100 p-1 justify-content-center
                        rounded-bottom-3 border"
                    :class="footerClassName">
                <span class="px-2">
                    <i :class="iconClassName"></i>
                </span>
                <span>
                    {{ roleDisplayName }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.avatar-container {
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 50%;
    }

    .avatar-container img {
        object-fit: cover;
        object-position: 50% 50%;
        aspect-ratio: 1;
        width: 100%;
        height: 100%;
    }

    a:has(.fullname) {
        color: inherit !important;
        text-decoration: none;
    }

    a:has(.fullname):hover {
        text-decoration: underline;
    }
</style>