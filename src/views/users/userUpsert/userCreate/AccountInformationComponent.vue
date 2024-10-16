<script setup lang="ts">
// Imports.
import { UserCreateModel } from "@/models";

// Layout components.
import { SubBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, TextInput, PasswordInput,
    ValidationMessage } from "@/components/formInputs";

// Model.
const model = defineModel<UserCreateModel>({ required: true });
</script>

<template>
    <SubBlock title="Thông tin tài khoản" body-class="row g-3" border-top="0">
        <!-- UserName -->
        <div class="col col-12 mb-3">
            <div class="form-group">
                <FormLabel name="Tên đăng nhập" required />
                <div class="input-group">
                    <span class="input-group-text border-end-0">@</span>
                    <TextInput property-path="userName" regex="a-zA-Z0-9_"
                            maxlength="20" placeholder="nguyenvana"
                            v-model="model.userName"/>
                </div>
                <ValidationMessage property-path="userName" />
            </div>
        </div>

        <!-- Password -->
        <div class="col col-sm-6 col-12 mb-sm-0 mb-3">
            <div class="form-group">
                <FormLabel name="Mật khẩu" required />
                <PasswordInput property-path="password"
                        placeholder="Mật khẩu" maxlength="20"
                        v-model="model.password" />
                <ValidationMessage property-path="password" />
            </div>
        </div>

        <!-- Confirmation password -->
        <div class="col col-sm-6 col-12">
            <div class="form-group">
                <FormLabel name="Xác nhận mật khẩu" required />
                <PasswordInput property-path="confirmationPassword"
                        placeholder="Xác nhận mật khẩu" maxlength="20"
                        v-model="model.confirmationPassword" />
            </div>
            <ValidationMessage property-path="confirmationPassword" />
        </div>
    </SubBlock>
</template>