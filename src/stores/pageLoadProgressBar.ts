import { defineAsyncComponent } from "vue";
import { defineStore } from "pinia";

const PageLoadProgressBar = defineAsyncComponent(() =>
    import("@/components/PageLoadProgressBar.vue"));

interface States {
    instance: InstanceType<typeof PageLoadProgressBar> | null;
}

export const usePageLoadProgressBarStore = defineStore("pageLoadProgressBarStore", {
    state: (): States => ({
        instance: null
    }),
    actions: {
        setInstance(instance: InstanceType<typeof PageLoadProgressBar>) {
            this.instance = instance;
        },

        start(): void {
            this.instance?.start();
        },

        finish(): void {
            this.instance?.finish();
        }
    }
})