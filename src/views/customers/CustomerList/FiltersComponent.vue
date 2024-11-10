<script lang="ts">
export interface Props {
    getSortingOptionsAsync(): Promise<ResponseDtos.List.SortingOptions>;
    getCreatingPermissionAsync(): Promise<boolean>;
}

interface Emits {
    (event: "searchButtonClicked"): void;
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { CustomerListModel } from "@/models/customerModels";

// Layout component.
import MainBlock from "@layouts/MainBlockComponent.vue";
import CreatingRouterLink from "@layouts/CreatingRouterLinkComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";
import SortingByFieldSelectInput from "@forms/SortingByFieldSelectInputComponent.vue";

// Props and emits.
defineProps<Props>();
const emit = defineEmits<Emits>();

// Model.
const model = defineModel<CustomerListModel>({ required: true });
const createRoute: RouteLocationRaw = { name: "customerCreate" };


// Computed properties.
const isSearchContentValid = computed<boolean | null>(() =>
    !model.value.searchByContent.length || model.value.searchByContent.length >= 3);

const searchColumnClass = computed<string | null>(() =>
    isSearchContentValid.value ? null : "pb-0");
</script>

<template>
    <MainBlock title="Danh sách khách hàng" body-padding="2">
        <template #header>
            <CreatingRouterLink :to="createRoute"
                    :get-permission-async="getCreatingPermissionAsync">
                <i class="bi bi-plus-lg me-1"></i>
                <span>Tạo khách hàng</span>
            </CreatingRouterLink>
        </template>
        <template #body>
            <div class="row g-3">
                <div class="col" :class="searchColumnClass">
                    <div class="input-group">
                        <!-- Search content -->
                        <TextInput class="border-end-0" type="text"
                                v-model="model.searchByContent"
                                placeholder="Tìm kiếm tên, thông tin liên lạc ..." />
                        
                        <!-- Advance filters / collapse button -->        
                        <button class="btn btn-outline-primary" data-bs-toggle="collapse"
                                href="#advanced-filters-container" aria-expanded="false"
                                role="button" aria-controls="advanced-filters-container">
                            <i class="bi bi-sliders"></i>
                        </button>
                    </div>
                    <span class="small opacity-50" v-show="!isSearchContentValid">
                        * Nội dung tìm kiếm phải chứa ít nhất 3 ký tự.
                    </span>
                </div>
            
                <div class="col col-auto">
                    <button class="btn btn-primary" :disabled="!isSearchContentValid"
                            @click='emit("searchButtonClicked")'>
                        <i class="bi bi-search"></i>
                        <span class="ms-2 d-sm-inline d-none">Tìm kiếm</span>
                    </button>
                </div>
            </div>

            <div class="row g-3 collapse" id="advanced-filters-container">
                <!-- SortingByField -->
                <div class="col col-xl-4 col-sm-6 col-12">
                    <FormLabel text="Trường sắp xếp" />
                    <SortingByFieldSelectInput v-model="model"
                            :get-sorting-options-async="getSortingOptionsAsync" />
                </div>

                <!-- SortingByAscending -->
                <div class="col col-xl-4 col-sm-6 col-12">
                    <FormLabel text="Thứ tự sắp xếp" />
                    <SelectInput v-model="model.sortingByAscending">
                        <option :value="true">Từ nhỏ đến lớn</option>
                        <option :value="false">Từ lớn đến nhỏ</option>
                    </SelectInput>
                </div>

                <!-- HasRemainingDebtOnly -->
                <div class="col col-xl-4 col-sm-12 col-12">
                    <FormLabel text="Chế độ hiển thị" />
                    <SelectInput v-model="model.hasRemainingDebtAmountOnly">
                        <option :value="false">Hiển thị tất cả khách hàng</option>
                        <option :value="true">Chỉ hiển thị khách hàng còn nợ</option>
                    </SelectInput>
                </div>
            </div>
        </template>
    </MainBlock>
</template>