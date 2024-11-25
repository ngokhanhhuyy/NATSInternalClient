<script lang="ts">
interface Props {
    disabled?: boolean;
}
</script>

<script setup lang="ts">
import { reactive, computed, watch, inject } from "vue";
import { CustomerListModel, CustomerBasicModel } from "@/models/customerModels";
import { Gender } from "@/services/dtos/enums";
import { useCustomerService } from "@/services/customerService";
import type { LoadingState } from "@/composables/loadingStateComposable";
import { useInitialDataStore } from "@/stores/initialData";

// Layout components.
import MainPaginator from "@layouts/MainPaginatorComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import SortingByFieldSelectInput from "@forms/SortingByFieldSelectInputComponent.vue";
import SelectInput from "@forms/SelectInputComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const service = useCustomerService();
const initialDataStore = useInitialDataStore();

// Model and states.
const selectedModel = defineModel<CustomerBasicModel | null>({ required: true });
const listModel = await initialLoadListAsync();
const loadingState = inject<LoadingState>("loadingState")!;

// Computed property.
const blockTitle = computed<string>(() => {
    return selectedModel.value ? "Khách hàng" : "Tìm chọn khách hàng";
});

const isSearchContentValid = computed<boolean>(() => {
    return !listModel.searchByContent.length || listModel.searchByContent.length >= 3;
});

const searchButtonClass = computed<string>(() => {
    if (isSearchContentValid.value) {
        return "btn-outline-primary";
    }

    return "btn-outline-danger";
});

// Watch.
watch(() => [listModel.sortingByAscending, listModel.sortingByField], reloadAsync);

// Functions.
async function initialLoadListAsync(): Promise<CustomerListModel> {
    const requestDto = { resultsPerPage: 10 };
    const responseDto = await service.getListAsync(requestDto);
    const initialData = initialDataStore.data.customer;
    const listModel = new CustomerListModel(responseDto, initialData, requestDto);
    listModel.resultsPerPage = requestDto.resultsPerPage;
    return reactive(listModel);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await service.getListAsync(listModel.toRequestDto());
    listModel.mapFromListResponseDto(responseDto);
    loadingState.isLoading = false;
}

async function onPaginationPageClicked(page: number): Promise<void> {
    listModel.page = page;
    await reloadAsync();
}

async function onSearchButtonClicked(): Promise<void> {
    listModel.page = 1;
    await reloadAsync();
}

function onCustomerSelected(customer: CustomerBasicModel): void {
    selectedModel.value = customer;
}

function getCustomerGenderClass(customer: CustomerBasicModel): string {
    if (customer.gender === Gender.Male) {
        return "text-primary";
    }
    return "text-danger";
}

function getCustomerGenderText(customer: CustomerBasicModel): string {
    return customer.gender === Gender.Male ? "Nam" : "Nữ";
}
</script>

