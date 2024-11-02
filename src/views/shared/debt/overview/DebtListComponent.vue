<script lang="ts">
interface Props<
        TBasicModel extends IDebtBasicModel,
        TListRequestDto extends IDebtListRequestDto,
        TListResponseDto extends IDebtListResponseDto> {
    resourceDisplayName: string;
    color: "success" | "danger";
    getListAsync(requestDto?: Partial<TListRequestDto>): Promise<TListResponseDto>;
    initializeModel(responseDto: TListResponseDto): TBasicModel[];
    getListRoute(): RouteLocationRaw;
    getUpdateRoute(id: number): RouteLocationRaw;
}
</script>

<script setup lang="ts" generic="
        TBasicModel extends IDebtBasicModel,
        TListRequestDto extends IDebtListRequestDto,
        TListResponseDto extends IDebtListResponseDto">
import { RouterLink, type RouteLocationRaw } from "vue-router";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Props.
const props = defineProps<Props<TBasicModel, TListRequestDto, TListResponseDto>>();

// Dependency.
const amountUtility = useAmountUtility();

// Model and states.
const model = await initialLoadAsync();

// Functions.
async function initialLoadAsync(): Promise<TBasicModel[]> {
    const requestDto = {
        resultsPerPage: 5,
        ignoreMonthYear: true
    };
    const responseDto = await props.getListAsync(requestDto as Partial<TListRequestDto>);
    return props.initializeModel(responseDto);
}

function getCustomerDetailRoute(customerId: number): RouteLocationRaw {
    return { name: "customerDetail", params: { customerId: customerId } };
}
</script>

<template>
    <MainBlock :title="`${resourceDisplayName} gần nhất`" :color="color" body-padding="0">
        <!-- Header -->
        <template #header>
            <RouterLink :to="getListRoute()" :class="`btn btn-outline-${color} btn-sm`">
                <i class="bi bi-list-ul me-2"></i>
                <span>Danh sách đầy đủ</span>
            </RouterLink>
        </template>

        <!-- Body -->
        <template #body>
            <!-- List -->
            <ul class="list-group list-group-flush" v-if="model.length">
                <!-- Results --> 
                <li class="list-group-item bg-transparent"
                        v-for="debt in model" :key="debt.id">
                    <div class="row g-0">
                        <!-- Customer Avatar + Details -->
                        <div class="col col-xl-6 col-6 d-flex justify-content-start
                                    align-items-center">
                            <!-- Customer Avatar -->
                            <img class="img-thumbnail rounded-circle customer-avatar me-2
                                        flex-shrink-0"
                                    :src="debt.customer.avatarUrl">

                            <!-- Customer FullName -->
                            <RouterLink :to="getCustomerDetailRoute(debt.customer.id)"
                                    class="customer-name d-block">
                                {{ debt.customer.fullName }}
                            </RouterLink>
                        </div>

                        <div class="col col-xl-4 col-4 d-flex flex-column
                                    justify-content-center align-items-start px-2">
                            <!-- Amount -->
                            <span class="small">
                                <i class="bi bi-cash text-primary me-2"></i>
                                {{ amountUtility.getDisplayText(debt.amount) }}
                            </span>

                            <!-- StatsDeltaText -->
                            <span class="small">
                                <i class="bi bi-clock text-primary me-2"></i>
                                {{ debt.statsDateTime.deltaText }}
                            </span>
                        </div>

                        <!-- Detail button -->
                        <div class="col d-flex justify-content-end align-items-center">
                            <button class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-eye"></i>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
            
            <!-- Fallback -->
            <div class="m-4 opacity-50 text-center" v-else>
                Không có {{ props.resourceDisplayName.toLowerCase() }} nào gần đây
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