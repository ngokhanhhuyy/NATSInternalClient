<script lang="ts">
import type { RouteLocationRaw } from "vue-router";

// Props.
interface Props {
    to: RouteLocationRaw;
    canCreate: boolean | undefined;
    textInvisible?: boolean;
}
</script>

<script setup lang="ts">
import { RouterLink } from "vue-router";

// Props.
defineProps<Props>();
</script>

<template>
    <RouterLink :to="to" class="btn btn-primary btn-sm" v-if="canCreate">
        <i class="bi bi-plus-lg"></i>
        <span class="ms-1" v-if="!textInvisible">Tạo mới</span>
    </RouterLink>
</template>