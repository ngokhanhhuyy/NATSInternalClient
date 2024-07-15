<script lang="ts">
interface Props {
    callback: Function;
}

interface Emits {
    (event: "waitingStateChanged", isWaiting: boolean): void;
    (event: "submissionSuceeded"): void;
}
</script>

<script setup lang="ts">
import { reactive, watch, inject } from "vue";
import { usePageLoadProgressBarStore } from "@/stores/pageLoadProgressBar";
import { useAlertModalStore } from "@/stores/alertModal";
import type { ModelState } from "@/services/modelState";
import { ValidationError, OperationError, DuplicatedError, AuthorizationError } from "@/services/exceptions";

// Props and emits.
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Dependency.
const pageLoadProgressBarStore = usePageLoadProgressBarStore();
const alertModalStore = useAlertModalStore();
const modelState = inject<ModelState>("modelState")!;
const clearLeavingConfirmation = inject<() => void>("clearLeavingConfirmation")!;

// States.
const states = reactive({ isWaiting: false });

// States watching.
watch(() => states.isWaiting, (isWaiting) => {
    emit("waitingStateChanged", isWaiting);
});

// Functions.
async function onButtonClicked(): Promise<void> {
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
        emit("submissionSuceeded");
    } catch (error) {
        states.isWaiting = false;
        pageLoadProgressBarStore.finish();
        const isValidationError = error instanceof ValidationError;
        const isOperationError = error instanceof OperationError;
        const isDuplicatedError = error instanceof DuplicatedError;;
        if (isValidationError || isOperationError || isDuplicatedError) {
            modelState.setErrors(error.errors);
            await alertModalStore.getSubmitErrorConfirmationAsync(error.errors);
        } else {
            if (error instanceof AuthorizationError) {
                clearLeavingConfirmation();
            }
            throw error;
        }
    }
}
</script>

<template>
    <button class="btn btn-primary px-4" :disabled="states.isWaiting"
            @click="onButtonClicked">
        <span v-show="!states.isWaiting">
            <i class="bi bi-floppy me-1"></i>
            Lưu
        </span>
        <span class="spinner-border spinner-border-sm me-2"
                aria-hidden="true" v-show="states.isWaiting"></span>
        <span role="status" v-show="states.isWaiting">Đang lưu ...</span>
    </button>
</template>