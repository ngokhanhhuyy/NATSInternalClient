<script setup lang="ts">
import { watch, ref } from "vue";
import { useRouter, RouterView } from "vue-router";
import { usePageLoadProgressBarStore } from "./stores/pageLoadProgressBar";
import { useAlertModalStore } from "./stores/alertModal";

// Async components.
import AlertModal from "@/components/modals/AlertModal.vue";
import PageLoadProgressBar from "@/views/layouts/PageLoadProgressBarComponent.vue";

// Dependencies.
const router = useRouter();
const pageLoadProgressBarStore = usePageLoadProgressBarStore();
const alertModalStore = useAlertModalStore();

// HTML elements refs.
const pageLoadProgressBar = ref<InstanceType<typeof PageLoadProgressBar>>();
const deletingConfirmationModalElement = ref<InstanceType<typeof AlertModal>>();
const notFoundConfirmationModalElement = ref<InstanceType<typeof AlertModal>>();
const discardingConfirmationModalElement = ref<InstanceType<typeof AlertModal>>();
const submitErrorConfirmationModalElement = ref<InstanceType<typeof AlertModal>>();
const submitSuccessConfirmationModalElement = ref<InstanceType<typeof AlertModal>>();
const unauthorizationConfirmationModalElement = ref<InstanceType<typeof AlertModal>>();
const undefinedErrorConfirmationModalElement = ref<InstanceType<typeof AlertModal>>();
const fileTooLargeConfirmationModalElement = ref<InstanceType<typeof AlertModal>>();

watch(() => router.currentRoute.value.fullPath, (newRoute) => {
    window.parent?.postMessage({ type: "routeChanged", newRoute });
});

watch(() => pageLoadProgressBar.value, (element) => {
    if (element) {
        pageLoadProgressBarStore.setInstance(element);
    }
});

watch(() => deletingConfirmationModalElement.value, (element) => {
    if (element) {
        alertModalStore.setDeletingConfirmationModalInstance(element);
    }
});

watch(() => notFoundConfirmationModalElement.value, (element) => {
    if (element) {
        alertModalStore.setNotFoundConfirmationModalInstance(element);
    }
});

watch(() => discardingConfirmationModalElement.value, (element) => {
    if (element) {
        alertModalStore.setDiscardingConfirmationModalInstance(element);
    }
});

watch(() => submitErrorConfirmationModalElement.value, (element) => {
    if (element) {
        alertModalStore.setSubmitErrorConfirmationModalInstance(element);
    }
});

watch(() => submitSuccessConfirmationModalElement.value, (element) => {
    if (element) {
        alertModalStore.setSubmitSuccessConfirmationModalInstance(element);
    }
});

watch(() => unauthorizationConfirmationModalElement.value, (element) => {
    if (element) {
        alertModalStore.setUnauthorizationConfirmationModalInstance(element);
    }
});

watch(() => fileTooLargeConfirmationModalElement.value, (element) => {
    if (element) {
        alertModalStore.setFileTooLargeConfirmationModalInstance(element);
    }
});

watch(() => undefinedErrorConfirmationModalElement.value, (element) => {
    if (element) {
        alertModalStore.setUndefinedErrorConfirmationModalInstance(element);
    }
});
</script>

<template>
    <PageLoadProgressBar ref="pageLoadProgressBar" />
    <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <Transition name="fade" mode="out-in">
                <Suspense>
                    <Component :is="Component" />
                </Suspense>
            </Transition>
        </template>
    </RouterView>
    <AlertModal ref="deletingConfirmationModalElement"
                mode="deletingConfirmation" />
    <AlertModal ref="notFoundConfirmationModalElement"
                mode="notFoundNotification" />
    <AlertModal ref="discardingConfirmationModalElement"
                mode="discardingConfirmation" />
    <AlertModal ref="submitErrorConfirmationModalElement"
                mode="submitErrorNotification" />
    <AlertModal ref="submitSuccessConfirmationModalElement"
                mode="submitSuccessNotification" />
    <AlertModal ref="unauthorizationConfirmationModalElement"
                mode="unauthorizationConfirmation" />
    <AlertModal ref="undefinedErrorConfirmationModalElement"
                mode="undefinedErrorNotification" />
    <AlertModal ref="fileTooLargeConfirmationModalElement"
                mode="fileTooLargeConfirmation" />
</template>

<style>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
