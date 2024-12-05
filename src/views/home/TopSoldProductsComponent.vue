<script lang="ts">
interface States {
    model: TopSoldProductListModel;
    isInitialLoading: boolean;
}
</script>

<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import { useStatsService } from "@/services/statsService";
import { TopSoldProductListModel } from "@/models/statsModels";
import { useInitialDataStore } from "@/stores/initialData";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainBlock from "../layouts/MainBlockComponent.vue";

// Dependency.
const statsService = useStatsService();
const initialDataStore = useInitialDataStore();
const amountUtility = useAmountUtility();

// States.
const states = reactive<States>({
    model: null!,
    isInitialLoading: true
});

// Computed properties.
const isCriteriaByAmount = computed<boolean>(() => states.model.criteria === "Amount");

// Life cycle hooks.
onMounted(async () => {
    await loadAsync();
    states.isInitialLoading = false
});

// Function.
async function loadAsync(): Promise<void> {
    const responseDto = await statsService.getTopSoldProductListAsync();
    states.model = new TopSoldProductListModel(
        responseDto,
        initialDataStore.data.stats.topSoldProduct);
}
</script>

<template>
    <MainBlock title="Sản phẩm bán chạy nhất" body-padding="0" class="h-100"
            body-class="h-100 overflow-hidden">
        <template v-if="!states.isInitialLoading">
            <ul class="list-group list-group-flush">
                <template v-if="states.model.items.length">
                    <li class="list-group-item d-flex align-items-center bg-transparent"
                            :key="index" v-for="(product, index) in states.model.items">
                        <RouterLink :to="product.detailRoute"
                                class="d-flex justify-content-center align-items-center
                                        flex-shrink-0 me-2">
                            <img class="img-thumbnail" :src="product.thumbnailUrl">
                        </RouterLink>
                        <div class="flex-fill detail-container">
                            <RouterLink :to="product.detailRoute" class="fw-bold">
                                {{ product.name }}
                            </RouterLink><br/>
                            <span class="opacity-50 small">
                                <template v-if="isCriteriaByAmount">
                                    {{ amountUtility.getDisplayText(product.amount) }}
                                </template>
                                <template v-else>
                                    {{ product.quantity }} {{ product.unit }}
                                </template>
                            </span>
                        </div>
                    </li>
                </template>
                <li class="list-group-item d-flex align-items-center justify-content-center
                            bg-transparent py-4 opacity-50"
                        v-else>
                    Không có sản phẩm nào
                </li>
            </ul>
        </template>
        <div class="d-flex justify-content-center align-items-center p-3" v-else>
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Đang tải...</span>
            </div>
            <span class="ms-2 text-primary">Đang tải</span>
        </div>
    </MainBlock>
</template>

<style scoped>
.list-group-item {
    height: 65px;
}

.img-thumbnail {
    aspect-ratio: 1;
    height: 40px;
}

.detail-container {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>