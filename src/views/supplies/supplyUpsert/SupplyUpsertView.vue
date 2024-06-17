<script setup lang="ts">
// Interfaces and types.
interface Props { isForCreating: boolean };
type InitialLoadResult = [SupplyUpsertModel, ProductListModel, BrandListModel, ProductCategoryListModel];
// Imports.
import { reactive, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSupplyService } from "@/services/supplyService";
import { useProductService } from "@/services/productService";
import { useBrandService } from "@/services/brandService";
import { useProductCategoryService } from "@/services/productCategoryService"; 
import { useAuthorizationService } from "@/services/authorizationService";
import {
    SupplyUpsertModel, SupplyItemModel, ProductListModel, BrandListModel,
    ProductCategoryListModel,  ProductBasicModel} from "@/models";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";
import type { ProductListResponseDto } from "@/services/dtos/responseDtos/productResponseDtos";
import type { ProductCategoryListResponseDto } from "@/services/dtos/responseDtos/productCategoryResponseDtos";
import type { BrandListResponseDto } from "@/services/dtos/responseDtos/brandResponseDtos";

// Form components.
import {
    FormLabel, TextInput, DateTimeInput,
    NumberInput, ValidationMessage } from "@/components/formInputs";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Child components.
import ProductPicker from "./ProductPickerComponent.vue";
import SupplyItemList from "./SupplyItemListComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const supplyService = useSupplyService();
const productService = useProductService();
const brandService = useBrandService();
const productCategoryService = useProductCategoryService();
const authorizationService = useAuthorizationService();

// Model and states.
const [upsertModel, productListModel, brandOptions, categoryOptions] = await initialLoadAsync();
const { loadingState } = useUpsertViewStates();

// Computed properties.
const blockTitle = computed<string>(() => {
    if (props.isForCreating) {
        return "Tạo đơn nhập hàng mới";
    }
    return "Chỉnh sửa đơn nhập hàng";
});

// Watches.
watch(
    () => [
        productListModel.productName,
        productListModel.categoryName,
        productListModel.brandId,
        productListModel.page
    ], reloadProductListAsync);

// Functions.
async function initialLoadAsync(): Promise<InitialLoadResult> {
    let upsertModel: SupplyUpsertModel;
    const productListModel = reactive(new ProductListModel(undefined, undefined, 6));
    let productListResponseDto: ProductListResponseDto;
    let brandListResponseDto: BrandListResponseDto;
    let categoryListResponseDto: ProductCategoryListResponseDto;
    if (props.isForCreating) {
        if (!authorizationService.canCreateSupply()) {
            router.back();
        }
        
        [productListResponseDto, brandListResponseDto, categoryListResponseDto] = await Promise.all([
            productService.getListAsync(productListModel.toRequestDto()),
            brandService.getListAsync(),
            productCategoryService.getListAsync()
        ]);
        upsertModel = reactive(new SupplyUpsertModel());
    } else {
        const supplyId = parseInt(route.params.supplyId as string);
        let detailResponseDto;
        [detailResponseDto, productListResponseDto, brandListResponseDto, categoryListResponseDto] = await Promise
            .all([
                supplyService.getDetailAsync(supplyId),
                productService.getListAsync(productListModel.toRequestDto()),
                brandService.getListAsync(),
                productCategoryService.getListAsync(),
                productService
            ]);
        const responseDto = await supplyService.getDetailAsync(supplyId);
        if (!responseDto.authorization.canEdit) {
            router.back();
        }
        upsertModel = reactive(new SupplyUpsertModel(detailResponseDto));
    }
    const brandOptions = new BrandListModel(brandListResponseDto);
    const categoryOptions = new ProductCategoryListModel(categoryListResponseDto);
    productListModel.mapFromResponseDto(productListResponseDto);
    return [upsertModel, productListModel, brandOptions, categoryOptions];
}

async function reloadProductListAsync(): Promise<void> {
    productListModel.page = 1;
    loadingState.isLoading = true;
    const responseDto = await productService.getListAsync(productListModel.toRequestDto());
    productListModel.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

function onProductPicked(product: ProductBasicModel): void {
    const item = upsertModel.items.find(i => i.product.id === product.id);
    if (item) {
        console.log("increment");
        item.suppliedQuantity += 1;
        console.log(item.suppliedQuantity);
    } else {
        console.log("pushed");
        upsertModel.items.push(new SupplyItemModel(product));
    }
}

function onProductDeleted(product: ProductBasicModel): void {
    const index = upsertModel.items.findIndex(i => i.product.id === product.id)!;
    upsertModel.items.splice(index, 1);
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-center">
            <!-- Supply detail -->
            <div class="col col-lg-6 col-12 mb-3">
                <MainBlock :title="blockTitle" close-button :body-padding="[2, 2, 3, 2]">
                    <template #body>
                        <div class="row g-3">
                            <!-- SuppliedDateTime-->
                            <div class="col col-12">
                                <FormLabel name="Ngày giờ nhập hàng" required />
                                <DateTimeInput property-path="suppliedDateTime"
                                        v-model="upsertModel.suppliedDateTime" />
                                <ValidationMessage property-path="suppliedDateTime" />
                            </div>
                            
                            <!-- ShipmentFee-->
                            <div class="col col-12 mt-3">
                                <FormLabel name="Phí vận chuyển" />
                                <div class="input-group">
                                    <NumberInput type="number" property-path="shipmentFee"
                                            v-model="upsertModel.shipmentFee" />
                                    <span class="input-group-text border-start-0">đ</span>
                                </div>
                                <ValidationMessage property-path="shipmentFee" />
                            </div>

                            <!-- Note -->
                            <div class="col col-12 mt-3">
                                <FormLabel name="Ghi chú" />
                                <TextInput type="textarea" property-path="note"
                                        placeholder="Ghi chú ..."
                                        v-model="upsertModel.note" />
                                <ValidationMessage property-path="note" />
                            </div>

                            <!-- UpdateReason -->
                            <div class="col col-12 mt-3" v-if="!isForCreating">
                                <FormLabel name="Lý do chỉnh sửa" required />
                                <TextInput type="textarea" property-path="updateReason"
                                        placeholder="Lý do chỉnh sửa ..."
                                        v-model="upsertModel.updateReason" />
                                <ValidationMessage property-path="updateReason" />
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Supply photos -->
            <div class="col col-lg-6 col-12 mb-3">
                <MainBlock title="Hình ảnh" class="h-100">
                    <template #body>
                    </template>
                </MainBlock>
            </div>

            <!-- Product picker -->
            <div class="col col-lg-6 col-12">
                <ProductPicker v-model="productListModel" :brand-options="brandOptions"
                        :category-options="categoryOptions"
                        @picked="onProductPicked" />
            </div>

            <!-- Supply items -->
            <div class="col col-lg-6 col-12">
                <SupplyItemList v-model="upsertModel.items" @deleted="onProductDeleted"/>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
textarea {
    min-height: 130px;
}
</style>