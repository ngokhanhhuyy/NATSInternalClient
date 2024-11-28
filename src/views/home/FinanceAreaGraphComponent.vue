<script lang="ts">
interface Props {
    dataLength: number;
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
import { ref, reactive, computed, onMounted, type Reactive } from "vue";
import { useAmountUtility } from "@/utilities/amountUtility";
import ApexCharts from "vue3-apexcharts";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependency.
const amountUtility = useAmountUtility();

// Model and states.
const model: Reactive<Model> = reactive({
    revenueValues: Array.from({ length: props.dataLength }, (_, index) => ({
        date: `${(index + 3).toString().padStart(2, "0")} tháng ${12}`,
        value: 0
    })),
    expenseCostAndDebtValues: Array.from({ length: props.dataLength }, (_, index) => ({
        date: `${(index + 3).toString().padStart(2, "0")} tháng ${12}`,
        value: 0
    })),
});
const isInitialLoading = ref<boolean>(true);

// Computed properties.
const chartSeries = computed(() => ([
    {
        name: "Doanh thu",
        data: model.revenueValues.map(value => value.value)
    },
    {
        name: "Chi phí và ghi nợ",
        data: model.expenseCostAndDebtValues.map(value => value.value)
    },
]));

const yAxisFormatter = computed<(value: number) => string>(() => {
    const maxValue = Math.max(...model.revenueValues.map(value => value.value));
    if (maxValue >= 1_000_000) {
        return (value) => (value / 1_000_000).toFixed(2) + "Tr";
    }

    return (value) => (value / 1_000).toFixed(1) + "N";
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
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: model.revenueValues.map(value => value.date),
        labels: {
            show: true,
            rotate: -45,
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
            formatter: yAxisFormatter.value
        },
        title: {
            text: "Doanh thu (vnđ)"
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

// Life cycle hook.
onMounted(async () => {
    await loadAsync();
    isInitialLoading.value = false;
});

// Function.
async function loadAsync(): Promise<void> {
    for (let i = 0; i < props.dataLength; i++) {
        model.revenueValues[i].value = 0;
        model.expenseCostAndDebtValues[i].value = 0;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    for (let i = 0; i <  props.dataLength; i++) {
        model.revenueValues[i].value = (200 + Math.round(Math.random() * 200)) * 1000;
        model.expenseCostAndDebtValues[i].value = Math
            .round(Math.random() / 2 * model.revenueValues[i].value);
    }
}
</script>

<template>
    <MainBlock title="Biểu đồ 10 ngày gần nhất" :body-padding="[3, 3, 0, 3]" class="h-100">
        <template #body>
            <ApexCharts :height="height" type="area" :series="chartSeries"
                    :options="chartOptions" v-if="!isInitialLoading">
            </ApexCharts>
        </template>
    </MainBlock>
</template>