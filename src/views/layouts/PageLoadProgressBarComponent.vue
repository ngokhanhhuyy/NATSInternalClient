<script lang="ts">
type ProgressBarState = "pending" | "waiting" | "finishing" | "hiding";

interface States {
    progressBarPercentage: number;
    progressBarState: ProgressBarState;
}

interface Emits {
    (e: "started"): void;
    (e: "finishing"): void;
    (e: "finished"): void;
    (e: "hidden"): void;
}
</script>

<script setup lang="ts">
import { reactive, computed } from "vue";

// Emits.
const emit = defineEmits<Emits>();

// States.
const states = reactive<States>({
    progressBarPercentage: 0,
    progressBarState: "pending"
});

// Computed property.
const progressBarClass = computed<string>(() => {
    const names: string[] = [];
    names.push(states.progressBarState);
    return names.join(" ");
})

// Functions.
function start(): void {
    if (states.progressBarPercentage === 100) {
        states.progressBarState = "pending";
        states.progressBarPercentage = 0;
    }
    states.progressBarState = "waiting";
    states.progressBarPercentage = 75;
    emit("started");
}

function finish(): void {
    states.progressBarPercentage = 100;
    states.progressBarState = "finishing";
    setTimeout(() => {
        states.progressBarState = "hiding";
        setTimeout(() => {
            states.progressBarState = "pending";
            states.progressBarPercentage = 0;
            emit("hidden");
        }, 205);
        emit("finished");
    }, 100);
    emit("finishing");
}

// Exposes.
defineExpose({ start, finish });
</script>

<template>
    <div class="progress w-100" role="progressbar"
            aria-label="Animated striped example"
            :aria-valuenow="states.progressBarPercentage"
            aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped progress-bar-animated"
                :class="progressBarClass"
                :style="`width: ${states.progressBarPercentage}%`"></div>
    </div>
</template>

<style scoped>
.progress {
    background: transparent !important;
    height: 5px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
}

.pending {
    transition: 0s !important;
    opacity: 0;
}

.waiting {
    transition: width 2s ease !important;
    opacity: 1;
}

.finishing {
    transition: width .1s !important;
    opacity: 1;
}

.hiding {
    transition: opacity .2s !important;
    opacity: 0;
}
</style>