import { defineStore } from "pinia";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    expiringDateTime: string | null;
    userName: string | null;
    firstRequestAuthenticated: boolean,
    sentRequestCount: number;
    isExchangingTokens: boolean;
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: null,
        expiringDateTime: null,
        userName: localStorage.getItem("userName"),
        firstRequestAuthenticated: false,
        sentRequestCount: 0,
        isExchangingTokens: false,
    }),
    getters: {
        isAuthenticated: (state): boolean => state.accessToken != null,
        hasRefreshToken: (state): boolean => state.refreshToken != null
    },
    actions: {
        setAccessToken(token: string): void {
            this.accessToken = token;
            localStorage.setItem("accessToken", this.accessToken);
        },

        setRefreshToken(token: string): void {
            this.refreshToken = token;
        },

        setExpiringDateTime(expiringDateTime: string): void {
            this.expiringDateTime = expiringDateTime;
        },

        setUserName(userName: string): void {
            this.userName = userName;
            localStorage.setItem("userName", userName);
        },

        clearTokens(): void {
            this.accessToken = null;
            this.refreshToken = null;
            localStorage.removeItem("accessToken");
        },

        clearUserName(): void {
            this.userName = null;
            localStorage.removeItem("userName");
        },

        clearExpiringDateTime(): void {
            this.expiringDateTime = null;
        },

        incrementSentRequestCount(): void {
            this.sentRequestCount++;
        }
    }
})