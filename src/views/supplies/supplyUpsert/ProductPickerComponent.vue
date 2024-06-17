<script setup lang="ts">
// Interfaces.
interface Props {
    brandOptions: BrandListModel;
    categoryOptions: ProductCategoryListModel;
}

interface Emits {
    (event: "picked", product: ProductBasicModel): void
}

// Imports.
import { computed, inject } from "vue";
import type { LoadingState } from "@/composables/viewStatesComposable";
import {
    ProductListModel, BrandListModel, ProductBasicModel,
    ProductCategoryListModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import { FormLabel, TextInput, SelectInput } from "@/components/formInputs";

// Props and emtis
defineProps<Props>();
const emit = defineEmits<Emits>();

// Model and states.
const model = defineModel<ProductListModel>({ required: true });
const loadingState = inject<LoadingState>("loadingState")!;

// Computed properties.
const backButtonDisabled = computed<boolean>(() => model.value.page === 1);
const backButtonClass = computed<string | null>(() => {
    return backButtonDisabled.value ? "opacity-25" : null;
});

const nextButtonDisabled = computed<boolean>(() => model.value.page === model.value.pageCount);
const nextButtonClass = computed<string | null>(() => {
    return nextButtonDisabled.value ? "opacity-25" : null;
});
</script>

<template>
    <MainBlock title="Sản phẩm" :body-padding="[2, 2, 3, 2]" body-class="row g-3">
        <template #body>
            <!-- Product name search -->
            <div class="col col-12">
                <FormLabel name="Tìm kiếm sản phẩm" />
                <TextInput v-model="model.productName"
                        placeholder="Tìm kiếm theo tên ..." />
            </div>

            <!-- Category options -->
            <div class="col col-6 mt-3">
                <FormLabel name="Phân loại" />
                <SelectInput v-model="model.categoryName">
                    <option :value="null">Tất cả phân loại</option>
                    <option :value="category.name" :key="category.id"
                            v-for="category in categoryOptions.items">
                        {{ category.name }}
                    </option>
                </SelectInput>
            </div>

            <!-- Brand options -->
            <div class="col col-6 mt-3">
                <FormLabel name="Thương hiệu" />
                <SelectInput v-model="model.categoryName">
                    <option :value="null">Tất cả thương hiệu</option>
                    <option :value="brand.id" :key="brand.id"
                            v-for="brand in brandOptions.items">
                        {{ brand.name }}
                    </option>
                </SelectInput>
            </div>

            <!-- Product results -->
            <div class="col col-12 mt-3">
                <!-- Pagination -->
                <div class="d-flex justify-content-center align-items-center pagination">
                    <!-- Back button -->
                    <button class="btn btn-outline-primary btn-sm" :class="backButtonClass"
                            :disabled="backButtonDisabled" @click="model.page -= 1">
                        <i class="bi bi-chevron-left"></i>
                    </button>

                    <!-- Page number -->
                    <div class="border rounded px-3 py-1 mx-2 small">
                        Trang {{ model.page }}/{{ model.pageCount }}
                    </div>

                    <!-- Next button -->
                    <button class="btn btn-outline-primary btn-sm" :class="nextButtonClass"
                            :disabled="nextButtonDisabled" @click="model.page += 1">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </div>

                <!-- Results list -->
                <Transition name="fade">
                    <div v-if="!loadingState.isLoading">
                        <ul class="list-group mt-2" v-if="model.items.length">
                            <li class="list-group-item p-2 d-flex align-items-center"
                                    :key="product.id" v-for="product in model.items">
                                <!-- Thumbnail -->
                                <img :src="product.thumbnailUrl"
                                        class="img-thumbnail product-thumbnail me-2" />

                                <!-- Detail -->
                                <div class="d-flex flex-column flex-fill product-detail">
                                    <span class="small fw-bold">{{ product.name }}</span>
                                    <span class="small">
                                        {{ product.stockingQuantity }} {{ product.unit }}
                                    </span>
                                </div>

                                <!-- Pick button -->
                                <button class="btn btn-outline-primary btn-sm
                                                flex-shrink-0 ms-2 me-1"
                                        @click='emit("picked", product)'>
                                    <i class="bi bi-check2"></i>
                                </button>
                            </li>
                        </ul>

                        <!-- Fallback -->
                        <div class="border rounded p-4 d-flex mt-2
                                    justify-content-center align-items-center"
                                v-else>
                            Không tìm thấy sản phẩm
                        </div>
                    </div>
                </Transition>
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.img-thumbnail.product-thumbnail {
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: 50% 50%;
}

.product-detail {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>