<script lang="ts">
export interface Props<TListModel extends DebtIncurrenceListModel | DebtPaymentListModel> {
    displayName: string;
    color: "success" | "danger";
    listRoute: RouteLocationRaw;
    initializeModelAsync(requestDto: Partial<RequestDtos.IHasStatsList>): Promise<TListModel>;
    reloadModelAsync(model: Reactive<TListModel>): Promise<void>;
}
</script>

<script setup lang="ts" generic="
    TListModel extends DebtIncurrenceListModel | DebtPaymentListModel">
import type { Reactive } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { RouterLink } from "vue-router";
import { DebtIncurrenceListModel } from "@/models/debtIncurrenceModels";
import { DebtPaymentListModel } from "@/models/debtPaymentModels";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Props.
const props = defineProps<Props<TListModel>>();

// Dependency.
const amountUtility = useAmountUtility();

// Model and states.
const model = await initialLoadAsync();

// Functions.
async function initialLoadAsync(): Promise<TListModel> {
    const requestDto: Partial<RequestDtos.IHasStatsList> = { resultsPerPage: 5 };
    return await props.initializeModelAsync(requestDto);
}
</script>

<template>
    <MainBlock :title="`${displayName} gần nhất`" :color="color" body-padding="0">
        <!-- Header -->
        <template #header>
            <RouterLink :to="listRoute" :class="`btn btn-outline-${color} btn-sm`">
                <i class="bi bi-list-ul me-2"></i>
                <span>Xem thêm</span>
            </RouterLink>
        </template>

        <!-- Body -->
        <template #body>
            <!-- List -->
            <ul class="list-group list-group-flush" v-if="model.items.length">
                <!-- Results --> 
                <li class="list-group-item bg-transparent"
                        v-for="debt in model.items" :key="debt.id">
                    <div class="row g-0">
                        <!-- Customer Avatar + Details -->
                        <div class="col d-flex justify-content-start align-items-center">
                            <!-- Customer Avatar -->
                            <img class="img-thumbnail rounded-circle customer-avatar me-3
                                        flex-shrink-0"
                                    :src="debt.customer.avatarUrl">

                            <div class="d-flex flex-column">
                                <!-- Customer FullName -->
                                <RouterLink :to="debt.customer.detailRoute"
                                        class="customer-name d-block">
                                    {{ debt.customer.fullName }}
                                </RouterLink>

                                <!-- Amount -->
                                <div class="small">
                                    <i class="bi bi-info-circle me-1 text-primary"></i>
                                    {{ amountUtility.getDisplayText(debt.amount) }}
                                    <!-- StatsDeltaText -->
                                    <span class="opacity-50">
                                        ({{ debt.statsDateTime.deltaText }})
                                    </span>
                                </div>

                            </div>
                        </div>

                        <!-- DetailRoute -->
                        <div class="col col-auto d-flex justify-content-end
                                    align-items-center">
                            <RouterLink :to="debt.detailRoute" alt="Chi tiết"
                                    class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-eye"></i>
                            </RouterLink>
                        </div>
                    </div>
                </li>
            </ul>
            
            <!-- Fallback -->
            <div class="m-4 opacity-50 text-center" v-else>
                Không có {{ displayName.toLowerCase() }} nào gần đây
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.customer-avatar {
    width: 40px;
    height: 40px;
}

.customer-name {
    text-decoration: none;
}

.customer-name:hover {
    text-decoration: underline;
}
</style>