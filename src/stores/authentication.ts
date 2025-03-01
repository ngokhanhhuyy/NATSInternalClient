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
                try {
                    const authenticationService = useAuthenticationService();
                    this.isAuthenticated = await authenticationService
                        .checkAuthenticationStatusAsync();
                } catch {
                    this.isAuthenticated = false;
                }
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