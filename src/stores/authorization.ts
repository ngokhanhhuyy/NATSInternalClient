import { defineStore } from "pinia";

export function useAuthorizationStore<T>() {
    return defineStore("authorization", {
        state: (): { authorization: T } => ({
            authorization: null!
        })
    });
}