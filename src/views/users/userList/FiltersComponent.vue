<script setup lang="ts">
// Interfaces.
interface Emits {
    (event: "searchButtonClicked"): void
}

// Imports.
import { computed, onMounted } from "vue";
import { UserListModel } from "@/models/userModels";
import { RoleMinimalModel } from "@/models/roleModels";
import { useRoleUtility } from "@/utilities/roleUtility";

// Layout component.
import MainBlock from "@layouts/MainBlockComponent.vue";
import CreatingRouterLink from "@layouts/CreatingRouterLinkComponent.vue";

// Form component.
import FormLabel from "@forms/FormLabelComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";
import SortingByFieldSelectInput from "@forms/SortingByFieldSelectInputComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";

// Emits.
const emit = defineEmits<Emits>();

// Dependencies.
const roleUtility = useRoleUtility();

// Model.
const model = defineModel<UserListModel>({ required: true });

// Computed properties.
const isSearchContentValid = computed<boolean> (() =>
    !model.value.content.length || model.value.content.length >= 3);

const searchContentColumnClass = computed<string | null>(() =>
    !isSearchContentValid.value ? "pb-0" : null);

// Functions.
function roleButtonClass(roleName: string | null): string {
    const color  = roleName ? roleUtility.getRoleBootstrapColor(roleName) : "purple";
    let classNames = [`bg-${color}`];
    const currentRole = model.value.roleOptions?.find(role => role.id === model.value.roleId);
    if (roleName === (currentRole?.name ?? null)) {
        classNames.push("text-white");
    } else {
        classNames.push(`border-${color}-subtle bg-opacity-10 text-${color}`);
    }
    return classNames.join(" ");
}

function roleButtonIcon(roleName: string): string {
    return roleUtility.getRoleBootstrapIconClassName(roleName);
}

async function onRoleButtonClicked(role: RoleMinimalModel | null) {
    model.value.roleId = role?.id;
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
            <CreatingRouterLink :to="model.createRoute" :can-create="model.canCreate">
                <i class="bi bi-plus-lg"></i>
                <span>Tạo mới</span>
            </CreatingRouterLink>
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
                <!-- Sort by field -->
                <div class="col col-sm-6 col-12">
                    <FormLabel text="Trường sắp xếp" />
                    <SortingByFieldSelectInput v-model="model" />
                    <ValidationMessage name="orderByField" />
                </div>

                <!-- Sort by direction -->
                <div class="col col-sm-6 col-12">
                    <FormLabel text="Thứ tự sắp xếp" />
                    <SelectInput name="orderByAscending" v-model="model.sortingByAscending">
                        <option :value="true">Từ nhỏ đến lớn</option>
                        <option :value="false">Từ lớn đến nhỏ</option>
                    </SelectInput>
                    <ValidationMessage name="orderByAscending" />
                </div>

                <!-- Role options -->
                <div class="col col-12 pb-0">
                    <FormLabel text="Vị trí" />
                    <div class="d-flex flex-row flex-wrap">
                        <!-- All role button -->
                        <div class="btn btn-sm me-2 mb-2 role-button"
                                :class="roleButtonClass(null)"
                                @click="onRoleButtonClicked(null)">
                            <i class="bi bi-grid-3x3-gap me-1"></i>
                            Tất cả
                        </div>

                        <!-- Specific role button -->
                        <div class="btn btn-sm me-2 mb-2 role-button" :key="role.id"
                                :class="roleButtonClass(role.name)"
                                v-for="role of model.roleOptions"
                                @click="onRoleButtonClicked(role)">
                            <i :class="roleButtonIcon(role.name)"></i>
                            <span class="ms-1">{{ role.displayName }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.role-button {
    --purple-color: 111, 66, 193;
    box-sizing: border-box;
}

.text-purple {
    color: rgb(var(--purple-color)) !important;
}

.border-purple {
    border-color: rgba(var(--purple-color), 1);
}

.border-purple-subtle {
    border-color: rgba(var(--purple-color), 0.4);
}

.bg-purple {
    --bs-bg-opacity: 1;
    background-color: rgb(var(--purple-color), var(--bs-bg-opacity)) !important;
}

.bg-purple.bg-opacity-10 {
    --bs-bg-opacity: 0.1;
    background-color: rgb(var(--purple-color), var(--bs-bg-opacity)) !important;
}
</style>