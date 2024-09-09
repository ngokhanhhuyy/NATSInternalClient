<script setup lang="ts">
// Interface.
interface Props {
    resourceType: string;
    resourcePrimaryId: number;
    resourceSecondaryId?: number;
    accessMode: "Detail" | "Update";
}

// Imports.
import { ref, onMounted, onUnmounted } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { useHubClient, type Resource } from "@/services/hubClient";
import type { UserBasicResponseDto, UserListResponseDto } from "@/services/dtos/responseDtos";
import { ResourceAccessMode } from "@/services/dtos/enums";
import { UserBasicModel } from "@/models";

// Props.
const props = defineProps<Props>();

// Setup hub client.
const hubClient = useHubClient();
hubClient.onSelfResourceAccessStarted(onSelfResourceAccessStarted);
hubClient.onOtherUserResourceAccessStarted(onOtherUserResourceAccessStarted);
hubClient.onOtherUserResourceAccessFinished(onOtherUserResourceAccessFinished);
const resource: Resource = {
    type: props.resourceType,
    primaryId: props.resourcePrimaryId,
    secondaryId: props.resourceSecondaryId ?? null,
    mode: props.accessMode === "Detail"
        ? ResourceAccessMode.Detail
        : ResourceAccessMode.Update
};

// Model.
const model = ref<UserBasicModel[]>([]);

// Life-cycle hooks.
onMounted(async () => {
    await hubClient.startResourceAccess(resource);
});

onUnmounted(async () => {
    hubClient.offSelfResourceAccessStarted(onSelfResourceAccessStarted);
    hubClient.offOtherUserResourceAccessStarted(onOtherUserResourceAccessStarted);
    hubClient.offOtherUserResourceAccessFinished(onOtherUserResourceAccessFinished);
    await hubClient.finishResourceAccess(resource);
});

// Functions.
function onSelfResourceAccessStarted(
        responseResource: Resource,
        responseDto: UserListResponseDto): void {
    if (compareWithResponseResource(responseResource)) {
        console.log(responseDto.results);
        model.value = (responseDto.results ?? []).map(dto => new UserBasicModel(dto));
    }
}

function onOtherUserResourceAccessStarted(
        responseResource: Resource,
        responseDto: UserBasicResponseDto): void {
    if (compareWithResponseResource(responseResource) &&
            !model.value.filter(u => u.id === responseDto.id).length) {
        model.value.push(new UserBasicModel(responseDto));
    }
}

function onOtherUserResourceAccessFinished(responseResource: Resource, userId: number): void {
    if (compareWithResponseResource(responseResource)) {
        model.value = model.value.filter(u => u.id !== userId);
    }
}

function compareWithResponseResource(responseResource: Resource): boolean {
    if (resource === responseResource) {
        return true;
    }

    return resource.type === responseResource.type
        && resource.primaryId === responseResource.primaryId
        && resource.secondaryId === responseResource.secondaryId
        && resource.mode === responseResource.mode;
}

function getUserDetailRoute(userId: number): RouteLocationRaw {
    return {
        name: "userProfile",
        params: { userId: userId }
    };
}
</script>

<template>
    <div class="bg-white border rounded-3 px-3 py-2 d-flex justify-content-start
                align-items-center"
            v-if="model.length">
        <span class="me-3">
            Có <b class="text-primary">{{ model.length }}</b> người đang truy cập.
        </span>
        <div class="avatar-list-container d-flex justify-content-end flex-fill">
            <div class="avatar-container ms-2" v-for="user in model" :key="user.id">
                <!-- Avatar -->
                <RouterLink :to="getUserDetailRoute(user.id)">
                    <img :src="user.avatarUrl" class="img-thumbnail rounded-circle">
                </RouterLink>

                <!-- Username as tooltip -->
                <div class="bg-white border rounded-3 px-3 py-2 shadow avatar-tooltip">
                    <div class="fw-bold text-nowrap">{{ user.fullName }}</div>
                    <div class="small opacity-50">@{{ user.userName }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.avatar-container {
    position: relative;
    width: 44px;
    height: 44px;
    overflow: visible;
}

.avatar-container .img-thumbnail {
    width: 44px;
    height: 44px;
}

.avatar-container .avatar-tooltip {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(calc(-100% - 3px), -50%);
    opacity: 0;
    pointer-events: none;
}

.avatar-container:hover .avatar-tooltip {
    opacity: 1;
}
</style>