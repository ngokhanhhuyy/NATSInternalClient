<script setup lang="ts">
import { reactive, computed, watch, defineAsyncComponent } from "vue";
import { useRouter, type RouteLocationRaw } from "vue-router";
import { useCustomerService } from "@/services/customerService";
import { useAuthorizationService } from "@/services/authorizationService";
import { CustomerListModel } from "@/models";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Async components.
const CustomerListPagination = defineAsyncComponent(() =>
    import("@/components/customers/CustomerListPagination.vue"));

// Dependencies.
const customerService = useCustomerService();
const authorizationService = useAuthorizationService();
const router = useRouter();

// Internal states.
const model = await initializeModel();
const { loadingState } = useViewStates();
const permissions = {
    canCreate: authorizationService.hasPermission(p => p.CreateCustomer),
    canEdit: authorizationService.hasPermission(p => p.EditCustomer)
};

// Computed properties.
const searchContentValidationVisible = computed<boolean>(() => {
    return model.searchByContent.length > 0 && model.searchByContent.length < 3;
});
const searchContentInputClass = computed<string | null>(() => {
    if (model.searchByContent.length > 0 && model.searchByContent.length < 3) {
        return "is-invalid";
    }
    return null;
});

// Watch.
watch(() => model.searchByContent, onSearchContentInput);

// Functions.
async function initializeModel(): Promise<CustomerListModel> {
    const responseDto = await customerService.getListAsync();
    return reactive(new CustomerListModel(responseDto));
}

async function reloadListAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await customerService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

function getDetailRoute(customerId: number): RouteLocationRaw {
    return {
        name: "customerDetail",
        params: {
            customerId: customerId
        }
    };
}

function getUpdateRoute(customerId: number): RouteLocationRaw {
    return {
        name: "customerUpdate",
        params: {
            customerId: customerId
        }
    };
}

async function onSearchContentInput(): Promise<void> {
    model.page = 1;
    if (!model.searchByContent || model.searchByContent.length >=3) {
        await reloadListAsync();
    }
}

async function onPaginationButtonClick(page: number): Promise<void> {
    model.page = page;
    await reloadListAsync();
}
</script>

<template>
    <MainContainer>
        <div class="row g-3">
            <!-- Search -->
            <div class="col col-12">
                <MainBlock title="Danh sách khách hàng">
                    <template #header>
                        <RouterLink :to='{ name: "customerCreate" }'
                                class="btn btn-primary btn-sm"
                                v-if="permissions.canCreate">
                            <i class="bi bi-plus-lg me-1"></i>
                            Tạo khách hàng
                        </RouterLink>
                    </template>
                    <template #body>
                        <div class="input-group">
                            <!-- Search content -->
                            <input class="form-control" :class="searchContentInputClass"
                                    type="text"
                                    placeholder="Tìm kiếm tên, thông tin liên lạc ..."
                                    v-model="model.searchByContent">
                        </div>
                        <span class="text-danger small" v-show="searchContentValidationVisible">
                            Nội dung tìm kiếm phải chứa ít nhất 3 ký tự
                        </span>
                    </template>
                </MainBlock>
            </div>

            <!-- Pagination -->
            <div class="col col-12 d-flex flex-row justify-content-center mt-3"
                    v-if="model.pageCount > 1">
                <CustomerListPagination :page="model.page" :page-count="model.pageCount"
                        @page-click="onPaginationButtonClick" />
            </div>

            <!-- Results -->
            <div class="col col-12 mt-3">
                <div class="block block-customer-list bg-white p-0 h-100 d-flex
                            flex-column overflow-hidden rounded-3 border overflow-hidden">
                    <Transition name="fade" mode="out-in">
                        <div class="block-body w-100 flex-fill d-flex
                                    justify-content-center align-items-center"
                                v-if="!loadingState.isLoading">
                            <!-- List -->
                            <ul class="list-group list-group-flush w-100" v-if="model.results.length">
                                <li class="list-group-item d-flex px-3 py-2 align-items-center"
                                        :key="customer.id" v-for="customer in model.results">
                                    <img class="img-thumbnail rounded-circle" :src="customer.avatarUrl"
                                            @click="router.push(getDetailRoute(customer.id))">
                                    <div class="d-flex flex-column flex-fill ps-3 justify-content-center">
                                        <RouterLink :to="getDetailRoute(customer.id)"
                                                class="fw-bold text-default fullname">
                                            {{ customer.fullName }}
                                        </RouterLink>
                                        <span class="small">{{ customer.nickName}}</span>
                                    </div>
                                    <RouterLink :to="getDetailRoute(customer.id)"
                                            class="btn btn-outline-primary btn-sm">
                                        <i class="bi bi-eye"></i>
                                        <span class="d-sm-inline d-none ms-1">Xem</span>
                                    </RouterLink>
                                    <RouterLink :to="getUpdateRoute(customer.id)"
                                            class="btn btn-outline-primary btn-sm ms-2"
                                            v-if="permissions.canEdit">
                                        <i class="bi bi-pencil-square"></i>
                                        <span class="d-sm-inline d-none ms-1">Sửa</span>
                                    </RouterLink>
                                </li>
                            </ul>
                            
                            <div class="opacity-50 my-4" v-else>
                                Không tìm thấy kết quả
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>

            <!-- Pagination -->
            <div class="col col-12 d-flex flex-row justify-content-center mt-3"
                    v-if="model.pageCount > 1">
                <CustomerListPagination :page="model.page" :page-count="model.pageCount"
                        @page-click="onPaginationButtonClick" />
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
.block.block-customer-list .block-body {
    overflow-y: auto;
}

.img-thumbnail {
    width: 60px;
    height: 60px;
}

.fullname {
    text-decoration: none;
}

.fullname:hover, .fullname.active {
    text-decoration: underline
}

@media (max-width: 768px) {
    .block.block-customer-list .block-body:has(ul) {
        border-bottom: 1px solid var(--border-color) !important;
    }
}
</style>