<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, useRouter, type RouteLocationRaw } from "vue-router";
import { useProductService } from "@/services/productService";
import { useAlertModalStore } from "@/stores/alertModal";
import { ProductDetailModel } from "@/models";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Child components.
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";
import RecentSupplyList from "./RecentSupplyListComponent.vue";
import RecentOrderList from "./RecentOrderListComponent.vue";
import RecentTreatmentList from "./RecentTreatmentListComponent.vue";

// Dependencies.
const route = useRoute();
const router = useRouter();
const alertModalStore = useAlertModalStore();
const productService = useProductService();

// Internal states.
const model = await intialLoadAsync();
useViewStates();
const labelColumnClassName = "col col-md-12 col-sm-4 col-12";
const fieldColumnClassName = "col col-md-12 col-sm-8 col-12";

// Computed properties.
const productUpdateRoute = computed<RouteLocationRaw>(() => {
    return {
        name: "productUpdate",
        params: {
            productId: model.id
        }
    };
});

const productPriceText = computed<string>(() => model.price
    .toLocaleString()
    .replaceAll(",", " ") + "đồng");

// Functions.
async function intialLoadAsync(): Promise<ProductDetailModel> {
    // Determine product id.
    const productId = parseInt(route.params.productId as string);
    // Fetch data.
    const responseDto = await productService.getDetailAsync(productId);
    return reactive(new ProductDetailModel(responseDto));
}

async function deleteProductAsync() {
    const shouldDelete = await alertModalStore.getDeleteConfirmationAsync();
    if (shouldDelete) {
        await productService.deleteAsync(model.id);
        await alertModalStore.getSubmitSuccessConfirmationAsync();
        await router.push({ name: "productList" });
    }
}
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <!-- Resource Access -->
            <div class="col col-12 mb-3">
                <ResourceAccess resource-type="Product" :resource-primary-id="model.id"
                        access-mode="Detail" />
            </div>

            <!-- Product Detail -->
            <div class="col col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 mb-md-0 mb-sm-3 mb-3">
                <MainBlock title="Chi tiết sản phẩm" close-button>
                    <template #body>
                        <!-- Thumbnail -->
                        <div class="row justify-content-center">
                            <div class="col col-md-12 col-sm-8 col-10 p-0">
                                <img :src="model.thumbnailUrl" class="img-thumbnail">
                            </div>
                        </div>

                        <!-- Name -->
                        <div class="fw-bold fs-5 d-flex justify-content-center
                                    text-center my-2">
                            {{ model.name }}
                        </div>

                        <!-- Action buttons -->
                        <div class="actions-buttons d-flex justify-content-center
                                    align-items-center">
                            <!-- Edit button -->
                            <RouterLink class="btn btn-outline-primary btn-sm me-2"
                                    v-if="model.authorization.canEdit"
                                    :to="productUpdateRoute">
                                <i class="bi bi-pencil-square"></i>
                                <span class="ms-1">Chỉnh sửa</span>
                            </RouterLink>

                            <!-- Delete button -->
                            <button class="btn btn-outline-danger btn-sm"
                                    v-if="model.authorization.canDelete"
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
                                    {{ productPriceText }}
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

                        <!-- StockingQuantity -->
                        <div class="row mt-3">
                            <div :class="labelColumnClassName">
                                <span class="text-primary">Số lượng trong kho</span>
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>
                                    {{ model.stockingQuantity }} {{ model.unit }}
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
                    </template>
                </MainBlock>
            </div>

            <!-- Recent supply, orders and treatments -->
            <div class="col col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <div class="d-flex flex-column">
                    <!-- Most recent supplies -->
                    <RecentSupplyList parent-resource-type="Product"
                            :parent-resource-id="model.id" />

                    <!-- Most recent orders -->
                    <RecentOrderList parent-resource-type="Product"
                            :parent-resource-id="model.id" />

                    <!-- Most recent treatments -->
                    <RecentTreatmentList parent-resource-type="Product"
                            :parent-resource-id="model.id" />
                </div>
            </div>
        </div>
    </MainContainer>
</template>