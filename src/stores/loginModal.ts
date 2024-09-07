import { defineAsyncComponent } from "vue";
import { defineStore } from "pinia";

const LoginModalComponent = defineAsyncComponent(() => import("@/components/modals/LoginModal.vue"));

interface State {
    instance: InstanceType<typeof LoginModalComponent>;
    isOpened: boolean;
}

export const useLoginModalStore = defineStore("modalStore", {
    state(): State {
        return {
            instance: null!,
            isOpened: false
        }
    },
    actions: {
        setInstance(instance: InstanceType<typeof LoginModalComponent>): void {
            this.instance = instance;
        },

        async openModal(): Promise<void> {
            this.isOpened = true;
            await this.instance.openModal();
        },
    }
})