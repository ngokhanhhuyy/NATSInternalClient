<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCustomerService } from "@/services/customerService";
import { useAuthorizationService } from "@/services/authorizationService";
import { useAlertModalStore } from "@/stores/alertModal";
import { CustomerDetailModel } from "@/models";
import { NotFoundError } from "@/services/exceptions";
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout components.
import { MainContainer, MainBlock } from "@/views/layouts";

// Dependencies.
const route = useRoute();
const router = useRouter();
const customerService = useCustomerService();
const authorizationService = useAuthorizationService();
const alertModalStore = useAlertModalStore();

// Internal states.
const model = await initializeModelAsync();
const permissions = {
    canEdit: authorizationService.hasPermission(p => p.EditCustomer),
    canDelete: authorizationService.hasPermission(p => p.DeleteCustomer)
};
useViewStates();

// Functions.
async function initializeModelAsync(): Promise<CustomerDetailModel> {
    const customerId: number = parseInt(route.params.customerId as string);
    const responseDto = await customerService.getDetailAsync(customerId);
    return reactive(new CustomerDetailModel(responseDto));
}

async function onDeleteButtonClicked(): Promise<void> {
    const answer = await alertModalStore.getDeleteConfirmationAsync();
    if (answer) {
        try {
            await customerService.deleteAsync(model.id);
            await alertModalStore.getSubmitSuccessConfirmationAsync();
            await router.push({ name: "customerList" });
        } catch (error) {
            if (error instanceof NotFoundError) {
                await alertModalStore.getSubmitErrorConfirmationAsync();
            } else {
                throw error;
            }
        }
    }
}
</script>

