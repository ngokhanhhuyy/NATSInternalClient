<script setup lang="ts">
// Interfaces.
interface Props {
    notification: NotificationModel;
}

interface Emits {
    (event: "clicked", notification: NotificationModel): void;
}
// Imports.
import { NotificationModel } from "@/models";
import { NotificationType } from "@/services/dtos/enums";

// Props and emits.
defineProps<Props>();
const emit = defineEmits<Emits>();

// Functions.
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
</script>

<template>
    <li class="list-group-item d-flex flex-row align-items-center
                px-3 py-2 notification-item"
            :class="getNotificationClass(notification)"
            @click='emit("clicked", notification)'>

        <!-- Icon -->
        <div class="notification-icon-container d-flex h-100
                    justify-content-center align-items-center"
                :class="getNotificationContainerClass(notification)">
            <i :class="getNotificationIconClass(notification)"></i>
        </div>

        <!-- Text -->
        <div class="d-flex flex-column flex-fill detail ms-3
                                notification-text">
            <span v-html="notification.content"></span>
            <span class="opacity-50 small">
                {{ notification.deltaText }}
            </span>
        </div>
    </li>
</template>

<style scoped>
.notification-item {
    cursor: pointer;
}

.notification-item .notification-icon-container {
    height: 100%;
    width: 35px;
    aspect-ratio: 1;
    flex-shrink: 0;
    border-radius: 50%;
}

.notification-item .notification-icon-container,
.notification-item .notification-text {
    transition-duration: 0.35s;
    transition-delay: 0s;
}

.notification-item:hover .notification-icon-container,
.notification-item:hover .notification-text {
    transform: translateX(0.5rem) !important;
}
</style>