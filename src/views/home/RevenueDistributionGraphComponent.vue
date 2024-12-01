<script lang="ts">
import type { DailyStatsDetailModel } from "@/models/statsModels";

interface Props {
    statsList: DailyStatsDetailModel[];
    height?: string;
}
</script>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAmountUtility } from "@/utilities/amountUtility";
import { useInitialDataStore } from "@/stores/initialData";
import ApexCharts from "vue3-apexcharts";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependency.
const initialDataStore = useInitialDataStore();
const amountUtility = useAmountUtility();

// Computed property.
const consultantTotalAmount = computed<number>(() => {
    return props.statsList
        .map(stats => stats.consultantGrossRevenue)
        .reduce((total, current) => total + current);
});

const retailTotalAmount = computed<number>(() => {
    return props.statsList
        .map(stats => stats.retailGrossRevenue)
        .reduce((total, current) => total + current);
});

const treatmentTotalAmount = computed<number>(() => {
    return props.statsList
        .map(stats => stats.treatmentGrossRevenue)
        .reduce((total, current) => total + current);
});

const chartSeries = computed<number[]>(() => {
    return [
        consultantTotalAmount.value,
        retailTotalAmount.value,
        treatmentTotalAmount.value
    ];
});

const chartLabels = computed<string[]>(() => {
    const keys = [ "consultant", "order", "treatment" ];
    return keys.map(key => initialDataStore.getDisplayName(key));
});

const chartOptions = computed(() => ({
    chart: {
        id: "revenueExpenseAndDebt",
        toolbar: {
            show: false
        },
        sparkline: {
            enabled: false
        },
        zoom: {
            enabled: false,
            allowMouseWheelZoom: false
        },
        animations: {
            enabled: true,
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        }
    },
    labels: chartLabels.value,
    stroke: {
        show: true,
        width: 2,
        colors: ["rgb(111, 66, 193)", "rgb(25, 135, 84)", "rgb(220, 53, 69)"]
    },
    fill: {
        opacity: 0.8,
        colors: ["rgb(111, 66, 193)", "rgb(25, 135, 84)", "rgb(220, 53, 69)"],
    },
    legend: {
        show: true,
        position: "top",
        horizontalAlign: "center", 
    },
    tooltip: {
        shared: true,
        fixed: {
            enabled: false,
            position: 'topRight',
            offsetX: 0,
            offsetY: 0,
        },
        y: {
            formatter: (value: number) => amountUtility.getDisplayText(value),
        }
    },
    grid: {
        padding: {
            left: 0,
            right: 0,
            bottom: -30
        }
    }
}))
</script>

<template>
    <MainBlock title="Cơ cấu doanh thu" :body-padding="[3, 3, 0, 3]" class="h-100"
            body-class="d-flex justify-content-center align-items-center"
            id="revenue-distribution-graph-block">
        <template #body>
            <ApexCharts type="donut" :height="height" :series="chartSeries"
                    :options="chartOptions">
            </ApexCharts>
        </template>
    </MainBlock>
</template>

<style>
</style>