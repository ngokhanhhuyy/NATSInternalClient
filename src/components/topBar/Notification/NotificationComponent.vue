<script setup lang="ts">
import { reactive, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useNotificationService } from "@/services/notificationService";
import { NotificationListModel, NotificationModel } from "@/models";
import type { NotificationResponseDto } from "@/services/dtos/responseDtos";
import { useNotificationHubConnection } from "@/services/notificationHubConnection";
import { Dropdown } from "bootstrap";

// Child component.
import NotificationItem from "./NotificationItemComponent.vue";

// Dependencies.
const router = useRouter();
const notificationService = useNotificationService();
const notificationHubConnection =
    useNotificationHubConnection(addReceivedNotification);

// Model and states.
const model = await initialLoadAsync();
let dropdownController: Dropdown;

// Computed properties.
const unreadNotificationCount = computed<number>(() => {
    return model.items.filter(n => !n.isRead).length;
});

const previousPageButtonClass = computed<string>(() => {
    if (model.page === 1) {
        return "btn-outline-secondary";
    }
    return "btn-outline-success";
});

const previousPageButtonDisabled = computed<boolean>(() => {
    return model.pageCount <= 1 || model.page === 1;
});

const nextPageButtonClass = computed<string>(() => {
    if (model.page === model.pageCount) {
        return "btn-outline-secondary";
    }
    return "btn-outline-success";
});

const nextPageButtonDisabled = computed<boolean>(() => {
    return model.pageCount <= 1 || model.page === model.pageCount;
});

// Watch.
watch(() => [ model.page, model.resultsPerPage ], async () => await reloadAsync());

// Life cycle hooks.
onMounted(() => {
    const dropdownElement = document.getElementById("notification-button")!;
    dropdownController = new Dropdown(dropdownElement);
});

// Functions.
async function initialLoadAsync(): Promise<NotificationListModel> {
    const listResponseDto = await notificationService.getListAsync();
    try {
        await notificationHubConnection.start();
    } catch (exception) {
        console.log(exception);
    }
    return reactive(new NotificationListModel(listResponseDto));
}

async function reloadAsync(): Promise<void> {
    const responseDto = await notificationService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
}

function addReceivedNotification(responseDto: NotificationResponseDto): void {
    console.log(JSON.stringify(model.items, null, 2));
    const notificationModel = new NotificationModel(responseDto);
    console.log(responseDto);
    model.items.push(notificationModel);
    console.log(JSON.stringify(model.items, null, 2));
}

async function markAllNotficationsAsReadAsync(): Promise<void> {
    await notificationService.markAllAsReadAsync();
    for (const notification of model.items) {
        if (!notification.isRead) {
            notification.isRead = true;
        }
    }
    model.items = [];
}

async function onNotificationClicked(notification: NotificationModel): Promise<void> {
    await notificationService.markAsReadAsync(notification.id);
    notification.isRead = true;
    dropdownController.hide();
    await router.push(notification.route);
}
</script>

<template>
    <div class="dropdown" id="notification">
        <button class="btn btn-lg text-primary border-0 p-0 fs-4"
                id="notification-button"
                type="button" data-bs-auto-close="outside"
                data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-bell-fill" v-if="unreadNotificationCount > 0">
                <small class="badge rounded-circle notification-dot bg-danger">
                </small>
            </i>
            <i class="bi bi-bell" v-else></i>
        </button>
        <div class="dropdown-menu dropdown-menu-end border border-primary-subtle
                    p-0 shadow bg-white" id="notification-list">
            <ul class="list-group list-group-flush">
                <!-- Header -->
                <li class="list-group-item p-2 ps-3 d-flex justify-content-between">
                    <span class="text-primary fw-bold">Thông báo</span>
                    <span class="badge bg-success-subtle text-success d-flex
                                align-items-center"
                            v-if="unreadNotificationCount > 0">
                        Chưa đọc: {{ unreadNotificationCount }}
                    </span>
                    <div class="badge bg-secondary-subtle text-secondary d-flex
                                align-items-center"
                            v-else>
                        Đã đọc tất cả
                    </div>
                </li>

                <!-- Items -->
                <template v-if="model.items.length">
                    <NotificationItem :notification="notification"
                        v-for="(notification, index) in model.items" :key="index"
                        @click="onNotificationClicked(notification)"/>
                </template>
                <li class="list-group-item d-flex justify-content-center align-items-center p-3
                            opacity-50" v-else>
                    Không có thông báo mới
                </li>

                <!-- Footer -->
                <li class="list-group-item p-2 align-middle text-center
                            d-flex justify-content-between">
                    <!-- Pagination -->
                    <div class="d-flex">
                        <!-- Previous page button -->
                        <button class="btn btn-sm me-1"
                                :class="previousPageButtonClass"
                                :disabled="previousPageButtonDisabled"
                                @click="model.page -= 1">
                            <i class="bi bi-chevron-left"></i>
                        </button>

                        <!-- Next page button -->
                        <button class="btn btn-sm ms-1" :class="nextPageButtonClass"
                                :disabled="nextPageButtonDisabled"
                                @click="model.page += 1">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>

                    <!-- Mark all as read button -->
                    <button class="btn btn-outline-primary btn-sm"
                            :disabled="!unreadNotificationCount"
                            @click="markAllNotficationsAsReadAsync">
                        Đánh dấu đã đọc tất cả
                    </button>
                </li>
            </ul>

            <!-- Indicator -->
            <div class="indicator"></div>
        </div>
    </div>
</template>

<style scoped>
button i {
    position: relative;
}

button i .notification-dot {
    border: 2px solid white;
    position: absolute;
    top: 0;
    right: 0;
    width: 12px;
    height: 12px;
    padding: 0;
    display: block;
}

button i {
    transition-duration: var(--topbar-icon-transition-duration);
}

button:hover i {
    filter: var(--topbar-icon-hover-filter);
}

.dropdown-menu {
    min-width: 350px;
    right: -30px !important;
    top: 15px !important;
}

.dropdown li {
    background: transparent;
}

.dropdown-menu .indicator {
    background: linear-gradient(135deg, white 50%, transparent 50%);
    width: 20px;
    height: 20px;
    border: 0 solid rgba(var(--bs-primary-rgb), 0.5);
    border-top-width: 1px;
    border-left-width: 1px;
    position: absolute;
    right: 30px;
    top: 0;
    transition: 0.5s;
    transform-origin: center;
    transform: translate(0%, calc(-50% - (1px * 0.5) )) rotate(45deg);
}

@media (max-width: 576px) {
    .dropdown-menu#notification-list {
        width: 90% !important;
        position: fixed !important;
        left: 50% !important;
        transform: translate(-50%, calc(var(--topbar-height) + 10px)) !important;
    }
}
</style>