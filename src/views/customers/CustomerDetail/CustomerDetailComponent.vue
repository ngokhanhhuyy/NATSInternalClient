<script setup lang="ts">
import { computed } from "vue";
import { CustomerDetailModel } from "@models/customerModels";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";

// Model.
const model = defineModel<CustomerDetailModel>({ required: true });

// Computed properties.
const genderClass = computed<string>(() => {
    return model.value.gender === 0 ? "text-primary" : "text-danger";
});
</script>

<template>
    <MainBlock title="HỒ SƠ KHÁCH HÀNG" :body-padding="[4, 3]" close-button>
        <!-- Body -->
        <template #body>
            <!-- Avatar and names -->
            <div class="row g-0">
                <div class="col col-12 avatar-and-names d-flex flex-row align-items-center">
                    <img :src="model.avatarUrl"
                            class="img-thumbnail rounded-circle me-3">
                    <div class="names d-flex flex-column flex-fill
                                justify-content-start">
                        <span class="fs-5 fw-bold">{{ model.fullName }}</span>
                        <span class="opacity-50">{{ model.nickName}}</span>
                    </div>
                </div>
            </div>

            <!-- Personal information -->
            <!-- Gender -->
            <div class="row g-0 mt-3">
                <div class="col col-12">
                    <label class="form-label">Giới tính</label>
                </div>
                <div class="col">
                    <span :class="genderClass">
                        {{ model.gender === 0 ? "Nam" : "Nữ" }}
                    </span>
                </div>
            </div>

            <!-- Birthday -->
            <div class="row g-0 mt-3" v-if="model.birthday">
                <div class="col col-12">
                    <FormLabel text="Ngày sinh" />
                </div>
                <div class="col">
                    <span class="field">{{ model.birthday }}</span>
                </div>
            </div>

            <!-- PhoneNumber -->
            <div class="row g-0 mt-3" v-if="model.phoneNumber">
                <div class="col col-12">
                    <FormLabel text="Số điện thoại" />
                </div>
                <div class="col">
                    <a :href='"tel:" + model.phoneNumber' class="field"
                            target="_blank" rel="noopener noreferrer">
                        {{ model.phoneNumber }}
                    </a>
                </div>
            </div>

            <!-- ZaloNumber -->
            <div class="row g-0 mt-3" v-if="model.zaloNumber">
                <div class="col col-12">
                    <FormLabel text="Số Zalo" />
                </div>
                <div class="col">
                    <a :href='"https://zalo.me/" + model.zaloNumber' target="_blank"
                            class="field" rel="noopener noreferrer">
                        {{ model.zaloNumber }}
                    </a>
                </div>
            </div>

            <!-- FacebookUrl -->
            <div class="row g-0 mt-3" v-if="model.facebookUrl">
                <div class="col col-12">
                    <FormLabel text="Facebook" />
                </div>
                <div class="col">
                    <a :href="model.facebookUrl" class="field"
                            target="_blank" rel="noopener noreferrer">
                        {{ model.facebookUrl }}
                    </a>
                </div>
            </div>

            <!-- Email -->
            <div class="row g-0 mt-3" v-if="model.email">
                <div class="col col-12">
                    <FormLabel text="Email" />
                </div>
                <div class="col">
                    <a :href='"mailto:" + model.email' class="field"
                            target="_blank" rel="noopener noreferrer">
                        {{ model.email }}
                    </a>
                </div>
            </div>

            <!-- Address -->
            <div class="row g-0 mt-3" v-if="model.address">
                <div class="col col-12">
                    <FormLabel text="Địa chỉ" />
                </div>
                <div class="col col-lg-10 col-sm-9 col-12">
                    <span class="field">{{ model.address }}</span>
                </div>
            </div>

            <!-- CreatedDateTime -->
            <div class="row g-0 mt-3">
                <div class="col col-12">
                    <FormLabel text="Tạo lúc" />
                </div>
                <div class="col col-lg-10 col-sm-9 col-12">
                    <span class="field">{{ model.createdDateTime.dateTime }}</span>
                </div>
            </div>

            <!-- UpdatedDateTime -->
            <div class="row g-0 mt-3" v-if="model.updatedDateTime">
                <div class="col col-12">
                    <FormLabel text="Chỉnh sửa lúc" />
                </div>
                <div class="col col-lg-10 col-sm-9 col-12">
                    <span class="field">{{ model.updatedDateTime.dateTime }}</span>
                </div>
            </div>

            <!-- Introducer -->
            <div class="row g-0 mt-3" v-if="model.introducer">
                <div class="col col-12 d-flex
                            flex-row align-items-center">
                    <FormLabel text="Người giới thiệu" />
                </div>
                <div class="col col-lg-10 col-sm-9 col-12 d-flex flex-row
                            align-items-center">
                    <img class="img-thumbnail introducer-avatar
                                rounded-circle me-2"
                            :src="model.introducer.avatarUrl">
                    <span class="field underline fw-bold">
                        {{ model.introducer.fullName }}
                    </span>
                </div>
            </div>
        </template>
    </MainBlock>
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