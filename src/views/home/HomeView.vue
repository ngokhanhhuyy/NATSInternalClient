<script setup lang="ts">
import { reactive, computed } from "vue";
import { useViewStates } from "@/composables/viewStatesComposable";
import { HomeModel } from "@/models/homeModels";
import { useStatsService } from "@/services/statsService";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";

// Child component.
import SmallStatistics, { type Props as SmallStatisticsProps }
    from "./SmallStatisticsComponent.vue";
import FinanceAreaGraph from "./FinanceAreaGraphComponent.vue";
import RevenueDistributionGraph from "./RevenueDistributionGraphComponent.vue";
import LastestTransactions from "./LastestTransactionsComponent.vue";

// Dependencies.
const statsService = useStatsService();

// Internal state.
useViewStates();
const model = await reactive(initializeModelAsync());
const firstRowColumnClass = "col col-xxl-3 col-lg-6 col-md-6 col-sm-12 col-12";

// Functions.
async function initializeModelAsync(): Promise<HomeModel> {
    const [[thisMonthStats, lastMonthStats], lastestDailyStats] = await Promise.all([
        statsService.getLastestMonthlyAsync({ monthCount: 2 }),
        statsService.getLastestDailyDetailAsync({ dayCount: 10 })
    ]);

    return new HomeModel(thisMonthStats, lastMonthStats, lastestDailyStats);
}

function formatAmount(amount: number): string {
    if (amount === 0) {
        return "0";
    }

    if (amount > 100_000_000) {
        return `${(amount / 1_000_000).toFixed(0)}Tr`.replaceAll(".", ",");
    }

    if (amount > 10_000_000) {
        return `${(amount / 1_000_000).toFixed(1)}Tr`.replaceAll(".", ",");
    }

    if (amount > 1_000_000) {
        return `${(amount / 1_000_000).toFixed(2)}Tr`.replaceAll(".", ",");
    }

    return `${(amount / 1_000).toFixed(2)}N`.replaceAll(".", ",");
}

// Props for small statistics blocks.
const netRevenueProps = computed<SmallStatisticsProps>(() => ({
    title: "Doanh thu ròng",
    unit: "vnđ",
    color: "primary",
    thisMonthStats: model.thisMonthStats,
    lastMonthStats: model.lastMonthStats,
    statsPropertySelector: (stats) => stats.netRevenue,
    statsPropertyFormatter: formatAmount
}));

const expenseAndCostProps = computed<SmallStatisticsProps>(() => ({
    title: "Chi phí",
    unit: "vnđ",
    color: "danger",
    thisMonthStats: model.thisMonthStats,
    lastMonthStats: model.lastMonthStats,
    statsPropertySelector: (stats) => stats.expenses + stats.cost,
    statsPropertyFormatter: formatAmount
}));

const netProfitProps = computed<SmallStatisticsProps>(() => ({
    title: "Lợi nhuận ròng",
    unit: "vnđ",
    color: "success",
    thisMonthStats: model.thisMonthStats,
    lastMonthStats: model.lastMonthStats,
    statsPropertySelector: (stats) => stats.netProfit,
    statsPropertyFormatter: formatAmount
}));

const newCustomerProps = computed<SmallStatisticsProps>(() => ({
    title: "Khách hàng mới",
    unit: "khách",
    color: "purple",
    thisMonthStats: model.thisMonthStats,
    lastMonthStats: model.lastMonthStats,
    statsPropertySelector: (stats) => stats.newCustomers,
}));
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <div class="col col-12 fs-5 pb-0 fw-bold d-flex
                        justify-content-start text-primary mt-2">
                {{ "Tháng này".toUpperCase() }}
            </div>
            <!-- Net Revenue -->
            <div :class="firstRowColumnClass">
                <SmallStatistics v-bind="netRevenueProps" />
            </div>

            <!-- Expense and Cost -->
            <div :class="firstRowColumnClass">
                <SmallStatistics v-bind="expenseAndCostProps" />
            </div>

            <!-- Net Profit -->
            <div :class="firstRowColumnClass">
                <SmallStatistics v-bind="netProfitProps" />
            </div>
            <!-- New Customers -->
            <div :class="firstRowColumnClass">
                <SmallStatistics v-bind="newCustomerProps" />
            </div>
        </div>
        <div class="row g-3 align-items-stretch mt-3">
            <div class="col col-12 fs-5 pb-0 fw-bold d-flex 
                        ustify-content-start text-primary">
                {{ "10 ngày gần nhất".toUpperCase() }}
            </div>
            <div class="col col-xl-8 col-lg-7 col-md-7 col-12">
                <FinanceAreaGraph height="380px" :stats-list="model.lastestDailyStats" />
            </div>
            <div class="col col-xl-4 col-lg-5 col-md-5 col-12">
                <RevenueDistributionGraph height="350px"
                        :stats-list="model.lastestDailyStats" />
            </div>
            <!-- <div class="col col-lg-3 col-md-12 col-sm-12 col-12">
                <LastestTransactions />
            </div> -->
        </div>
    </MainContainer>
</template>

<style>
.apexcharts-legend-text {
    padding-left: 0px !important;
    margin-left: 8px !important;
}

.apexcharts-legend-series {
    margin-left: 10px !important;
    margin-right: 10px !important;
    margin-bottom: 10px !important;
}
</style>