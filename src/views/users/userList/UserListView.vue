<script setup lang="ts">
import { reactive, watch } from "vue";
import { UserListModel } from "@/models/userModels";
import { useUserService } from "@/services/userService";
import { useRoleService } from "@/services/roleService";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainPaginator from "@layouts/MainPaginatorComponent.vue";

// Child components
import UserListFilters from "./UserListFiltersComponent.vue";
import UserListItem from "./UserListItemComponent.vue";
import UserSecondaryList from "./UserSecondaryListComponent.vue";

// Dependencies.
const userService = useUserService();
const roleService = useRoleService();

// Internal states.
const model = await initialLoadAsync();
const { loadingState, modelState, ValidationError } = useViewStates();

// Watch.
watch(
    () => [ model.page, model.sortingByAscending, model.sortingByField, model.roleId ],
    reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<UserListModel> {
    const fetchResults = await Promise.all([
        userService.getUserListAsync(),
        userService.getListSortingOptionAsync(),
        roleService.getAllAsync(),
        userService.getCreatingPermissionAsync()
    ]);
    return reactive(new UserListModel(...fetchResults));
}

async function reloadAsync(): Promise<void> {
    modelState.resetErrors();
    loadingState.isLoading = true;
    try {
        const responseDto = await userService.getUserListAsync(model.toRequestDto());
        model.mapFromResponseDto(responseDto);
    } catch (error) {
        if (error instanceof ValidationError) {
            modelState.setErrors(error.errors);
        } else {
            throw error;
        }
    }
    
    loadingState.isLoading = false;
}
</script>

<template>
    <MainContainer>
        <div class="row g-0">
            <div class="col col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="row g-3">
                    <!-- List filters -->
                    <div class="col col-12">
                        <UserListFilters v-model="model" @search-button-clicked="reloadAsync"/>
                    </div>
                </div>

                <!-- List items -->
                <Transition name="fade" mode="out-in">
                    <div class="row g-3 justify-content-start"
                            v-show="!loadingState.isLoading">
                        <template v-if="model.items.length">
                            <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6"
                                    v-for="user in model.items" :key="user.id">
                                <UserListItem :user="user"/>
                            </div>
                        </template>
                        <div class="col col-12" v-else>
                            <div class="block border rounded-3 py-4 bg-white d-flex
                                        justify-content-center align-items-center">
                                <span class="opacity-50">Không tìm thấy kết quả nào</span>
                            </div>
                        </div>
                    </div>
                </Transition>
                <div class="col col-12 d-flex flex-row justify-content-center mb-5"
                        v-if="model.pageCount > 1">
                    <Suspense>
                        <MainPaginator :page="model.page" :page-count="model.pageCount"
                                @page-click="page => model.page = page" />
                    </Suspense>
                </div>
            </div>

            <!-- Secondary lists -->
            <div class="col col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="row g-3">
                    <div class="col col-xl-12 col-lg-6 col-md-6 col-12">
                        <UserSecondaryList mode="JoinedRecently" />
                    </div>
                    <div class="col col-xl-12 col-lg-6 col-md-6 col-12">
                        <UserSecondaryList mode="UpcomingBirthday" />
                    </div>
                </div>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
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