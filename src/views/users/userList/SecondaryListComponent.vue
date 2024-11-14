<script setup lang="ts">
// Interfaces.
interface Props {
    mode: "JoinedRecently" | "UpcomingBirthday";
}

// Imports.
import { reactive, computed } from "vue";
import { useUserService } from "@/services/userService";
import { UserBasicModel, UserListModel } from "@/models/userModels";
import { useLoadingState } from "@/composables/loadingStateComposable";

// Layout component.
import MainBlock from "@layouts/MainBlockComponent.vue";

// Props.
const props = defineProps<Props>();

// Dependencies.
const userService = useUserService();

// Internal states.
const model = await initializeModelAsync();
const loadingState = useLoadingState();

// Computed properties.
const blockTitle = computed<string>(() => {
    return props.mode === "JoinedRecently" ? "Mới gia nhập" : "Sinh nhật tháng này";
});

const resultNotFoundText = computed<string>(() => {
    if (props.mode === "JoinedRecently") {
        return "Không có nhân viên nào vừa gia nhập";
    }

    return "Không có nhân viên nào có sinh nhật sắp tới";
});

// Functions
async function initializeModelAsync(): Promise<UserListModel> {
    let responseDto: ResponseDtos.User.List;
    if (props.mode === "JoinedRecently") {
        responseDto = await userService.getListAsync({ joinedRecentlyOnly: true });
    } else {
        responseDto = await userService.getListAsync({ upcomingBirthdayOnly: true });
    }

    return reactive(new UserListModel(responseDto));
}

async function reloadAsync(): Promise<void> {
    loadingState.isLoading = true;
    const responseDto = await userService.getListAsync(model.toRequestDto());
    model.mapFromListResponseDto(responseDto);
    loadingState.isLoading = false;
}

function getDetailText(user: UserBasicModel): string {
    const result = props.mode === "JoinedRecently" ? user.joiningDate! : user.birthday!;
    return result.date.split(", ")[0];
}
</script>

<template>
    <MainBlock :title="blockTitle" body-padding="0">
        <!-- Header -->
        <template #header>
            <button class="btn btn-primary btn-sm" @click="reloadAsync"
                    :disabled="loadingState.isLoading">
                <i class="bi bi-arrow-counterclockwise"></i>
            </button>
        </template>

        <!-- Body -->
        <template #body>
            <Transition name="fade" mode="out-in">
                <ul class="list-group list-group-flush top-effective-users-list"
                        v-show="!loadingState.isLoading">
                    <template v-if="model.items.length">
                        <li class="list-group-item d-flex flex-row align-items-center
                                    bg-transparent px-3 py-2"
                                v-for="user of model!.items" :key="user.id">
                            <RouterLink :to="user.detailRoute">
                                <img :src="user.avatarUrl"
                                        class="rounded-circle me-2">
                            </RouterLink>
                            <div class="d-flex flex-column flex-fill align-items-start name">
                                <RouterLink :to="user.detailRoute">
                                    <span class="fw-bold">{{ user.fullName }}</span>
                                </RouterLink>
                                <span class="badge bg-success-subtle border
                                            border-success-subtle text-success my-1
                                            rounded small handled-orders fw-bold">
                                    {{ getDetailText(user) }}
                                </span>
                            </div>
                        </li>
                    </template>
                    <li class="d-flex align-items-center justify-content-center p-3
                            opacity-50" v-else>
                        {{ resultNotFoundText }}
                    </li>
                </ul>
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