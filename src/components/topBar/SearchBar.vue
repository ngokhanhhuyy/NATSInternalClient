<script setup lang="ts">
// Interfaces.
interface SearchModel {
    content: string;
    results: SearchResultModel[];
};

interface SearchResultModel {
    title: string,
    matchedContent: string,
    resultType: string
};

// Imports.
import { reactive, ref, computed } from "vue";

// Models and states.
const searchInputElement = ref<HTMLInputElement | null>(null);
const searchContent = ref<string>("");
const model = reactive<SearchModel>({
    content: "",
    results: []
});

// Computed properties.
const searchIconClass = computed<string | null>(() => {
    return searchContent.value.length === 0 ? "translucent" : null;
});

// Functions.
function clearContent(): void {
    searchContent.value = "";
}
</script>

<template>
    <div class="search-container flex-fill align-items-center h-100">
        <input type="text" class="form-control" placeholder="Tìm kiếm"
                ref="searchInputElement" v-model="searchContent"
                @blur="clearContent">
        <i class="bi bi-search search-icon" :class="searchIconClass"></i>
        <div class="search-results-container border border-primary-subtle
                    rounded-3 shadow"
                v-show="searchContent.length > 0">
            <ul class="list-group list-group-flush">
                <template v-if="model.results.length">
                    <li class="list-group-item px-3 py-2 d-flex flex-column" :key="index"
                            v-for="(result, index) in model.results">
                        <span class="fw-bold">{{ result.title }}</span>
                        <span class="small text-body-tertiary">
                            {{ result.matchedContent }}
                        </span>
                    </li>
                </template>
                <li class="list-group-item p-2 d-flex justify-content-center
                            align-items-center text-body-tertiary" v-else>
                    Không tìm thấy kết quả
                </li>
            </ul>
        </div>
        <i class="bi bi-x-circle-fill clear-icon" v-show="searchContent.length > 0"
                @click="clearContent"></i>
    </div>
</template>

<style scoped>
.search-container {
    position: relative;
    padding: 0;
    height: fit-content !important;
    align-self: center;
}

.search-results-container {
    position: absolute;
    width: 100% !important;
    max-width: 350px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, calc(100% + 5px));
    max-height: 500px;
    overflow-y: auto;
}

input {
    width: 100%;
    padding-left: 40px;
}

i {
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    margin: 0 !important;
}

i.search-icon {
    left: 15px;
    display: flex;
}

i.search-icon.translucent {
    opacity: 0.4;
}

i.clear-icon {
    cursor: pointer;
    right: 15px;
}
</style>