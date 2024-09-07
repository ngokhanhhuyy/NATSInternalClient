import { ref, watch, provide, onMounted } from "vue";
import { usePageLoadProgressBarStore } from "@/stores/pageLoadProgressBar";

export interface LoadingState { isLoading: boolean }

export interface ViewStates { loadingState: LoadingState }

export function useViewStates() {
    const pageLoadProgressBarStore = usePageLoadProgressBarStore();
    const isLoading = ref<boolean>(true);
    watch(() => isLoading.value, (isLoading) => {
        if (isLoading) {
            pageLoadProgressBarStore.start();
        } else {
            pageLoadProgressBarStore.finish();
        }
    });

    onMounted(() => {
        isLoading.value = false;
        window.scrollTo(0, 0);
    });

    const loadingState = {
        get isLoading(): boolean {
            return isLoading.value;
        },

        set isLoading(value: boolean) {
            isLoading.value = value;
        }
    };

    provide("loadingState", loadingState);

    return { loadingState };
}