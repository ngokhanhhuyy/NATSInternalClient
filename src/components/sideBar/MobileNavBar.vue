<script setup lang="ts">
import { ref, watch, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { Offcanvas } from "bootstrap";

// Async component
const NavBar = defineAsyncComponent(() => import("./NavBar.vue"));

// Dependency.
const route = useRoute();

// State.
const offCanvasElement = ref<HTMLDivElement>(null!);
let bootstrapOffCanvas: Offcanvas;

// Watches.
watch(() => offCanvasElement.value, (offCanvas) => {
    if (offCanvas) {
        bootstrapOffCanvas = new Offcanvas(offCanvasElement.value);
    }
});
watch(() => route.name, () => {
    bootstrapOffCanvas.hide();
});
</script>

<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas-navbar"
            ref="offCanvasElement">
        <div class="offcanvas-body">
            <NavBar :keep-expanded="true" />
        </div>
    </div>
</template>

<style scoped>
#offcanvas-navbar {
    width: var(--sidebar-width-expanded);
}
</style>