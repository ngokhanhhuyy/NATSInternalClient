<script setup lang="ts">
import { onMounted, watch } from "vue";
import { Modal } from "bootstrap";

interface Props { show: boolean; }

interface Emits {
    (event: "okButtonClicked"): void;
    (event: "cancelButtonClicked"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>()
let modal: Modal | null = null;

onMounted(() => modal = new Modal("#delete-confirmation-modal"));
watch(() => props.show, (show) => show ? modal!.show() : modal!.hide());

function onOkButtonClicked() {
    modal!.hide();
    modal!.dispose();
    emit("okButtonClicked");
}

function onCancelButtonClicked() {
    modal!.hide();
    emit("cancelButtonClicked");
}
</script>

<template>
    <div class="modal fade text-center" id="delete-confirmation-modal" tabindex="-1" 
            aria-labelledby="delete-confirmation-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mx-auto">
            <div class="modal-content">
                <div class="modal-header d-flex flex-row justify-content-between">
                    <h1 class="modal-title fs-5" id="delete-confirmation-modal-label">
                        Xác nhận huỷ bỏ
                    </h1>
                    <button type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body row px-4">
                    <div class="col col-auto pe-3">
                        <i class="bi bi-exclamation-triangle-fill fs-1 text-warning"></i>
                    </div>
                    <div class="col d-flex flex-column text-start
                                justify-content-center align-items-start">
                        <span>Dữ liệu sau khi xoá có thể sẽ không thể khôi phục lại được.</span>
                        <span>Bạn có chắc chắn muốn xoá bỏ?</span>
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