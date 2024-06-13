<script lang="ts">
interface Props {
    textVisible?: boolean;
}
</script>

<script setup lang="ts">
defineProps<Props>();
</script>

<template>
    <div class="block-body overflow-hidden d-flex flex-column
                justify-content-center align-items-center p-3 pt-4">
        <div class="spinner-border text-primary" role="status"></div>
        <span class="text-primary mt-2" v-show="textVisible">Đang tải</span>
    </div>
</template>