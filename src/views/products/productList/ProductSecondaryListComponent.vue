<script lang="ts">
export interface Props<
        TListModel extends IPaginatedListModel<TBasicModel>,
        TBasicModel extends IUpsertableBasicModel<TAuthorizationModel> & { name: string },
        TAuthorizationModel extends IUpsertableExistingAuthorizationModel> {
    resourceDisplayName: string;
    iconClass: string;
    initializeModelAsync(requestDto: { resultsPerPage: number; }): Promise<TListModel>;
    reloadModelAsync(model: Reactive<TListModel>): Promise<void>
    getCreatingPermissionAsync(): Promise<boolean>;
    getCreateRoute(): RouteLocationRaw;
    getUpdateRoute(id: number): RouteLocationRaw;
}
</script>

<script setup lang="ts" generic="
    TListModel extends IPaginatedListModel<TBasicModel>,
    TBasicModel extends
        IUpsertableBasicModel<TAuthorizationModel> & { name: string },
    TAuthorizationModel extends IUpsertableExistingAuthorizationModel">
import { reactive, type Reactive } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useLoadingState } from "@/composables/loadingStateComposable";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Props.
const props = defineProps<Props<TListModel, TBasicModel, TAuthorizationModel>>();

// Dependency.
const loadingState = useLoadingState();

// Model and states.
const [model, canCreate] = await initialLoadAsync();

// Functions.
async function initialLoadAsync(): Promise<[Reactive<TListModel>, boolean]> {
    const [model, canCreate] = await Promise.all([
        props.initializeModelAsync({ resultsPerPage: 10 }),
        props.getCreatingPermissionAsync()]);

    return [reactive(model), canCreate];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    await props.reloadModelAsync(model);
    loadingState.isLoading = false;
}
</script>

<template>
    <MainBlock :title="resourceDisplayName.toUpperCase()">
        <template #header>
            <RouterLink class="btn btn-primary btn-sm" :to="getCreateRoute()" v-if="canCreate">
                <i class="bi bi-plus-lg"></i>
            </RouterLink>
        </template>
        <template #body>
            <ul class="list-group list-group-flush" v-if="model.items">
                <li class="list-group-item bg-transparent ps-3 p-2 d-flex
                            justify-content-start align-items-center"
                        v-for="item in model.items" :key="item.id">
                    <i :class="iconClass" class="me-3"></i>

                    <!-- Name -->
                    <div class="flex-fill fw-bold">{{ item.name }}</div>

                    <!-- Edit button -->
                    <RouterLink class="btn btn-outline-primary btn-sm"
                            :to="getUpdateRoute(item.id)" v-if="item.authorization?.canEdit">
                        <i class="bi bi-pencil-square"></i>
                    </RouterLink>
                </li>
            </ul>
            <div class="d-flex justify-content-center align-items-center p-3" v-else>
                <span class="opacity-50">Không có {{ resourceDisplayName }}</span>
            </div>
        </template>
    </MainBlock>
</template>