<script lang="ts">
import type { DebtIncurrenceUpsertModel } from "@/models/debtIncurrenceModels";
import type { DebtPaymentUpsertModel } from "@/models/debtPaymentModels";

type DebtUpsertModel = DebtIncurrenceUpsertModel | DebtPaymentUpsertModel;

export interface Props<TUpsertModel extends DebtUpsertModel> {
    displayName: (displayNameGetter: (key: string) => string) => string;
    initializeModelAsync(route: ReturnType<typeof useRoute>): Promise<TUpsertModel>;
    submitAsync(): Promise<Reactive<TUpsertModel>>;
}
</script>

<script setup lang="ts">
import { computed, type Reactive } from "vue";
import { useRoute } from "vue-router";
</script>