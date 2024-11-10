import { reactive, provide, onMounted } from "vue";
import { ModelState } from "@/services/modelState";
import { useLoadingState } from "./loadingStateComposable";
import { AuthorizationError, ValidationError } from "@/errors";

/**
 * Enables loading state and model state for a View.
 * 
 * @remarks Apart from enabling loading state, this composable also set it to `false`
 * after the View is fully loaded and mounted and provides it as a dependency for child
 * components to consume using `inject` macro. This composable SHOULD ONLY BE USED in a
 * View, which is rendered for a route.
 * @returns An object containing the loading state and model state APIs.
 */
export function useViewStates() {
    const loadingState = useLoadingState({ defaultState: true });
    const modelState = reactive(new ModelState());

    onMounted(() => {
        loadingState.isLoading = false;
        window.scrollTo(0, 0);
    });

    provide("loadingState", loadingState);
    provide("modelState", modelState);

    return { loadingState, modelState, AuthorizationError, ValidationError };
}