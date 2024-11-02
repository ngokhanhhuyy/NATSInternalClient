<script setup lang="ts" generic="TUpsertModel extends IProductExportableUpsertModel">
import { inject } from "vue";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
import StatsDateTimeInput from "@forms/StatsDateTimeInputComponent.vue";
import TextInput from "@forms/TextInputComponent.vue";
import ValidationMessage from "@forms/ValidationMessage.vue";

// Model.
const model = defineModel<TUpsertModel>({ required: true });
const isForCreating = inject<boolean>("isForCreating")!;

defineExpose({ getModel(): TUpsertModel { return model.value; } });
</script>

<template>
    <MainBlock title="Thông tin đơn đặt hàng" close-button :body-padding="[0, 2, 2, 2]">
        <div class="row g-3">
            <!-- StatsDateTime -->
            <div class="col col-12" v-if="model.authorization.canSetStatsDateTime">
                <FormLabel text="Ngày giờ thanh toán" />
                <StatsDateTimeInput name="statsDateTime" v-model="model.statsDateTime" />
                <ValidationMessage name="statsDateTime`" />
            </div>

            <slot></slot>

            <!-- Note -->
            <div class="col col-12">
                <FormLabel text="Ghi chú" />
                <TextInput type="textarea" name="note"
                        v-model="model.note"
                        placeholder="Ghi chú ..." />
                <ValidationMessage name="note" />
            </div>

            <!-- UpdatedReason -->
            <div class="col col-12" v-if="!isForCreating">
                <FormLabel text="Lý do chỉnh sửa" required />
                <TextInput type="textarea" name="updatedReason"
                        v-model="model.updatedReason"
                        placeholder="Lý do chỉnh sửa" />
                <ValidationMessage name="updatedReason" />
            </div>
        </div>
    </MainBlock>
</template>