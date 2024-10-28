<script setup lang="ts">
// Interface
interface Props {
    customerId: number;
    resourceType: "Consultant" | "Order" | "Treatment";
}

// Imports.
import { reactive, computed, watch, type Reactive } from "vue";
import { RouterLink, type RouteLocationRaw } from "vue-router";
import { useLoadingState } from "@/composables/loadingStateComposable";
import { useConsultantService } from "@/services/consultantService";
import { useOrderService } from "@/services/orderService";
import { useTreatmentService } from "@/services/treatmentService";
import { ConsultantListModel } from "@/models/consultantModels";
import { OrderListModel } from "@/models/orderModels";
import { TreatmentListModel } from "@/models/treatmentModels";
import { useAmountUtility } from "@/utilities/amountUtility";

// Layout component.
import MainBlock from "@layouts/MainBlockComponent.vue";
import MainBlockPaginator from "@layouts/MainBlockPaginatorComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const consultantService = useConsultantService();
const orderService = useOrderService();
const treatmentService = useTreatmentService();
const amountUtility = useAmountUtility();

// Model and states.
const model: IRevenueListModel = await initialLoadAsync();
const loadingState = useLoadingState();

// Computed properties.
const idPrefix = computed<string>(() => {
    switch (props.resourceType) {
        case "Consultant":
            return "TV";
        case "Order":
            return "BL";
        case "Treatment":
            return "LT";
    }
});

// Watch.
watch(() => model.page, reloadAsync);

// Functions.
async function initialLoadAsync(): Promise<Reactive<IRevenueListModel>> {
    const requestDto: Partial<ICustomerEngageableListRequestDto> = {
        orderByAscending: false,
        ignoreMonthYear: true,
        customerId: props.customerId,
        resultsPerPage: 5,
    };

    switch (props.resourceType) {
        case "Consultant":
            const consultantListResponseDto = await consultantService.getListAsync(requestDto);
            return reactive(new ConsultantListModel(consultantListResponseDto, requestDto));
        case "Order":
            const orderListResponseDto = await orderService.getListAsync(requestDto);
            return reactive(new OrderListModel(orderListResponseDto, requestDto));
        case "Treatment":
            const treatmentListResponseDto = await treatmentService.getListAsync(requestDto);
            return reactive(new TreatmentListModel(treatmentListResponseDto, requestDto));
    }
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await orderService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
    loadingState.isLoading = false;
}

function getIdClass(resource: IRevenueBasicModel): string {
    const color = resource.isLocked ? "primary" : "danger";
    return `bg-${color} text-${color}`;
}

function getDetailRoute(resource: IRevenueBasicModel): RouteLocationRaw {
    switch (props.resourceType) {
        case "Consultant":
            return { name: "consultantDetail", params: { consultantId: resource.id } };
        case "Order":
            return { name: "orderDetail", params: { orderId: resource.id } };
        case "Treatment":
            return { name: "home" };
    }
}
</script>

<template>
    <MainBlock title="Đơn bán lẻ" body-padding="0">
        <template #header>
            <MainBlockPaginator v-model:page="model.page"
                    v-model:page-count="model.pageCount" />
        </template>
        <template #body>
            <ul class="list-group list-group-flush">
                <template v-if="model.items.length">
                    <li class="list-group-item p-0 bg-transparent"
                            v-for="resource in model.items" :key="resource.id">
                        <div class="row g-3 px-2">
                            <div class="col col-xl-2 col-lg-3 col-2 d-flex align-items-center">
                                <!-- Id -->
                                <span class="small text-center fw-bold resource-id
                                            bg-opacity-10 rounded px-2 py-1"
                                        :class="getIdClass(resource)">
                                    #{{ idPrefix }}{{ resource.id }}
                                </span>
                            </div>
                            <div class="col">
                                <!-- Detail -->
                                <div class="row gx-3 gy-0 flex-fill h-100">
                                    <!-- Amount -->
                                    <div class="col col-xl-6 col-lg-12 col-6 d-flex
                                                justify-content-start align-items-center">
                                        <i class="bi bi-cash me-2 text-primary"></i>
                                        <span class="small">
                                            {{
                                                amountUtility
                                                    .getDisplayText(resource.amountAfterVat)
                                            }}
                                        </span>
                                    </div>

                                    <!-- DateTime -->
                                    <div class="col d-flex align-items-center">
                                        <div class="">
                                            <i class="bi bi-calendar-week me-2 text-primary">
                                            </i>
                                            <span class="small">
                                                {{ resource.statsDateTime.deltaText }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Route -->
                            <div class="col col-auto d-flex align-items-center">
                                <RouterLink :to="getDetailRoute(resource)"
                                        class="btn btn-outline-primary btn-sm">
                                    <i class="bi bi-eye"></i>
                                </RouterLink>
                            </div>
                        </div>
                    </li>
                </template>
                <li class="list-group-item p-4 bg-transparent d-flex justify-content-center
                            align-items-center opacity-50"
                        v-else>
                    Không có đơn bán lẻ nào
                </li>
            </ul>
        </template>
    </MainBlock>
</template>

<style scoped>
.resource-id {
    min-width: 50px;
}
</style>