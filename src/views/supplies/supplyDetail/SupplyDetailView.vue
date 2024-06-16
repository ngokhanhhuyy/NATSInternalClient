<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { SupplyDetailModel } from "@/models";
import { useSupplyService } from "@/services/supplyService";
import { NotFoundError } from "@/services/exceptions";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import { FormLabel } from "@/components/formInputs";

// Dependencies.
const route = useRoute();
const supplyService = useSupplyService();

// Model and internal state.
const model = await initialLoadAsync();
useViewStates();

// Functions.
async function initialLoadAsync(): Promise<SupplyDetailModel> {
    const supplyId = parseInt(route.params.supplyId as string);
    try {
        const responseDto = await supplyService.getDetailAsync(supplyId);
        return reactive(new SupplyDetailModel(responseDto));
    } catch (error) {
        throw new NotFoundError({ name: "supplyList" });
    }

}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-center">
            <!-- Supply detail -->
            <div class="col col-md-6 col-sm-12 col-12 mb-md-0 mb-sm-3 mb-3">
                <!-- Filter -->
                <MainBlock title="Chi tiết nhập hàng" close-button>
                    <template #body>
                        <!-- Supplied Date-->
                        <div class="row g-3">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Ngày nhập" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span>{{ model.suppliedDate }}</span>
                            </div>
                        </div>

                        <!-- Supplied Time -->
                        <div class="row g-3 mt-3">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Giờ nhập" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span>{{ model.suppliedTime }}</span>
                            </div>
                        </div>

                        <!-- Shipment fee -->
                        <div class="row g-3 mt-3">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Phí vận chuyển" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span>{{ model.shipmentFee }}đ</span>
                            </div>
                        </div>

                        <!-- Total amount -->
                        <div class="row g-3 mt-3">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Tổng giá tiền" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span>{{ model.totalAmount.toLocaleString() }}đ</span>
                            </div>
                        </div>

                        <!-- Note -->
                        <div class="row g-3 mt-3" v-if="model.note">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Ghi chú" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span>{{ model.note }}</span>
                            </div>
                        </div>

                        <!-- IsClosed -->
                        <div class="row g-3 mt-3" v-if="model.note">
                            <div class="col col-xl-4 col-lg-5 col-md-12 col-sm-4 col-12">
                                <FormLabel name="Tình trạng" />
                            </div>
                            <div class="col col-xl-8 col-lg-7 col-md-12 col-sm-8 col-12">
                                <span :class='model.isClosed ? "text-danger" : "text-success"'>
                                    {{ model.isClosed ? "Đã khoá" : "Chưa khoá" }}
                                </span>
                            </div>
                        </div>

                        <!-- Photos -->
                        <div class="row g-3 mt-3 justify-content-center">
                            <div class="col col-12 mb-2">
                                <FormLabel name="Hình ảnh" />
                            </div>
                            <div class="col col-auto mb-2" v-for="index in 10" :key="index">
                                <img :src="model.items[0].product.thumbnailUrl"
                                        class="img-thumbnail supply-photo" />
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Supply items -->
            <div class="col col-md-6 col-sm-12 col-12">
                <!-- Filter -->
                <MainBlock title="Danh sách sản phẩm" body-class="overflow-hidden"
                        body-padding="0">
                    <template #body>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item px-3 py-2 d-flex bg-transparent
                                        justify-content-start align-items-center"
                                    v-for="item in model.items" :key="item.id!">
                                <!-- Thumbnail -->
                                <img :src="item.product.thumbnailUrl"
                                        class="img-thumbnail me-2 product-photo">

                                <!-- Left column -->
                                <div class="d-flex flex-column flex-fill pe-2">
                                    <!-- Product name -->
                                    <span class="fw-bold small">
                                        {{ item.product.name }}
                                    </span>

                                    <!-- Item amount + Supplied quantity -->
                                    <span class="small">
                                        {{ `${item.suppliedQuantity} ${item.product.unit}` }}
                                    </span>
                                </div>

                                
                                <!-- Right column -->
                                <div class="d-flex flex-column flex-fill
                                            justify-content-center align-items-end">
                                    <!-- Amount -->
                                    <span class="small">
                                        {{ `${item.amount.toLocaleString()}đ` }}
                                    </span>

                                    <!-- VAT factor -->
                                        <span class="small">
                                            {{ `${item.vatFactor * 100}%` }}
                                        </span>
                                </div>
                            </li>

                            <!-- Item amount -->
                            <li class="list-group-item bg-transparent d-flex
                                        justify-content-end align-items-center">
                                <span class="fw-bold me-3">Giá sản phẩm:</span>
                                <span class="text-primary">
                                    {{ model.itemAmount.toLocaleString() }}đ
                                </span>
                            </li>
                        </ul>
                    </template>
                </MainBlock>
            </div>

            <!-- Action buttons -->
            <div class="col col-12 d-flex justify-content-end mt-3"
                    v-if="model.authorization.canEdit && model.authorization.canDelete">
                <!-- Delete button -->
                <button class="btn btn-outline-danger me-2"
                        v-if="model.authorization.canEdit">
                    <i class="bi bi-trash me-1"></i>
                    <span>Xoá</span>
                </button>

                <!-- Edit button -->
                <button class="btn btn-primary"
                        v-if="model.authorization.canDelete">
                    <i class="bi bi-pencil-square me-2"></i>
                    <span>Sửa</span>
                </button>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
img.supply-photo, img.product-photo {
    object-fit: cover;
    object-position: 50% 50%;
}

img.supply-photo {
    width: 70px;
    height: 70px;
}

img.product-photo {
    width: 50px;
    height: 50px;
}
</style>