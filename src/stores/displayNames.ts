import { defineStore } from "pinia";
import { useUtilityService, type DisplayNames } from "@/services/utilityService";

interface DisplayNamesStates {
    displayNames: DisplayNames | undefined;
}

export const useDisplayNamesStore = defineStore("displayNames", {
    state: (): DisplayNamesStates => ({
        displayNames: undefined
    }),
    actions: {
        async getDisplayName(key: string): Promise<string> {
            if (!this.displayNames) {
                const utilityService = useUtilityService();
                this.displayNames = await utilityService.getDisplayNamesAsync();
            }

            return this.displayNames[key as keyof typeof this.displayNames];
        }
    }
});