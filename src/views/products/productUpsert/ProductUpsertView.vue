<script lang="ts">
interface Props { isForCreating: boolean };

interface ModelAndOptionsResult {
    model: ProductUpsertModel;
    categoryOptions: ProductCategoryListModel;
    brandOptions: BrandListModel;
}
</script>

<script setup lang="ts">
import { reactive, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductService } from "@/services/productService";
import { useProductCategoryService } from "@/services/productCategoryService";
import { useBrandService } from "@/services/brandService";
import { ProductUpsertModel } from "@/models";
import { ProductCategoryListModel } from "@/models";
import { BrandListModel } from "@/models";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import MainContainer from "@/views/layouts/MainContainerComponent.vue";

// Async components.
const ImageInput = defineAsyncComponent(() =>
    import("@/components/formInputs/ImageInputComponent.vue"));
const ValidationMessage = defineAsyncComponent(() =>
    import("@/components/formInputs/ValidationMessage.vue"));
const SubmitButton = defineAsyncComponent(() =>
    import("@/components/formInputs/SubmitButtonComponent.vue"));

// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();
const router = useRouter();
const productService = useProductService();
const productCategoryService = useProductCategoryService();
const brandService = useBrandService();

// Internal states.
const { model, categoryOptions, brandOptions } = await initializeModelAndOptionsAsync();
const { modelState } = useUpsertViewStates();

// Functions
async function initializeModelAndOptionsAsync(): Promise<ModelAndOptionsResult> {
    const [model, brandOptions, categoryOptions] = await Promise.all([
        initializeModelAsync(),
        loadBrandOptionsAsync(),
        loadCategoryOptionsAsync()
    ]);
    return { model, brandOptions, categoryOptions };
} 

async function initializeModelAsync(): Promise<ProductUpsertModel> {
    if (props.isForCreating) {
        return reactive(new ProductUpsertModel());
    } else {
        const productId = parseInt(route.params.productId as string);
        const responseDto = await productService.getDetailAsync(productId);
        return reactive(new ProductUpsertModel(responseDto));
    }
}

async function loadCategoryOptionsAsync(): Promise<ProductCategoryListModel> {
    const responseDto = await productCategoryService.getListAsync();
    return reactive(new ProductCategoryListModel(responseDto));
}

async function loadBrandOptionsAsync(): Promise<BrandListModel> {
    const responseDto = await brandService.getListAsync();
    return reactive(new BrandListModel(responseDto));
}

async function submitAsync(): Promise<void> {
    if (props.isForCreating) {
        model.id = await productService.createAsync(model.toRequestDto());
    } else {
        await productService.updateAsync(model.id, model.toRequestDto());
    }
}
async function onSubmissionSucceededAsync(): Promise<void> {
    await router.push({ name: "productDetail", params: { productId: model.id }});
}

function onThumbnailFileChange(file: string | null) {
    model.thumbnailFile = file;
    model.thumbnailChanged = true;
}

function onPriceChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
        model.price = parseInt(value);
    } else {
        model.price = 0;
    }
}

function onVatFactorChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
        model.vatFactor = parseInt(value) / 100;
    } else {
        model.vatFactor = 0;
    }
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 my-3 justify-content-end">
            <div class="col col-12 mb-3">
                <div class="block bg-white rounded-3">
                    <div class="block-header bg-primary-subtle border border-primary-subtle
                                rounded-top-3 p-2 ps-3">
                        <span class="text-primary small fw-bold" v-if="isForCreating">
                            TẠO SẢN PHẨM MỚI
                        </span>
                        <span class="text-primary small fw-bold" v-else>
                            CHỈNH SỬA SẢN PHẨM
                        </span>
                    </div>
                    
                    <!-- Body -->
                    <div class="block-body border border-top-0 rounded-bottom-3
                                d-flex flex-column p-2">
                        <div class="row justify-content-center">
                            <div class="col col-md-auto col-sm-12 col-12 pt-3 pb-3
                                        d-flex align-items-start justify-content-center">
                                <ImageInput default-src="/images/default.jpg"
                                        :url="model.thumbnailUrl"
                                        @change="onThumbnailFileChange" />
                            </div>
                            <div class="col ps-md-2 ps-0 pe-0">
                                <div class="row">
                                    <!-- Name -->
                                    <div class="col col-md-7 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <label class="form-label">Tên sản phẩm</label>
                                            <input type="text" class="form-control"
                                                    :class='modelState.inputClass("name")'
                                                    placeholder="Tên sản phẩm"
                                                    maxlength="50" v-model="model.name" />
                                        </div>
                                        <ValidationMessage property-path="name" />
                                    </div>

                                    <!-- Unit -->
                                    <div class="col col-md-5 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <label class="form-label">Đơn vị</label>
                                            <input type="text" class="form-control"
                                                    :class='modelState.inputClass("unit")'
                                                    placeholder="Hộp, chai, ..."
                                                    maxlength="12" v-model="model.unit" />
                                            <ValidationMessage property-path="unit" />
                                        </div>
                                    </div>

                                    <!-- Price -->
                                    <div class="col col-md-6 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <label class="form-label">Giá niêm yết</label>
                                            <div class="input-group">
                                                <input type="number" class="form-control"
                                                        :class='modelState.inputClass("price")'
                                                        placeholder="123 000"
                                                        min="0" :value="model.price"
                                                        @change="onPriceChange" />
                                                <span class="input-group-text border-start-0">đ</span>
                                            </div>
                                            <ValidationMessage property-path="price" />
                                        </div>
                                    </div>

                                    <!-- VatFactor -->
                                    <div class="col col-md-6 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <label class="form-label">Thuế VAT</label>
                                            <div class="input-group">
                                                <input type="number" class="form-control"
                                                        :class='modelState.inputClass("vatFactor")'
                                                        placeholder="10"
                                                        min="0" :value="model.vatFactor * 100"
                                                        @change="onVatFactorChange" />
                                                <span class="input-group-text border-start-0">%</span>
                                            </div>
                                            <ValidationMessage property-path="vatFactor" />
                                        </div>
                                    </div>

                                    <!-- IsForRetail -->
                                    <div class="col col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <label class="form-label">Mục đích sử dụng</label>
                                            <select class="form-select" v-model="model.isForRetail"
                                                    :class='modelState.inputClass("isForRetail")'>
                                                <option :value="false">Chỉ liệu trình</option>
                                                <option :value="true">Cả liệu trình và bán lẻ</option>
                                            </select>
                                            <ValidationMessage property-path="isForRetail" />
                                        </div>
                                    </div>

                                    <!-- IsDiscontinued -->
                                    <div class="col col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <label class="form-label">Tình trạng</label>
                                            <select class="form-select" v-model="model.isDiscontinued"
                                                    :class='modelState.inputClass("isDiscontinued")'>
                                                <option :value="false">Có thể nhập hàng</option>
                                                <option :value="true">Đã ngưng nhập hàng</option>
                                            </select>
                                            <ValidationMessage property-path="isDiscontinued" />
                                        </div>
                                    </div>

                                    <!-- Category -->
                                    <div class="col col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <label class="form-label">Phân loại</label>
                                            <select class="form-select"
                                                    :class='modelState.inputClass("category")'
                                                    v-model="model.category"
                                                    v-if="categoryOptions.items.length">
                                                <option :value="null">Chưa chọn phân loại</option>
                                                <option :value="category"
                                                        v-for="category in categoryOptions.items"
                                                        :key="category.id">
                                                    {{ category.name }}
                                                </option>
                                            </select>
                                        <ValidationMessage property-path="category" />
                                        </div>
                                    </div>

                                    <!-- Brand -->
                                    <div class="col col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <label class="form-label">Thương hiệu</label>
                                            <select class="form-select" v-model="model.brand"
                                                    :class='modelState.inputClass("brand")'>
                                                <option :value="null">Chưa chọn thương hiệu</option>
                                                <option :value="brand" v-for="brand in brandOptions.items"
                                                        :key="brand.id">
                                                    {{ brand.name }}
                                                </option>
                                            </select>
                                        <ValidationMessage property-path="brand" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-12 mb-2 pb-1">
                                <div class="form-group">
                                    <label class="form-label">Mô tả</label>
                                    <textarea class="form-control" placeholder="Mô tả ..."
                                            :class='modelState.inputClass("description")'
                                            maxlength="1000"
                                            v-model="model.description"></textarea>
                                    <ValidationMessage :model-state="modelState"
                                            property-path="description" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Submit buttons-->
            <div class="col col-auto">
                <SubmitButton :callback="submitAsync"
                        @submission-suceeded="onSubmissionSucceededAsync" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>

textarea {
    min-height: 300px;
}
</style>