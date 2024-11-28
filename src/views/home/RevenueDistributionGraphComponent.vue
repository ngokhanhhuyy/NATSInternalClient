<script lang="ts">
interface Props {
    height?: string;
}

interface Model {
    consultant: number;
    order: number;
    treatment: number;
}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useInitialDataStore } from "@/stores/initialData";
import ApexCharts from "vue3-apexcharts";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Props.
defineProps<Props>();

// Dependency.
const initialDataStore = useInitialDataStore();

// Model and state.
const model = reactive<Model>({
    consultant: 0,
    order: 0,
    treatment: 0
});
const isInitialLoading = ref<boolean>(true);

// Computed property.
const chartSeries = computed<number[]>(() => {
    return Object.keys(model).map(key => model[key as keyof typeof model]);
});

const chartLabels = computed<string[]>(() => {
    return Object.keys(model).map(key => initialDataStore.getDisplayName(key));
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
    grid: {
        padding: {
            left: 0,
            right: 0,
            bottom: -30
        }
    }
}))

// Life cycle hook.
onMounted(async () => {
    await loadAsync();
    isInitialLoading.value = false;
});

// Function.
async function loadAsync(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    model.order = 30 + Math.round(Math.random() * 15);
    model.treatment= 30 + Math.round(Math.random() * 15);
    model.consultant = 100 - (model.order + model.treatment);
}
</script>

<template>
    <MainBlock title="Cơ cấu doanh thu" :body-padding="[3, 3, 0, 3]" class="h-100"
            body-class="d-flex justify-content-center align-items-center"
            id="revenue-distribution-graph-block">
        <template #body>
            <ApexCharts type="donut" :height="height" :series="chartSeries"
                    :options="chartOptions" v-if="!isInitialLoading">
            </ApexCharts>
        </template>
    </MainBlock>
</template>

<style>
</style>