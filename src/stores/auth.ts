import { defineStore } from "pinia";
import { useAuthenticationService } from "@/services/authenticationService";

interface IAuthStates {
    hasInitiallyCheckedAuthentication: boolean;
    isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth", {
    state: (): IAuthStates => ({
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