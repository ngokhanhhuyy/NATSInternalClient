<script lang="ts">
type PropsTypeMapping<TModel, TService> = [ TModel, TService ];

interface BrandProps {
    resourceType: string;
    resourceDisplayName: string;
    service: ReturnType<typeof useBrandService>;
    modelConstructor: new(
        responseDto: ResponseDtos.Brand.List,
        requestDto?: RequestDtos.Brand.List) => BrandListModel;
    getCreateRoute(): RouteLocationRaw;
    getUpdateRoute(id: number): RouteLocationRaw;
}

interface ProductCategoryProps {
    resourceType: string;
    resourceDisplayName: string;
    service: ReturnType<typeof useProductCategoryService>;
    modelConstructor: new(
        responseDto: ResponseDtos.ProductCategory.List,
        requestDto?: RequestDtos.ProductCategory.List) => ProductCategoryListModel;
    getCreateRoute(): RouteLocationRaw;
    getUpdateRoute(id: number): RouteLocationRaw;
}

// interface Props<TModel extends BrandListModel | ProductCategoryListModel> {
//     resourceType: string;
//     resourceDisplayName: string;
//     getListAsync(requestDto: Partial<RequestDtos.IPaginatedList>): Promise<TModel>;
//     reloadListAsync(model: Reactive<TModel>): Promise<void>
//     getCreatingPermissionAsync(): Promise<boolean>;
//     getCreateRoute(): RouteLocationRaw;
//     getUpdateRoute(id: number): RouteLocationRaw;
// }
</script>

<script setup lang="ts" generic="TKey extends keyof PropsTypeMapping">
import { ref, reactive, computed, onMounted, type Reactive } from "vue";
import type { RouteLocationRaw } from "vue-router";
import type { useBrandService } from "@/services/brandService";
import type { useProductCategoryService } from "@/services/productCategoryService";
import type { BrandListModel } from "@/models/brandModels";
import type { ProductCategoryListModel } from "@/models/productCategoryModels";
import { useLoadingState } from "@/composables/loadingStateComposable";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Props.
const props = defineProps<BrandProps | ProductCategoryProps>();

// Dependency.
const loadingState = useLoadingState();

// Model and states.
const model = reactive(await initialLoadAsync());
const canCreate = ref<boolean>();

// Computed properties.
const resourceDisplayName = computed<string>(() => {
    return props.resourceType === "Brand" ? "thương hiệu" : "phân loại";
});

const resourceIconClass = computed<string>(() => {
    if (props.resourceType === "Brand") {
        return "bi bi-building";
    }

    return "bi bi-tag-fill";
});

// Life cycle hook.
onMounted(async () => canCreate.value = await props.getCreatingPermissionAsync());

// Functions.
async function initialLoadAsync() {
    const requestDto = { resultsPerPage: 10 };
    const responseDto = await props.service.getListAsync(requestDto);
    return new props.modelConstructor(responseDto);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    await props.reloadListAsync(model);
    loadingState.isLoading = false;
}
</script>

<template>
    <MainBlock :title="resourceDisplayName.toUpperCase()">
        <template #header>
            <RouterLink class="btn btn-primary btn-sm" :to="getCreateRoute()" v-if="canCreate">
                <i class="bi bi-plus-lg"></i>
            </RouterLink>
        </template>
        <template #body>
            <ul class="list-group list-group-flush" v-if="model.items">
                <li class="list-group-item bg-transparent ps-3 p-2 d-flex
                            justify-content-start align-items-center"
                        v-for="item in model.items" :key="item.id">
                    <i :class="resourceIconClass" class="me-3"></i>

                    <!-- Name -->
                    <div class="flex-fill fw-bold">{{ item.name }}</div>

                    <!-- Edit button -->
                    <RouterLink class="btn btn-outline-primary btn-sm"
                            :to="getUpdateRoute(item.id)" v-if="item.authorization?.canEdit">
                        <i class="bi bi-pencil-square"></i>
                    </RouterLink>
                </li>
            </ul>
            <div class="d-flex justify-content-center align-items-center p-3" v-else>
                <span class="opacity-50">Không có {{ resourceDisplayName }}</span>
            </div>
        </template>
    </MainBlock>
</template>