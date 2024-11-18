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

// Functions.
function getIsLockedClass(isLocked: boolean): string {
    return isLocked ? "text-danger" : "text-primary";
}

function getIsLockedIconClass(isLocked: boolean): string {
    const classNames: string[] = ["bi", "me-2"];
    classNames.push(isLocked ? "bi bi-lock" : " bi bi-unlock");
    return classNames.join(" ");
}
</script>

<template>
    <div class="bg-white border rounded-3 overflow-hidden">
        <ul class="list-group list-group-flush" v-if="model.length">
            <li class="list-group-item bg-transparent"
                    v-for="debt in model" :key="debt.id">
                <div class="row gx-3">
                    <!-- Customer Avatar + Details -->
                    <div class="col col-xl-4 col-md-5 col-10 d-flex
                                justify-content-start align-items-center">
                        <!-- Customer Avatar -->
                        <img class="img-thumbnail rounded-circle customer-avatar me-2
                                    flex-shrink-0"
                                :src="debt.customer.avatarUrl">

                        <!-- Customer FullName and Detail visible in small screen -->
                        <div>
                            <!-- Customer FullName -->
                            <RouterLink :to="debt.customer.detailRoute"
                                    class="customer-name d-block fw-bold">
                                {{ debt.customer.fullName }}
                            </RouterLink>

                            <!--  Detail visible in small screen visible in small screen -->
                            <div class="d-md-none d-block">
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
                                <br/>

                                <!-- IsLocked -->
                                <span class="small" :class="getIsLockedClass(debt.isLocked)">
                                    <i :class="getIsLockedIconClass(debt.isLocked)"></i>
                                    {{ debt.isLocked ? "Đã khóa" : "Chưa khóa" }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col col-xl-6 col-md-6 col-5 d-md-flex d-none flex-column
                                justify-content-center align-items-start px-2">
                        <!-- Amount -->
                        <span>
                            <i class="bi bi-cash text-primary me-2"></i>
                            {{ amountUtility.getDisplayText(debt.amount) }}
                        </span>

                        <!-- StatsDateTime -->
                        <span>
                            <i class="bi bi-clock text-primary me-2"></i>
                            {{ debt.statsDateTime }}
                        </span>
                        
                        <!-- IsLocked -->
                        <span :class="getIsLockedClass(debt.isLocked)">
                            <i :class="getIsLockedIconClass(debt.isLocked)"></i>
                            {{ debt.isLocked ? "Đã khóa" : "Chưa khóa" }}
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