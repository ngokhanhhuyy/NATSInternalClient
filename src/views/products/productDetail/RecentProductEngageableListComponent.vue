<script lang="ts">
type BasicModel = SupplyBasicModel | OrderBasicModel | TreatmentBasicModel;

interface Model {
    items: BasicModel[];
    resultsPerPage: number;
    resultsPerPageOptions: number[],
}

export interface Props {
    resourceType: string;
    blockColor: "primary" | "success" | "danger";
    loadAsync(resultsPerPage: number): Promise<BasicModel[]>;
}
</script>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { useDisplayNamesStore } from "@/stores/displayNames";
import { useLoadingState } from "@/composables/loadingStateComposable";
import { useInitialDataStore } from "@/stores/initialData";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import SelectInput from "@/components/formInputs/SelectInputComponent.vue";
import type { SupplyBasicModel } from "@/models/supplyModels";
import type { OrderBasicModel } from "@/models/orderModels";
import type { TreatmentBasicModel } from "@/models/treatmentModels";

// Props.
const props = defineProps<Props>();

// Dependencies.
const initialDataStore = useInitialDataStore();

// Model and states.
const model = reactive<Model>(await initialLoadAsync());
const loadingState = useLoadingState();
const resourceDisplayName = initialDataStore.getDisplayName(props.resourceType);

// Watch.
watch(() => model.resultsPerPage, reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<Model> {
    const resultsPerPage = 5;
    return {
        items: await props.loadAsync(resultsPerPage),
        resultsPerPage: resultsPerPage,
        resultsPerPageOptions: [ 5, 10, 15, 20 ],
    };
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    model.items = await props.loadAsync(model.resultsPerPage);
    loadingState.isLoading = false;
}

function getIdClass(isLocked: boolean): string {
    let classNames = [ "fw-bold px-2 py-1 rounded" ];
    if (isLocked) {
        classNames.push("bg-danger-subtle text-danger");
    } else {
        classNames.push("bg-primary-subtle text-primary");
    }

    return classNames.join(" ");
}
</script>

<template>
    <MainBlock :title="`${resourceDisplayName} gần nhất`" :color="blockColor"
            class="block-order-list mb-3" body-padding="0">
        <template #header>
            <SelectInput class="form-select-sm w-auto" :class="blockColor"
                    v-model="model.resultsPerPage">
                <option :value="option" :key="option"
                        v-for="option in model.resultsPerPageOptions">
                    {{ option }}
                </option>
            </SelectInput>
        </template>
        <template #body>
            <ul class="list-group list-group-flush" v-if="model.items.length">
                <li class="list-group-item bg-transparent px-1"
                        v-for="basicModel in model.items" :key="basicModel.id">
                    <div class="row small">
                        <!-- Id -->
                        <div class="col col-2 d-flex justify-content-start align-items-center">
                            <span :class="getIdClass(basicModel.isLocked)">
                                #{{ basicModel.id }}
                            </span>
                        </div>

                        <!-- StatsDate -->
                        <div class="col col-6 justify-content-center align-items-center
                                    d-xl-flex d-none">
                            <i class="bi bi-calendar-week text-primary me-2"></i>
                            <span>{{ basicModel.statsDateTime.date }}</span>
                        </div>

                        <!-- StatsTime -->
                        <div class="col col-2 justify-content-center align-items-center
                                    d-xl-flex d-none">
                            <i class="bi bi-clock text-primary me-2"></i>
                            <span>{{ basicModel.statsDateTime.time }}</span>
                        </div>

                        <!-- StatsDateTime -->
                        <div class="col col-8 justify-content-center align-items-center
                                    d-xl-none d-flex">
                            <i class="bi bi-calendar-week text-primary me-2"></i>
                            <span class="">{{ basicModel.statsDateTime.dateTime }}</span>
                        </div>

                        <!-- Link -->
                        <div class="col col-2 d-flex justify-content-end">
                            <RouterLink class="btn btn-outline-primary btn-sm"
                                    :to="basicModel.detailRoute">
                                <i class="bi bi-eye"></i>
                            </RouterLink>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="text-success-emphasis text-center opacity-50 p-4" v-else>
                Không có {{ resourceDisplayName }} nào chứa sản phẩm này
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.block.block-order-list .block-header select.form-select.success:not(:focus) {
    border-color: var(--bs-success-border-subtle) !important;
}

.block.block-order-list .block-header select.form-select.primary:not(:focus) {
    border-color: var(--bs-primary-border-subtle) !important;
}

.block.block-order-list .block-header select.form-select.danger:not(:focus) {
    border-color: var(--bs-danger-border-subtle) !important;
}

.block.block-order-list .block-header select.form-select.success:focus {
    border-color: var(--bs-success) !important;
    box-shadow: 0 0 0 0.2rem rgba(var(--bs-success-rgb), 0.25) !important;
}

.block.block-order-list .block-header select.form-select.primary:focus {
    border-color: var(--bs-success) !important;
    box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25) !important;
}

.block.block-order-list .block-header select.form-select.danger:focus {
    border-color: var(--bs-success) !important;
    box-shadow: 0 0 0 0.2rem rgba(var(--bs-danger-rgb), 0.25) !important;
}
</style>