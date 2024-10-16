<script setup lang="ts">
// Interfaces.
interface Emits {
    (event: "searchButtonClicked"): void
}

// Imports.
import { reactive, computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { UserListModel, RoleOptionsModel, RoleBasicModel } from "@/models";
import { useUserService } from "@/services/userService";
import { useRoleUtility } from "@/utilities/roleUtility";

// Layout component.
import { MainBlock } from "@/views/layouts";

// Form component.
import { FormLabel, SelectInput, TextInput, ValidationMessage } from "@/components/formInputs";

// Emits.
const emit = defineEmits<Emits>();

// Dependencies.
const userService = useUserService();
const roleUtility = useRoleUtility();

// Model.
const model = defineModel<UserListModel>({ required: true });
const roleOptions = await initialLoadAsync();
const userCreateRoute: RouteLocationRaw = { name: "userCreate" };

// Computed properties.
const isSearchContentValid = computed<boolean> (() =>
    !model.value.content.length || model.value.content.length >= 3);

const searchContentColumnClass = computed<string | null>(() =>
    !isSearchContentValid.value ? "pb-0" : null);

// Functions.
async function initialLoadAsync(): Promise<RoleOptionsModel> {
    const responseDto = await userService.getRoleListAsync();
    return reactive(new RoleOptionsModel(responseDto));
}

function roleButtonClassName(roleName: string) {
    let baseClassName = "bg-{color} bg-opacity-10 border-{color}-subtle text-{color}";
    return baseClassName.replaceAll(
        "{color}",
        roleUtility.getRoleBootstrapColor(roleName));
}

async function onRoleButtonClicked(role: RoleBasicModel | null) {
    model.value.roleId = role && role.id;
    model.value.page = 1;
}

function onContentTextBoxInput(): void {
    model.value.page = 1;
}
</script>

<template>
    <MainBlock title="Danh sách nhân viên" body-padding="2">
        <!-- Header -->
        <template #header>
            <RouterLink :to="userCreateRoute" class="btn btn-primary btn-sm"
                    v-if="model.authorization?.canCreate">
                <i class="bi bi-plus-lg"></i>
                <span>Tạo mới</span>
            </RouterLink>
        </template>

        <!-- Body -->
        <template #body>
            <div class="row g-3">
                <!-- Search content -->
                <div class="col" :class="searchContentColumnClass">
                    <div class="input-group">
                        <TextInput class="flex-fill border-end-0" type="text"
                                maxlength="255" placeholder="Họ và tên, số điện thoại ..."
                                v-model="model.content" @input="onContentTextBoxInput" />

                        <!-- Advance filters / collapse button -->        
                        <button class="btn btn-outline-primary" data-bs-toggle="collapse"
                                href="#advanced-filters-container" aria-expanded="false"
                                role="button" aria-controls="advanced-filters-container">
                            <i class="bi bi-sliders"></i>
                        </button>
                    </div>
                    <span class="small opacity-50" v-show="!isSearchContentValid">
                        * Nội dung tìm kiếm phải chứa ít nhất 3 ký tự.
                    </span>
                </div>

                <!-- Search button -->
                <div class="col col-auto">
                    <button class="btn btn-primary" @click='emit("searchButtonClicked")'
                            :disabled="!isSearchContentValid">
                        <i class="bi bi-search"></i>
                        <span class="d-sm-inline d-none ms-2">Tìm kiếm</span>
                    </button>
                </div>
            </div>
            <div class="row g-3 collapse" id="advanced-filters-container">
                <!-- Order by field -->
                <div class="col col-sm-6 col-12">
                    <FormLabel name="Trường sắp xếp" />
                    <SelectInput property-path="orderByField" v-model="model.orderByField">
                        <option value="lastName">Tên</option>
                        <option value="firstName">Họ</option>
                        <option value="userName">Tên tài khoản</option>
                        <option value="birthday">Sinh nhật</option>
                        <option value="age">Tuổi</option>
                        <option value="createdDateTime">Ngày tạo</option>
                        <option value="role">Vị trí</option>
                    </SelectInput>
                    <ValidationMessage property-path="orderByField" />
                </div>

                <!-- Order by direction -->
                <div class="col col-sm-6 col-12">
                    <FormLabel name="Thứ tự sắp xếp" />
                    <SelectInput property-path="orderByAscending"
                            v-model="model.orderByAscending">
                        <option :value="true">Từ nhỏ đến lớn</option>
                        <option :value="false">Từ lớn đến nhỏ</option>
                    </SelectInput>
                    <ValidationMessage property-path="orderByAscending" />
                </div>

                <!-- Role options -->
                <div class="col col-12 pb-0">
                    <FormLabel name="Vị trí" />
                    <div class="d-flex flex-row flex-wrap">
                        <!-- All role button -->
                        <div class="btn btn-sm me-2 mb-2 all-role-button"
                                @click="onRoleButtonClicked(null)">
                            <i class="bi bi-grid-3x3-gap me-1"></i>
                            Tất cả
                        </div>

                        <!-- Specific role button -->
                        <div class="btn btn-sm me-2 mb-2" :key="role.id"
                                :class="roleButtonClassName(role.name)"
                                v-for="role of roleOptions.items"
                                @click="onRoleButtonClicked(role)">
                            <i class="bi bi-wrench" v-if="role.id === 1"></i>
                            <i class="bi bi-star-fill" v-else-if="role.id === 2"></i>
                            <i class="bi bi-star" v-else></i>
                            <span class="ms-1">{{ role.displayName }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.all-role-button {
    --color: 111, 66, 193;
    color: rgb(var(--color)) !important;
    background-color: rgba(var(--color), 0.1) !important;
    border-color: rgba(var(--color), 0.4);
}
</style>