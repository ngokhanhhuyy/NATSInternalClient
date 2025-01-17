<script lang="ts">
import type { Reactive } from "vue";

export interface Props<
        TListModel extends IHasCustomerListModel<TBasicModel, TAuthorizationModel>,
        TBasicModel extends IHasCustomerBasicModel<TAuthorizationModel>,
        TAuthorizationModel extends IHasStatsExistingAuthorizationModel> {
    resourceType: string;
    blockColor: "primary" | "success" | "danger";
    idPrefix: string;
    initializeModelAsync(resultsPerPage: number): Promise<TListModel>,
    reloadModelAsync(model: Reactive<TListModel>): Promise<void>;
}
</script>

<script setup lang="ts" generic="
    TListModel extends IHasCustomerListModel<TBasicModel, TAuthorizationModel>,
    TBasicModel extends IHasCustomerBasicModel<TAuthorizationModel>,
    TAuthorizationModel extends IHasStatsExistingAuthorizationModel">
import { reactive, watch } from "vue";
import { RouterLink } from "vue-router";
import { useDisplayNamesStore } from "@/stores/displayNames";
import { useLoadingState } from "@/composables/loadingStateComposable";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout component.
import MainBlock from "@layouts/MainBlockComponent.vue";
import MainBlockPaginator from "@layouts/MainBlockPaginatorComponent.vue";

// Props.
const props = defineProps<Props<TListModel, TBasicModel, TAuthorizationModel>>();

// Dependencies.
const displayNamesStore = useDisplayNamesStore();
const amountUtility = useAmountUtility();

// Model and states.
const model = reactive(await props.initializeModelAsync(5));
const loadingState = useLoadingState();
const resourceDisplayName = await displayNamesStore.getDisplayName(props.resourceType);

// Watch.
watch(() => model.page, reloadAsync);

// Functions.
async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    await props.reloadModelAsync(model);
    loadingState.isLoading = false;
}

function getIdClass(isLocked: boolean): string {
    return !isLocked ? "text-primary" : "text-danger";
}
</script>

<template>
    <MainBlock :title="resourceDisplayName" class="h-100" body-class="h-100" body-padding="0"
            :color="blockColor">
        <template #header>
            <MainBlockPaginator v-model:page="model.page" v-model:page-count="model.pageCount"
                    :color="blockColor" v-if="model.items.length" />
        </template>
        <template #body>
            <ul class="list-group list-group-flush">
                <template v-if="model.items.length">
                    <li class="list-group-item p-0 bg-transparent
                                d-flex align-items-center px-2 py-lg-0 py-2"
                            v-for="resource in model.items" :key="resource.id">
                        <div class="row gx-3 small flex-fill">
                            <div class="col col-md-5 col-12 d-flex
                                        flex-column justify-content-center">
                                <div class="row gx-3">
                                    <!-- Id -->
                                    <div class="col col-lg-5 col-12"
                                            :class="getIdClass(resource.isLocked)">
                                        <i class="bi bi-record-circle me-2"></i>
                                        {{ idPrefix }}{{ resource.id }}
                                    </div>

                                    <!-- Amount -->
                                    <div class="col">
                                        <i class="bi bi-cash me-2 text-primary"></i>
                                        {{ amountUtility.getDisplayText(resource.amount) }}
                                    </div>
                                </div>
                            </div>
                            <div class="col d-flex flex-column">
                                <div class="row gx-3 d-md-flex d-none">
                                    <!-- Date -->
                                    <div class="col col-lg-7 col-12">
                                        <i class="bi bi-calendar-week me-2 text-primary"></i>
                                        {{ resource.statsDateTime.date }}
                                    </div>

                                    <!-- Time -->
                                    <div class="col">
                                        <i class="bi bi-clock me-2 text-primary"></i>
                                        {{ resource.statsDateTime.time }}
                                    </div>
                                </div>

                                <div class="d-md-none d-flex px-2">
                                    <i class="bi bi-calendar-week me-2 text-primary"></i>
                                    <span class="mx-1">
                                        {{ resource.statsDateTime.dateTime }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Route -->
                        <RouterLink :to="resource.detailRoute"
                                class="btn btn-outline-primary btn-sm m-2 flex-shrink-0">
                            <i class="bi bi-eye"></i>
                        </RouterLink>
                    </li>
                </template>
                <li class="list-group-item p-4 bg-transparent d-flex justify-content-center
                            align-items-center opacity-50"
                        v-else>
                    Không có {{ resourceDisplayName.toLowerCase() }} nào
                </li>
            </ul>
        </template>
    </MainBlock>
</template>

<style scoped>
.resource-id {
    min-width: 50px;
}
</style>