<script setup lang="ts">
// Interfaces and types.
type Mode = "discardingConfirmation" | "deletingConfirmation" | "notFoundNotification" |
    "forbiddenNotification" | "connectionErrorNotification" | "submitErrorNotification" |
    "submitSuccessNotification" | "unauthorizationConfirmation" |
    "undefinedErrorNotification" | "fileTooLargeConfirmation";

interface ButtonMetaData {
    text: string;
    className?: string;
}

interface ElementsContent {
    title: string;
    content: string[];
    iconClassName: string;
    buttons: {
        cancelButton?: ButtonMetaData;
        okButton: ButtonMetaData;
    };
}

interface Props { mode: Mode }

// Imports.
import { ref, computed, onMounted } from "vue";
import { Modal } from "bootstrap";
import type { IModelStateErrors } from "@/services/exceptions";

// Props.
const props = defineProps<Props>();

// States.
const modal = ref<Modal | null>(null);
const modelStateErrors = ref<string[]>([]);
let promiseResolve: (value: PromiseLike<boolean> | boolean) => void;

// Computed properties.
const errorVisibility = computed<boolean>(() => {
    return props.mode === "submitErrorNotification" && !!Object.keys(modelStateErrors).length;
});

// Life cycle hooks.
onMounted(() => {
    modal.value = new Modal("#" + props.mode);
});

const elementsContent = computeElementsContent();

// Functions.
function computeElementsContent(): ElementsContent {
    if (props.mode == "discardingConfirmation") {
        return {
            title: "Xác nhận huỷ bỏ",
            content: [
                "Mọi thay đổi chưa được lưu sẽ mất.",
                "Bạn có chắc chắn muốn huỷ bỏ?"
            ],
            iconClassName: "bi bi-exclamation-triangle-fill fs-1 text-warning",
            buttons: {
                cancelButton: { text: "Huỷ bỏ", className: "btn btn-primary" },
                okButton: { text: "Chắc chắn", className: "btn btn-outline-danger" }
            }
        };
    } else if (props.mode == "deletingConfirmation") {
        return {
            title: "Xác nhận xoá bỏ",
            content: [
                "Dữ liệu sau khi xoá có thể sẽ không thể khôi phục lại được.",
                "Bạn có chắc chắn muốn xoá bỏ?"
            ],
            iconClassName: "bi bi-exclamation-triangle-fill fs-1 text-warning",
            buttons: {
                cancelButton: { text: "Huỷ bỏ", className: "btn btn-primary" },
                okButton: { text: "Chắc chắn", className: "btn btn-outline-danger" }
            }
        };
    } else if (props.mode == "notFoundNotification") {
        return {
            title: "Không tìm thấy dữ liệu",
            content: [
                "Dữ liệu bạn yêu cầu đã bị xoá hoặc không tồn tại.",
                "Vui lòng kiểm tra lại.",
                "Nếu lỗi này xảy ra nhiều lần, vui lòng báo với nhà phát triển."
            ],
            iconClassName: "bi bi-x-octagon-fill fs-1 text-danger",
            buttons: {
                okButton: { text: "Xác nhận", className: "btn btn-primary" }
            }
        };
    } else if (props.mode == "forbiddenNotification") {
        return {
            title: "Không đủ quyền truy cập",
            content: [
                "Bạn không có quyền truy cập vào dữ liệu này.",
                "Vui lòng kiểm tra lại.",
                "Nếu lỗi này xảy ra nhiều lần, vui lòng báo với nhà phát triển."
            ],
            iconClassName: "bi bi-x-octagon-fill fs-1 text-danger",
            buttons: {
                okButton: { text: "Xác nhận", className: "btn btn-primary" }
            }
        };
    } else if (props.mode == "connectionErrorNotification") {
        return {
            title: "Không thể kết nối đến máy chủ",
            content: [
                "Kết nối đến máy chủ bị gián đoạn.",
                "Vui lòng kiểm tra lại đường truyền internet.",
                "Nếu lỗi này không xuất phát từ thiết bị của bạn, vui lòng báo với nhà phát triển."
            ],
            iconClassName: "bi bi-wifi-off",
            buttons: {
                okButton: { text: "Xác nhận", className: "btn btn-primary" }
            }
        };
    } else if (props.mode == "submitErrorNotification") {
        return{
            title: "Dữ liệu không hợp lệ",
            content: [
                "Dữ liệu đã nhập không hợp lệ.",
                "Vui lòng kiểm tra lại."
            ],
            iconClassName: "bi bi-x-octagon-fill fs-1 text-danger",
            buttons: {
                okButton: { text: "Xác nhận", className: "btn btn-primary" }
            }
        };
    } else if (props.mode == "submitSuccessNotification") {
        return {
            title: "Lưu thành công",
            content: [
                "Dữ liệu đã được lưu thành công."
            ],
            iconClassName: "bi bi-exclamation-circle-fill fs-1 text-success",
            buttons: {
                okButton: { text: "Xác nhận", className: "btn btn-primary" }
            }
        };
    } else if (props.mode === "unauthorizationConfirmation") {
        return {
            title: "Không đủ quyền truy cập",
            content: [
                "Bạn không đủ quyền hạn để truy cập trang này",
                "Bạn sẽ được đưa về trang chủ."
            ],
            iconClassName: "bi bi-x-octagon-fill fs-1 text-danger",
            buttons: {
                okButton: { text: "Xác nhận", className: "btn btn-primary" }
            }
        };
    } else if (props.mode === "fileTooLargeConfirmation") {
        return {
            title: "File tải lên quá lớn",
            content: [
                "File bạn đã tải lên quá lớn và vượt quá dung lượng cho phép.",
                "Hãy đảm bảo rằng file tải lên có dung lượng không vượt quá 2Mb"
            ],
            iconClassName: "bi bi-x-octagon-fill fs-1 text-danger",
            buttons: {
                okButton: { text: "Xác nhận", className: "btn btn-primary" }
            }
        };
    } else {
        return {
            title: "Lỗi không xác định",
            content: [
                "Đã xảy ra lỗi không xác định.",
                "Vui lòng báo với nhà phát triển để khắc phục trong thời gian sớm nhất."
            ],
            iconClassName: "bi bi-x-octagon-fill fs-1 text-danger",
            buttons: {
                okButton: { text: "Xác nhận", className: "btn btn-primary" }
            }
        };
    }
}

