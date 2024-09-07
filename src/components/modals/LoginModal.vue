<script lang="ts">
interface Model {
    password: string;
}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
import { useAuthenticationService } from "@/services/authenticationService";
import { ModelState } from "@/services/modelState";
import { useAuthStore } from "@/stores/auth";
import type { LoginRequestDto } from "@/services/dtos/requestDtos/userRequestDtos";
import { ValidationError, OperationError } from "@/services/exceptions";

// Async components loading.
const ValidationMessage = defineAsyncComponent(() => import("@/components/formInputs/ValidationMessage.vue"));

// Dependencies.
const authenticationService = useAuthenticationService();
const authStore = useAuthStore();
const router = useRouter();

// Models and states.
const model = reactive<Model>({ password: "" });
const modelState = reactive(new ModelState());
const waitingForResponse = ref<boolean>(false);
const modal = ref<Modal>();
const loginButtonDisabled = computed<boolean>(() => {
    return !model.password || waitingForResponse.value;
});

// Promise resolve
let promiseResolve: () => void;

// Life cycle hooks.
onMounted(() => { modal.value = new Modal("#login-modal"); })

// Functions.
function openModal(): PromiseLike<void> {
    modal.value!.show();
    return new Promise(resolve => promiseResolve = resolve);
}

function closeModal(): void {
    modal.value!.hide();
    model.password = "";
    modelState.resetErrors();
    promiseResolve();
}

async function onLoginButtonClicked(): Promise<void> {
    const requestDto: LoginRequestDto = {
        userName: authStore.userName!,
        password: model.password
    };
    try {
        const responseDto = await authenticationService.getAccessTokenAsync(requestDto);
        authStore.setAccessToken(responseDto.accessToken);
        authStore.setRefreshToken(responseDto.refreshToken);
        closeModal();
    } catch (error) {
        if (error instanceof ValidationError || error instanceof OperationError) {
            modelState.setErrors(error.errors);
        } else {
            throw error;
        }
    }
}

async function onLogoutButtonClicked(): Promise<void> {
    authStore.clearTokens();
    authStore.clearUserName();
    await router.push({ name: "login" });
    closeModal();
}

defineExpose({ openModal });
</script>

<template>
    <div class="modal fade text-center"
            id="login-modal" tabindex="-1"
            data-bs-backdrop="static" data-bs-keyboard="false"
            aria-labelledby="modal-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mx-auto">
            <div class="modal-content">
                <div class="modal-header d-flex flex-row justify-content-between">
                    <h1 class="modal-title fs-5" id="login-modal-label">
                        Phiên đăng nhập hết hạn
                    </h1>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div class="d-flex flex-column align-items-start mb-3">
                            <label class="text-primary">Phiên đăng nhập đã hết hạn.</label>
                            <label class="text-primary">Vui lòng nhập mật khẩu để đăng nhập lại.</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" placeholder=""
                                    maxlength="20" v-model="model.password">
                            <label class="opacity-75">Mật khẩu</label>
                        </div>
                        <ValidationMessage :model-state="modelState" property-path="password" />
                    </div>
                </div>
                <div class="modal-footer d-flex">
                    <button class="btn btn-outline-danger" @click="onLogoutButtonClicked">
                        Đăng xuất
                    </button>
                    <button class="btn btn-primary ms-2" :disabled="loginButtonDisabled"
                            @click="onLoginButtonClicked">
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>