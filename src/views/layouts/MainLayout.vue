<script setup lang="ts">
import { computed, defineAsyncComponent, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHubClient } from "@/services/hubClient";

// Async components.
import CurrentUser from "@/components/topBar/CurrentUser.vue";
import Notification from "@/components/topBar/Notification/NotificationComponent.vue";
import SearchBar from "@/components/topBar/SearchBar.vue";
import NavBar from "@/components/sideBar/NavBar.vue";
import MobileNavBar from "@/components/sideBar/MobileNavBar.vue";
import Breadcrumb from "@layouts/BreadcrumbComponent.vue";

// Dependencies.
const route = useRoute();
const router = useRouter();
const hubClient = useHubClient();

// Start the hub connection.
await hubClient.startConnection();

// Computed properties.
const componentKey = computed<string>(() => {
    if (route.path.split("/")[1] != "customers") {
        return route.path;
    }
    return "customers";
});

// Life-cycle.
onUnmounted(async () => await hubClient.stopConnection());

// Functions.
async function onMainLogoClicked() {
    await router.push({ name: "home" });

}
</script>

<template>
    <div class="container-fluid d-flex flex-column justify-content-center m-0 p-0 h-100">
        <div class="row">
            <!-- Main logo (top left corner)-->
            <div class="col col-auto d-flex flex-row bg-white border-end border-bottom
                        border-default overflow-hidden ps-3 p-2 align-items-center"
                    id="main-logo" @click="onMainLogoClicked">
                <img src="@/assets/images/main-logo.png">
                <div class="flex-fill d-lg-block d-md-none d-sm-none d-none">
                    <span class="text-primary fs-5 ms-2">NATSInternal</span>
                </div>
            </div>

            <div class="col bg-white border-bottom border-default p-2
                        d-flex"
                    id="topbar">
                <div class="row gx-md-4 gx-sm-3 gx-3 h-100 w-100 flex-row
                            justify-content-end align-items-center">
                    <!-- Search bar -->
                    <div class="col col-auto h-100 flex-fill d-md-flex d-sm-none d-none">
                        <SearchBar />
                    </div>

                    <!-- Add order -->
                    <div class="col col-auto h-100 d-flex align-items-center">
                        <RouterLink to="/" title="Thêm đơn hàng">
                            <i class="bi bi-cart-plus text-primary fs-4"></i>
                        </RouterLink>
                    </div>

                    <!-- Add customer -->
                    <div class="col col-auto h-100 d-flex align-items-center">
                        <RouterLink to="/" title="Thêm khách hàng">
                            <i class="bi bi-person-add text-primary fs-4"></i>
                        </RouterLink>
                    </div>

                    <!-- Notification -->
                    <div class="col col-auto h-100 d-flex align-items-center">
                        <Suspense>
                            <Notification />
                        </Suspense>
                    </div>

                    <!-- Current user + avatar -->
                    <div class="col col-auto h-100">
                        <Suspense>
                            <CurrentUser />
                        </Suspense>
                    </div>

                    <!-- Navigation bar + toggler (only display on mobile screen) -->
                    <div class="col col-auto h-100 d-sm-none d-flex">
                        <button class="btn bg-default border border-primary-subtle p-0"
                                type="button" id="navbar-toggler"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvas-navbar"
                                aria-controls="offcanvas-navbar"
                                aria-label="Toggle navigation">
                            <i class="bi bi-list"></i>
                        </button>
                        <MobileNavBar />
                    </div>
                </div>
            </div>
        </div>

        <div class="row flex-fill">
            <!-- Sidebar -->
            <div class="col col-auto d-sm-flex d-none flex-column align-items-center
                        bg-white border-end border-default position-relative"
                    id="sidebar">
                <NavBar :keep-expanded="false" :sticky="true" />
            </div>

            <!-- Main content -->
            <div class="col py-2 px-1" id="content">
                <Breadcrumb />
                <RouterView v-slot="{ Component }">
                    <Transition name="slide-vertically" mode="out-in">
                        <Suspense>
                            <div :key="componentKey">
                                <Component :is="Component" />
                            </div>
                        </Suspense>
                    </Transition>
                </RouterView>
            </div>
        </div>
    </div>
</template>

<style>
:root {
    --sidebar-width-expanded: 220px;
    --sidebar-width-collapsed: 80px;
    --topbar-height: 60px;
    --topbar-icon-hover-filter: drop-shadow(0 0 10px rgba(var(--bs-primary-rgb), 0.95)); 
    --topbar-icon-transition-duration: 0.3s;
}

#main-logo {
    width: var(--sidebar-width-expanded);
    height: var(--topbar-height);
    z-index: 10;
    cursor: pointer;
}

#main-logo img {
    height: 100%;
    aspect-ratio: 1;
    filter: drop-shadow(0 0 5px rgba(var(--bs-primary-rgb), 0.3));
}

#main-logo div {
    display: block;
    position: relative;
    height: fit-content
}

#topbar {
    height: var(--topbar-height);
    z-index: 10;
}

#topbar > .row > .col > a {
    transition-duration: var(--topbar-icon-transition-duration);
}

#topbar > .row > .col > a:hover {
    filter: var(--topbar-icon-hover-filter);
}

#sidebar {
    width: var(--sidebar-width-expanded);
    height: auto;
    padding: 0 15px;
}

#content {
    background-color: rgba(255, 255, 255, 0.75);
    overflow-y: auto;
    height: calc(100vh - var(--topbar-height));
}

#navbar-toggler {
    height: 100%;
    aspect-ratio: 1.3;
}

#navbar-toggler i {
    font-size: 1.5em;
}

.slide-vertically-enter-active,
.slide-vertically-leave-active {
    transition: .5s ease;
}

.slide-vertically-leave-to,
.slide-vertically-enter-from {
    opacity: 0;
    transform: translateY(-10%) scale(80%);
}

.slide-vertically-leave-from,
.slide-vertically-enter-to {
    opacity: 1;
    transform: translateY(0) scale(100%);
}

@media (max-width: 992px) {
    #main-logo {
        width: var(--sidebar-width-collapsed);
        justify-content: center;
        padding: 7px !important;
    }

    #sidebar {
        width: var(--sidebar-width-collapsed);
        padding: 10px
    }
}

@media (max-width: 576px) {
    #topbar {
        position: fixed !important;
        top: 0;
        left: var(--sidebar-width-collapsed);
        width: calc(100vw - var(--sidebar-width-collapsed));
    }
    
    #main-logo {
        position: fixed;
        border-right: none !important;
    }

    #content {
        position: relative;
        top: var(--topbar-height);
        left: 0;
        background-color: rgba(255, 255, 255, 0.75);
        height: fit-content;
        min-height: calc(100% - var(--topbar-height));
        overflow-y: unset;
    }
}
</style>