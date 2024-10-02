<script lang="ts">
interface Props {
    callback: Function;
    submissionSucceededModal: boolean;
}

interface Emits {
    (event: "waitingStateChanged", isWaiting: boolean): void;
    (event: "submissionSuceeded"): void;
}
</script>

<script setup lang="ts">
import { watch, inject, withDefaults } from "vue";
import type { LoadingState } from "@/composables";
import { useAlertModalStore } from "@/stores/alertModal";
import type { ModelState } from "@/services/modelState";
import { ValidationError, OperationError, DuplicatedError,
    AuthorizationError } from "@/services/exceptions";

// Props and emits.
const props = withDefaults(defineProps<Props>(), { submissionSucceededModal: true });
const emit = defineEmits<Emits>();

// Dependency.
const alertModalStore = useAlertModalStore();
const modelState = inject<ModelState>("modelState")!;
const clearLeavingConfirmation = inject<() => void>("clearLeavingConfirmation")!;

// States.
const loadingState = inject<LoadingState>("loadingState")!;

// States watching.
watch(() => loadingState.isLoading, (isLoading) => {
    emit("waitingStateChanged", isLoading);
});

// Functions.
async function onButtonClicked(): Promise<void> {
    loadingState.isLoading = true;
    try {
        if (props.callback.constructor.name === "AsyncFunction") {
            await props.callback();
        } else {
            props.callback();
        }
        loadingState.isLoading = false;
        clearLeavingConfirmation();
        modelState.clearErrors();
        await alertModalStore.getSubmitSuccessConfirmationAsync();
        emit("submissionSuceeded");
    } catch (error) {
        loadingState.isLoading = false;
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
    <button class="btn btn-primary px-4" :disabled="loadingState.isLoading"
            @click="onButtonClicked">
        <span v-show="!loadingState.isLoading">
            <i class="bi bi-floppy me-1"></i>
            Lưu
        </span>
        <span class="spinner-border spinner-border-sm me-2"
                aria-hidden="true" v-show="loadingState.isLoading"></span>
        <span role="status" v-show="loadingState.isLoading">Đang lưu ...</span>
    </button>
</template>