<script setup lang="ts">
import { useAuthorizationService } from "@/services/authorizationService";
import { OrderUpsertModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import {
    FormLabel, DateTimeInput, TextInput,
    ValidationMessage } from "@/components/formInputs";

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
                <div class="col col-12 mb-3" v-if="authorizationService.canSetOrderOrderedDateTime()">
                    <FormLabel name="Ngày giờ đặt hàng" />
                    <DateTimeInput property-path="orderedDateTime"
                            v-model="model.orderedDateTime" />
                    <ValidationMessage property-path="orderedDateTime" />
                </div>

                <!-- Note -->
                <div class="col col-12">
                    <FormLabel name="Ghi chú" />
                    <TextInput type="textarea" property-path="note"
                            v-model="model.note" placeholder="Ghi chú ..." />
                    <ValidationMessage property-path="note" />
                </div>
            </div>
        </template>
    </MainBlock>
</template>