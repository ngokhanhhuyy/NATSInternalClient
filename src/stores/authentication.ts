import { defineStore } from "pinia";
import { useAuthenticationService } from "@/services/authenticationService";

interface IAuthenticationStates {
    hasInitiallyCheckedAuthentication: boolean;
    isAuthenticated: boolean;
}

export const useAuthenticationStore = defineStore("authentication", {
    state: (): IAuthenticationStates => ({
        hasInitiallyCheckedAuthentication: false,
        isAuthenticated: false
    }),
    actions: {
        async isAuthenticatedAsync(): Promise<boolean> {
            if (!this.hasInitiallyCheckedAuthentication) {
                const authenticationService = useAuthenticationService();
                this.isAuthenticated = await authenticationService
                    .checkAuthenticationStatusAsync();
                this.hasInitiallyCheckedAuthentication = true;
            }

            return this.isAuthenticated;
        },

        clearAuthenticationStatus(): void {
            this.hasInitiallyCheckedAuthentication = false;
            this.isAuthenticated = false;
        }
    }
});