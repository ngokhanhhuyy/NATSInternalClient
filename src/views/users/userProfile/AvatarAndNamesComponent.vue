<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import type { UserDetailModel } from "@/models";

// Model.
const model = defineModel<UserDetailModel>({ required: true });

// Computed properties.
const updateRoute = computed<RouteLocationRaw>(() => ({
    name: "userUpdate",
    params: {
        userId: model.value.id
    }
}));

const passwordChangeRoute = computed<RouteLocationRaw>(() => ({
    name: "userPasswordChange",
    params: {
        userId: model.value.id
    }
}));

const passwordResetRoute = computed<RouteLocationRaw>(() => ({
    name: "userPasswordReset",
    params: {
        userId: model.value.id
    }
}));
</script>

<template>
    <div class="block block-avatar-name bg-white rounded-3
                overflow-hidden border border-primary-subtle row">
        <div class="col col-12 upper bg-primary-subtle
                    border-bottom border-primary p-0">
            <img :src="model.personalInformation!.avatarUrl"
                    class="avatar img-thumbnail border-primary-subtle"
                    v-if="model.personalInformation!.avatarUrl">
            <img src="https://placehold.co/256x256" v-else>
        </div>
        <div class="col lower bg-white d-flex">
            <div class="name d-flex flex-column flex-fill">
                <span class="fullname">
                    {{ model.personalInformation!.fullName }}
                </span>
                <span class="username">@{{ model.userName }}</span>
            </div>
        </div>
        <div class="col col-md-auto col-sm-12 col-12 action-buttons-container
                    px-3 pt-md-0 pt-2 pb-md-0 pb-3">
            <RouterLink :to="updateRoute" class="btn btn-outline-primary btn-sm m-1"
                    v-if="model.authorization.canEdit">
                <i class="bi bi-pencil-square"></i>
                <span class="ms-2">Chỉnh sửa</span>
            </RouterLink>
            <RouterLink :to="passwordChangeRoute"
                    class="btn btn-outline-primary btn-sm m-1"
                    v-if="model.authorization.canChangePassword">
                <i class="bi bi-key"></i>
                <span class="ms-2">Đổi mật khẩu</span>
            </RouterLink>
            <RouterLink :to="passwordResetRoute"
                    class="btn btn-outline-primary btn-sm m-1"
                    v-if="model.authorization.canResetPassword">
                <i class="bi bi-key"></i>
                <span class="ms-2">Đặt lại mật khẩu</span>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
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