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
import Filters from "./FiltersComponent.vue";
import ResultsItem from "./ResultsItemComponent.vue";
import SecondaryList from "./SecondaryListComponent.vue";

// Dependencies.
const userService = useUserService();
const roleService = useRoleService();

// Internal states.
const { loadingState, modelState, initialData, ValidationError } = useViewStates();
const model = reactive(await initialLoadAsync());

// Watch.
watch(() => [ model.sortingByAscending, model.sortingByField, model.roleId ], async () => {
    model.page = 1;
    await reloadAsync();
});

// Functions.
async function initialLoadAsync(): Promise<UserListModel> {
    const responseDto = await userService.getListAsync();
    return new UserListModel(responseDto, initialData.user, initialData.role.allAsOptions);
}

async function reloadAsync(): Promise<void> {
    modelState.resetErrors();
    loadingState.isLoading = true;
    try {
        const responseDto = await userService.getListAsync(model.toRequestDto());
        model.mapFromListResponseDto(responseDto);
    } catch (error) {
        if (error instanceof ValidationError) {
            modelState.setErrors(error.errors);
        } else {
            throw error;
        }
    }
    
    loadingState.isLoading = false;
}

async function onPaginationPageButtonClicked(page: number): Promise<void> {
    model.page = page;
    await reloadAsync();
}
</script>

<template>
    <MainContainer>
        <div class="row g-0">
            <div class="col col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="row g-3">
                    <!-- List filters -->
                    <div class="col col-12">
                        <Filters v-model="model" @search-button-clicked="reloadAsync"/>
                    </div>
                </div>

                <!-- List items -->
                <Transition name="fade" mode="out-in">
                    <div class="row g-3 justify-content-start"
                            v-show="!loadingState.isLoading">
                        <template v-if="model.items.length">
                            <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6"
                                    v-for="user in model.items" :key="user.id">
                                <ResultsItem :user="user"/>
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
                                @page-click="onPaginationPageButtonClicked" />
                    </Suspense>
                </div>
            </div>

            <!-- Secondary lists -->
            <div class="col col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="row g-3">
                    <div class="col col-xl-12 col-lg-6 col-md-6 col-12">
                        <SecondaryList mode="JoinedRecently" />
                    </div>
                    <div class="col col-xl-12 col-lg-6 col-md-6 col-12">
                        <SecondaryList mode="UpcomingBirthday" />
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