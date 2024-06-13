<script lang="ts">
interface Notification {
    id: number,
    content: string;
    emittedDeltaText: string;
    isRead: boolean;
};
</script>

<script setup lang="ts">
import { reactive } from "vue";
const notifications = reactive<Notification[]>([
    {
        id: 1,
        content: "Đơn hàng mới đã được tạo",
        emittedDeltaText: "3 phút trước",
        isRead: false,
    },
    {
        id: 2,
        content: "Liệu trình mới đã được tạo",
        emittedDeltaText: "2 giờ trước",
        isRead: false,
    },
    {
        id: 3,
        content: "Khách hàng đã được chỉnh sửa",
        emittedDeltaText: "Hôm qua",
        isRead: false,
    },
    {
        id: 4,
        content: "Đơn hàng đã được thanh toán",
        emittedDeltaText: "3 ngày trước",
        isRead: true,
    },
])
</script>

<template>
    <div class="dropdown" id="notification">
        <button class="btn btn-lg text-primary border-0 p-0 fs-4"
                type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-bell-fill" v-if="notifications.length > 0">
                <small class="badge rounded-circle notification-dot bg-danger"></small>
            </i>
            <i class="bi bi-bell" v-else></i>
        </button>
        <div class="dropdown-menu dropdown-menu-end border border-primary-subtle overflow-hidden p-0 shadow">
            <ul class="list-group list-group-flush">
                <li class="list-group-item p-2 ps-3 d-flex justify-content-between">
                    <span class="text-primary fw-bold">Thông báo</span>
                    <span class="badge bg-success-subtle text-success d-flex align-items-center"
                            v-if="notifications.filter(n => !n.isRead).length > 0">
                        Chưa đọc: {{  notifications.filter(n => !n.isRead).length }}
                    </span>
                    <div class="badge bg-secondary-subtle text-secondary d-flex align-items-center"
                            v-else>
                        Đã đọc
                    </div>
                </li>
                <li class="list-group-item d-flex flex-row align-items-center px-3 py-2 notification-item"
                        :class='{ "bg-success bg-opacity-10 text-success-emphasis": !notification.isRead }'
                        v-for="notification of notifications" :key="notification.id">
                    <div class="notification-icon-container d-flex h-100 justify-content-center align-items-center"
                            :class='{
                                "bg-success text-white": !notification.isRead,
                                "bg-secondary-subtle text-secondary": notification.isRead
                            }'>
                        <i class="bi bi-cart-plus"></i>
                    </div>
                    <div class="d-flex flex-column flex-fill detail ms-3">
                        <span class="fw-bold">{{ notification.content }}</span>
                        <span class="opacity-50">{{ notification.emittedDeltaText }}</span>
                    </div>
                </li>
                <li class="list-group-item p-2 align-middle text-center">
                    <a>Xem tất cả thông báo</a>
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
    transition-delay: 0;
}

.dropdown-menu li.notification-item:hover .notification-icon-container {
    margin-left: 0.5rem !important;
}
</style>