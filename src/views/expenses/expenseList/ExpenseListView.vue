<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useViewStates } from "@/composables/viewStatesComposable";
import { useAuthorizationService } from "@/services/authorizationService";
import { useExpenseService } from "@/services/expenseService";
import { ExpenseListModel } from "@/models/expenseModels";

// Layout components.
import { MainContainer, MainBlock, MainPaginator } from "@/views/layouts";

// Dependencies.
const authorizationService = useAuthorizationService();
const expenseService = useExpenseService();

// Model and states.
const model = await initializeModelAsync();
const { loadingState } = useViewStates();
const createRoute = { name: "expenseCreate" };

// Functions.
async function initializeModelAsync(): Promise<ExpenseListModel> {
    const model = reactive(new ExpenseListModel());
    const responseDto = await expenseService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    return model;
} 
</script>

<template>
    <MainContainer>
        <div class="row g-3 p-0 justify-content-center">
            <div class="col col-12">
                <!-- Filter -->
                <MainBlock title="Danh sách nhập hàng" :body-padding="[2, 2, 0, 2]"
                            body-class="row g-3"
                            :close-button="!authorizationService.canCreateExpense()">
                    <template #header v-if="authorizationService.canCreateExpense()">
                        <RouterLink :to="createRoute" class="btn btn-primary btn-sm">
                            <i class="bi bi-plus-lg"></i>
                            Tạo nhập hàng
                        </RouterLink>
                    </template>
                    <template #body>
                    </template>
                </MainBlock>
            </div>
        </div>
    </MainContainer>
</template>