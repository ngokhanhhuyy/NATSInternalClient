<script setup lang="ts">
import { reactive, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useNotificationService } from "@/services/notificationService";
import { NotificationListModel, NotificationModel } from "@/models";
import { NotificationType } from "@/services/dtos/enums";
import type { NotificationResponseDto } from "@/services/dtos/responseDtos";
import { useNotificationHubConnection } from "@/services/notificationHubConnection";
import { Dropdown } from "bootstrap";

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

const nextPageButtonClass = computed<string>(() => {
    if (model.page === model.pageCount) {
        return "btn-outline-secondary";
    }
    return "btn-outline-success";
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
    const listModel = reactive(new NotificationListModel(listResponseDto));
    return listModel;
}

async function reloadAsync(): Promise<void> {
    const responseDto = await notificationService.getListAsync(model.toRequestDto());
    model.mapFromResponseDto(responseDto);
}

function getNotificationClass(notification: NotificationModel): string | null {
    if (!notification.isRead) {
        return "bg-success bg-opacity-10 text-success-emphasis";
    }
    return null;
}

function getNotificationContainerClass(notification: NotificationModel): string {
    if (notification.isRead) {
        return "bg-secondary-subtle text-secondary";
    }
    return "bg-success text-white";
}

function getNotificationIconClass(notification: NotificationModel): string {
    const typeName = NotificationType[notification.type];
    if (typeName.includes("Creation")) {
        return "bi bi-plus-square";
    }

    if (typeName.includes("Modification")) {
        return "bi bi-pencil-square";
    }

    return "bi bi-x-square";
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
                    overflow-hidden p-0 shadow">
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
                        Đã đọc
                    </div>
                </li>

                <!-- Items -->
                <li class="list-group-item d-flex flex-row align-items-center
                            px-3 py-2 notification-item"
                        :class="getNotificationClass(notification)"
                        @click="onNotificationClicked(notification)"
                        v-for="(notification, index) in model.items"
                        :key="index">
                    <!-- Icon -->
                    <div class="notification-icon-container d-flex h-100
                                justify-content-center align-items-center"
                            :class="getNotificationContainerClass(notification)">
                        <i :class="getNotificationIconClass(notification)"></i>
                    </div>
                    <div class="d-flex flex-column flex-fill detail ms-3
                                notification-text">
                        <span v-html="notification.content"></span>
                        <span class="opacity-50 small">
                            {{ notification.deltaText }}
                        </span>
                    </div>
                </li>

                <!-- Footer -->
                <li class="list-group-item p-2 align-middle text-center
                            d-flex justify-content-between">
                    <!-- Pagination -->
                    <div class="d-flex">
                        <!-- Previous page button -->
                        <button class="btn btn-sm me-1"
                                :class="previousPageButtonClass"
                                :disabled="model.page === 1"
                                @click="model.page -= 1">
                            <i class="bi bi-chevron-left"></i>
                        </button>

                        <!-- Next page button -->
                        <button class="btn btn-sm ms-1" :class="nextPageButtonClass"
                                :disabled="model.page === model.pageCount"
                                @click="model.page += 1">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                    </div>

                    <!-- Mark all as read button -->
                    <button class="btn btn-outline-primary btn-sm"
                            @click="markAllNotficationsAsReadAsync">
                        Đánh dấu đã đọc tất cả
                    </button>
                </li>
            </ul>
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
}

.dropdown-menu li.notification-item {
    cursor: pointer;
}

.dropdown-menu li.notification-item .notification-icon-container {
    height: 100%;
    width: 35px;
    aspect-ratio: 1;
    flex-shrink: 0;
    border-radius: 50%;
}

.dropdown-menu li.notification-item .notification-icon-container,
.dropdown-menu li.notification-item .notification-text {
    transition-duration: 0.35s;
    transition-delay: 0s;
}

.dropdown-menu li.notification-item:hover .notification-icon-container,
.dropdown-menu li.notification-item:hover .notification-text {
    transform: translateX(0.5rem) !important;
}
</style>