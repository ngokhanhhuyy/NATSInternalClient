<script setup lang="ts">
// Interface and type.
interface Props {
    type: "Brand" | "ProductCategory";
}

// Imports.
import { reactive, computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useBrandService } from "@/services/brandService";
import { useProductCategoryService } from "@/services/productCategoryService";
import { BrandListModel } from "@/models/brandModels";
import { ProductCategoryListModel } from "@/models/productCategoryModels";

// Props.
const props = defineProps<Props>();

// Dependencies.
const brandService = useBrandService();
const productCategoryService = useProductCategoryService();

// Model and states.
const model = reactive(await initialLoadAsync());

// Computed properties.
const resourceDisplayName = computed<string>(() => {
    return props.type === "Brand" ? "thương hiệu" : "phân loại";
});

const resourceIconClass = computed<string>(() => {
    if (props.type === "Brand") {
        return "bi bi-building";
    }

    return "bi bi-tag-fill";
});

// Functions.
async function initialLoadAsync(): Promise<BrandListModel | ProductCategoryListModel> {
    if (props.type === "Brand") {
        const responseDto = await brandService.getListAsync();
        return new BrandListModel(responseDto);
    } else {
        const responseDto = await productCategoryService.getListAsync();
        return new ProductCategoryListModel(responseDto);
    }
}

function getCreateRoute(): RouteLocationRaw {
    if (props.type === "Brand") {
        return { name: "brandCreate" };
    }

    return { name: "productCategoryCreate" };
}

function getUpdateRoute(resource: IUpsertableBasicModel): RouteLocationRaw {
    if (props.type === "Brand") {
        return { name: "brandUpdate", params: { brandId: resource.id } };
    }

    return { name: "productCategoryUpdate", params: { productCategoryId: resource.id } };
}
</script>

<template>
    <div class="block block-product-category-list bg-white rounded-3 p-0">
        <div class="block-header bg-primary-subtle border border-primary-subtle rounded-top-3
                    ps-3 p-2 d-flex justify-content-between align-items-center">
            <span class="text-primary fw-bold small py-1">
                {{ resourceDisplayName.toUpperCase() }}
            </span>
            <RouterLink class="btn btn-primary btn-sm" :to="getCreateRoute()"
                    v-if="model.authorization?.canCreate">
                <i class="bi bi-plus-lg"></i>
            </RouterLink>
        </div>

        <!-- Body -->
        <div class="block-body border border-top-0 rounded-bottom-3 overflow-hidden">
            <ul class="list-group list-group-flush" v-if="model.items">
                <li class="list-group-item d-flex justify-content-start
                            align-items-center ps-3 p-2"
                        v-for="item in model.items" :key="item.id">
                    <i :class="resourceIconClass" class="me-3"></i>

                    <!-- Name -->
                    <div class="flex-fill fw-bold">{{ item.name }}</div>

                    <!-- Edit button -->
                    <RouterLink class="btn btn-outline-primary btn-sm"
                            :to="getUpdateRoute(item)" v-if="item.authorization?.canEdit">
                        <i class="bi bi-pencil-square"></i>
                    </RouterLink>
                </li>
            </ul>
            <div class="d-flex justify-content-center align-items-center p-3" v-else>
                <span class="opacity-50">Không có {{ resourceDisplayName }}</span>
            </div>
        </div>
    </div>
</template>