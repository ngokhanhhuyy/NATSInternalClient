<script setup lang="ts">
import { reactive, watch, defineAsyncComponent } from "vue";
import { UserListModel } from "@/models";
import { RoleOptionsModel, RoleBasicModel } from "@/models";
import { useUserService } from "@/services/userService";
import { useRoleUtility } from "@/utilities/roleUtility";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Async components
const UserListItem = defineAsyncComponent(() =>
    import("@/components/users/userList/UserListItem.vue"));
const UserListPagination = defineAsyncComponent(() =>
    import("@/components/users/userList/UserListPagination.vue"));
const NewestUserList = defineAsyncComponent(() =>
    import("@/components/users/userList/JoinedRecentlyUserList.vue"));
const UpcomingBirthdayUserList = defineAsyncComponent(() =>
    import("@/components/users/userList/UpcomingBirthdayUserList.vue"));

// Dependencies.
const userService = useUserService();
const roleUtility = useRoleUtility();

// Internal states.
const [model, roleOptions] = await initializeModelAndRoleOptionsAsync();
const { loadingState } = useViewStates();

// Watch.
watch(
    () => [
        model.page,
        model.orderByAscending,
        model.resultsPerPage,
        model.content,
        model.roleId
    ],
    loadUserListAsync,
    { deep: true, });

// Functions.
async function initializeModelAndRoleOptionsAsync(): Promise<[UserListModel, RoleOptionsModel]> {
    const [userListResponseDto, roleListResponseDto] = await Promise.all([
        userService.getUserListAsync(),
        userService.getRoleListAsync()
    ]);
    const userListModel = reactive(new UserListModel(userListResponseDto));
    const roleListModel = new RoleOptionsModel(roleListResponseDto);
    return [userListModel, roleListModel];
}

async function loadUserListAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await userService.getUserListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

function roleButtonClassName(roleName: string) {
    let baseClassName = "bg-{color} bg-opacity-10 border-{color}-subtle text-{color}";
    return baseClassName.replaceAll(
        "{color}",
        roleUtility.getRoleBootstrapColor(roleName));
}

async function onRoleButtonClicked(role: RoleBasicModel | null) {
    model.roleId = role && role.id;
    model.page = 1;
}
</script>

<template>
    <MainContainer>
        <div class="row g-0">
            <div class="col col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="row g-3 mb-2 px-2 pb-2">
                    <!-- List filter -->
                    <MainBlock title="Danh sách nhân viên" :body-padding="[3, 3, 2, 3]"
                            body-class="row g-0">
                        <!-- Header -->
                        <template #header>
                            <RouterLink :to='{ name: "userCreate" }'
                                    class="btn btn-primary btn-sm"
                                    v-if="model.authorization?.canCreate">
                                <i class="bi bi-plus-lg"></i>
                                Tạo mới
                            </RouterLink>
                        </template>

                        <!-- Body -->
                        <template #body>
                            <div class="col mb-md-0 mb-sm-2 mb-2 me-md-2 me-sm-0 me-0">
                                <!-- Search content -->
                                <input class="form-control flex-fill" type="text"
                                        placeholder="Họ và tên, thông tin liên lạc ..."
                                        v-model="model.content"
                                        @input="model.page = 1">
                            </div>
                            <div class="col col-md-4 col-sm-12 col-12">
                                <!-- Sorting options -->
                                <div class="input-group">
                                    <!-- Sort by field -->
                                    <select class="form-select"
                                            v-model="model.orderByField">
                                        <option value="lastName">Tên</option>
                                        <option value="firstName">Họ</option>
                                        <option value="userName">Tên tài khoản</option>
                                        <option value="birthday">Ngày sinh</option>
                                        <option value="createdDateTime">Ngày tạo</option>
                                        <option value="role">Vị trí</option>
                                    </select>

                                    <!-- Sort by direction -->
                                    <button class="btn btn-primary"
                                            @click="model.orderByAscending = !model.orderByAscending">
                                        <i class="bi bi-sort-alpha-down" v-if="model.orderByAscending"></i>
                                        <i class="bi bi-sort-alpha-up"
                                            v-if="!model.orderByAscending"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col col-12 flex-row mt-3">
                                <div class="btn btn-sm me-2 mb-2 all-role-button"
                                        @click="onRoleButtonClicked(null)">
                                    <i class="bi bi-grid-3x3-gap"></i>
                                    Tất cả
                                </div>
                                <div class="btn btn-sm me-2 mb-2"
                                        :key="role.id"
                                        :class="roleButtonClassName(role.name)"
                                        v-for="role of roleOptions.items"
                                        @click="onRoleButtonClicked(role)">
                                    <i class="bi bi-wrench" v-if="role.id === 1"></i>
                                    <i class="bi bi-star-fill" v-else-if="role.id === 2"></i>
                                    <i class="bi bi-star" v-else></i>
                                    {{ role.displayName }}
                                </div>
                            </div>
                        </template>
                    </MainBlock>
                </div>

                <!-- List items -->
                <Transition name="fade" mode="out-in">
                    <div class="row g-3 justify-content-start" v-if="!loadingState.isLoading">
                        <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 mb-3"
                                :key="user.id"
                                v-for="user in model.results">
                            <UserListItem :id="user.id" :user-name="user.userName"
                                    :full-name="user.fullName" :avatar-url="user.avatarUrl"
                                    :role-name="user.role.name"
                                    :role-display-name="user.role.displayName!"/>
                        </div>
                        <div class="col col-12">
                            <div class="block border rounded-3 py-4 bg-white d-flex
                                        justify-content-center align-items-center"
                                    v-if="!model.results.length">
                                <span class="opacity-50">Không tìm thấy kết quả nào</span>
                            </div>
                        </div>
                    </div>
                </Transition>
                <div class="col col-12 d-flex flex-row justify-content-center mb-5"
                    v-if="model.pageCount > 1">
                    <UserListPagination :page="model.page" :page-count="model.pageCount"
                            @page-click="(page: number) => model.page = page" />
                </div>
            </div>

            <!-- Secondary lists -->
            <div class="col col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="row g-3">
                    <div class="col col-xl-12 col-lg-6 col-md-6 col-12
                                mb-xl-3 mb-lg-0 mb-md-0 mb-3">
                        <NewestUserList />
                    </div>
                    <div class="col col-xl-12 col-lg-6 col-md-6 col-12">
                        <UpcomingBirthdayUserList />
                    </div>
                </div>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
.all-role-button {
    --color: 111, 66, 193;
    color: rgb(var(--color)) !important;
    background-color: rgba(var(--color), 0.1) !important;
    border-color: rgba(var(--color), 0.4);
}

button.page-button:not(:hover):not(:focus):not(:is(.active)) {
    background: white !important;
    color: var(--font-color) !important;
    border-color: rgba(var(--bs-primary-rgb), 0.25);
}

button.page-button.active {
    background: var(--bs-primary) !important;
    color: white !important;
    border-color: var(--bs-primary);
}

.input-group select {
    background-color: rgba(var(--bs-primary-rgb), 0.1) !important;
}

.input-group select:not(:focus) {
    border-color: var(--bs-primary-border-subtle) !important;
    border-right-width: 0 !important;
}

.input-group select:disabled {
    background-color: rgba(var(--bs-secondary-rgb), 0.1) !important;
}

.input-group select option {
    background-color: white;
}
</style>