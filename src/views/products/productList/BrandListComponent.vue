<script lang="ts">
interface Props {
    model: BrandListModel;
}

interface Emits {
    (event: "deleted", id: number): void;
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useBrandService } from "@/services/brandService";
import { BrandListModel } from "@/models";
import { useAlertModalStore } from "@/stores/alertModal";
import { useViewStates } from "@/composables/viewStatesComposable";

// Props and emits.
const emit = defineEmits<Emits>();
const props = defineProps<Props>();

// Dependencies.
const router = useRouter();
const service = useBrandService();
const alertModalStore = useAlertModalStore();

// Internal states.
const { loadingState } = useViewStates();

// Cmoputed properties.
const actionButtonVisible = computed<boolean>(() => {
    return props.model.authorization.canEdit && props.model.authorization.canDelete;
});

// Functions.

async function onEditButtonClicked(id: number): Promise<void> {
    await router.push({ name: "brandUpdate", params: { brandId: id } });
}

async function onDeleteButtonClicked(id: number): Promise<void> {
    const answer = await alertModalStore.getDeleteConfirmationAsync();
    if (answer) {
        loadingState.isLoading = true;
        await service.deleteAsync(id);
        loadingState.isLoading = true;
        emit("deleted", id);
        await alertModalStore.getSubmitSuccessConfirmationAsync();
    }
}
</script>

<template>
    <div class="block block-brand-list bg-white rounded-3 p-0">
        <div class="block-header bg-primary-subtle border border-primary-subtle
                    rounded-top-3 ps-3 p-2 d-flex justify-content-between
                    align-items-center">
            <span class="text-primary fw-bold small p-1">
                THƯƠNG HIỆU
            </span>
            <RouterLink class="btn btn-primary btn-sm"
                    v-show="model.authorization?.canCreate"
                    :to='{ name: "brandCreate" }'>
                <i class="bi bi-plus-lg"></i>
            </RouterLink>
        </div>

        <!-- Body -->
        <div class="block-body border border-top-0 rounded-bottom-3 overflow-hidden">
            <ul class="list-group list-group-flush"
                    v-if="model.items">
                <li class="list-group-item d-flex justify-content-start
                            align-items-center ps-3 p-2"
                        v-for="brand in model.items"
                        :key="brand.id">
                    <i class="bi bi-building me-3"></i>

                    <!-- Name -->
                    <div class="flex-fill fw-bold name my-1">{{ brand.name }}</div>

                    <!-- Action buttons -->
                    <div class="dropdown"
                            v-if="actionButtonVisible">
                        <button class="btn btn-outline-primary btn-sm" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                        </button>
                        <ul class="dropdown-menu shadow-lg">
                            <!-- Edit button -->
                            <li class="px-3 py-1" @click="onEditButtonClicked(brand.id)"
                                    v-if="model.authorization?.canEdit">
                                <i class="bi bi-pencil-square me-1"></i>
                                Chỉnh sửa
                            </li>

                            <!-- Delete button -->
                            <li class="px-3 py-1 text-danger"
                                    @click="onDeleteButtonClicked(brand.id)"
                                    v-if="model.authorization?.canDelete">
                                <i class="bi bi-trash3 me-1"></i>
                                Xoá bỏ
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div class="d-flex justify-content-center align-items-center p-3" v-else>
                <span class="opacity-50">Không có thương hiệu</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
ul li .name {
    width: auto;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

ul li a {
    text-decoration: none;
}

ul.dropdown-menu li {
    cursor: pointer;
}

ul.dropdown-menu li:hover {
    background-color: rgba(var(--bs-secondary-rgb), 0.1);
}

ul.dropdown-menu li a {
    color: unset;
}
</style>