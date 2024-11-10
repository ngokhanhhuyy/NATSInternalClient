<script setup lang="ts">
// Interfaces.
interface PaginationRanges {
    largeScreen: PaginationRange,
    smallScreen: PaginationRange,
}

interface Props {
    page: number;
    pageCount: number;
}

interface Emits {
    (event: "pageClick", page: number): void
}

// Imports.
import { computed } from "vue";
import { usePaginationUtility, type PaginationRange } from "@/utilities/paginationUtility";

// Props and emit.
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Tools.
const paginationUtility = usePaginationUtility();

// Computed pagination rendering value
const paginationRanges = computed<PaginationRanges>(() => ({
    largeScreen: paginationUtility.getPaginationRange({
        currentPage: props.page,
        pageCount: props.pageCount,
        visibleButtons: 5
    }),
    smallScreen: paginationUtility.getPaginationRange({
        currentPage: props.page,
        pageCount: props.pageCount,
        visibleButtons: 3
    }),
}));


function getPageButtonActualPageValue(page: number): number {
    return page + (paginationRanges.value.largeScreen.startingPage - 1);
}

function getPageButtonClassName(page: number): string {
    const buttonActualPage = getPageButtonActualPageValue(page);
    let className: string = "";
    if (buttonActualPage === props.page) {
        className += "active";
    }
    
    const exceedLeft = buttonActualPage < paginationRanges.value.smallScreen.startingPage;
    const exceedRight = buttonActualPage > paginationRanges.value.smallScreen.endingPage;
    if (exceedLeft || exceedRight) {
        className += " d-sm-flex d-none";
    }
    return className;
}

function onPageButtonClicked(page: number) {
    window.scrollTo(0, 0);
    emit("pageClick", page);
}
</script>

<template>
    <button class="btn mx-1 btn-outline-primary page-button" :disabled="page === 1"
            @click="onPageButtonClicked(1)">
        Trang đầu
    </button>
    <button class="btn mx-1 btn-outline-primary page-button"
            :class="getPageButtonClassName(page)"
            @click="onPageButtonClicked(getPageButtonActualPageValue(page))"
            v-for="page in paginationRanges.largeScreen.endingPage - (paginationRanges.largeScreen.startingPage - 1)"
            :key="page">
        {{ getPageButtonActualPageValue(page) }}
    </button>
    <button class="btn mx-1 btn-outline-primary page-button"
            :disabled="page === pageCount"
            @click="onPageButtonClicked(pageCount)">
        Trang cuối
    </button>
</template>

<style scoped>
button.page-button:not(:hover):not(:focus):not(:is(.active)) {
    background: white !important;
    color: var(--font-color) !important;
    border-color: rgba(var(--bs-primary-rgb), 0.25);
}

button.page-button.active {
    background: var(--bs-primary) !important;
    color: white !important;
    border-color: var(--bs-primary);
}
</style>