<template>
    <MainBlock :title="blockTitle" :body-padding="[0, 2, 2, 2]">
        <template #header v-if="selectedModel">
            <!-- Unselect button -->
            <button class="btn btn-outline-danger btn-sm" @click="selectedModel = null"
                    v-if="!disabled">
                <i class="bi bi-x-lg"></i>
                <span class="ms-2">Chọn khách hàng khác</span>
            </button>
        </template>
        <template #body>
            <!-- Search and list -->
            <template v-if="!selectedModel">
                <!-- Search -->
                <div class="row g-3 align-items-stretch">
                    <!-- Search by content -->
                    <div class="col d-flex flex-column">
                        <FormLabel text="Tìm kiếm" />
                        <div class="input-group">
                            <!-- Search content -->
                            <TextInput v-model="listModel.searchByContent" class="border-end-0"
                                    placeholder="Tên, ngày sinh, số điện thoại ..." />
                        
                            <!-- Search button -->
                            <button class="btn" :class="searchButtonClass"
                                    :disabled="!isSearchContentValid"
                                    @click="onSearchButtonClicked">
                                <i class="bi bi-search" v-if="isSearchContentValid"></i>
                                <i class="bi bi-x-lg" v-else></i>
                                <span class="ms-1 d-sm-inline d-none">Tìm kiếm</span>
                            </button>
                        </div>
                        <span class="text-danger" v-if="!isSearchContentValid">
                            Vui lòng nhập tối thiểu 3 ký tự.
                        </span>
                        <span class="small opacity-50">
                            Ví dụ: Nguyễn Văn An, 30-08-1997, 09037632117 ...
                        </span>
                    </div>
                </div>

                <!-- Sorting options -->
                <div class="row g-3">
                    <!-- SortingByField -->
                    <div class="col col-md-6 col-12">
                        <FormLabel text="Trường sắp xếp" />
                        <SortingByFieldSelectInput v-model="listModel"
                                :get-options-async="service.getListSortingOptionAsync" />
                    </div>

                    <!-- SortingByAscending -->
                    <div class="col col-md-6 col-12">
                        <FormLabel text="Thứ tự sắp xếp" />
                        <SelectInput v-model="listModel.sortingByAscending">
                            <option :value="true">Từ nhỏ đến lớn</option>
                            <option :value="false">Từ lớn đến nhỏ</option>
                        </SelectInput>
                    </div>

                    <!-- Top Paginator -->
                    <div class="col col-12 d-flex justify-content-center">
                        <MainPaginator @page-click="onPaginationPageClicked"
                                :page="listModel.page"
                                :page-count="listModel.pageCount"
                                v-if="listModel.pageCount > 1" />
                    </div>
                </div>

                <!-- List results -->
                <div class="row g-3">
                    <div class="col col-12">
                        <ul class="list-group">
                            <li class="list-group-item d-flex align-items-center"
                                    :key="customer.id"
                                    v-for="customer in listModel.items">
                                <!-- Avatar -->
                                <RouterLink :to="customer.detailRoute">
                                    <img class="img-thumbnail avatar rounded-circle me-2"
                                            :src="customer.avatarUrl" />
                                </RouterLink>

                                <!-- Detail -->
                                <div class="detail d-flex flex-column justify-content-center
                                            align-items-start flex-fill">
                                    <!-- FullName -->
                                    <RouterLink class="fullname fw-bold"
                                            :to="customer.detailRoute">
                                        {{ customer.fullName }}
                                    </RouterLink>

                                    <!-- NickName -->
                                    <span class="nickname small">
                                        {{ customer.nickName }}
                                    </span>
                                    
                                    <!-- Additional details -->
                                    <div class="small">
                                        <!-- Gender -->
                                        <span :class="getCustomerGenderClass(customer)">
                                            {{ getCustomerGenderText(customer) }}
                                        </span>,

                                        <!-- PhoneNumber -->
                                        <span v-if="customer.phoneNumber">
                                            {{ customer.phoneNumber }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Select button -->
                                <button class="btn btn-outline-primary btn-sm"
                                        @click="onCustomerSelected(customer)">
                                    <i class="bi bi-check2-circle"></i>
                                    <span class="d-sm-inline d-none ms-2">Chọn</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <!-- Bottom Paginator -->
                    <div class="col col-12 d-flex justify-content-center">
                        <MainPaginator @page-click="onPaginationPageClicked"
                                :page="listModel.page"
                                :page-count="listModel.pageCount"
                                v-if="listModel.pageCount > 1" />
                    </div>
                </div>
            </template>

            <!-- Selected customer -->
            <div class="row gx-4 pt-2 align-items-stretch" v-else>
                <div class="col col-auto d-flex align-items-center justify-content-center">
                    <!-- Thumbnail -->
                    <img class="img-thumbnail selected-customer-avatar rounded-circle"
                            :src="selectedModel.avatarUrl" />
                </div>
                <div class="col d-flex flex-column">
                    <!-- FullName -->
                    <RouterLink :to="selectedModel.detailRoute" class="fw-bold">
                        {{ selectedModel.fullName }}
                    </RouterLink>

                    <!-- NickName -->
                    <span class="fst-italic small" v-if="selectedModel.nickName">
                        {{ selectedModel.nickName }}
                    </span>

                    <!-- Gender and PhoneNumber -->
                    <div class="small">
                        <!-- Gender -->
                        <span :class="getCustomerGenderClass(selectedModel)">
                            {{ selectedModel.gender === Gender.Male ? "Nam" : "Nữ" }}
                        </span>,&nbsp;
                        <!-- PhoneNumber -->
                        <span v-if="selectedModel.phoneNumber">
                            {{ selectedModel.phoneNumber }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.img-thumbnail.avatar, .img-thumbnail.selected-customer-avatar {
    object-fit: contain;
    object-position: 50% 50%;
    aspect-ratio: 1;
}

.img-thumbnail.avatar {
    width: 50px;
    height: 50px;
}

.img-thumbnail.selected-customer-avatar {
    width: 50px;
    height: 50px;
}
</style>