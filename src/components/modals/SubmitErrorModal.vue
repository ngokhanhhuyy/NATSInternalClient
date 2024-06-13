<script setup lang="ts">
import { onMounted, watch } from "vue";
import { Modal } from "bootstrap";

interface Props { show: boolean; }
interface Emits {
    (event: "okButtonClicked"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
let modal: Modal | null = null;

onMounted(() => modal = new Modal("#submit-error-modal"));
watch(() => props.show, (show) => show ? modal!.show() : modal!.hide());

function onOkButtonClicked() {
    modal!.hide();
    emit("okButtonClicked");
}
</script>

<template>
    <div class="modal fade text-center px-2"
            id="submit-error-modal" tabindex="-1" 
            aria-labelledby="submit-error-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mx-auto">
            <div class="modal-content">
                <div class="modal-header d-flex flex-row justify-content-between">
                    <h1 class="modal-title fs-5" id="submit-error-modal-label">
                        Dữ liệu không hợp lệ
                    </h1>
                    <button type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body row px-4">
                    <div class="col col-auto pe-3">
                        <i class="bi bi-x-octagon-fill fs-1 text-danger"></i>
                    </div>
                    <div class="col d-flex flex-column justify-content-center align-items-start">
                        <span>Dữ liệu đã nhập không hợp lệ.</span>
                        <span>Vui lòng kiểm tra lại.</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" data-bs-dismiss="modal"
                            @click="onOkButtonClicked">
                        Kiểm tra lại
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>