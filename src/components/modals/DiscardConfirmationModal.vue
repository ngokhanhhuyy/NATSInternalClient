<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { Modal } from "bootstrap";

interface Props { show: boolean; }

interface Emits {
    (event: "okButtonClicked"): void;
    (event: "cancelButtonClicked"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>()
let modal: Modal | null = null;

onMounted(() => { modal = new Modal("#discard-confirmation-modal") });
watch(() => props.show, (show) => show ? modal!.show() : modal!.hide());

function onCancelButtonClicked() {
    modal!.hide();
    emit("cancelButtonClicked");
}

function onOkButtonClicked() {
    modal!.hide();
    emit("okButtonClicked");
}
</script>

<template>
    <div class="modal fade text-center" id="discard-confirmation-modal" tabindex="-1" 
            aria-labelledby="discard-confirmation-modal-label" aria-hidden="true"
            :key="useRoute().path">
        <div class="modal-dialog modal-dialog-centered mx-auto">
            <div class="modal-content">
                <div class="modal-header d-flex flex-row justify-content-between">
                    <h1 class="modal-title fs-5" id="discard-confirmation-modal-label">
                        Xác nhận huỷ bỏ
                    </h1>
                    <button type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body row px-4">
                    <div class="col col-auto pe-3">
                        <i class="bi bi-exclamation-triangle-fill fs-1 text-warning"></i>
                    </div>
                    <div class="col d-flex flex-column justify-content-center align-items-start">
                        <span>Mọi thay đổi chưa được lưu sẽ mất.</span>
                        <span>Bạn có chắc chắn muốn huỷ bỏ?</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary me-2"
                            @click="onCancelButtonClicked">
                        Đóng
                    </button>
                    <button class="btn btn-outline-danger" data-bs-dismiss="modal"
                            @click="onOkButtonClicked">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>