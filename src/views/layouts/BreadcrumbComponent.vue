<script setup lang="ts">
// Interface.
interface RouteItem {
    text: string;
    to: RouteLocationNormalized | null
}

// Imports.
import { computed } from "vue";
import { useRoute, type RouteLocationNormalized } from "vue-router";

// Dependency.
const route = useRoute();

// Computed property.
const items = computed<RouteItem[]>(() => (route.meta.breadcrumb as RouteItem[]) ?? []);
const homeIconClass = computed<string>(() => {
    if (route.name !== "home") {
        return "bi bi-house-fill";
    }
    return "bi bi-house";
});

// Functions.
function itemClass(index: number): string | null {
    if (items.value && index === items.value.length - 1) {
        return "bg-primary text-white px-2 py-1 rounded-3";
    }
    return null;
}
</script>

<template>
    <div class="container-fluid pb-0 px-2 pt-1" id="breadcrumb">
        <div class="row g-3">
            <div class="col col-12">
                <div class="bg-white border rounded-3 px-3 py-2 d-flex flex-md-row flex-column
                            flex-md-wrap align-items-md-center align-items-start
                            overflow-hidden position-relative">
                    <RouterLink to="/"
                            class="flex-shrink-0 ms-2 ps-1 d-flex
                                    align-items-center small"
                            style="text-decoration: none">
                        <i class="text-primary fs-6" :class="homeIconClass"></i>
                        <span class="ms-2">Trang chủ</span>
                    </RouterLink>
                    <div class="flex-shrink-0 small" v-for="(item, index) in items"
                            :key="item.text">
                        <i class="bi bi-caret-right-fill text-primary mx-3"
                                v-if="items.length"></i>
                        <RouterLink :to="item.to" style="text-decoration: none" v-if="item.to">
                            {{ item.text }}
                        </RouterLink>
                        <span :class="itemClass(index)" v-else>
                            {{ item.text }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>