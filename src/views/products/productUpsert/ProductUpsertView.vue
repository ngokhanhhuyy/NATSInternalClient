<script lang="ts">
interface Props { isForCreating: boolean }

interface ModelAndOptionsResult {
    model: ProductUpsertModel;
    categoryOptions: ProductCategoryListModel;
    brandOptions: BrandListModel;
}
</script>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductService } from "@/services/productService";
import { useProductCategoryService } from "@/services/productCategoryService";
import { useBrandService } from "@/services/brandService";
import { ProductUpsertModel } from "@/models";
import { ProductCategoryListModel } from "@/models";
import { BrandListModel } from "@/models";
import { useUpsertViewStates } from "@/composables/upsertViewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, ImageInput, TextInput, NumberInput, SelectInput,
    SubmitButton, ValidationMessage } from "@/components/formInputs";

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

// Computed properties.
const blockTitle = computed<string>(() => {
    if (props.isForCreating) {
        return "Tạo sản phẩm mới";
    }
    return "Chỉnh sửa sản phẩm";
});

const computedVatFactor = computed<number>({
    get() {
        return model.vatFactor * 100;
    },

    set(value: number) {
        model.vatFactor = value / 100;
    }
});

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
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <div class="col col-12 mb-3">
                <MainBlock :title="blockTitle" body-padding="2" close-button>
                    <template #body>
                        <div class="row justify-content-center">
                            <div class="col col-md-auto col-sm-12 col-12 pt-3 pb-3 d-flex
                                        flex-column align-items-center justify-content-start">
                                <ImageInput property-path="thumbnailFile"
                                        default-src="/images/default.jpg" :url="model.thumbnailUrl"
                                        @change="onThumbnailFileChange" />
                                <ValidationMessage property-path="thumbnailFile" />
                            </div>
                            <div class="col ps-md-2 ps-0 pe-0">
                                <div class="row g-3">
                                    <!-- Name -->
                                    <div class="col col-md-7 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <FormLabel name="Tên sản phẩm" />
                                            <TextInput property-path="name" maxlength="50"
                                                    placeholder="Tên sản phẩm" v-model="model.name" />
                                            <ValidationMessage property-path="name" />
                                        </div>
                                    </div>

                                    <!-- Unit -->
                                    <div class="col col-md-5 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <FormLabel name="Đơn vị" />
                                            <TextInput property-path="unit" maxlength="12"
                                                    placeholder="Hộp, chai, ..." v-model="model.unit" />
                                            <ValidationMessage property-path="unit" />
                                        </div>
                                    </div>

                                    <!-- Price -->
                                    <div class="col col-md-6 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <FormLabel name="Giá niêm yết" />
                                            <div class="input-group">
                                                <NumberInput property-path="price" :min="0"
                                                        placeholder="Giá niêm yết" v-model="model.price" />
                                                <span class="input-group-text border-start-0">đ</span>
                                            </div>
                                            <ValidationMessage property-path="price" />
                                        </div>
                                    </div>

                                    <!-- VatFactor -->
                                    <div class="col col-md-6 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <FormLabel name="Thuế VAT" />
                                            <div class="input-group">
                                                <NumberInput property-path="vatFactor" :min="0"
                                                        placeholder="10" v-model="computedVatFactor" />
                                                <span class="input-group-text border-start-0">%</span>
                                            </div>
                                            <ValidationMessage property-path="vatFactor" />
                                        </div>
                                    </div>

                                    <!-- IsForRetail -->
                                    <div class="col col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <FormLabel name="Mục đích sử dụng" />
                                            <SelectInput property-path="isForRetail" 
                                                    v-model="model.isForRetail">
                                                <option :value="false">Chỉ liệu trình</option>
                                                <option :value="true">Cả liệu trình và bán lẻ</option>
                                            </SelectInput>
                                            <ValidationMessage property-path="isForRetail" />
                                        </div>
                                    </div>

                                    <!-- IsDiscontinued -->
                                    <div class="col col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <FormLabel name="Tình trạng" />
                                            <SelectInput property-path="isDiscontinued" 
                                                    v-model="model.isDiscontinued">
                                                <option :value="false">Có thể nhập hàng</option>
                                                <option :value="true">Đã ngưng nhập hàng</option>
                                            </SelectInput>
                                            <ValidationMessage property-path="isDiscontinued" />
                                        </div>
                                    </div>

                                    <!-- Category -->
                                    <div class="col col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <FormLabel name="Phân loại" />
                                            <SelectInput property-path="category" v-model="model.category" 
                                                    v-if="categoryOptions.items.length">
                                                <option :value="null">Chưa chọn phân loại</option>
                                                <option :value="category"
                                                        v-for="category in categoryOptions.items"
                                                        :key="category.id">
                                                    {{ category.name }}
                                                </option>
                                            </SelectInput>
                                            <ValidationMessage property-path="category" />
                                        </div>
                                    </div>

                                    <!-- Brand -->
                                    <div class="col col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                                        <div class="form-group">
                                            <FormLabel name="Thương hiệu" />
                                            <SelectInput property-path="brand" v-model="model.brand" 
                                                    v-if="brandOptions.items.length">
                                                <option :value="null">Chưa chọn thương hiệu</option>
                                                <option :value="brand" v-for="brand in brandOptions.items"
                                                        :key="brand.id">
                                                    {{ brand.name }}
                                                </option>
                                            </SelectInput>
                                            <ValidationMessage property-path="brand" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row g-3">
                            <div class="col col-12 mb-2">
                                <div class="form-group">
                                    <FormLabel name="Mô tả" />
                                    <TextInput type="textarea" property-path="description"
                                            maxlength="1000" placeholder="Mô tả"
                                            v-model="model.description" />
                                    <ValidationMessage :model-state="modelState"
                                            property-path="description" />
                                </div>
                            </div>
                        </div>
                    </template>
                </MainBlock>
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