<script lang="ts">
interface Props {
    title: string;
    color?: "primary" | "success" | "danger";
    headerClass?: string;
    closeButton?: boolean;
    bodyClass?: string;
    bodyPadding?: string | number | [number, number] | [number, number, number, number];
    bodyBorder?: boolean;
}
</script>

<script setup lang="ts">
import { computed, withDefaults } from "vue";
import { useRouter } from "vue-router";

// Props.
const props = withDefaults(defineProps<Props>(), {
    color: "primary",
    bodyPadding: "3",
    bodyBorder: true
});

// Dependency.
const router = useRouter();

// Computed properties.
const headerComputedClass = computed<string>(() => {
    let className = `bg-${props.color}-subtle border-${props.color}-subtle`;
    if (props.headerClass) {
        className += ` ${props.headerClass}`;
    }
    return className;
});

const bodyComputedClass = computed<string | null>(() => {
    const classNames: string[] = [];
    if (props.bodyClass) {
        classNames.push(props.bodyClass);
    }

    if (props.bodyBorder) {
        classNames.push("border border-top-0");
    }

    if (Array.isArray(props.bodyPadding)) {
        if (props.bodyPadding.length === 2) {
            const [x, y] = props.bodyPadding;
            classNames.push(`px-${x} py-${y}`);
        } else {
            const [top, end, bottom, start] = props.bodyPadding;
            classNames.push(`pt-${top} pe-${end} pb-${bottom} ps-${start}`);
        }
    } else {
        classNames.push(`p-${props.bodyPadding}`);
    }

    return classNames.length ? classNames.join(" ") : null;
});
</script>

<template>
    <div class="block bg-white rounded-3 p-0 d-flex flex-column">
        <!-- Header -->
        <div class="block-header bg-opacity-25 border ps-3 p-2 rounded-top-3
                    d-flex align-items-center"
                :class="headerComputedClass">
            <div class="small fw-bold flex-fill me-2 pt-1"
                    :class="`text-${props.color}`">
                {{ title.toUpperCase() }}
            </div>
            <slot name="header" v-if="!closeButton"></slot>
            <div class="me-2 cursor-pointer close-button" @click="router.back()" v-else>
                <i class="bi bi-x-lg text-primary"></i>
            </div>
        </div>
        
        <!-- Body -->
        <div class="rounded-bottom-3 flex-fill"
                :class="bodyComputedClass">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<style scoped>
.block-header {
    height: 45px;
}

.close-button {
    cursor: pointer;
}
</style>