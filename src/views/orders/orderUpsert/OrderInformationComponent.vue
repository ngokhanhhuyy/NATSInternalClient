<script setup lang="ts">
// Interface.
interface Props {
    isForCreating: boolean;
}

// Imports.
import { useAuthorizationService } from "@/services/authorizationService";
import { OrderUpsertModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, DateTimeInput, TextInput,
    ValidationMessage } from "@/components/formInputs";

// Props.
const props = defineProps<Props>();

// Dependencies.
const authorizationService = useAuthorizationService();

// Model.
const model = defineModel<OrderUpsertModel>({ required: true });
</script>

<template>
    <MainBlock title="Thông tin đơn đặt hàng" close-button :body-padding="[2, 2, 3, 2]">
        <template #body>
            <div class="row g-3">
                <!-- OrderedDateTime -->
                <div class="col col-12 mb-3"
                        v-if="authorizationService.canSetOrderPaidDateTime()">
                    <FormLabel name="Ngày giờ thanh toán" />
                    <div class="input-group">
                        <DateTimeInput property-path="paidDateTime"
                                v-model="model.paidDateTime"
                                :disabled="!model.paidDateTimeSpecified" />
                        <button class="btn btn-danger"
                                @click="model.paidDateTimeSpecified = false"
                                v-if="model.paidDateTimeSpecified">
                            <i class="bi bi-x-lg"></i>
                            <span class="d-sm-inline d-none ms-2">Huỷ</span>
                        </button>
                        <button class="btn btn-primary"
                                @click="model.paidDateTimeSpecified = true"
                                v-else>
                            <i class="bi bi-pencil-square"></i>
                            <span class="d-sm-inline d-none ms-2">Sửa</span>
                        </button>
                    </div>
                    <ValidationMessage property-path="paidDateTime" />
                </div>

                <!-- Note -->
                <div class="col col-12 mb-3"> 
                    <FormLabel name="Ghi chú" />
                    <TextInput type="textarea" property-path="note"
                            v-model="model.note" placeholder="Ghi chú ..." />
                    <ValidationMessage property-path="note" />
                </div>

                <!-- UpdateReason -->
                <div class="col col-12" v-if="!props.isForCreating">
                    <FormLabel name="Lý do chỉnh sửa" required />
                    <TextInput type="textarea" property-path="updateReason"
                            v-model="model.updateReason" placeholder="Lý do chỉnh sửa" />
                    <ValidationMessage property-path="updateReason" />
                </div>
            </div>
        </template>
    </MainBlock>
</template>