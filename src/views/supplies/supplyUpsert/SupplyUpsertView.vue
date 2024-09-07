<script setup lang="ts">
// Interfaces and types.
interface Props { isForCreating: boolean };
type InitialLoadResult = [
    SupplyUpsertModel,
    ProductListModel,
    BrandListModel,
    ProductCategoryListModel
];
// Imports.
import { ref, reactive, watch, onMounted, provide } from "vue";
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
    FormLabel, TextInput, DateTimeInput, MoneyInput, ValidationMessage,
    SubmitButton } from "@/components/formInputs";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Child components.
import ProductPicker from "./ProductPickerComponent.vue";
import SupplyItemList from "./SupplyItemListComponent.vue";
import SupplyItemInputModal from "./SupplyItemInputModalComponent.vue";

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
const supplyItemInputModal = ref<InstanceType<typeof SupplyItemInputModal>>(null!);
const isInitialLoad = ref<boolean>(true);

// Life cycle hooks.
onMounted(() => isInitialLoad.value = false);

// Provide.
provide("isInitialLoad", isInitialLoad);

// Watches.
watch(
    () => [
        productListModel.productName,
        productListModel.categoryName,
        productListModel.brandId,
    ], async () => {
        productListModel.page = 1;
        reloadProductListAsync();
    });
watch(() => productListModel.page, reloadProductListAsync);

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
    loadingState.isLoading = true;
    const responseDto = await productService.getListAsync(productListModel.toRequestDto());
    productListModel.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        upsertModel.id = await supplyService.createAsync(upsertModel.toRequestDto());
    } else {
        await supplyService.updateAsync(upsertModel.id, upsertModel.toRequestDto());
    }
}

async function onSubmissionSucceeded(): Promise<void> {
    await router.push({ name: "supplyDetail", params: { supplyId: upsertModel.id } });
}

function onProductPicked(product: ProductBasicModel): void {
    const item = upsertModel.items.find(i => i.product.id === product.id);
    if (item) {
        item.suppliedQuantity += 1;
    } else {
        const supplyItem = new SupplyItemModel(product);
        upsertModel.items.push(supplyItem);
    }
}

function onProductIncremented(product: ProductBasicModel): void {
    const item = upsertModel.items.find(i => i.product.id === product.id)!;
    item.suppliedQuantity += 1;
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-center">
            <div class="col col-lg-6 col-12 mb-3">
                <div class="row g-0">
                    <div class="col col-12 p-0 order-lg-first order-last mt-lg-0 mt-3 mb-lg-3 mb-0">
                        <!-- Product picker -->
                        <ProductPicker v-model="productListModel" :brand-options="brandOptions"
                                :category-options="categoryOptions"
                                :added-supply-items="upsertModel.items"
                                @picked="onProductPicked" @incremented="onProductIncremented" />
                    </div>
                    <div class="col col-12 p-0">
                        <!-- Supply detail -->
                        <MainBlock title="Thông tin đơn nhập hàng" :body-padding="[2, 2, 3, 2]" >
                            <template #body>
                                <div class="row g-3">
                                    <!-- SuppliedDateTime-->
                                    <div class="col col-12">
                                        <FormLabel name="Ngày giờ nhập hàng" required />
                                        <DateTimeInput property-path="suppliedDateTime"
                                                v-model="upsertModel.paidDateTime" />
                                        <ValidationMessage property-path="suppliedDateTime" />
                                    </div>
                                    
                                    <!-- ShipmentFee-->
                                    <div class="col col-12 mt-3">
                                        <FormLabel name="Phí vận chuyển" />
                                        <MoneyInput property-path="shipmentFee" suffix=" vnđ"
                                                v-model="upsertModel.shipmentFee" />
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
                </div>
            </div>

            <div class="col col-lg-6 col-12 h-100">
                <!-- Supply items -->
                <SupplyItemList v-model="upsertModel.items" />

                <!-- Submit button -->
                <div class="d-flex justify-content-end mt-3">
                    <SubmitButton :callback="submitAsync" class="flex-grow-0 flex-shrink-0"
                            :disabled="!upsertModel.items.length"
                            @submission-suceeded="onSubmissionSucceeded" />
                </div>
            </div>
        </div>
    <SupplyItemInputModal ref="supplyItemInputModal" />
    </MainContainer>
</template>

<style scoped>
textarea {
    min-height: 130px;
}
</style>