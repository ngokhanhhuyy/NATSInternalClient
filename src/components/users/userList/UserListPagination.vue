<script lang="ts">
interface Props {
    page: number;
    pageCount: number;
}

interface PaginationRanges {
    largeScreen: PaginationRange,
    smallScreen: PaginationRange,
}
</script>

<script setup lang="ts">
import { computed, toRef } from "vue";
import { usePaginationUtility, type PaginationRange } from "@/utilities/paginationUtility";

const paginationUtility = usePaginationUtility();

const props = defineProps<Props>();
const model = toRef(props);

const emit = defineEmits<{
    (event: "pageClick", page: number): void
}>();

// Computed pagination rendering value
const paginationRanges = computed<PaginationRanges>(() => ({
    largeScreen: paginationUtility.getPaginationRange({
        currentPage: model.value.page,
        pageCount: model.value.pageCount,
        visibleButtons: 5
    }),
    smallScreen: paginationUtility.getPaginationRange({
        currentPage: model.value.page,
        pageCount: model.value.pageCount,
        visibleButtons: 3
    }),
}));


function getPageButtonActualPageValue(page: number): number {
    return page + (paginationRanges.value.largeScreen.startingPage - 1);
}

function getPageButtonClassName(page: number): string {
    let buttonActualPage = getPageButtonActualPageValue(page);
    let className: string = "";
    if (buttonActualPage === model.value.page) {
        className += "active";
    }
    
    let exceedLeft = buttonActualPage - 1 < paginationRanges.value.smallScreen.startingPage;
    let exceedRight = buttonActualPage - 1 > paginationRanges.value.smallScreen.endingPage;
    if (!(exceedLeft || exceedRight)) {
        className += " d-sm-flex d-none";
    }
    return className;
}
</script>

<template>
    <button class="btn mx-1 btn-outline-primary page-button"
            :disabled="model.page === 1"
            @click='emit("pageClick", 1)'>
        Trang đầu
    </button>
    <button class="btn mx-1 btn-outline-primary page-button"
            :class="getPageButtonClassName(page)"
            @click='emit("pageClick", getPageButtonActualPageValue(page))'
            v-for="page in paginationRanges.largeScreen.endingPage - (paginationRanges.largeScreen.startingPage - 1)"
            :key="page">
        {{ getPageButtonActualPageValue(page) }}
    </button>
    <button class="btn mx-1 btn-outline-primary page-button"
            :disabled="model.page === model.pageCount"
            @click='emit("pageClick", model.pageCount)'>
        Trang cuối
    </button>
</template>