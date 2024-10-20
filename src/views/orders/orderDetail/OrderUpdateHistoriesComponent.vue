<script setup lang="ts">
// Imports.
import type { RouteLocationRaw } from "vue-router";
import { OrderItemUpdateHistoryModel, OrderUpdateHistoryModel } from "@/models";

// Layout components.
import { MainBlock } from "@/views/layouts";

// Form components.
import { FormLabel } from "@/components/formInputs";

// Model and states.
const model = defineModel<OrderUpdateHistoryModel[]>();
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

function getItemMainText(item: OrderItemUpdateHistoryModel): string {
    return `${item.productName} × ${item.quantity}`;
}

function getItemSubText(item: OrderItemUpdateHistoryModel): string {
    return `${getItemAmountText(item.productAmountPerUnit)} + ${item.vatAmountPerUnit}% VAT`;
}

function getItemAmountText(itemAmount: number): string {
    return itemAmount.toLocaleString().replaceAll(",", " ") + "đ";
}

function isPaidDateTimeVisible(updateHistory: OrderUpdateHistoryModel): boolean {
    return updateHistory.oldStatsDateTime != updateHistory.newStatsDateTime;
}

function isNoteVisible(updatedHistory: OrderUpdateHistoryModel): boolean {
    return updatedHistory.oldNote != updatedHistory.newNote;
}

function areItemsVisible(updateHistory: OrderUpdateHistoryModel): boolean {
    const oldItemsJson = JSON.stringify(updateHistory.oldItems);
    const newItemsJson = JSON.stringify(updateHistory.newItems);
    return oldItemsJson != newItemsJson;
}
</script>

<template>
    <MainBlock title="Lịch sử chỉnh sửa" body-padding="0" class="h-100"
            body-class="overflow-hidden">
        <template #body>
            <div class="accordion accordion-flush" id="updateHistory">
                <div class="accordion-item" v-for="(updateHistory, index) in model" :key="index">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
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

                            <!-- Items -->
                            <div class="row g-3" v-if="areItemsVisible(updateHistory)">
                                <div :class="columnClass">
                                    <FormLabel name="Danh sách sản phẩm (cũ)" />
                                    <ol>
                                        <li v-for="(item, index) in updateHistory.oldItems"
                                                :key="index">
                                            <span>{{ getItemMainText(item) }}</span><br/>
                                            <span class="small opacity-75">
                                                {{ getItemSubText(item) }}
                                            </span>
                                        </li>
                                    </ol>
                                </div>

                                <div :class="columnClass" class="mt-md-0 mt-3">
                                    <FormLabel name="Danh sách sản phẩm (mới)" />
                                    <ol>
                                        <li v-for="(item, index) in updateHistory.newItems"
                                                :key="index">
                                            <span>{{ getItemMainText(item) }}</span><br/>
                                            <span class="small opacity-75">
                                                {{ getItemSubText(item) }}
                                            </span>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </MainBlock>
</template>