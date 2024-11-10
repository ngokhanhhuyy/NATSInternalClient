<script lang="ts">
import type { Reactive } from "vue";
export interface Props<
        TListModel extends IPaginatedListModel<TBasicModel>,
        TBasicModel extends IUpsertableBasicModel<TAuthorizationModel> & { name: string },
        TAuthorizationModel extends IUpsertableExistingAuthorizationModel> {
    resourceDisplayName: string;
    iconClass: string;
    initializeModelAsync(requestDto: { resultsPerPage: number; }): Promise<TListModel>;
    reloadModelAsync(model: Reactive<TListModel>): Promise<void>
    getCreatingPermissionAsync(): Promise<boolean>;
}
</script>

<script setup lang="ts" generic="
    TListModel extends IUpsertableListModel<TBasicModel, TAuthorizationModel>,
    TBasicModel extends IUpsertableBasicModel<TAuthorizationModel> & { name: string },
    TAuthorizationModel extends IUpsertableExistingAuthorizationModel">
import { reactive, watch } from "vue";
import { useLoadingState } from "@/composables/loadingStateComposable";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";
import CreatingRouterLink from "@/views/layouts/CreatingRouterLinkComponent.vue";

// Props.
const props = defineProps<Props<TListModel, TBasicModel, TAuthorizationModel>>();

// Dependency.
const loadingState = useLoadingState();

// Model and states.
const model = reactive(await initialLoadAsync());

// Watch.
watch(() => model.page, reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<TListModel> {
    return await props.initializeModelAsync({ resultsPerPage: 10 });
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    await props.reloadModelAsync(model);
    loadingState.isLoading = false;
}
</script>

<template>
    <MainBlock :title="resourceDisplayName.toUpperCase()" body-padding="0">
        <template #header>
            <CreatingRouterLink :to="model.createRoute" text-invisible
                    :get-permission-async="getCreatingPermissionAsync">
                <i class="bi bi-plus-lg"></i>
            </CreatingRouterLink>
            <template v-if="model.page > 1">
                <button class="btn btn-outline-primary btn-sm mx-1" @click="model.page -= 1"
                    :disabled="model.page === 1">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <button class="btn btn-outline-primary btn-sm" @click="model.page += 1"
                    :disabled="model.page === model.pageCount">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </template>
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
                    <RouterLink class="btn btn-outline-primary btn-sm" :to="item.updateRoute"
                            v-if="item.authorization?.canEdit">
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