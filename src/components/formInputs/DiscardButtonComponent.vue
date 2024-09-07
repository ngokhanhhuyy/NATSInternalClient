<script setup lang="ts">
import { useRouter } from "vue-router"

// Dependency.
const router = useRouter();

// Functions.
async function onClicked() {
    router.back();
}
</script>

<template>
    <button class="btn btn-secondary w-100" @click="onClicked">
        <i class="bi bi-x-circle me-1"></i>
        Huỷ bỏ
    </button>
</template>