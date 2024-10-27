<script setup lang="ts">
import { useRouter, type RouteLocationRaw } from "vue-router";
import { CustomerBasicModel } from "@/models/customerModels";

// Dependency.
const router = useRouter();

// Model and state.
const model = defineModel<CustomerBasicModel[]>({ required: true });

// Functions.
function getDetailRoute(customerId: number): RouteLocationRaw {
    return { name: "customerDetail",  params: { customerId: customerId } };
}

function getUpdateRoute(customerId: number): RouteLocationRaw {
    return { name: "customerUpdate", params: { customerId: customerId } };
}
</script>

<template>
    <div class="block-body w-100 flex-fill d-flex justify-content-center align-items-center">
        <!-- List -->
        <ul class="list-group list-group-flush w-100" v-if="model.length">
            <li class="list-group-item d-flex px-3 py-2 align-items-center"
                    :key="customer.id" v-for="customer in model">
                <img class="img-thumbnail rounded-circle" :src="customer.avatarUrl"
                        @click="router.push(getDetailRoute(customer.id))">
                <div class="d-flex flex-column flex-fill ps-3 justify-content-center">
                    <RouterLink :to="getDetailRoute(customer.id)"
                            class="fw-bold text-default fullname">
                        {{ customer.fullName }}
                    </RouterLink>
                    <span class="small">{{ customer.nickName}}</span>
                </div>
                <RouterLink :to="getDetailRoute(customer.id)"
                        class="btn btn-outline-primary btn-sm">
                    <i class="bi bi-eye"></i>
                    <span class="d-sm-inline d-none ms-1">Xem</span>
                </RouterLink>
                <RouterLink :to="getUpdateRoute(customer.id)"
                        class="btn btn-outline-primary btn-sm ms-2"
                        v-if="customer.authorization?.canEdit">
                    <i class="bi bi-pencil-square"></i>
                    <span class="d-sm-inline d-none ms-1">Sửa</span>
                </RouterLink>
            </li>
        </ul>
        
        <div class="opacity-50 my-4" v-else>
            Không tìm thấy kết quả
        </div>
    </div>
</template>

<style scoped>
.img-thumbnail {
    width: 60px;
    height: 60px;
}

.fullname {
    text-decoration: none;
}

.fullname:hover, .fullname.active {
    text-decoration: underline
}
</style>