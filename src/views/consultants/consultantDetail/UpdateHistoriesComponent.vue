<script setup lang="ts">
import type { ConsultantUpdateHistoryModel } from "@/models/consultantUpdateHistoryModels";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout components.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Form components.
import FormLabel from "@forms/FormLabelComponent.vue";

// Dependencies.
const amountUtility = useAmountUtility();

// Model and states.
const model = defineModel<ConsultantUpdateHistoryModel[]>({ required: true });
const columnClass = "col col-md-6 col-12 d-flex flex-column";

// Functions.
function isStatsDateTimeVisible(updateHistory: ConsultantUpdateHistoryModel): boolean {
    return updateHistory.oldStatsDateTime != updateHistory.oldStatsDateTime;
}

function isAmountVisible(updateHistory: ConsultantUpdateHistoryModel): boolean {
    return updateHistory.oldAmount != updateHistory.newAmount;
}

function isNoteVisible(updatedHistory: ConsultantUpdateHistoryModel): boolean {
    return updatedHistory.oldNote != updatedHistory.newNote;
}
</script>

<template>
    <MainBlock title="Lịch sử chỉnh sửa" body-padding="0" class="h-100"
            body-class="overflow-hidden">
        <template #body>
            <div class="accordion accordion-flush" id="updateHistory">
                <div class="accordion-item"
                        v-for="(updateHistory, index) in model" :key="index">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="false"
                                aria-controls="flush-collapseOne">
                            <span v-if="updateHistory.updatedReason">
                                {{ updateHistory.updatedReason }}
                            </span>
                            <span class="opacity-50" v-else>Không có lý do chỉnh sửa</span>
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse"
                            data-bs-parent="#updateHistory">
                        <div class="accordion-body">
                            <!-- UpdatedDateTime and Updater -->
                            <div class="row g-3">
                                <!-- UpdatedDateTime -->
                                <div :class="columnClass">
                                    <FormLabel text="Thời gian chỉnh sửa" />
                                    <span class="text-primary">
                                        {{ updateHistory.updatedDateTime }}
                                    </span>
                                </div>

                                <!-- UpdatedUser -->
                                <div :class="columnClass">
                                    <FormLabel text="Nhân viên chỉnh sửa" />
                                    <div class="d-flex justify-content-start
                                                align-items-center">
                                        <img class="img-thumbnail rounded-circle avatar me-2"
                                                :src="updateHistory.updatedUser.avatarUrl">
                                        <RouterLink :to="updateHistory.updatedUser.detailRoute"
                                                class="user-fullname">
                                            {{ updateHistory.updatedUser.fullName }}
                                        </RouterLink>
                                    </div>
                                </div>
                            </div>

                            <!-- Data Comparison -->
                            <!-- StatsDateTime -->
                            <div class="row g-3" v-if="isStatsDateTimeVisible(updateHistory)">
                                <div :class="columnClass">
                                    <FormLabel text="Thời gian thống kê (cũ)" />
                                    <span class="text-primary">
                                        {{ updateHistory.oldStatsDateTime.dateTime }}
                                    </span>
                                </div>

                                <div :class="columnClass">
                                    <FormLabel text="Thời gian thống kê (mới)" />
                                    <span class="text-primary">
                                        {{ updateHistory.newStatsDateTime.dateTime }}
                                    </span>
                                </div>
                            </div>

                            <!-- Amount -->
                            <div class="row g-3" v-if="isAmountVisible(updateHistory)">
                                <div :class="columnClass">
                                    <FormLabel text="Giá tiền (cũ)" />
                                    <span class="text-primary">
                                        {{
                                            amountUtility
                                                .getDisplayText(updateHistory.oldAmount)
                                        }}
                                    </span>
                                </div>

                                <div :class="columnClass">
                                    <FormLabel text="Giá tiền (mới)" />
                                    <span class="text-primary">
                                        {{
                                            amountUtility
                                                .getDisplayText(updateHistory.newAmount)
                                        }}
                                    </span>
                                </div>
                            </div>

                            <!-- Note -->
                            <div class="row g-3" v-if="isNoteVisible(updateHistory)">
                                <div :class="columnClass">
                                    <FormLabel text="Ghi chú (cũ)" />
                                    <span class="text-primary" v-if="updateHistory.oldNote">
                                        {{ updateHistory.oldNote }}
                                    </span>
                                    <span class="opacity-50 text-primary" v-else>
                                        Để trống
                                    </span>
                                </div>

                                <div :class="columnClass">
                                    <FormLabel text="Ghi chú (mới)" />
                                    <span class="text-primary" v-if="updateHistory.newNote">
                                        {{ updateHistory.newNote }}
                                    </span>
                                    <span class="opacity-50 text-primary" v-else>
                                        Để trống
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </MainBlock>
</template>