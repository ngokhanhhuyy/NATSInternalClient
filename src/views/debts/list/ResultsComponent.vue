<script lang="ts">
interface Props {
    displayName: string;
}
</script>

<script setup lang="ts" generic="
    TBasicModel extends IDebtBasicModel<TAuthorizationModel>,
    TAuthorizationModel extends IHasStatsExistingAuthorizationModel">
import { RouterLink } from "vue-router";
import { useAmountUtility } from "@/utilities/amountUtility";

// Props.
const props = defineProps<Props>();

// Dependency.
const amountUtility = useAmountUtility();

// Model.
const model = defineModel<TBasicModel[]>({ required: true });
</script>

<template>
    <div class="bg-white border rounded-3">
        <ul class="list-group list-group-flush" v-if="model.length">
            <li class="list-group-item bg-transparent"
                    v-for="debt in model" :key="debt.id">
                <div class="row g-0">
                    <!-- Customer Avatar + Details -->
                    <div class="col col-xl-4 col-md-4 col-sm-5 col-10 d-flex
                                justify-content-start align-items-center">
                        <!-- Customer Avatar -->
                        <img class="img-thumbnail rounded-circle customer-avatar me-2
                                    flex-shrink-0"
                                :src="debt.customer.avatarUrl">

                        <!-- Customer FullName and Detail visible in small screen -->
                        <div>
                            <!-- Customer FullName -->
                            <RouterLink :to="debt.customer.detailRoute"
                                    class="customer-name d-block">
                                {{ debt.customer.fullName }}
                            </RouterLink>

                            <!-- Detail -->
                            <div class="d-sm-none d-block small">
                                <!-- Amount -->
                                <span class="small">
                                    <i class="bi bi-cash text-primary me-2"></i>
                                    {{ amountUtility.getDisplayText(debt.amount) }}
                                </span>
                                <br/>
                                <!-- StatsDateTime -->
                                <span class="small">
                                    <i class="bi bi-clock text-primary me-2"></i>
                                    {{ debt.statsDateTime }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col col-xl-6 col-md-6 col-5 d-sm-flex d-none flex-column
                                justify-content-center align-items-start px-2">
                        <!-- Amount -->
                        <span class="small">
                            <i class="bi bi-cash text-primary me-2"></i>
                            {{ amountUtility.getDisplayText(debt.amount) }}
                        </span>

                        <!-- StatsDateTime -->
                        <span class="small">
                            <i class="bi bi-clock text-primary me-2"></i>
                            {{ debt.statsDateTime }}
                        </span>
                    </div>

                    <!-- Detail button -->
                    <div class="col d-flex justify-content-end align-items-center">
                        <RouterLink class="btn btn-outline-primary btn-sm"
                                :to="debt.detailRoute">
                            <i class="bi bi-eye"></i>
                        </RouterLink>
                    </div>
                </div>
            </li>
        </ul>
        
        <!-- Fallback -->
        <div class="p-4 opacity-50 text-center" v-else>
            Không có {{ props.displayName.toLowerCase() }} nào gần đây
        </div>
    </div>
</template>

<style scoped>
.customer-avatar {
    width: 45px;
    height: 45px;
}

.customer-name {
    text-decoration: none;
}

.customer-name:hover {
    text-decoration: underline;
}
</style>