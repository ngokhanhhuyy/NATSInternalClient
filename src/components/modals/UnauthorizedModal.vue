<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "bootstrap";
import { useUnauthorizedModalStore } from "@/stores/unauthorizedModal";

const router = useRouter();
const unauthorizedModalStore = useUnauthorizedModalStore();

let modal: Modal | null = null;

onMounted(() => modal = new Modal("#unauthorized-modal"));
watch(
    () => unauthorizedModalStore.isVisible,
    (isVisible) => isVisible ? modal!.show() : modal!.hide());

function onOkButtonClicked() {
    unauthorizedModalStore.hide();
    router.replace({ name: "home" });
}
</script>

<template>
    <div class="modal fade text-center px-2"
            id="unauthorized-modal" tabindex="-1" 
            data-bs-backdrop="static"
            aria-labelledby="unauthorized-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mx-auto">
            <div class="modal-content">
                <div class="modal-header d-flex flex-row justify-content-between">
                    <h1 class="modal-title fs-5" id="unauthorized-modal-label">
                        Không có quyền truy cập
                    </h1>
                </div>
                <div class="modal-body row px-4">
                    <div class="col col-auto pe-3">
                        <i class="bi bi-x-octagon-fill fs-1 text-danger"></i>
                    </div>
                    <div class="col d-flex flex-column justify-content-center align-items-start">
                        <span>Bạn không có đủ quyền hạn để truy cập trang này.</span>
                        <span>Bạn sẽ được đưa trở lại trang chủ.</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary"
                            @click="onOkButtonClicked">
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>