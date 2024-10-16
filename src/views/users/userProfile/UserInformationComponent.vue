<script setup lang="ts">
import { computed } from "vue";
import { UserDetailAuthorizationModel, UserUserInformationDetailModel } from "@/models";
import { useRoleUtility } from "@/utilities/roleUtility";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import { FormLabel } from "@/components/formInputs";

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
    <MainBlock title="Thông tin nhân viên" :body-padding="[0, 2, 1, 2]">
        <template #body>
            <div class="row g-3">
                <!-- Role -->
                <div class="col col-lg-4 col-md-12 col-sm-4 col-12">
                    <FormLabel name="Vị trí" />
                </div>
                <div class="col col-lg-8 col-md-12 col-sm-8 col-12">
                    <span class="badge border"
                            :class="roleBadgeClassName">
                        {{ userModel.role!.displayName }}
                    </span>
                </div>
            </div>

            <!-- JoiningDate -->
            <div class="row g-3" v-if="userModel.joiningDate">
                <div class="col col-lg-4 col-md-12 col-sm-4 col-12">
                    <FormLabel name="Gia nhập" />
                </div>
                <div class="col col-lg-8 col-md-12 col-sm-8 col-12">
                    <span>{{ userModel.joiningDate }}</span>
                </div>
            </div>

            <!-- CreatedDateTime -->
            <div class="row g-3">
                <div class="col col-lg-4 col-md-12 col-sm-4 col-12">
                    <FormLabel name="Tạo lúc" />
                </div>
                <div class="col col-lg-8 col-md-12 col-sm-8 col-12">
                    <span>{{ userModel.createdDateTime }}</span>
                </div>
            </div>

            <!-- UpdatedDateTime -->
            <div class="row g-3" v-if="userModel.updatedDateTime">
                <div class="col col-lg-4 col-md-12 col-sm-4 col-12">
                    <FormLabel name="Chỉnh sửa lúc" />
                </div>
                <div class="col col-lg-8 col-md-12 col-sm-8 col-12">
                    <span>{{ userModel.updatedDateTime }}</span>
                </div>
            </div>

            <!-- Note -->
            <div class="row g-3" v-if="shouldRenderNote">
                <div class="col col-lg-4 col-md-12 col-sm-4 col-12">
                    <FormLabel name="Note" />
                </div>
                <div class="col col-lg-8 col-md-12 col-sm-8 col-12">
                    <span>{{ userModel.note }}</span>
                </div>
            </div>
        </template>
    </MainBlock>
</template>