import { reactive, provide } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useAlertModalStore } from "@/stores/alertModal";
import { ModelState } from "@/services/modelState";
import { useViewStates } from "./viewStatesComposable";

export function useUpsertViewStates() {
    const alertModalStore = useAlertModalStore();
    let leavingConfirmation = true;

    const modelState = reactive(new ModelState());
    const clearLeavingConfirmation = () => { leavingConfirmation = false; };
    const { loadingState } = useViewStates();

    provide("modelState", modelState);
    provide("clearLeavingConfirmation", clearLeavingConfirmation);

    onBeforeRouteLeave(async (to) => {
        if (leavingConfirmation && to.name !== "login") {
            const answer = await alertModalStore.getDiscardingConfirmationAsync();
            if (answer) {
                modelState.resetErrors();
                return true;
            }
            return false;
        }

        modelState.resetErrors();
        return true;
    });

    return { modelState, loadingState, clearLeavingConfirmation };
}