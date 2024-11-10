<script lang="ts">
import type { RouteLocationRaw } from "vue-router";

interface Props {
    to: RouteLocationRaw;
    textInvisible?: boolean;
    getPermissionAsync(): Promise<boolean>;
}
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

// Props {
const props = defineProps<Props>();

// Permission.
const permission = ref<boolean>();

// Life cycle hook.
onMounted(async () => { permission.value = await props.getPermissionAsync(); });

</script>

<template>
    <RouterLink :to="to" class="btn btn-primary btn-sm" v-if="permission">
        <i class="bi bi-plus-lg"></i>
        <span class="ms-1" v-if="!textInvisible">Tạo mới</span>
    </RouterLink>
</template>