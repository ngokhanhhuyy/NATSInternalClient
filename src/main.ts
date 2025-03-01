import "@/assets/main.css"
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthenticationStore } from "@/stores/authentication";
import { useAlertModalStore } from "./stores/alertModal";
import VueApexCharts from "vue3-apexcharts";

import App from "./App.vue";
import { router } from "./router";
import {
    AuthenticationError, AuthorizationError, NotFoundError,
    UndefinedError } from "./errors";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(VueApexCharts);
window.addEventListener("unhandledrejection", async (event) => {
    const alertModalStore = useAlertModalStore();
    if (event.reason instanceof NotFoundError) {
        await alertModalStore.getNotFoundConfirmationAsync();
        router.back();
    }

    if (event.reason instanceof AuthenticationError) {
        const authStore = useAuthenticationStore();
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