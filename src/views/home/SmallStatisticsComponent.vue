<script lang="ts">
import type { MonthlyStatsBasicModel } from "@/models/statsModels";

export interface Props {
    title: string;
    unit: string;
    color: "primary" | "success" | "danger" | "purple";
    thisMonthStats: MonthlyStatsBasicModel | undefined;
    lastMonthStats: MonthlyStatsBasicModel | undefined;
    statsPropertySelector: (stats: MonthlyStatsBasicModel) => number;
    statsPropertyFormatter?: (value: number) => string;
}
</script>

<script setup lang="ts">
import { computed } from "vue";

// Props.
const props = withDefaults(defineProps<Props>(), {
    statsPropertyFormatter: (value: number) => value.toString()
});

// Computed property.
const isLastMonthYearVisible = computed<boolean>(() => {
    return props.thisMonthStats?.recordedYear != props.lastMonthStats?.recordedYear;
});

const lastMonthLabelText = computed<string>(() => {
    let text = `tháng ${props.lastMonthStats?.recordedMonth}`;
    if (isLastMonthYearVisible.value) {
        text += `/${props.lastMonthStats?.recordedYear}`
    }

    return text;
});

// Functions.
function getValueText(stats: MonthlyStatsBasicModel): string {
    const valueText = props.statsPropertyFormatter(props.statsPropertySelector(stats));
    return `${valueText} ${props.unit}`;
}
</script>

<template>
    <div :class="`w-100 small-statistics text-${color}-emphasis`">
        <!-- Header -->
        <div :class="`bg-${color} bg-opacity-10 border border-${color}-subtle px-3 py-1
                    rounded-top-3 text-${color}`">
            <span class="small fw-bold">{{ title.toUpperCase() }}</span>
        </div>
        
        <!-- Body -->
        <div class="bg-white border border-top-0 rounded-bottom-3 px-3 py-2 text-end">
            <template v-if="thisMonthStats">
                <!-- This month information -->
                <span :class="`fs-2 text-${color}`">
                    {{ statsPropertyFormatter(statsPropertySelector(thisMonthStats)) }}
                </span>
                <span class="ms-2">{{ unit.toUpperCase() }}</span>

                <!-- Last month information -->
                <div class="small" v-if="lastMonthStats">
                    <span :class="`text-${color}`">
                        {{ getValueText(lastMonthStats) }}
                    </span>
                    <span :class="`text-${color}-emphasis`">
                        trong {{ lastMonthLabelText }}
                    </span>
                </div>
            </template>
            <template v-else>
                <div class="w-100 p-5"></div>
            </template>
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