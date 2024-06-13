<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductService } from "@/services/productService";
import { useAlertModalStore } from "@/stores/alertModal";
import { ProductDetailModel } from "@/models";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import MainContainer from "@/views/layouts/MainContainerComponent.vue";

// Dependencies.
const route = useRoute();
const router = useRouter();
const alertModalStore = useAlertModalStore();
const productService = useProductService();

// Internal states.
const model = await initializeModelAsync();
useViewStates();
const labelColumnClassName = "col col-md-12 col-sm-4 col-12";
const fieldColumnClassName = "col col-md-12 col-sm-8 col-12";

// Functions.
async function initializeModelAsync(): Promise<ProductDetailModel> {
    const productId = parseInt(route.params.productId as string);
    const responseDto = await productService.getDetailAsync(productId);
    const model = reactive(new ProductDetailModel(responseDto));
    return model;
}

async function deleteProductAsync() {
    const shouldDelete = await alertModalStore.getDeleteConfirmationAsync();
    if (shouldDelete) {
        await productService.deleteAsync(model.id);
        await alertModalStore.getSubmitSuccessConfirmationAsync();
        router.push({ name: "productList" });
    }
}

</script>

<template>
    <MainContainer>
        <div class="row g-3 my-3">
            <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mb-3">
                <div class="block bg-white rounded-3">
                    <div class="block-header bg-primary-subtle border
                                border-primary-subtle rounded-top-3 p-2 ps-3">
                        <span class="text-primary small fw-bold">CHI TIẾT SẢN PHẨM</span>
                    </div>

                    <!-- Initial loading finished -->
                    <div class="block-body bg-white border border-top-0
                                p-3 d-flex flex-column rounded-bottom-3">
                        <!-- Thumbnail -->
                        <div class="row justify-content-center">
                            <div class="col col-md-12 col-sm-8 col-10 p-0">
                                <img :src="model.thumbnailUrl" class="img-thumbnail">
                            </div>
                        </div>

                        <!-- Name -->
                        <div class="fw-bold fs-5 d-flex justify-content-center text-center my-2">
                            {{ model.name }}
                        </div>

                        <!-- Action buttons -->
                        <div class="actions-buttons d-flex justify-content-center
                                    align-items-center">
                            <!-- Edit button -->
                            <RouterLink :to='{ name: "productUpdate", params: { productId: model.id } }'
                                    class="btn btn-outline-primary btn-sm me-2">
                                <i class="bi bi-pencil-square"></i>
                                <span class="ms-1">Chỉnh sửa</span>
                            </RouterLink>

                            <!-- Delete button -->
                            <button class="btn btn-outline-danger btn-sm"
                                    @click="deleteProductAsync">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>

                        <!-- Product detail -->
                        <!-- Unit -->
                        <div class="row mt-3">
                            <div :class="labelColumnClassName">
                                <span class="text-primary">Đơn vị</span>
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>{{ model.unit }}</span>
                            </div>
                        </div>

                        <!-- Price -->
                        <div class="row mt-3">
                            <div :class="labelColumnClassName">
                                <span class="text-primary">Giá niêm yết</span>
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>
                                    {{ (model.price).toLocaleString().replaceAll(",", " ") }} đồng
                                </span>
                            </div>
                        </div>

                        <!-- VatFactor -->
                        <div class="row mt-3">
                            <div :class="labelColumnClassName">
                                <span class="text-primary">Thuế VAT</span>
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>
                                    {{ model.vatFactor * 100 }}%
                                </span>
                            </div>
                        </div>

                        <!-- CreatedDateTime -->
                        <div class="row mt-3">
                            <div :class="labelColumnClassName">
                                <span class="text-primary">Được tạo lúc</span>
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>{{ model.createdDateTime }}</span>
                            </div>
                        </div>

                        <!-- UpdatedDateTime -->
                        <div class="row mt-3" v-if="model.updatedDateTime">
                            <div :class="labelColumnClassName">
                                <span class="text-primary">Được chỉnh sửa lúc</span>
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>{{ model.updatedDateTime }}</span>
                            </div>
                        </div>

                        <!-- Brand -->
                        <div class="row mt-3" v-if="model.brand">
                            <div :class="labelColumnClassName">
                                <span class="text-primary">Thương hiệu</span>
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>{{ model.brand.name }}</span>
                            </div>
                        </div>

                        <!-- Category -->
                        <div class="row mt-3" v-if="model.category">
                            <div :class="labelColumnClassName">
                                <span class="text-primary">Phân loại</span>
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>{{ model.category.name }}</span>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="row mt-3" v-if="model.description">
                            <div :class="labelColumnClassName">
                                <span class="text-primary">Mô tả</span>
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>{{ model.description }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Supplies and exports -->
            <div class="col col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <div class="d-flex flex-column">
                    <!-- Supplies -->
                    <div class="block block-supply-list bg-white rounded-3
                            d-flex flex-column mb-3">
                        <div class="block-header bg-primary-subtle border
                                    border-primary-subtle rounded-top-3 p-2 ps-3
                                    d-flex flex-row justify-content-between
                                    align-items-center">
                            <span class="text-primary small fw-bold">
                                NHẬP HÀNG GẦN NHẤT
                            </span>
                            <select class="form-select form-select-sm w-auto">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div class="block-body border border-top-0 rounded-bottom-3
                                    p-3 flex-fill">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex align-items-center
                                            justify-content-center">
                                    <span class="text-primary-emphasis opacity-50">
                                        Sản phẩm chưa được nhập hàng lần nào
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Most recent orders -->
                    <div class="block block-order-list bg-white rounded-3
                                d-flex flex-column mb-3">
                        <div class="block-header bg-success-subtle border
                                    border-success-subtle rounded-top-3 p-2 ps-3
                                    d-flex flex-row justify-content-between
                                    align-items-center">
                            <span class="text-success small fw-bold">
                                ĐƠN HÀNG GẦN NHẤT
                            </span>
                            <select class="form-select form-select-sm w-auto">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div class="block-body border border-top-0 rounded-bottom-3
                                    p-3 flex-fill">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex align-items-center
                                            justify-content-center">
                                    <span class="text-success-emphasis opacity-50">
                                        Không có đơn hàng nào chứa sản phẩm này
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Most recent treatments -->
                    <div class="block block-treatment-list bg-white rounded-3
                                d-flex flex-column">
                        <div class="block-header bg-danger-subtle border
                                    border-danger-subtle rounded-top-3 p-2 ps-3
                                    d-flex flex-row justify-content-between
                                    align-items-center">
                            <span class="text-danger small fw-bold">
                                LIỆU TRÌNH GẦN NHẤT
                            </span>
                            <select class="form-select form-select-sm w-auto">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div class="block-body border border-top-0 rounded-bottom-3
                                    p-3 flex-fill">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex align-items-center
                                            justify-content-center">
                                    <span class="text-danger-emphasis opacity-50">
                                        Không có liệu trình nào chứa sản phẩm này
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
.block.block-supply-list .block-header select.form-select:not(:focus) {
    border-color: var(--bs-primary-border-subtle) !important;
}

.block.block-order-list .block-header select.form-select:not(:focus) {
    border-color: var(--bs-success-border-subtle) !important;
}

.block.block-order-list .block-header select.form-select:focus {
    border-color: var(--bs-success) !important;
    box-shadow: 0 0 0 0.2rem rgba(var(--bs-success-rgb), 0.25) !important;
}

.block.block-treatment-list .block-header select.form-select:not(:focus) {
    border-color: var(--bs-danger-border-subtle) !important;
}

.block.block-treatment-list .block-header select.form-select:focus {
    border-color: var(--bs-danger) !important;
    box-shadow: 0 0 0 0.2rem rgba(var(--bs-danger-rgb), 0.25) !important;
}
</style>