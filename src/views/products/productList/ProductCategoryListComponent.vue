<script lang="ts">
interface Props {
    model: ProductCategoryListModel;
}

interface Emits {
    (event: "deleted", id: number): void;
}
</script>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { useProductCategoryService } from "@/services/productCategoryService";
import { ProductCategoryListModel } from "@/models";
import { useAlertModalStore } from "@/stores/alertModal";
import { useViewStates } from "@/composables";

// Props and emits.
defineProps<Props>();
const emit = defineEmits<Emits>();

// Dependencies.
const service = useProductCategoryService();
const alertModalStore = useAlertModalStore();

// Internal states.
const { loadingState } = useViewStates();

function editButtonRoute(id: number): RouteLocationRaw {
    return {
        name: "productCategoryUpdate",
        params: {
            productCategoryId: id
        }
    };
}

async function onDeleteButtonClicked(id: number): Promise<void> {
    const answer = await alertModalStore.getDeleteConfirmationAsync();
    if (answer) {
        loadingState.isLoading = true;
        await service.deleteAsync(id);
        loadingState.isLoading = false;
        emit("deleted", id);
        await alertModalStore.getSubmitSuccessConfirmationAsync();
    }
}
</script>

<template>
    <div class="block block-product-category-list bg-white rounded-3 p-0">
        <div class="block-header bg-primary-subtle border border-primary-subtle
                    rounded-top-3 ps-3 p-2 d-flex justify-content-between
                    align-items-center">
            <span class="text-primary fw-bold small py-1">
                PHÂN LOẠI
            </span>
            <RouterLink class="btn btn-primary btn-sm"
                    :to='{ name: "productCategoryCreate" }'
                    v-if="model.authorization?.canCreate">
                <i class="bi bi-plus-lg"></i>
            </RouterLink>
        </div>

        <!-- Body -->
        <div class="block-body border border-top-0 rounded-bottom-3 overflow-hidden">
            <ul class="list-group list-group-flush" v-if="model.items">
                <li class="list-group-item d-flex justify-content-start
                            align-items-center ps-3 p-2"
                        v-for="category in model.items"
                        :key="category.id">
                    <i class="bi bi-tag-fill me-3"></i>

                    <!-- Name -->
                    <div class="flex-fill fw-bold">{{ category.name }}</div>

                    <!-- Edit button -->
                    <RouterLink class="btn btn-outline-primary btn-sm"
                            :to="editButtonRoute(category.id)"
                            v-if="model.authorization?.canEdit">
                        <i class="bi bi-pencil-square"></i>
                    </RouterLink>

                    <!-- Delete button -->
                    <button class="btn btn-outline-danger btn-sm ms-2"
                            @click="onDeleteButtonClicked(category.id)"
                            v-if="model.authorization?.canDelete">
                        <i class="bi bi-trash3"></i>
                    </button>
                </li>
            </ul>
            <div class="d-flex justify-content-center align-items-center p-3" v-else>
                <span class="opacity-50">Không có phân loại</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>