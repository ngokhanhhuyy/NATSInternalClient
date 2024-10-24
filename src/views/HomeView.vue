<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useViewStates } from "@/composables";

// Layout components.
const MainContainer = defineAsyncComponent(() =>
    import("@layouts/MainContainerComponent.vue"));

// Internal state.
useViewStates();
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12"
                    v-for="id in 4" :key="id + 1">
                <div class="block bg-body border border-default rounded-3 w-100 p-3">
                </div>
            </div>
        </div>
        <div class="row g-3">
            <div class="col col-lg-3 col-md-5 col-sm-12 col-12">
                <div class="block bg-body border border-default rounded-3 w-100 p-3">
                </div>
            </div>
            <div class="col col-lg-5 col-md-7 col-sm-12 col-12">
                <div class="block bg-body border border-default rounded-3 w-100 p-3">
                </div>
            </div>
            <div class="col col-lg-4 col-md-12 col-sm-12 col-12">
                <div class="block bg-body border border-default rounded-3 w-100 p-3">
                </div>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
.block {
    height: 100px;
}
</style>