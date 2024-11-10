<script setup lang="ts">
// Interface.
interface Props {
    categoryOptions: ProductCategoryListModel;
    brandOptions: BrandListModel;
}

interface Emits {
    (event: "thumbnailFileChanged", file: string | null): void;
}

// Imports.
import type { ProductUpsertModel } from "@/models/productModels";
import type { ProductCategoryListModel } from "@/models/productCategoryModels";
import type { BrandListModel } from "@/models/brandModels";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import ImageInput from "@forms/ImageInputComponent.vue";
import NumberInput from "@forms/NumberInputComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";

// Props and emits.
defineProps<Props>();
const emit = defineEmits<Emits>();

// Model.
const model = defineModel<ProductUpsertModel>({ required: true });

// Functions.
function onThumbnailFileChanged(file: string | null): void {
    emit("thumbnailFileChanged", file);
}
</script>

<template>
    <div class="row justify-content-center">
        <div class="col col-md-auto col-sm-12 col-12 pt-3 pb-3 d-flex
                    flex-column align-items-center justify-content-start">
            <ImageInput name="thumbnailFile"
                    default-src="images/default.jpg" :url="model.thumbnailUrl"
                    @change="onThumbnailFileChanged" />
            <ValidationMessage name="thumbnailFile" />
        </div>
        <div class="col ps-md-2 ps-0 pe-0">
            <div class="row g-3">
                <!-- Name -->
                <div class="col col-md-7 col-sm-12 col-12">
                    <div class="form-group">
                        <FormLabel text="Tên sản phẩm" required />
                        <TextInput name="name" maxlength="50"
                                placeholder="Tên sản phẩm" v-model="model.name" />
                        <ValidationMessage name="name" />
                    </div>
                </div>

                <!-- Unit -->
                <div class="col col-md-5 col-sm-12 col-12">
                    <div class="form-group">
                        <FormLabel text="Đơn vị" required />
                        <TextInput name="unit" maxlength="12"
                                placeholder="Hộp, chai, ..." v-model="model.unit" />
                        <ValidationMessage name="unit" />
                    </div>
                </div>

                <!-- Price -->
                <div class="col col-md-6 col-sm-12 col-12">
                    <div class="form-group">
                        <FormLabel text="Giá niêm yết" required />
                        <div class="input-group">
                            <NumberInput name="price" :min="0"
                                    placeholder="Giá niêm yết" v-model="model.defaultPrice" />
                            <span class="input-group-text border-start-0">đ</span>
                        </div>
                        <ValidationMessage name="price" />
                    </div>
                </div>

                <!-- VatFactor -->
                <div class="col col-md-6 col-sm-12 col-12">
                    <div class="form-group">
                        <FormLabel text="Thuế VAT" required />
                        <div class="input-group">
                            <NumberInput name="vatFactor" :min="0" :max="100"
                                    placeholder="10" v-model="model.defaultVatPercentage" />
                            <span class="input-group-text border-start-0">%</span>
                        </div>
                        <ValidationMessage name="vatFactor" />
                    </div>
                </div>

                <!-- IsForRetail -->
                <div class="col col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="form-group">
                        <FormLabel text="Mục đích sử dụng" />
                        <SelectInput name="isForRetail" 
                                v-model="model.isForRetail">
                            <option :value="false">Chỉ liệu trình</option>
                            <option :value="true">Cả liệu trình và bán lẻ</option>
                        </SelectInput>
                        <ValidationMessage name="isForRetail" />
                    </div>
                </div>

                <!-- IsDiscontinued -->
                <div class="col col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="form-group">
                        <FormLabel text="Tình trạng" />
                        <SelectInput name="isDiscontinued" 
                                v-model="model.isDiscontinued">
                            <option :value="false">Có thể nhập hàng</option>
                            <option :value="true">Đã ngưng nhập hàng</option>
                        </SelectInput>
                        <ValidationMessage name="isDiscontinued" />
                    </div>
                </div>

                <!-- Category -->
                <div class="col col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="form-group">
                        <FormLabel text="Phân loại" />
                        <SelectInput name="category" v-model="model.categoryId" 
                                v-if="categoryOptions.items.length">
                            <option :value="null">Chưa chọn phân loại</option>
                            <option :value="category.id"
                                    v-for="category in categoryOptions.items"
                                    :key="category.id">
                                {{ category.name }}
                            </option>
                        </SelectInput>
                        <ValidationMessage name="category" />
                    </div>
                </div>

                <!-- Brand -->
                <div class="col col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="form-group">
                        <FormLabel text="Thương hiệu" />
                        <SelectInput name="brand" v-model="model.brandId" 
                                v-if="brandOptions.items.length">
                            <option :value="null">Chưa chọn thương hiệu</option>
                            <option :value="brand.id" v-for="brand in brandOptions.items"
                                    :key="brand.id">
                                {{ brand.name }}
                            </option>
                        </SelectInput>
                        <ValidationMessage name="brand" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>