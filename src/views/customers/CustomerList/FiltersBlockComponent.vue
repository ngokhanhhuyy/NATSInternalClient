<script setup lang="ts">
// Interface.
interface Emits {
    (event: "searchButtonClicked"): void;
}

// Imports.
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { CustomerListModel } from "@/models";

// Layout component.
import { MainBlock } from "@/views/layouts";

// Form components.
import { FormLabel, TextInput, SelectInput } from "@/components/formInputs";

// Emits.
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
            <RouterLink :to="createRoute" class="btn btn-primary btn-sm"
                    v-if="model.authorization?.canCreate">
                <i class="bi bi-plus-lg me-1"></i>
                <span>Tạo khách hàng</span>
            </RouterLink>
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
                <!-- OrderByField -->
                <div class="col col-xl-4 col-sm-6 col-12">
                    <FormLabel name="Trường sắp xếp" />
                    <SelectInput v-model="model.orderByField">
                        <option value="LastName">Họ và tên</option>
                        <option value="FirstName">Tên</option>
                        <option value="Birthday">Tuổi</option>
                        <option value="CreatedDateTime">Ngày tạo</option>
                        <option value="DebtRemainingAmount">Khoản nợ còn lại</option>
                    </SelectInput>
                </div>

                <!-- OrderByAscending -->
                <div class="col col-xl-4 col-sm-6 col-12">
                    <FormLabel name="Thứ tự sắp xếp" />
                    <SelectInput v-model="model.orderByAscending">
                        <option :value="true">Từ nhỏ đến lớn</option>
                        <option :value="false">Từ lớn đến nhỏ</option>
                    </SelectInput>
                </div>

                <!-- HasRemainingDebtOnly -->
                <div class="col col-xl-4 col-sm-12 col-12">
                    <FormLabel name="Chế độ hiển thị" />
                    <SelectInput v-model="model.hasRemainingDebtAmountOnly">
                        <option :value="false">Hiển thị tất cả khách hàng</option>
                        <option :value="true">Chỉ hiển thị khách hàng còn nợ</option>
                    </SelectInput>
                </div>
            </div>
        </template>
    </MainBlock>
</template>