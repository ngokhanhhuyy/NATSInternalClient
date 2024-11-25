<script lang="ts">
interface Props {
    isForCreating: boolean;
}
</script>

<script setup lang="ts">
import { useDebtIncurrenceService } from "@/services/debtIncurrenceService";
import { DebtIncurrenceUpsertModel } from "@/models/debtIncurrenceModels";
import { AuthorizationError } from "@/errors";

// Shared component.
import DebtUpsertView, { type Props as DebtUpsertViewProps } from "./DebtUpsertView.vue";

// Props.
const props = defineProps<Props>();

// Dependency.
const service = useDebtIncurrenceService();

// Props for shared component.
const debtUpsertViewProps: DebtUpsertViewProps<DebtIncurrenceUpsertModel> = {
    type: "debtIncurrence",
    displayName(displayNameGetter) {
        return displayNameGetter("debtIncurrence");
    },
    isForCreating: props.isForCreating,
    async initializeModelAsync(route, initialData) {
        if (props.isForCreating) {
            const authorizationResponseDto = initialData.debtIncurrence.creatingAuthorization;
            if (!authorizationResponseDto) {
                throw new AuthorizationError();
            }

            return new DebtIncurrenceUpsertModel(authorizationResponseDto.canSetStatsDateTime);
        }

        const debtIncurrenceId = parseInt(route.params.debtIncurrenceId as string);
        const responseDto = await service.getDetailAsync(debtIncurrenceId);
        if (!responseDto.authorization?.canEdit) {
            throw new AuthorizationError();
        }

        return new DebtIncurrenceUpsertModel(responseDto);
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
            name: "debtIncurrenceDetail",
            params: { debtIncurrenceId: model.id }
        });
    },
    async deleteAsync(id) {
        await service.deleteAsync(id);
    },
    async onDeletionSucceededAsync(router) {
        await router.push({ name: "debtIncurrenceList" });
    }
}
</script>

<template>
    <DebtUpsertView v-bind="debtUpsertViewProps" />
</template>