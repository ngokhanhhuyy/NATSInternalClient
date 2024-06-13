<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { Modal } from "bootstrap";

interface Props { show: boolean; hasCancelButton?: boolean; }
interface Emits {
    (event: "cancelButtonClicked"): void;
    (event: "okButtonClicked"): void;
}

const props = withDefaults(defineProps<Props>(), { hasCancelButton: true });
const emit = defineEmits<Emits>()
let modal: Modal | null = null;

onMounted(() => modal = new Modal("#submit-success-modal"));
onUnmounted(() => {
    try {
        modal!.dispose();
    } catch {
        // Do nothing;
    }
});
watch(() => props.show, (show) => show ? modal!.show() : modal!.hide());

function onCancelButtonClicked() {
    modal!.hide();
    emit("cancelButtonClicked");
}

function onOkButtonClicked() {
    modal!.hide();
    modal!.dispose();
    emit("okButtonClicked");
}

</script>

<template>
    <div class="modal fade text-center" id="submit-success-modal" tabindex="-1" 
            aria-labelledby="submit-success-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mx-auto">
            <div class="modal-content">
                <div class="modal-header d-flex flex-row justify-content-between">
                    <h1 class="modal-title fs-5" id="submit-success-modal-label">
                        <slot name="title">Lưu thành công</slot>
                    </h1>
                    <button type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body row px-4">
                    <div class="col col-auto pe-3">
                        <i class="bi bi-exclamation-circle-fill fs-1 text-success"></i>
                    </div>
                    <div class="col d-flex flex-column justify-content-center
                                align-items-start text-start">
                        <slot name="content">
                            <span>Dữ liệu đã được lưu thành công.</span>
                            <span>Bạn có thể tiếp tục chỉnh sửa hoặc quay lại trang trước.</span>
                            <span>Bạn có muốn quay lại trang trước không?</span>
                        </slot>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary me-2"
                            @click="onCancelButtonClicked"
                            v-if="hasCancelButton">
                        Huỷ bỏ
                    </button>
                    <button class="btn btn-primary me-2" 
                            @click="onOkButtonClicked">
                        <slot name="ok-button-content">
                            Đồng ý
                        </slot>
                </button>
                </div>
            </div>
        </div>
    </div>
</template>