<script setup lang="ts">
// Imports.
import type { RouteLocationRaw } from "vue-router";
import { ConsultantUpdateHistoryModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import { FormLabel } from "@/components/formInputs";

// Model and states.
const model = defineModel<ConsultantUpdateHistoryModel[]>({ required: true });
const columnClass = "col col-md-6 col-12 d-flex flex-column";

// Functions.
function getUserRoute(userId: number): RouteLocationRaw {
    return {
        name: "userProfile",
        params: {
            userId: userId
        }
    };
}

function isPaidDateTimeVisible(updateHistory: ConsultantUpdateHistoryModel): boolean {
    return updateHistory.oldPaidDateTime != updateHistory.newPaidDateTime;
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
                            {{ updateHistory.reason }}
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse"
                            data-bs-parent="#updateHistory">
                        <div class="accordion-body">
                            <!-- UpdatedDateTime and Updater -->
                            <div class="row g-3">
                                <!-- UpdatedDateTime -->
                                <div :class="columnClass">
                                    <FormLabel name="Thời gian chỉnh sửa" />
                                    <span>{{ updateHistory.updatedDateTime }}</span>
                                </div>

                                <!-- UpdatedUser -->
                                <div :class="columnClass" class="mt-md-0 mt-3">
                                    <FormLabel name="Nhân viên chỉnh sửa" />
                                    <RouterLink :to="getUserRoute(updateHistory.updatedUser.id)">
                                        {{ updateHistory.updatedUser.fullName }}
                                    </RouterLink>
                                </div>
                            </div>

                            <!-- Data Comparison -->
                            <!-- PaidDateTime -->
                            <div class="row g-3" v-if="isPaidDateTimeVisible(updateHistory)">
                                <div :class="columnClass">
                                    <FormLabel name="Thời gian thanh toán (cũ)" />
                                    <span>{{ updateHistory.oldPaidDateTime }}</span>
                                </div>

                                <div :class="columnClass" class="mt-md-0 mt-3">
                                    <FormLabel name="Thời gian thanh toán (mới)" />
                                    <span>{{ updateHistory.newPaidDateTime }}</span>
                                </div>
                            </div>

                            <!-- Amount -->
                            <div class="row g-3" v-if="isAmountVisible(updateHistory)">
                                <div :class="columnClass">
                                    <FormLabel name="Giá tiền (cũ)" />
                                    <span>
                                        {{
                                            updateHistory.oldAmount
                                                .toLocaleString()
                                                .replaceAll(",", " ")
                                                .replaceAll(".", " ")
                                        }}vnđ
                                    </span>
                                </div>

                                <div :class="columnClass" class="mt-md-0 mt-3">
                                    <FormLabel name="Giá tiền (mới)" />
                                    <span>
                                        {{
                                            updateHistory.newAmount
                                                .toLocaleString()
                                                .replaceAll(",", " ")
                                                .replaceAll(".", " ")
                                        }}vnđ
                                    </span>
                                </div>
                            </div>

                            <!-- Note -->
                            <div class="row g-3" v-if="isNoteVisible(updateHistory)">
                                <div :class="columnClass">
                                    <FormLabel name="Ghi chú (cũ)" />
                                    <span v-if="updateHistory.oldNote">{{ updateHistory.oldNote }}</span>
                                    <span class="opacity-50" v-else>Để trống</span>
                                </div>

                                <div :class="columnClass" class="mt-md-0 mt-3">
                                    <FormLabel name="Ghi chú (mới)" />
                                    <span v-if="updateHistory.newNote">{{ updateHistory.newNote }}</span>
                                    <span class="opacity-50" v-else>Để trống</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </MainBlock>
</template>