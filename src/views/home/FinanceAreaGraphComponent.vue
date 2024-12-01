<script lang="ts">
import type { DailyStatsDetailModel } from "@/models/statsModels";

interface Props {
    statsList: DailyStatsDetailModel[];
    height?: string;
}

interface Model {
    revenueValues: DateValuePair[];
    expenseCostAndDebtValues: DateValuePair[];
}

interface DateValuePair {
    date: string,
    value: number
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAmountUtility } from "@/utilities/amountUtility";
import ApexCharts, { type VueApexChartsComponent as ApexChartsComponent }
    from "vue3-apexcharts";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependency.
const amountUtility = useAmountUtility();

// States.
const chartComponent = ref<ApexChartsComponent>(null!);

// Computed properties.
const maxValue = computed<number>(() => {
    return Math.max(
        ...props.statsList.map(stats => stats.grossRevenue),
        ...props.statsList.map(stats => stats.expenses + stats.cost));
});

const chartSeries = computed(() => ([
    {
        name: "Doanh thu gộp",
        data: props.statsList.map(stats => stats.grossRevenue).reverse()
    },
    {
        name: "Chi phí",
        data: props.statsList.map(stats => stats.expenses + stats.cost).reverse()
    }
]));

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
        }
    },
    dataLabels: {
        enabled: false
    },
    labels: props.statsList
        .map(stats => stats.recordedDate.toString().split(", ")[0].replaceAll("Ngày ", ""))
        .reverse(),
    xaxis: {
        labels: {
            show: true,
            rotate: -60,
            rotateAlways: true,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false
        },
        tooltip: {
            enabled: false
        },
    },
    fill: {
        type: "gradient",
        colors: [ "#0d6efd", "rgb(227, 98, 9)" ],
        gradient: {
            opacityFrom: 0.7,
            opacityTo: 0,
        }
    },
    markers: {
        size: 5,
        shape: "circle",
        hover: {
            size: 7,
        }
    },
    stroke: {
        show: true,
    },
    yaxis: {
        tickAmount: 4,
        labels: {
            show: true,
            formatter: (value: number) => {
                if (value === 0) {
                    return 0;
                }

                if (maxValue.value >= 1_000_000) {
                    return (value / 1_000_000).toFixed(0) + "tr";
                }

                return (value / 1_000).toFixed(1) + "N";
            }
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false
        },
        min: 0,
    },
    grid: {
        show: true,
        padding: {
            top: 0,
            bottom: -10,
            left: 20,
            right: 10,
        }
    },
    legend: {
        show: true,
        position: "top"
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
    }
}));
</script>

<template>
    <MainBlock title="Biểu đồ 10 ngày gần nhất" :body-padding="[3, 3, 0, 3]" class="h-100">
        <template #body>
            <ApexCharts :height="height" type="area" :series="chartSeries"
                    :options="chartOptions" ref="chartComponent">
            </ApexCharts>
        </template>
    </MainBlock>
</template>