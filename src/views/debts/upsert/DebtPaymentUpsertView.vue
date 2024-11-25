<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { useDebtPaymentService } from "@/services/debtPaymentService";
import { DebtPaymentUpsertModel } from "@/models/debtPaymentModels";
import { AuthorizationError } from "@/errors";

// Shared component.
import DebtUpsertView, { type Props as DebtUpsertViewProps } from "./DebtUpsertView.vue";

// Props.
const props = defineProps<Props>();

// Dependency.
const service = useDebtPaymentService();

// Props for shared component.
const debtUpsertViewProps: DebtUpsertViewProps<DebtPaymentUpsertModel> = {
    type: "debtPayment",
    displayName(displayNameGetter) {
        return displayNameGetter("debtPayment");
    },
    isForCreating: props.isForCreating,
    async initializeModelAsync(route, initialData) {
        if (props.isForCreating) {
            const authorizationResponseDto = initialData.debtPayment.creatingAuthorization;
            if (!authorizationResponseDto) {
                throw new AuthorizationError();
            }

            return new DebtPaymentUpsertModel(authorizationResponseDto.canSetStatsDateTime);
        }

        const debtPaymentId = parseInt(route.params.debtPaymentId as string);
        const responseDto = await service.getDetailAsync(debtPaymentId);
        if (!responseDto.authorization?.canEdit) {
            throw new AuthorizationError();
        }

        return new DebtPaymentUpsertModel(responseDto);
    },
    async submitAsync(model) {
        if (props.isForCreating) {
            model.id = await service.createAsync(model.toRequestDto());
        } else {
            await service.updateAsync(model.id, model.toRequestDto());
        }
    },
    async onSubmissionSucceededAsync(model, router) {
        await router.push({
            name: "debtPaymentDetail",
            params: { debtPaymentId: model.id }
        });
    },
    async deleteAsync(id) {
        await service.deleteAsync(id);
    },
    async onDeletionSucceededAsync(router) {
        await router.push({ name: "debtPaymentList" });
    }
}
</script>

<template>
    <DebtUpsertView v-bind="debtUpsertViewProps" />
</template>