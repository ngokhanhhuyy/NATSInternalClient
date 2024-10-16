<script setup lang="ts">
    import { useAuthStore } from "@/stores/auth";

    const authStore = useAuthStore();
</script>

<template>
    <div class="container-fluid d-flex flex-column justify-content-center">
        <div class="row py-3 g-3 justify-content-center">
            <div class="col col-4 d-flex align-items-center">
                <div class="block bg-white border border-default rounded-3 w-100 p-3">
                    <button class="btn btn-primary">
                        See token
                    </button>
                    <button class="btn btn-danger ms-2" @click="authStore.clearTokens()">
                        Clear token
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>