<script setup lang="ts">
import { useViewStates } from "@/composables/viewStatesComposable"

// Internal state.
useViewStates();
</script>

<template>
    <div class="container-fluid d-flex flex-column justify-content-center">
        <div class="row my-3 g-3 justify-content-center">
            <div class="col col-8 d-flex align-items-center">
                <div class="block bg-white border border-default rounded-3 w-100 p-3">
                </div>
            </div>
            <div class="col col-4 d-flex align-items-center">
                <div class="block bg-white border border-default rounded-3 w-100 p-3">
                </div>
            </div>
        </div>

        <div class="row mb-3 g-3 justify-content-center">
            <div class="col col-6 d-flex align-items-center">
                <div class="block bg-white border border-default rounded-3 w-100 p-3">
                </div>
            </div>
            <div class="col col-6 d-flex align-items-center">
                <div class="block bg-white border border-default rounded-3 w-100 p-3">
                </div>
            </div>
        </div>

        <div class="row g-3 justify-content-center">
            <div class="col col-12 d-flex align-items-center">
                <div class="block bg-white border border-default rounded-3 w-100 p-3">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.block {
    height: 200px;
}
</style>