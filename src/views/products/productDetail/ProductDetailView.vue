<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, useRouter, type RouteLocationRaw } from "vue-router";
import { useProductService } from "@/services/productService";
import { useSupplyService } from "@/services/supplyService";
import { useAlertModalStore } from "@/stores/alertModal";
import { ProductDetailModel } from "@/models";
import { useViewStates } from "@/composables/viewStatesComposable";

// Form components.
import { SelectInput } from "@/components/formInputs";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Dependencies.
const route = useRoute();
const router = useRouter();
const alertModalStore = useAlertModalStore();
const productService = useProductService();
const supplyService = useSupplyService();

// Internal states.
const model = await initializeModelAsync();
const suppliesAndExports = reactive({
    supplyResultCount: 5,
    orderResultCount: 5,
    treatmentResultCount: 5
});
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
async function initializeModelAsync(): Promise<ProductDetailModel> {
    // Determine product id.
    const productId = parseInt(route.params.productId as string);
    // Fetch data.
    let productResponseDto, supplyListResponseDto;
    [productResponseDto, supplyListResponseDto] = await Promise.all([
        productService.getDetailAsync(productId),
        supplyService.getListAsync(5)
    ]);
    // Generate supply list.
    const supplyListModel = new SupplyListModel(supplyListResponseDto);
    supplyListModel.resultsPerPage = 5;
    return reactive(new ProductDetailModel(productResponseDto, supplyListModel));
}

async function deleteProductAsync() {
    const shouldDelete = await alertModalStore.getDeleteConfirmationAsync();
    if (shouldDelete) {
        await productService.deleteAsync(model.id);
        await alertModalStore.getSubmitSuccessConfirmationAsync();
        await router.push({ name: "productList" });
    }
}

function getSupplyDetailRoute(supplyId: number): RouteLocationRaw {
    return { name: "supplyDetail", params: { supplyId: supplyId } };
}

</script>

<template>
    <MainContainer>
        <div class="row g-3">
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
                                    :to="productUpdateRoute">
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

            <!-- Supplies and exports -->
            <div class="col col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <div class="d-flex flex-column">
                    <!-- Supplies -->
                    <MainBlock title="NHẬP HÀNG GẦN NHẤT" class="block-supply-list mb-3"
                            body-padding="0">
                        <!-- Supplies header -->
                        <template #header>
                            <SelectInput class="form-select-sm w-auto"
                                    v-model="model.lastestSupplies.resultsPerPage">
                                <option value="5" selected>5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </SelectInput>
                        </template>
                        <!-- Supply body -->
                        <template #body>
                            <!-- Result list -->
                            <ul class="list-group list-group-flush"
                                    v-if="model.lastestSupplies.items.length">
                                <li class="list-group-item bg-transparent d-flex small
                                            align-items-center justify-content-between"
                                        :key="supply.id"
                                        v-for="supply in model.lastestSupplies.items">
                                    <!-- Id -->
                                    <span class="bg-primary-subtle rounded border
                                                border-primary-subtle text-primary px-2">
                                        #{{ supply.id }}
                                    </span>

                                    <!-- PaidDate -->
                                    <div class="d-sm-flex d-none mx-2">
                                        <i class="bi bi-calendar-week text-primary me-2"></i>
                                        <span>{{ supply.paidDate }}</span>
                                    </div>
                                    
                                    <!-- PaidDate -->
                                    <div class="d-sm-flex d-none mx-2">
                                        <i class="bi bi-clock text-primary me-2"></i>
                                        <span>{{ supply.paidTime }}</span>
                                    </div>

                                    <!-- PaidDateTime -->
                                    <div class="d-sm-none d-flex mx-2">
                                        <i class="bi bi-clock text-primary me-2"></i>
                                        <span>{{ supply.paidDateTime }}</span>
                                    </div>

                                    <!-- Link to detail -->
                                    <RouterLink class="btn btn-outline-primary btn-sm"
                                            :to="getSupplyDetailRoute(supply.id)">
                                        <i class="bi bi-eye"></i>
                                    </RouterLink>
                                </li>
                            </ul>

                            <!-- Fallback -->
                            <div class="d-flex justify-content-center align-items-center
                                        p-4 opacity-50" v-else>
                                Chưa có đơn nhập hàng nào chứa sản phẩm nào
                            </div>
                        </template>
                    </MainBlock>

                    <!-- Most recent orders -->

                    <!-- Most recent treatments -->
                    <MainBlock title="LIỆU TRÌNH GẦN NHẤT" color="danger"
                            class="block-treatment-list"  body-padding="4">
                        <template #header>
                            <SelectInput class="form-select-sm w-auto"
                                v-model="suppliesAndExports.treatmentResultCount">
                                <option value="5" selected>5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </SelectInput>
                        </template>
                        <template #body>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item bg-transparent d-flex
                                            align-items-center justify-content-center">
                                    <span class="text-danger-emphasis opacity-50">
                                        Không có liệu trình nào chứa sản phẩm này
                                    </span>
                                </li>
                            </ul>
                        </template>
                    </MainBlock>
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