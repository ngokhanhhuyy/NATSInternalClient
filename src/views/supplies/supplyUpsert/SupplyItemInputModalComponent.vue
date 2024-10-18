<script setup lang="ts">
// Interfaces.
interface Model {
    item: SupplyDetailItemModel | null;
    isForCreating: boolean;
}

// Imports.
import { reactive } from "vue";
import { Modal } from "bootstrap";
import { SupplyDetailItemModel, ProductBasicModel } from "@/models";

// Form components.
import { FormLabel, NumberInput, MoneyInput } from "@/components/formInputs";

// Models and states.
const model = reactive<Model>({ item: null, isForCreating: true });
let modalController: Modal;

// Promise resolve
let creatingPromiseResolve: (item: SupplyDetailItemModel) => void;
let updatingPromiseResolve: (isDeleted: boolean) => void;

// Life cycle hooks.
// onMounted(() => {
//     modalController = Modal.getOrCreateInstance("#supply-item-input-modal");
// });

// Functions.
function createSupplyItemAsync(product: ProductBasicModel): PromiseLike<SupplyDetailItemModel> {
    if (modalController == undefined) {
        modalController = Modal.getOrCreateInstance("#supply-item-input-modal");
    }
    modalController.show();
    model.item = new SupplyDetailItemModel(product);
    model.isForCreating = true;
    return new Promise(resolve => creatingPromiseResolve = resolve);
}

function editSupplyItemAsync(supplyItem: SupplyDetailItemModel): PromiseLike<boolean> {
    if (modalController == undefined) {
        modalController = Modal.getOrCreateInstance("#supply-item-input-modal");
    }
    modalController.show();
    model.item = supplyItem;
    model.isForCreating = false;
    return new Promise(resolve => updatingPromiseResolve = resolve);
}

function onFinished(isDeleted: boolean = false): void {
    if (model.isForCreating) {
        creatingPromiseResolve(model.item!);
    } else {
        updatingPromiseResolve(isDeleted);
    }
    modalController.hide();
}

defineExpose({ createSupplyItemAsync, editSupplyItemAsync });
</script>

<template>
    <div class="modal fade text-center" id="supply-item-input-modal"
            tabindex="-1" data-bs-backdrop="static"
            data-bs-keyboard="false" aria-labelledby="modal-label"
            aria-hidden="true" v-show="model.item">
        <div class="modal-dialog modal-dialog-centered mx-sm-auto mx-3">
            <div class="modal-content">
                <div class="modal-header d-flex flex-row justify-content-between">
                    <h1 class="modal-title fs-5" id="supply-item-input-modal-label">
                        Chi tiết mục nhập hàng
                    </h1>
                </div>
                <div class="modal-body pt-2">
                    <div class="row g-3 justify-content-start text-start"
                            v-if="model.item != null">
                        <!-- Amount -->
                        <div class="col col-sm-6 col-12">
                            <FormLabel :name="`Giá tiền (đ)`" />
                            <MoneyInput currency-sign="đồng" v-model="model.item.productAmountPerUnit" />
                        </div>

                        <!-- SuppliedQuantity -->
                        <div class="col-sm-6 col-12 mt-sm-0 mt-3">
                            <FormLabel :name="`Số lượng (${model.item.product.unit.toLowerCase()})`" />
                            <NumberInput :min="1" :max="99"
                                    v-model="model.item.quantity" />
                        </div>
                    </div>
                </div>

                <!-- Action buttons -->
                <div class="modal-footer d-flex" v-if="model.isForCreating">
                    <!-- Creating mode -->
                    <button class="btn btn-primary" @click="() => onFinished(false)">
                        <i class="bi bi-box-arrow-in-right me-2"></i>
                        <span>Thêm vào danh sách</span>
                    </button>
                </div>

                <!-- Editing mode -->
                <div class="modal-footer d-flex" v-else>
                    <!-- Delete button -->
                    <button class="btn btn-outline-danger me-2" @click="() => onFinished(true)">
                        <i class="bi bi-trash3 me-2"></i>
                        <span>Xoá</span>
                    </button>

                    <!-- Confirmation button -->
                    <button class="btn btn-primary" @click="() => onFinished(false)">
                        <i class="bi bi-check-lg me-1"></i>
                        <span>Xong</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>