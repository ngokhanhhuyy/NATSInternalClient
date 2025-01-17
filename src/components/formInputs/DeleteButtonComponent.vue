<script setup lang="ts">
// Interfaces.
interface Props {
    callback: Function;
}

interface Emits {
    (event: "waitingStateChanged", isWaiting: boolean): void;
    (event: "succeeded"): void;
}

// Imports.
import { reactive, watch, inject } from "vue";
import { usePageLoadProgressBarStore } from "@/stores/pageLoadProgressBar";
import { useAlertModalStore } from "@/stores/alertModal";
import type { ModelState } from "@/services/modelState";
import { OperationError } from "@/errors";
// Props and emits.
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Dependencies.
const pageLoadProgressBarStore = usePageLoadProgressBarStore();
const alertModalStore = useAlertModalStore();
const modelState = inject<ModelState>("modelState")!;
const clearLeavingConfirmation = inject<() => void>("clearLeavingConfirmation")!;

// States.
const states = reactive({ isWaiting: false });

// State watching.
watch(() => states.isWaiting, (isWaiting) => {
    emit("waitingStateChanged", isWaiting);
});

// Functions.
async function onButtonClicked(): Promise<void> {
    const confirmationAnswer = await alertModalStore.getDeleteConfirmationAsync();
    if (confirmationAnswer) {
        states.isWaiting = true;
        pageLoadProgressBarStore.start();
        try {
            if (props.callback.constructor.name === "AsyncFunction") {
                await props.callback();
            } else {
                props.callback();
            }
            states.isWaiting = false;
            pageLoadProgressBarStore.finish();
            clearLeavingConfirmation();
            modelState.clearErrors();
            await alertModalStore.getSubmitSuccessConfirmationAsync();
            emit("succeeded");
        } catch (error) {
            states.isWaiting = false;
            pageLoadProgressBarStore.finish();
            if (error instanceof OperationError) {
                modelState.setErrors(error.errors);
                await alertModalStore.getSubmitErrorConfirmationAsync(error.errors);
            } else {
                throw error;
            }
        }
    }
}
</script>

<template>
    <button class="btn btn-outline-danger px-4" :disabled="states.isWaiting"
            @click="onButtonClicked">
        <span v-show="!states.isWaiting">
            <i class="bi bi-trash3 me-1"></i>
            Xoá
        </span>
        <span class="spinner-border spinner-border-sm me-2"
                aria-hidden="true" v-show="states.isWaiting"></span>
        <span role="status" v-show="states.isWaiting">Đang xoá ...</span>
    </button>
</template>