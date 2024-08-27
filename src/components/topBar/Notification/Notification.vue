<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { useNotificationService } from "@/services/notificationService";
import { NotificationListModel, NotificationModel } from "@/models";
import { useNotificationHubConnection } from "@/services/notificationHubConnection";

// Dependencies.
const notificationService = useNotificationService();
const notificationHubConnection = useNotificationHubConnection(loadNotification);

// Model and states.
const model = await initialLoadAsync();

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

// Functions.
async function initialLoadAsync(): Promise<NotificationListModel> {
    const responseDto = await notificationService.getListAsync();
    try {
        await notificationHubConnection.start();
    } catch (exception) {
        console.log(exception);
    }
    return reactive(new NotificationListModel(responseDto));
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

async function loadNotification(id: number): Promise<void> {
    const responseDto = await notificationService.getSingleAsync(id);
    model.items.push(new NotificationModel(responseDto));
}
</script>

<template>
    <div class="dropdown" id="notification">
        <button class="btn btn-lg text-primary border-0 p-0 fs-4"
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
                <li class="list-group-item d-flex flex-row align-items-center px-3
                            py-2 notification-item"
                        :class="getNotificationClass(notification)"
                        v-for="notification in model.items" :key="notification.id">
                    <!-- Icon -->
                    <div class="notification-icon-container d-flex h-100
                                justify-content-center align-items-center"
                            :class="getNotificationContainerClass(notification)">
                        <i class="bi bi-cart-plus"></i>
                    </div>
                    <div class="d-flex flex-column flex-fill detail ms-3">
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
                    <button class="btn btn-outline-primary btn-sm">
                        Mark all as read
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
    transition-duration: 0.35s;
    transition-delay: 0s;
}

.dropdown-menu li.notification-item:hover .notification-icon-container {
    margin-left: 0.5rem !important;
}
</style>