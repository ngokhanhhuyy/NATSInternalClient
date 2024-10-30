<script setup lang="ts" generic="TUpsertModel extends IProductExportableUpsertModel">
import { inject } from "vue";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import ModelForm from "@forms/FormComponent.vue";
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
        <template #body>
            <div class="row g-3">
                <ModelForm v-model="model">
                <!-- StatsDateTime -->
                    <div class="col col-12" v-if="model.authorization.canSetStatsDateTime">
                        <StatsDateTimeInput :property="() => model.statsDateTime" />
                    </div>
                </ModelForm>

                <slot></slot>

                <!-- Note -->
                <div class="col col-12">
                    <FormLabel name="Ghi chú" />
                    <TextInput type="textarea" property-path="note"
                            v-model="model.note" placeholder="Ghi chú ..." />
                    <ValidationMessage property-path="note" />
                </div>

                <!-- UpdatedReason -->
                <div class="col col-12" v-if="!isForCreating">
                    <FormLabel name="Lý do chỉnh sửa" required />
                    <TextInput type="textarea" property-path="updatedReason"
                            v-model="model.updatedReason" placeholder="Lý do chỉnh sửa" />
                    <ValidationMessage property-path="updatedReason" />
                </div>
            </div>
        </template>
    </MainBlock>
</template>