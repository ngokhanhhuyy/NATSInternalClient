import { defineStore } from "pinia";

export const useUnauthorizedModalStore = defineStore("unauthorizedModal", {
    state: (): { isVisible: boolean } => ({
        isVisible: false
    }),
    actions: {
        show(): void {
            this.isVisible = true;
        },
        hide(): void {
            this.isVisible = false;
        },
        toggle(): void {
            this.isVisible = this.isVisible ? false : true;
        }
    } 
})