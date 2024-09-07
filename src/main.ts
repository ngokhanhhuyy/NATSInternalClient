import './assets/main.css';
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from "@/stores/auth";
import { useAlertModalStore } from "./stores/alertModal";

import App from './App.vue';
import { router } from './router';
import {
    AuthenticationError, AuthorizationError, NotFoundError,
    UndefinedError } from "./services/exceptions";

const app = createApp(App);
app.use(router);
app.use(createPinia());
window.addEventListener("unhandledrejection", async (event) => {
    const alertModalStore = useAlertModalStore();
    if (event.reason instanceof NotFoundError) {
        await alertModalStore.getNotFoundConfirmationAsync();
        router.back();
    }

    if (event.reason instanceof AuthenticationError) {
        const authStore = useAuthStore();
        authStore.clearAuthenticationStatus();
        await router.push({ name: "login" });
        return;
    }

    if (event.reason instanceof AuthorizationError) {
        await router.push({ name: "home" });
        await alertModalStore.getUnauthorizationConfirmationAsync();
        return;
    }

    if (event.reason instanceof UndefinedError) {
        await alertModalStore.getUndefinedErrorConfirmationAsync();
        window.location.reload();
    }
});
app.mount("#app");