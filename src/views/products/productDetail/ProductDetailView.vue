<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductService } from "@/services/productService";
import { useSupplyService } from "@/services/supplyService";
import { useOrderService } from "@/services/orderService";
import { useTreatmentService } from "@/services/treatmentService";
import { useAlertModalStore } from "@/stores/alertModal";
import { ProductDetailModel } from "@/models/productModels";
import { SupplyBasicModel } from "@/models/supplyModels";
import { OrderBasicModel } from "@/models/orderModels";
import { TreatmentBasicModel } from "@/models/treatmentModels";
import { useViewStates } from "@/composables/viewStatesComposable";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";

// Child components.
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";
import 
    RecentProductEngageableList,
    { type Props } from "./RecentProductEngageableListComponent.vue";

// Dependencies.
const route = useRoute();
const router = useRouter();
const alertModalStore = useAlertModalStore();
const productService = useProductService();
const supplyService = useSupplyService();
const orderService = useOrderService();
const treatmentService = useTreatmentService();
const amountUtility = useAmountUtility();

// Internal states.
const model = await intialLoadAsync();
useViewStates();
const labelColumnClassName = "col col-md-12 col-sm-4 col-12 fw-bold";
const fieldColumnClassName = "col col-md-12 col-sm-8 col-12 text-primary";

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

// Props for child components.
const supplyProps: Props = {
    resourceType: "supply",
    blockColor: "primary",
    async loadAsync(resultsPerPage) {
        const responseDto = await supplyService.getListAsync({
            productId: model.id,
            resultsPerPage: resultsPerPage
        });
        return responseDto.items?.map(dto => new SupplyBasicModel(dto));
    },
};

const orderProps: Props = {
    resourceType: "order",
    blockColor: "success",
    async loadAsync(resultsPerPage) {
        const responseDto = await orderService.getListAsync({
            productId: model.id,
            resultsPerPage: resultsPerPage
        });
        return responseDto.items?.map(dto => new OrderBasicModel(dto));
    },
};
const treatmentProps: Props = {
    resourceType: "treatment",
    blockColor: "danger",
    async loadAsync(resultsPerPage) {
        const responseDto = await treatmentService.getListAsync({
            productId: model.id,
            resultsPerPage: resultsPerPage
        });
        return responseDto.items?.map(dto => new TreatmentBasicModel(dto));
    },
};
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <!-- Resource Access -->
            <div class="col col-12">
                <ResourceAccess resource-type="Product" :resource-primary-id="model.id"
                        access-mode="Detail" />
            </div>

            <!-- Product Detail -->
            <div class="col col-xl-4 col-lg-5 col-md-5 col-sm-12 col-12 mb-md-0 mb-sm-3">
                <MainBlock title="Chi tiết sản phẩm" close-button>
                    <template #body>
                        <!-- Thumbnail -->
                        <div class="row justify-content-center">
                            <div class="col col-md-12 col-sm-8 col-10 p-3">
                                <img :src="model.thumbnailUrl" class="img-thumbnail">
                            </div>
                        </div>

                        <!-- Name -->
                        <div class="fw-bold fs-5 d-flex justify-content-center text-center">
                            {{ model.name }}
                        </div>

                        <!-- Action buttons -->
                        <div class="actions-buttons d-flex justify-content-center
                                    align-items-center">
                            <!-- Edit button -->
                            <RouterLink class="btn btn-outline-primary btn-sm me-2"
                                    v-if="model.authorization.canEdit"
                                    :to="model.updateRoute">
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
                                Đơn vị
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>{{ model.unit }}</span>
                            </div>
                        </div>

                        <!-- Price -->
                        <div class="row mt-3">
                            <div :class="labelColumnClassName">
                                Giá niêm yết
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>
                                    {{ amountUtility.getDisplayText(model.defaultPrice) }}
                                </span>
                            </div>
                        </div>

                        <!-- VatFactor -->
                        <div class="row mt-3">
                            <div :class="labelColumnClassName">
                                Thuế VAT
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>
                                    {{ model.defaultVatPercentage * 100 }}%
                                </span>
                            </div>
                        </div>

                        <!-- StockingQuantity -->
                        <div class="row mt-3">
                            <div :class="labelColumnClassName">
                                Số lượng trong kho
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
                                Được tạo lúc
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>{{ model.createdDateTime.dateTime }}</span>
                            </div>
                        </div>

                        <!-- UpdatedDateTime -->
                        <div class="row mt-3" v-if="model.updatedDateTime">
                            <div :class="labelColumnClassName">
                                Được chỉnh sửa lúc
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>{{ model.updatedDateTime.dateTime }}</span>
                            </div>
                        </div>

                        <!-- Brand -->
                        <div class="row mt-3" v-if="model.brand">
                            <div :class="labelColumnClassName">
                                Thương hiệu
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>{{ model.brand.name }}</span>
                            </div>
                        </div>

                        <!-- Category -->
                        <div class="row mt-3" v-if="model.category">
                            <div :class="labelColumnClassName">
                                Phân loại
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>{{ model.category.name }}</span>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="row mt-3" v-if="model.description">
                            <div :class="labelColumnClassName">
                                Mô tả
                            </div>
                            <div :class="fieldColumnClassName">
                                <span>{{ model.description }}</span>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Recent supply, orders and treatments -->
            <div class="col">
                <div class="d-flex flex-column">
                    <!-- Most recent supplies -->
                    <RecentProductEngageableList v-bind="supplyProps" />

                    <!-- Most recent orders -->
                    <RecentProductEngageableList v-bind="orderProps" />

                    <!-- Most recent treatments -->
                    <RecentProductEngageableList v-bind="treatmentProps" />
                </div>
            </div>
        </div>
    </MainContainer>
</template>