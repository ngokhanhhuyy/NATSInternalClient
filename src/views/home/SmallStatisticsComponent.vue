<script lang="ts">
import type { CustomerNewStatsModel } from "@/models/customerModels";

type NewStatsModel = CustomerNewStatsModel;

export interface Props<TNewStatsModel extends NewStatsModel> {
    title: string;
    unit: string;
    color: "primary" | "success" | "danger" | "purple";
    initializeModelAsync(): Promise<TNewStatsModel>;
}

interface RatioComparedToLastMonth {
    value: number;
    className: string;
    iconClassName: string;
}
</script>

<script setup lang="ts" generic="TNewStatsModel extends NewStatsModel">
// Props.
const props = defineProps<Props<TNewStatsModel>>();

// States.
const ratioComparedToLastMonth = computeRatioComparedToLastMonth();

// Functions.
function computeRatioComparedToLastMonth(): RatioComparedToLastMonth {
    const greaterValue = Math.max(props.thisMonthValue, props.lastMonthValue);
    const lessValue = Math.min(props.thisMonthValue, props.lastMonthValue);
    const absoluteRatio = Math.round((greaterValue / lessValue) * 100) - 100;
    const ratio = props.thisMonthValue >= props.lastMonthValue
        ? absoluteRatio
        : -absoluteRatio;
    let color, iconClass: string;
    if (ratio > 0) {
        color = "success";
        iconClass = "bi-arrow-up-right";
    } else if (ratio < 0) {
        color = "danger";
        iconClass = "bi-arrow-down-right";
    } else {
        color = "secondary";
        iconClass = "bi-arrow-right";
    }

    return {
        value: ratio,
        className: `bg-${color}-subtle border-${color}-subtle text-${color}`,
        iconClassName: iconClass
    }
}
</script>

<template>
    <div :class="`w-100 small-statistics text-${color}-emphasis`">
        <div :class="`bg-${color} bg-opacity-10 border border-${color}-subtle px-3 py-1
                    rounded-top-3 text-${color}`">
            <span class="small fw-bold">{{ title.toUpperCase() }}</span>
        </div>
        <div class="bg-white border border-top-0 rounded-bottom-3 px-3 py-2 text-end">
            <span :class="`fs-1 text-${color}`">{{ thisMonthValue }}</span>
            <span class="ms-2">{{ unit.toUpperCase() }}</span>
            <div class="small">
                <span class="border rounded ps-1 me-2 small fw-bold"
                        :class="ratioComparedToLastMonth.className">
                    {{ ratioComparedToLastMonth.value }}%
                </span>so với tháng trước
            </div>
        </div>
    </div>
</template>

<style scoped>
.small-statistics {
    --purple-color: 111, 66, 193;
}

.text-purple {
    color: rgb(var(--purple-color)) !important;
}

.border-purple {
    border-color: rgba(var(--purple-color), 1);
}

.border-purple-subtle {
    border-color: rgba(var(--purple-color), 0.25) !important;
}

.bg-purple {
    --bs-bg-opacity: 1;
    background-color: rgb(var(--purple-color), var(--bs-bg-opacity)) !important;
}

.bg-purple.bg-opacity-10 {
    --bs-bg-opacity: 0.1;
    background-color: rgb(var(--purple-color), var(--bs-bg-opacity)) !important;
}
</style>