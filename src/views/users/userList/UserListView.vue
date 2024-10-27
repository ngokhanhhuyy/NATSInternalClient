<script setup lang="ts">
import { reactive, watch, defineAsyncComponent } from "vue";
import { UserListModel } from "@/models/userModels";
import { useUserService } from "@/services/userService";
import { ValidationError } from "@/services/exceptions";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";

// Child components
const UserListFilters = defineAsyncComponent(() =>
    import("@/views/users/userList/UserListFiltersComponent.vue"));
const UserListItem = defineAsyncComponent(() =>
    import("@/views/users/userList/UserListItemComponent.vue"));
const UserListPagination = defineAsyncComponent(() =>
    import("@/components/users/userList/UserListPagination.vue"));
const UserSecondaryList = defineAsyncComponent(() =>
    import("@/views/users/userList/UserSecondaryListComponent.vue"));
// Dependencies.
const userService = useUserService();

// Internal states.
const model = await initialLoadAsync();
const { loadingState, modelState } = useViewStates();

// Watch.
watch(
    () => [ model.page, model.orderByAscending, model.orderByField, model.roleId ],
    reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<UserListModel> {
    const userListResponseDto = await userService.getUserListAsync();
    return reactive(new UserListModel(userListResponseDto));
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

function onPaginationPageButtonClicked(page: number): void {
    model.page = page;
}
</script>

<template>
    <MainContainer>
        <div class="row g-0">
            <div class="col col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="row g-3">
                    <!-- List filters -->
                    <div class="col col-12">
                        <UserListFilters v-model="model"
                                @search-button-clicked="reloadAsync"/>
                    </div>
                </div>

                <!-- List items -->
                <Transition name="fade" mode="out-in">
                    <div class="row g-3 justify-content-start"
                            v-show="!loadingState.isLoading">
                        <template v-if="model.results.length">
                            <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6"
                                    :key="user.id"
                                    v-for="user in model.results">
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
                        <UserListPagination :page="model.page"
                                :page-count="model.pageCount"
                                @page-click="onPaginationPageButtonClicked" />
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