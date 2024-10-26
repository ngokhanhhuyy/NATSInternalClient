<script setup lang="ts">
import { Gender } from "@/services/dtos/enums";
import { UserPersonalInformationDetailModel } from "@/models/userModels";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form component.
import { FormLabel } from "@/components/formInputs";

// Model.
const model = defineModel<UserPersonalInformationDetailModel>({ required: true });
</script>

<template>
    <MainBlock title="Thông tin cá nhân" :body-padding="[0, 2, 1, 2]">
        <template #body>
            <!-- Gender -->
            <div class="row g-3">
                <div class="col col-lg-4 col-md-12 col-sm-4 col-12">
                    <FormLabel name="Giới tính" />
                </div>
                <div class="col col-lg-8 col-md-12 col-sm-8 col-12">
                    <span v-if="model.gender === Gender.Male">Nam</span>
                    <span v-else>Nữ</span>
                </div>
            </div>
            
            <!-- Birthday -->
            <div class="row g-3">
                <div class="col col-lg-4 col-md-12 col-sm-4 col-12">
                    <FormLabel name="Ngày sinh" />
                </div>
                <div class="col col-lg-8 col-md-12 col-sm-8 col-12">
                    <span>{{ model.birthday }}</span>
                </div>
            </div>

            <!-- PhoneNumber -->
            <div class="row g-3" v-if="model.phoneNumber">
                <div class="col col-lg-4 col-md-12 col-sm-4 col-12">
                    <FormLabel name="Số điện thoại" />
                </div>
                <div class="col col-lg-8 col-md-12 col-sm-8 col-12">
                    <span>{{ model.phoneNumber }}</span>
                </div>
            </div>

            <!-- Email -->
            <div class="row g-3" v-if="model.email">
                <div class="col col-lg-4 col-md-12 col-sm-4 col-12">
                    <FormLabel name="Email" />
                </div>
                <div class="col col-lg-8 col-md-12 col-sm-8 col-12">
                    <span>{{ model.email }}</span>
                </div>
            </div>
        </template>
    </MainBlock>
</template>