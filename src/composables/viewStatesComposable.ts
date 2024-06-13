import { ref, watch, onMounted } from "vue";
import { usePageLoadProgressBarStore } from "@/stores/pageLoadProgressBar";

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
        window.scrollTo(0, 0)
    });

    return {
        loadingState: {
            get isLoading(): boolean {
                return isLoading.value;
            },
    
            set isLoading(value: boolean) {
                isLoading.value = value;
            }
        }
    }
}