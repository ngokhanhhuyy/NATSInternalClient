<script setup lang="ts">
// Imports.
import { UserCreateModel } from "@/models/userModels";

// Layout components.
import SubBlock from "@layouts/SubBlockComponent.vue";

// Form components.
import FormLabel from "@/components/formInputs/FormLabelComponent.vue";
import TextInput from "@/components/formInputs/TextInputComponent.vue";
import PasswordInput from "@/components/formInputs/PasswordInputComponent.vue";
import ValidationMessage from "@/components/formInputs/ValidationMessage.vue";

// Model.
const model = defineModel<UserCreateModel>({ required: true });
</script>

<template>
    <SubBlock title="Thông tin tài khoản" body-class="row g-3" border-top="0">
        <!-- UserName -->
        <div class="col col-12 mb-3">
            <div class="form-group">
                <FormLabel text="Tên đăng nhập" required />
                <div class="input-group">
                    <span class="input-group-text border-end-0">@</span>
                    <TextInput name="userName" regex="a-zA-Z0-9_" maxlength="20"
                            placeholder="nguyenvana" v-model="model.userName"/>
                </div>
                <ValidationMessage name="userName" />
            </div>
        </div>

        <!-- Password -->
        <div class="col col-sm-6 col-12 mb-sm-0 mb-3">
            <div class="form-group">
                <FormLabel text="Mật khẩu" required />
                <PasswordInput name="password" placeholder="Mật khẩu" maxlength="20"
                        v-model="model.password" />
                <ValidationMessage name="password" />
            </div>
        </div>

        <!-- Confirmation password -->
        <div class="col col-sm-6 col-12">
            <div class="form-group">
                <FormLabel text="Xác nhận mật khẩu" required />
                <PasswordInput name="confirmationPassword" placeholder="Xác nhận mật khẩu"
                        maxlength="20" v-model="model.confirmationPassword" />
            </div>
            <ValidationMessage name="confirmationPassword" />
        </div>
    </SubBlock>
</template>