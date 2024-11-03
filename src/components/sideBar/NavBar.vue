<script lang="ts">
interface Props {
    keepExpanded: boolean;
    sticky?: boolean;
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

// Props and emits.
const props = withDefaults(defineProps<Props>(), {
    sticky: false
});

// Dependency.
const route = useRoute();

// Computed properties.
const currentRouteName = computed(() => route.fullPath.split("/")[1]);
const className = computed<string>(() => {
    const names: string[] = [];

    if (props.keepExpanded) {
        names.push("keep-expanded");
    }

    if (props.sticky) {
        names.push("sticky");
    }

    return names.join(" ");
});

// Functions.
function getRouteLinkClassName(routeName: string): string | null {
    return currentRouteName.value === routeName ? "selected" : null;
}
</script>

<template>
    <ul class="w-100" id="navbar" :class="className">
        <li :class='getRouteLinkClassName("home")'>
            <RouterLink :to='{ name: "home" }'>
                <i class="bi bi-house"></i>
                <span>Trang chủ</span>
            </RouterLink>
        </li>
        <li :class='getRouteLinkClassName("customers")'>
            <RouterLink :to='{ name: "customerList" }'>
                <i class="bi bi-person-circle"></i>
                <span>Khách hàng</span>
            </RouterLink>
        </li>
        <li :class='getRouteLinkClassName("products")'>
            <RouterLink :to='{ name: "productList" }'>
                <i class="bi bi-box-seam"></i>
                <span>Sản phẩm</span>
            </RouterLink>
        </li>
        <li :class='getRouteLinkClassName("supplies")'>
            <RouterLink :to='{ name: "supplyList" }'>
                <i class="bi bi-truck"></i>
                <span>Nhập hàng</span>
            </RouterLink>
        </li>
        <li :class='getRouteLinkClassName("orders")'>
            <RouterLink :to='{ name: "orderList" }'>
                <i class="bi bi-cart4"></i>
                <span>Đơn hàng</span>
            </RouterLink>
        </li>
        <li :class='getRouteLinkClassName("treatments")'>
            <RouterLink :to='{ name: "treatmentList" }'>
                <i class="bi bi-magic"></i>
                <span>Liệu trình</span>
            </RouterLink>
        </li>
        <li :class='getRouteLinkClassName("consultants")'>
            <RouterLink :to='{ name: "consultantList" }'>
                <i class="bi bi-patch-question"></i>
                <span>Tư vấn</span>
            </RouterLink>
        </li>
        <li :class='getRouteLinkClassName("debts")'>
            <RouterLink :to='{ name: "debtOverview" }'>
                <i class="bi bi-hourglass-bottom"></i>
                <span>Khoản nợ</span>
            </RouterLink>
        </li>
        <li :class='getRouteLinkClassName("expenses")'>
            <RouterLink :to='{ name: "expenseList" }'>
                <i class="bi bi-cash-coin"></i>
                <span>Chi phí</span>
            </RouterLink>
        </li>
        <li :class='getRouteLinkClassName("finance")'>
            <RouterLink :to='{ name: "home" }'>
                <i class="bi bi-graph-up-arrow"></i>
                <span>Báo cáo</span>
            </RouterLink>
        </li>
        <li :class='getRouteLinkClassName("users")'>
            <RouterLink :to='{ name: "userList" }'>
                <i class="bi bi-person-badge"></i>
                <span>Nhân viên</span>
            </RouterLink>
        </li>
    </ul>
</template>

<style scoped>
#navbar {
    list-style: none;
    margin: 0;
    padding: 15px 0;
}

#navbar.sticky {
    position: sticky;
    top: 0;
}

#navbar li {
    color: var(--bs-primary-text-emphasis);
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    margin: 0;
    border: 1px solid transparent;
    border-radius: var(--bs-border-radius);
}

#navbar li a {
    color: inherit;
    text-decoration: none;
    padding: 5px 5px 5px 25px;
    width: 100%;
    height: 100%;
    display: block;
}

#navbar li a:hover {
    text-decoration: none !important;
}

#navbar li:hover {
    background-color: rgba(var(--bs-primary-rgb), 0.1);
    border-color: var(--bs-primary-border-subtle);
    cursor: pointer;
}

#navbar li.selected {
    background: var(--bs-primary);
    color: white;
    border-color: var(--bs-primary);
    box-shadow: var(--bs-box-shadow);
}

#navbar li:not(:last-child) {
    margin-bottom: 5px !important;
}

#navbar li span {
    opacity: 0.7;
    transition-duration: 0.25s;
}

#navbar li:hover span {
    margin-left: 10px !important;
}

#navbar li.selected span {
    opacity: 1;
}

#navbar li i {
    color: var(--bs-primary);
    margin-right: 20px !important;
}

#navbar li.selected i {
    color: white;
}

@media (max-width: 992px) {
    #navbar:not(.keep-expanded) li a {
        padding: 0;
        aspect-ratio: 1.15;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #navbar:not(.keep-expanded) li i {
        font-size: 1.3em;
        margin-right: 0 !important;
    }

    #navbar:not(.keep-expanded) li span {
        display: none;
    }
}
</style>