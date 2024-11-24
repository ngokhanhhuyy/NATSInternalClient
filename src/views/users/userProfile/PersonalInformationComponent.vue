<script setup lang="ts">
import { Gender } from "@/services/dtos/enums";
import { UserPersonalInformationDetailModel } from "@/models/userModels";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form component.
import FormLabel from "@forms/FormLabelComponent.vue";

// Model.
const model = defineModel<UserPersonalInformationDetailModel>({ required: true });
</script>

<template>
    <MainBlock title="Thông tin cá nhân" body-padding="2">
        <template #body>
            <!-- Gender -->
            <div class="row gx-3">
                <div class="col col-12">
                    <FormLabel text="Giới tính" />
                </div>
                <div class="col field">
                    <span v-if="model.gender === Gender.Male">Nam</span>
                    <span v-else>Nữ</span>
                </div>
            </div>
            
            <!-- Birthday -->
            <div class="row gx-3 mt-3" v-if="model.birthday">
                <div class="col col-12">
                    <FormLabel text="Ngày sinh" />
                </div>
                <div class="col field">
                    <span>{{ model.birthday }}</span>
                </div>
            </div>

            <!-- PhoneNumber -->
            <div class="row gx-3 mt-3" v-if="model.phoneNumber">
                <div class="col col-12">
                    <FormLabel text="Số điện thoại" />
                </div>
                <div class="col field">
                    <span>{{ model.phoneNumber }}</span>
                </div>
            </div>

            <!-- Email -->
            <div class="row gx-3 mt-3" v-if="model.email">
                <div class="col col-12">
                    <FormLabel text="Email" />
                </div>
                <div class="col field">
                    <span>{{ model.email }}</span>
                </div>
            </div>
        </template>
    </MainBlock>
</template>

<style scoped>
.field {
    color: var(--bs-primary);
}
</style>