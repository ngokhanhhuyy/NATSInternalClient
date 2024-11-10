import { ref, watch } from "vue";
import { usePageLoadProgressBarStore } from "@/stores/pageLoadProgressBar";

export interface LoadingState {
    isLoading: boolean;
}

export interface LoadingStateOptions {
    defaultState: boolean;
}

/**
 * Enables loading state for a component.
 * 
 * @returns An object loading state API.
 */
export function useLoadingState(options: LoadingStateOptions = { defaultState: false })
        : LoadingState {
    const pageLoadProgressBarStore = usePageLoadProgressBarStore();
    const isLoading = ref<boolean>(options.defaultState);
    watch(() => isLoading.value, (isLoading) => {
        if (isLoading) {
            pageLoadProgressBarStore.start();
        } else {
            pageLoadProgressBarStore.finish();
        }
    });

    return {
        get isLoading(): boolean {
            return isLoading.value;
        },

        set isLoading(value: boolean) {
            isLoading.value = value;
        }
    };
}