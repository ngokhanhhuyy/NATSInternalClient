<script setup lang="ts">
import { computed } from "vue";
import {
    UserDetailAuthorizationModel,
    UserUserInformationDetailModel } from "@/models/userModels";
import { useRoleUtility } from "@/utilities/roleUtility";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";

// Dependencies.
const roleUtility = useRoleUtility();

// Model.
const userModel = defineModel<UserUserInformationDetailModel>("user", {
    required: true
});

const authorizationModel = defineModel<UserDetailAuthorizationModel | null>(
    "authorization",
    { required: true });

// Computed properties.
const roleBadgeClassName = computed(() => {
    let color = roleUtility.getRoleBootstrapColor(userModel.value!.role.name);
    return `bg-${color}-subtle border-${color}-subtle text-${color}`;
});

const shouldRenderNote = computed<boolean>(() => {
    return userModel.value?.note != null && !!authorizationModel.value?.canGetNote;
});
</script>

<template>
    <MainBlock title="Thông tin nhân viên" body-padding="2">
        <template #body>
            <div class="row gx-3">
                <!-- Role -->
                <div class="col col-12">
                    <FormLabel text="Vị trí" />
                </div>
                <div class="col field">
                    <span class="badge border" :class="roleBadgeClassName">
                        {{ userModel.role.displayName }}
                    </span>
                </div>
            </div>

            <!-- JoiningDate -->
            <div class="row gx-3 mt-3" v-if="userModel.joiningDate">
                <div class="col col-12">
                    <FormLabel text="Gia nhập" />
                </div>
                <div class="col field">
                    <span>{{ userModel.joiningDate }}</span>
                </div>
            </div>

            <!-- CreatedDateTime -->
            <div class="row gx-3 mt-3">
                <div class="col col-12">
                    <FormLabel text="Tạo lúc" />
                </div>
                <div class="col field">
                    <span>{{ userModel.createdDateTime }}</span>
                </div>
            </div>

            <!-- UpdatedDateTime -->
            <div class="row gx-3 mt-3" v-if="userModel.updatedDateTime">
                <div class="col col-12">
                    <FormLabel text="Chỉnh sửa lúc" />
                </div>
                <div class="col field">
                    <span>{{ userModel.updatedDateTime }}</span>
                </div>
            </div>

            <!-- Note -->
            <div class="row gx-3 mt-3" v-if="shouldRenderNote">
                <div class="col col-12">
                    <FormLabel text="Note" />
                </div>
                <div class="col field">
                    <span>{{ userModel.note }}</span>
                </div>
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.field {
    color: var(--bs-primary);
}
</style>