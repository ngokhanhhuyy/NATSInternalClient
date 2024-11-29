<script lang="ts">
interface Model {
    smallStatistics: {
        newCustomers: SmallStatisticsProps;
        newOrders: SmallStatisticsProps;
        newTreatments: SmallStatisticsProps;
        newConsultants: SmallStatisticsProps;
    },
}
</script>

<script setup lang="ts">
import { useViewStates } from "@/composables/viewStatesComposable";
import { CustomerNewStatsModel } from "@/models/customerModels";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";

// Child component.
import SmallStatistics, { type Props as SmallStatisticsProps }
    from "./SmallStatisticsComponent.vue";
import FinanceAreaGraph from "./FinanceAreaGraphComponent.vue";
import RevenueDistributionGraph from "./RevenueDistributionGraphComponent.vue";
import LastestTransactions from "./LastestTransactionsComponent.vue";

// Internal state.
useViewStates();
const model: Model = {
    smallStatistics: {
        newCustomers: {
            title: "Khách hàng mới tháng này",
            thisMonthValue: 50 + Math.round(Math.random() * 50),
            lastMonthValue: 50 + Math.round(Math.random() * 50),
            unit: "khách",
            color: "primary"
        },
        newOrders: {
            title: "Đơn hàng mới tháng này",
            thisMonthValue: 50 + Math.round(Math.random() * 50),
            lastMonthValue: 50 + Math.round(Math.random() * 50),
            unit: "đơn hàng",
            color: "success"
        },
        newTreatments: {
            title: "Liệu trình mới tháng này",
            thisMonthValue: 50 + Math.round(Math.random() * 50),
            lastMonthValue: 50 + Math.round(Math.random() * 50),
            unit: "liệu trình",
            color: "danger"
        },
        newConsultants: {
            title: "Tư vấn mới tháng này",
            thisMonthValue: 50 + Math.round(Math.random() * 50),
            lastMonthValue: 50 + Math.round(Math.random() * 50),
            unit: "tư vấn",
            color: "purple"
        },
    }
}
const firstRowColumnClass = "col col-xxl-3 col-lg-6 col-md-6 col-sm-12 col-12";
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <div class="col col-12 fs-5 fw-bold d-flex justify-content-start text-primary pb-0">
                {{ "Tháng này".toUpperCase() }}
            </div>
            <div :class="firstRowColumnClass">
                <SmallStatistics v-bind="model.smallStatistics.newCustomers" />
            </div>
            <div :class="firstRowColumnClass">
                <SmallStatistics v-bind="model.smallStatistics.newOrders" />
            </div>
            <div :class="firstRowColumnClass">
                <SmallStatistics v-bind="model.smallStatistics.newTreatments" />
            </div>
            <div :class="firstRowColumnClass">
                <SmallStatistics v-bind="model.smallStatistics.newConsultants" />
            </div>
        </div>
        <div class="row g-3 align-items-stretch mt-3">
            <div class="col col-12 fs-5 fw-bold d-flex justify-content-start text-primary pb-0">
                {{ "10 ngày gần nhất".toUpperCase() }}
            </div>
            <div class="col col-xl-8 col-lg-7 col-md-7 col-12">
                <FinanceAreaGraph :data-length="10" height="380px" />
            </div>
            <div class="col col-xl-4 col-lg-5 col-md-5 col-12">
                <RevenueDistributionGraph height="350px" />
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