<script lang="ts">
interface States {
    commonError: string | null;
    loggedIn: boolean;
}
</script>

<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthenticationService } from "@/services/authenticationService";
import { BadRequestError, ConnectionError, InternalServerError,
    OperationError } from "@/services/exceptions";
import { SignInModel } from "@/models/signInModels";
import { useUpsertViewStates } from "@/composables";
import { useAuthStore } from "@/stores/auth";

// Dependencies.
const route = useRoute();
const router = useRouter();
const authenticationService = useAuthenticationService();
const authStore = useAuthStore();

// Models and states.
const model = reactive(new SignInModel());
const { modelState, loadingState, clearLeavingConfirmation } = useUpsertViewStates();
clearLeavingConfirmation();
const states = reactive<States>({
    commonError: null,
    loggedIn: false
});


// Functions.
function isRequiredFieldsFilled(): boolean {
    let userNameFilled = model.userName.length > 0;
    let passwordFilled = model.password.length > 0;
    return !(!userNameFilled || !passwordFilled);
}

async function login(): Promise<void> {
    loadingState.isLoading = true;
    states.commonError = null;
    modelState.resetErrors();
    try {
        await authenticationService.signInAsync(model.toRequestDto());
        authStore.isAuthenticated = true;
        loadingState.isLoading = false;
        states.loggedIn = true;
        await new Promise(resolve => { setTimeout(() => resolve(undefined), 1000); });
        const returningPath = route.query.returningPath as string | undefined;
        if (returningPath) {
            await router.push({ path: returningPath });
            console.log("push");
        } else {
            await router.push({ name: "home", });
            console.log("push");
        }
    } catch (exception) {
        model.password = "";
        if (exception instanceof BadRequestError ||
                exception instanceof OperationError) {
            modelState.setErrors(exception.errors);
        } else if (exception instanceof InternalServerError) {
            states.commonError = "Đã xảy ra lỗi từ máy chủ";
        } else if (exception instanceof ConnectionError) {
            states.commonError = "Không thể kết nối đến máy chủ";
        } else {
            states.commonError = "Đã xảy ra lỗi không xác định";
            throw exception;
        }
        loadingState.isLoading = false;
    }
}

function onEnterKeyPressed() {
    if (isRequiredFieldsFilled()) {
        login();
    }
}
</script>

<template>
    <div class="container-fluid d-flex flex-column flex-fill
                justify-content-center w-100"
            @keyup.enter="() => onEnterKeyPressed()">
        <div class="row py-3 g-3 justify-content-center">
            <div class="col col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-8
                        col-12 d-flex align-items-center">
                <div class="block bg-white border border-primary-subtle
                            rounded-3 shadow-sm w-100 p-3">
                    <div class="form-group mb-3">
                        <div class="form-floating">
                            <input type="text" class="form-control"
                                    :class='modelState.inputClass("userName")'
                                    placeholder="" v-model="model.userName" />
                            <label class="form-label">Tên tài khoản</label>
                        </div>
                        <span :class='modelState.messageClass("userName")'
                                v-show='modelState.hasError("userName")'>
                            {{ modelState.getMessage("userName") }}
                        </span>
                    </div>

                    <div class="form-group mb-3">
                        <div class="form-floating">
                            <input type="password" class="form-control"
                                    :class='modelState.inputClass("password")'
                                    placeholder="" v-model="model.password" />
                            <label class="form-label">Mật khẩu</label>
                        </div>
                        <span :class='modelState.messageClass("password")'
                                v-show='modelState.hasError("password")'>
                            {{ modelState.getMessage("password") }}
                        </span>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary w-100"
                                :disabled="!isRequiredFieldsFilled()"
                                @click="login"
                                v-show="!states.loggedIn">
                            <span v-show="!loadingState.isLoading">Login</span>
                            <span class="spinner-border spinner-border-sm" aria-hidden="true"
                                    v-show="loadingState.isLoading"></span>
                        </button>
                        <span class="alert alert-danger d-flex justify-content-center
                                    mt-3 w-100"
                                v-if="states.commonError">
                            <i class="bi bi-exclamation-triangle-fill me-1"></i>
                            {{ states.commonError }}
                        </span>
                        <span class="alert alert-success d-flex justify-content-center w-100"
                                v-if="states.loggedIn">
                            <i class="bi bi-check-circle-fill me-1"></i>
                            Đăng nhập thành công!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.form-group .form-floating .form-label {
    font-weight: normal;
    background: transparent !important;
}

.container-fluid {
    width: 100vw;
    max-width: 100%;
    min-height: 100%;
}

.block {
    border-radius: 0.5rem;
}
</style>

<style>
#app {
    max-width: 100vw !important;
}
</style>