<script lang="ts">
type DebtDetailModel = DebtIncurrenceDetailModel | DebtPaymentDetailModel;

export interface Props<TDetailModel extends DebtDetailModel> {
    displayName: (displayNameGetter: (key: string) => string) => string;
    initializeModelAsync(route: ReturnType<typeof useRoute>): Promise<TDetailModel>;
}
</script>

<script setup lang="ts" generic="TDetailModel extends DebtDetailModel">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useViewStates } from "@/composables/viewStatesComposable";
import type { DebtIncurrenceDetailModel } from "@/models/debtIncurrenceModels";
import type { DebtPaymentDetailModel } from "@/models/debtPaymentModels"
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainContainer from "@layouts/MainContainerComponent.vue";
import MainBlock from "@layouts/MainBlockComponent.vue";
import ResourceAccess from "@/views/shared/ResourceAccessComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";
// Props.
const props = defineProps<Props<TDetailModel>>();

// Dependency.
const route = useRoute();
const amountUtility = useAmountUtility();

// Model and states.
const model = await props.initializeModelAsync(route);
const { getDisplayName } = useViewStates();
const labelColumnClass = "col col-xl-2 col-lg-2 col-md-3 col-sm-4 col-12";

// Computed properties.
const idClass = computed<string>(() => {
    const color = model.isLocked ? "danger" : "primary";
    return `bg-${color}-subtle border border-${color}-subtle \
            rounded px-2 py-1 text-${color} small fw-bold`;
});

const isClosedClass = computed<string>(() => model.isLocked ? "text-danger" : "text-primary");
const isClosedText = computed<string>(() => model.isLocked ? "Đã khoá" : "Chưa khoá");
</script>

<template>
    <MainContainer>
        <div class="row g-3">

            <!-- ResourceAccess -->
            <div class="col col-12">
                <ResourceAccess resource-type="Customer" :resource-primary-id="model.id"
                        accessMode="Detail" />
            </div>

            <!-- Detail -->
            <div class="col col-12">
                <MainBlock :title="`Chi tiết ${displayName(getDisplayName)}`"
                        close-button :body-padding="2">
                    <template #body>
                        <!-- Id -->
                        <div class="row gx-3 mb-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Mã số" />
                            </div>
                            <div class="col">
                                <span :class="idClass">
                                    #{{ model.id }}
                                </span>
                            </div>
                        </div>

                        <!-- Amount -->
                        <div class="row gx-3 mb-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Số tiền" />
                            </div>
                            <div class="col">
                                <span>
                                    {{ amountUtility.getDisplayText(model.amount) }}
                                </span>
                            </div>
                        </div>

                        <!-- CreatedDateTime -->
                        <div class="row gx-3 mb-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Ngày giờ tạo" />
                            </div>
                            <div class="col">
                                <span>{{ model.createdDateTime.dateTime }}</span>
                                <span class="opacity-50">
                                    ({{ model.createdDateTime.deltaText }})
                                </span>
                            </div>
                        </div>

                        <!-- StatsDateTime -->
                        <div class="row gx-3 mb-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Ngày giờ thống kê" />
                            </div>
                            <div class="col">
                                <span>{{ model.statsDateTime.dateTime }}</span>
                                <span class="opacity-50">
                                    ({{ model.statsDateTime.deltaText }})
                                </span>
                            </div>
                        </div>

                        <!-- Note -->
                        <div class="row gx-3 mb-3" v-if="model.note">
                            <div :class="labelColumnClass">
                                <FormLabel text="Ghi chú" />
                            </div>
                            <div class="col">
                                <span>{{ model.note }}</span>
                            </div>
                        </div>

                        <!-- IsClosed -->
                        <div class="row gx-3 mb-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Tình trạng" />
                            </div>
                            <div class="col">
                                <span :class="isClosedClass">{{ isClosedText }}</span>
                            </div>
                        </div>
                        
                        <!-- CreatedUser -->
                        <div class="row gx-3">
                            <div :class="labelColumnClass">
                                <FormLabel text="Người tạo" />
                            </div>
                            <div class="col d-flex justify-content-start align-items-center">
                                <img :src="model.createdUser.avatarUrl"
                                        class="img-thumbnail rounded-circle avatar me-2">
                                <RouterLink :to="model.createdUser.detailRoute"
                                        class="user-fullname">
                                    {{ model.createdUser.fullName }}
                                </RouterLink>
                            </div>
                        </div>
                    </template>
                </MainBlock>
            </div>
        </div>
    </MainContainer>
</template>

<style scoped>
.avatar {
    width: 35px;
    height: 35px;
}
</style>