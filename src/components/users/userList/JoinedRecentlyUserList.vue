<script setup lang="ts">
import { reactive } from 'vue';
import { JoinedRecentlyUserListModel } from "@/models";
import { useUserService } from '@/services/userService';
import { useViewStates } from "@/composables/viewStatesComposable";

// Layout component.
import MainBlock from "@/views/layouts/MainBlockComponent.vue";

// Dependencies.
const userService = useUserService();

// Internal states.
const model = await initializeModelAsync();
const { loadingState } = useViewStates();

async function initializeModelAsync(): Promise<JoinedRecentlyUserListModel> {
    const responseDto = await userService.getJoinedRecentlyUsersAsync();
    return reactive(new JoinedRecentlyUserListModel(responseDto));
}

async function reloadAsync(): Promise<void> {
    if (!loadingState.isLoading) {
        loadingState.isLoading = true;
        const responseDto = await userService.getJoinedRecentlyUsersAsync();
        model.mapFromResponseDto(responseDto);
        loadingState.isLoading = false;
    }
}
</script>

<template>
    <MainBlock title="Nhân viên mới gia nhập" body-padding="0">
        <!-- Header -->
        <template #header>
            <button class="btn btn-primary btn-sm" @click="reloadAsync">
                <i class="bi bi-arrow-counterclockwise"></i>
            </button>
        </template>

        <!-- Body -->
        <template #body>
            <Transition name="fade" mode="out-in">
                <div v-if="!loadingState.isLoading">
                    <ul class="list-group list-group-flush newest-users-list"
                            v-if="model!.results != null && model!.results.length">
                        <li class="list-group-item d-flex flex-row align-items-center
                                    bg-transparent px-3 py-2"
                                v-for="user of model!.results"
                                :key="user.id">
                            <RouterLink :to='{ name: "userProfile", params: { userId: user.id} }'>
                                <img :src="user.avatarUrl" class="rounded-circle me-2">
                            </RouterLink>
                            <div class="d-flex flex-column flex-fill name">
                                <RouterLink :to='{ name: "userProfile", params: { userId: user.id} }'>
                                    <span class="fw-bold">{{ user.fullName }}</span>
                                </RouterLink>
                                <span class="small opacity-50">@{{ user.userName }}</span>
                            </div>
                        </li>
                    </ul>
                    <div class="d-flex align-items-center justify-content-center p-3
                                opacity-50"
                            v-else>
                        Không có thành viên mới
                    </div>
                </div>
            </Transition>
        </template>
    </MainBlock>
</template>

<style scoped>
.block-body {
    max-height: 400px;
    height: auto;
    overflow-y: auto;
}

img {
    height: 40px;
    width: 40px;
}

.name {
    overflow: hidden;
}

.name a {
    color: inherit;
    text-decoration: none;
}

.name a:hover {
    text-decoration: underline;
}

.name span {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>