<template>
    <MainContainer>
        <div class="row g-3 justify-content-end">
            <div class="col col-12 mb-3">
                <MainBlock title="HỒ SƠ KHÁCH HÀNG" close-button>
                    <!-- Body -->
                    <template #body>
                        <!-- Avatar and names -->
                        <div class="avatar-and-names d-flex flex-row align-items-center">
                            <img :src="model.avatarUrl" class="img-thumbnail rounded-circle me-3">
                            <div class="names d-flex flex-column flex-fill justify-content-start">
                                <span class="fs-5 fw-bold">{{ model.fullName }}</span>
                                <span class="opacity-50">{{ model.nickName}}</span>
                            </div>
                        </div>

                        <!-- Personal information -->
                        <div class="personal-information mt-3">
                            <!-- Gender -->
                            <div class="row">
                                <div class="col col-lg-2 col-md-3 col-sm-12 col-12">
                                    <label class="opacity-50">Giới tính</label>
                                </div>
                                <div class="col col-lg-10 col-md-9 col-sm-12 col-12">
                                    <span :class='model.gender === 0 ? "text-primary" : "text-danger"'>
                                        {{ model.gender === 0 ? "Nam" : "Nữ" }}
                                    </span>
                                </div>
                            </div>

                            <!-- Birthday -->
                            <div class="row mt-3" v-if="model.birthday">
                                <div class="col col-lg-2 col-md-3 col-sm-12 col-12">
                                    <label class="opacity-50">Ngày sinh</label>
                                </div>
                                <div class="col col-lg-10 col-md-9 col-sm-12 col-12">
                                    <span class="field">{{ model.birthday }}</span>
                                </div>
                            </div>

                            <!-- PhoneNumber -->
                            <div class="row mt-3" v-if="model.phoneNumber">
                                <div class="col col-lg-2 col-md-3 col-sm-12 col-12">
                                    <label class="opacity-50">Số điện thoại</label>
                                </div>
                                <div class="col col-lg-10 col-md-9 col-sm-12 col-12">
                                    <a :href='"tel:" + model.phoneNumber' class="field" target="_blank"
                                            rel="noopener noreferrer">
                                        {{ model.phoneNumber }}
                                    </a>
                                </div>
                            </div>

                            <!-- ZaloNumber -->
                            <div class="row mt-3" v-if="model.zaloNumber">
                                <div class="col col-lg-2 col-md-3 col-sm-12 col-12">
                                    <label class="opacity-50">Số Zalo</label>
                                </div>
                                <div class="col col-lg-10 col-md-9 col-sm-12 col-12">
                                    <a :href='"https://zalo.me/" + model.zaloNumber' target="_blank"
                                            class="field" rel="noopener noreferrer">
                                        {{ model.zaloNumber }}
                                    </a>
                                </div>
                            </div>

                            <!-- FacebookUrl -->
                            <div class="row mt-3" v-if="model.facebookUrl">
                                <div class="col col-lg-2 col-lg-2 col-md-3 col-sm-12 col-12">
                                    <label class="opacity-50">Facebook</label>
                                </div>
                                <div class="col col-lg-10 col-md-9 col-sm-12 col-12">
                                    <a :href='model.facebookUrl' class="field" target="_blank"
                                            rel="noopener noreferrer">
                                        {{ model.facebookUrl }}
                                    </a>
                                </div>
                            </div>

                            <!-- Email -->
                            <div class="row mt-3" v-if="model.email">
                                <div class="col col-lg-2 col-md-3 col-sm-12 col-12">
                                    <label class="opacity-50">Email</label>
                                </div>
                                <div class="col col-lg-10 col-md-9 col-sm-12 col-12">
                                    <a :href='"mailto:" + model.email' class="field" target="_blank"
                                    rel="noopener noreferrer">
                                        {{ model.email }}
                                    </a>
                                </div>
                            </div>

                            <!-- Address -->
                            <div class="row mt-3" v-if="model.address">
                                <div class="col col-lg-2 col-md-3 col-sm-12 col-12">
                                    <label class="opacity-50">Địa chỉ</label>
                                </div>
                                <div class="col col-lg-10 col-sm-9 col-12">
                                    <span class="field">{{ model.address }}</span>
                                </div>
                            </div>

                            <!-- CreatedDateTime -->
                            <div class="row mt-3">
                                <div class="col col-lg-2 col-md-3 col-sm-12 col-12">
                                    <label class="opacity-50">Tạo lúc</label>
                                </div>
                                <div class="col col-lg-10 col-sm-9 col-12">
                                    <span class="field">{{ model.createdDateTime }}</span>
                                </div>
                            </div>

                            <!-- UpdatedDateTime -->
                            <div class="row mt-3" v-if="model.updatedDateTime">
                                <div class="col col-lg-2 col-md-3 col-sm-12 col-12">
                                    <label class="opacity-50">Chỉnh sửa lúc</label>
                                </div>
                                <div class="col col-lg-10 col-sm-9 col-12">
                                    <span class="field">{{ model.updatedDateTime }}</span>
                                </div>
                            </div>

                            <!-- Introducer -->
                            <div class="row mt-3" v-if="model.introducer">
                                <div class="col col-lg-2 col-md-3 col-sm-12 col-12 d-flex flex-row align-items-center">
                                    <label class="opacity-50">Người giới thiệu</label>
                                </div>
                                <div class="col col-lg-10 col-sm-9 col-12 d-flex flex-row align-items-center">
                                    <img :src="model.introducer.avatarUrl"
                                            class="img-thumbnail introducer-avatar rounded-circle me-2">
                                    <span class="field underline fw-bold">{{ model.introducer.fullName }}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>

            <!-- Delete button -->
            <div class="col col-auto">
                <button class="btn btn-outline-danger px-3" @click="onDeleteButtonClicked"
                        v-if="permissions.canDelete">
                    <i class="bi bi-trash3 me-1"></i>
                    Xoá
                </button>
            </div>

            <!-- Edit button -->
            <div class="col col-auto">
                <RouterLink :to='{ name: "customerUpdate", params: { customerId: model.id } }'
                        class="btn btn-primary px-3" v-if="permissions.canEdit">
                    <i class="bi bi-pencil-square me-1"></i>
                    Sửa
                </RouterLink>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
.img-thumbnail:not(.introducer-avatar) {
    width: 70px;
    height: 70px;
}

.img-thumbnail:is(.introducer-avatar) {
    width: 40px;
    height: 40px;
}

.field {
    color: var(--bs-primary) !important;
}

</style>