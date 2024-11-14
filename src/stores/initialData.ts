import { defineStore } from "pinia";
import { useUtilityService } from "@/services/utilityService";

const service = useUtilityService();

export const useInitialDataStore = defineStore("intialData", {
    state: (): { data: ResponseDtos.InitialData } => ({
        data: null!
    }),
    actions: {
        hasData(): boolean {
            return !!this.data;
        },
        
        async loadDataAsync(): Promise<void> {
            this.data = await service.getInitialDataAsync()
        },

        clearData(): void {
            this.data = null!;
        },
        
        getDisplayName(key: string): string {
            return this.data.displayNames[key as keyof typeof this.data.displayNames];
        }
    }
});