<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts" generic="TUpsertModel extends IProductExportableUpsertModel">
import { useAuthorizationService } from "@/services/authorizationService";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import DateTimeInput from "@forms/DateTimeInputComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const authorizationService = useAuthorizationService();

// Model.
const model = defineModel<TUpsertModel>({ required: true });
</script>

<template>
    <MainBlock title="Thông tin đơn đặt hàng" close-button :body-padding="[0, 2, 2, 2]">
        <template #body>
            <div class="row g-3">
                <!-- StatsDateTime -->
                <div class="col col-12" v-if="authorizationService.canSetOrderStatsDateTime()">
                    <FormLabel name="Ngày giờ thanh toán" />
                    <div class="input-group">
                        <DateTimeInput property-path="statsDateTime"
                                v-model="model.statsDateTime"
                                :disabled="!model.statsDateTimeSpecified" />
                        <button class="btn btn-danger"
                                @click="model.statsDateTimeSpecified = false"
                                v-if="model.statsDateTimeSpecified">
                            <i class="bi bi-x-lg"></i>
                            <span class="d-sm-inline d-none ms-2">Huỷ</span>
                        </button>
                        <button class="btn btn-primary"
                                @click="model.statsDateTimeSpecified = true"
                                v-else>
                            <i class="bi bi-pencil-square"></i>
                            <span class="d-sm-inline d-none ms-2">Sửa</span>
                        </button>
                    </div>
                    <ValidationMessage property-path="statsDateTime" />
                </div>

                <slot></slot>

                <!-- Note -->
                <div class="col col-12">
                    <FormLabel name="Ghi chú" />
                    <TextInput type="textarea" property-path="note"
                            v-model="model.note" placeholder="Ghi chú ..." />
                    <ValidationMessage property-path="note" />
                </div>

                <!-- UpdatedReason -->
                <div class="col col-12" v-if="!props.isForCreating">
                    <FormLabel name="Lý do chỉnh sửa" required />
                    <TextInput type="textarea" property-path="updatedReason"
                            v-model="model.updatedReason" placeholder="Lý do chỉnh sửa" />
                    <ValidationMessage property-path="updatedReason" />
                </div>
            </div>
        </template>
    </MainBlock>
</template>