function openModal(): PromiseLike<boolean> {
    return new Promise<boolean>((resolve) => {
        promiseResolve = resolve;
        modal.value?.show();
    });
}

function openErrorModel(errors: IModelStateErrors): PromiseLike<boolean> {
    for (const property of Object.keys(errors)) {
        const errorsByProperties = errors[property as keyof typeof errors];
        for (const error of errorsByProperties) {
            modelStateErrors.value.push(error);
        }
    }

    return new Promise<boolean>((resolve) => {
        promiseResolve = resolve;
        modal.value?.show();
    });
}

function onOkButtonClicked(): void {
    promiseResolve(true);
    modal.value?.hide();
    modelStateErrors.value = [];
}

function onCancelButtonClicked(): void {
    promiseResolve(false);
    modal.value?.hide();
    modelStateErrors.value = [];
}


// Expose.
defineExpose({ openModal, openErrorModel });
</script>

<template>
    <div class="modal fade text-center px-2"
            :id="props.mode" tabindex="-1"
            aria-labelledby="modal-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered mx-auto">
            <div class="modal-content">
                <!-- Header -->
                <div class="modal-header d-flex flex-row justify-content-between">
                    <h1 class="modal-title fs-5" id="modal-label">
                        {{ elementsContent.title }}
                    </h1>
                    <button type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"
                            v-if="elementsContent.buttons.cancelButton"
                            @click="onCancelButtonClicked">
                    </button>
                </div>

                <!-- Body -->
                <div class="modal-body">
                    <div class="row px-4">
                        <div class="col col-auto pe-3">
                            <i :class="elementsContent.iconClassName"></i>
                        </div>
                        <div class="col d-flex flex-column justify-content-center
                                    align-items-start">
                            <span class="text-start" :key="text"
                                    v-for="text in elementsContent.content">
                                {{ text }}
                            </span>
                        </div>
                    </div>
                    <div class="row" v-if="errorVisibility">
                        <div class="col col-12">
                            <div class="alert alert-danger text-start mt-2 py-1"
                                    :key="index"
                                    v-for="(error, index) of modelStateErrors">
                                <div class="text-danger">{{ error }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="me-2"
                            :class="elementsContent.buttons.cancelButton.className"
                            @click="onCancelButtonClicked"
                            v-if="elementsContent.buttons.cancelButton">
                        {{ elementsContent.buttons.cancelButton.text }}
                    </button>
                    <button :class="elementsContent.buttons.okButton.className"
                            @click="onOkButtonClicked"
                            v-if="elementsContent.buttons.okButton">
                        {{ elementsContent.buttons.okButton.text }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>