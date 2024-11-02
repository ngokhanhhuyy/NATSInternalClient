<script setup lang="ts">
import { reactive, watch, inject, defineAsyncComponent } from "vue";
import { CustomerListModel, CustomerBasicModel } from "@/models/customerModels";
import { Gender } from "@/services/dtos/enums";
import { useCustomerService } from "@/services/customerService";
import type { LoadingState } from "@/composables/loadingStateComposable";

// Layout components.
const MainPaginator = defineAsyncComponent(() =>
    import("@layouts/MainPaginatorComponent.vue"));
const MainBlock = defineAsyncComponent(() => import("@layouts/MainBlockComponent.vue"));

// Form components.
const FormLabel = defineAsyncComponent(() => import("@forms/FormLabelComponent.vue"));
const TextInput = defineAsyncComponent(() => import("@forms/TextInputComponent.vue"));
const SelectInput = defineAsyncComponent(() => import("@forms/SelectInputComponent.vue"));

// Dependencies.
const customerService = useCustomerService();

// Model and states.
const model = defineModel<CustomerBasicModel | null>({ required: true });
const customerListModel = await initialLoadListAsync();
const loadingState = inject<LoadingState>("loadingState")!;

// Watch.
watch(
    () => [
        customerListModel.orderByAscending,
        customerListModel.orderByField,
        customerListModel.searchByContent
    ], async () => {
        const searchContentLength = customerListModel.searchByContent?.length;
        if (!searchContentLength || searchContentLength >= 3) {
            customerListModel.page = 1;
            await reloadAsync();
        }
    });

// Functions.
async function initialLoadListAsync(): Promise<CustomerListModel> {
    const requestDto = { resultsPerPage: 10 };
    const responseDto = await customerService.getListAsync(requestDto);
    const listModel = new CustomerListModel(responseDto);
    listModel.resultsPerPage = requestDto.resultsPerPage;
    return reactive(listModel);
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await customerService.getListAsync(customerListModel.toRequestDto());
    customerListModel.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

async function onPaginationPageClicked(page: number) {
    customerListModel.page = page;
    await reloadAsync();
}

function onCustomerSelected(customer: CustomerBasicModel): void {
    model.value = customer;
}

function getCustomerGenderClass(customer: CustomerBasicModel): string {
    if (customer.gender === Gender.Male) {
        return "text-primary";
    }
    return "text-danger";
}
</script>

<template>
    <MainBlock title="Chọn khách hàng" :ody-padding="2">
        <template #body>
            <!-- Search and list -->
            <div class="row g-3" v-if="!model">
                <!-- Search by content -->
                <div class="col col-12">
                    <FormLabel text="Tìm kiếm" />
                    <TextInput v-model="customerListModel.searchByContent"
                            placeholder="Tên, ngày sinh, số điện thoại ..." />
                    <span class="small opacity-50">
                        Nhập tối thiểu 3 ký tự. Ví dụ: Nguyễn Văn An, 30-08-1997,
                        09037632117 ...
                    </span>
                </div>

                <!-- OrderByField -->
                <div class="col col-md-6 col-12">
                    <FormLabel text="Trường sắp xếp" />
                    <SelectInput v-model="customerListModel.orderByField">
                        <option value="LastName">Tên</option>
                        <option value="FirstName">Họ</option>
                        <option value="Birthday">Sinh nhật</option>
                        <option value="CreatedDateTime">Ngày tạo</option>
                    </SelectInput>
                </div>

                <!-- OrderByAscending -->
                <div class="col col-md-6 col-12">
                    <FormLabel text="Thứ tự sắp xếp" />
                    <SelectInput v-model="customerListModel.orderByAscending">
                        <option :value="true">Từ nhỏ đến lớn</option>
                        <option :value="false">Từ lớn đến nhỏ</option>
                    </SelectInput>
                </div>

                <!-- Top Paginator -->
                <div class="col col-12 d-flex justify-content-center">
                    <MainPaginator @page-click="onPaginationPageClicked"
                            :page="customerListModel.page"
                            :page-count="customerListModel.pageCount"
                            v-if="customerListModel.pageCount > 1" />
                </div>

                <!-- List results -->
                <div class="col col-12">
                    <ul class="list-group">
                        <li class="list-group-item d-flex align-items-center"
                                :key="customer.id"
                                v-for="customer in customerListModel.items">
                            <!-- Avatar -->
                            <img class="img-thumbnail avatar rounded-circle me-2"
                                    :src="customer.avatarUrl" />

                            <!-- Detail -->
                            <div class="detail d-flex flex-column justify-content-center
                                        align-items-start flex-fill">
                                <!-- FullName -->
                                <span class="fullname fw-bold">{{ customer.fullName }}</span>

                                <!-- NickName -->
                                <span class="nickname small">{{ customer.nickName }}</span>
                                
                                <!-- Additional details -->
                                <div class="small">
                                    <!-- Gender -->
                                    <span :class="getCustomerGenderClass(customer)">
                                        {{ customer.gender === Gender.Male ? "Nam" : "Nữ" }}
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
                            :page="customerListModel.page"
                            :page-count="customerListModel.pageCount"
                            v-if="customerListModel.pageCount > 1" />
                </div>
            </div>

            <!-- Selected customer -->
            <div class="row pt-3 pb-2" v-else>
                <div class="col col-12 d-flex flex-column
                            align-items-center justify-content-center">
                    <!-- Thumbnail -->
                    <img class="img-thumbnail selected-customer-avatar rounded-circle mb-3"
                            :src="model.avatarUrl" />

                    <!-- FullName -->
                    <span class="fw-bold fs-5">{{ model.fullName }}</span>

                    <!-- NickName -->
                    <span class="fst-italic" v-if="model.nickName">
                        {{ model.nickName }}
                    </span>

                    <!-- Gender -->
                    <span :class="getCustomerGenderClass(model)">
                        {{ model.gender === Gender.Male ? "Nam" : "Nữ" }}
                    </span>

                    <!-- PhoneNumber -->
                    <span v-if="model.phoneNumber">
                        {{ model.phoneNumber }}
                    </span>

                    <!-- Unselect button -->
                    <button class="btn btn-outline-danger btn-sm mt-4"
                            @click="model = null">
                        <i class="bi bi-x-lg me-2"></i>
                        <span>Chọn khách hàng khác</span>
                    </button>
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
    width: 150px;
    height: 150px;
}
</style>