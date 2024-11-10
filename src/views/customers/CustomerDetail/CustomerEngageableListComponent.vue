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
import { reactive, watch} from "vue";
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
    const color = !isLocked ? "primary" : "danger";
    return `bg-${color} text-${color}`;
}
</script>

<template>
    <MainBlock :title="resourceDisplayName" class="h-100" body-class="h-100" body-padding="0"
            :color="blockColor">
        <template #header>
            <MainBlockPaginator v-model:page="model.page" v-model:page-count="model.pageCount"
                    v-if="model.items.length" />
        </template>
        <template #body>
            <ul class="list-group list-group-flush">
                <template v-if="model.items.length">
                    <li class="list-group-item p-0 bg-transparent"
                            v-for="resource in model.items" :key="resource.id">
                        <div class="row g-3 px-2">
                            <div class="col col-lg-2 col-sm-2 col-3 d-flex align-items-center">
                                <!-- Id -->
                                <span class="small text-center fw-bold resource-id
                                            bg-opacity-10 rounded px-2 py-1"
                                        :class="getIdClass(resource.isLocked)">
                                    #{{ idPrefix }}{{ resource.id }}
                                </span>
                            </div>
                            <div class="col">
                                <!-- Detail -->
                                <div class="row gx-3 gy-0 flex-fill h-100">
                                    <!-- Amount -->
                                    <div class="col col-lg-3 col-sm-6 col-12 d-flex
                                                justify-content-start align-items-center">
                                        <i class="bi bi-cash me-2 text-primary"></i>
                                        <span class="small">
                                            {{
                                                amountUtility.getDisplayText(resource.amount)
                                            }}
                                        </span>
                                    </div>

                                    <!-- DateTime -->
                                    <div class="col d-flex align-items-center">
                                        <i class="bi bi-calendar-week me-2 text-primary">
                                        </i>
                                        <span class="small">
                                            {{ resource.statsDateTime.deltaText }}&nbsp;
                                        </span>
                                        <span class="opacity-50 d-lg-inline d-none">
                                            ({{ resource.statsDateTime.dateTime }})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Route -->
                            <div class="col col-auto d-flex align-items-center">
                                <RouterLink :to="resource.detailRoute"
                                        class="btn btn-outline-primary btn-sm">
                                    <i class="bi bi-eye"></i>
                                </RouterLink>
                            </div>
                        </div>
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