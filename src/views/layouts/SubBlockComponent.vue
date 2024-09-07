<script lang="ts">
interface Props {
    title: string;
    bodyClass?: string;
    bodyPadding?: string | number | [number, number] | [number, number, number, number];
    borderTop?: string | number;
    roundedBottom?: boolean;
}
</script>

<script setup lang="ts">
import { computed, withDefaults } from "vue";

// Props.
const props = withDefaults(defineProps<Props>(), {
    bodyPadding: "3",
    borderTop: "1"
});

// Computed properties.
const headerComputedClass = computed<string | null>(() => {
    if (props.borderTop) {
        return `border-top-${props.borderTop}`;
    }
    return null;
});

const bodyComputedClass = computed<string>(() => {
    const classNames: string[] = [];
    if (props.bodyClass) {
        classNames.push(props.bodyClass);
    }

    if (props.roundedBottom) {
        classNames.push("rounded-bottom-3");
    } else {
        classNames.push("border-bottom-0");
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

    return classNames.join(" ");
});

</script>

<template>
    <div class="sub-block bg-white rounded-3 p-0">
        <!-- Header -->
        <div class="bg-secondary-subtle border border-secondary-subtle px-3"
                :class="headerComputedClass">
            <span class="text-secondary small fw-bold">
                {{ title }}
            </span>
        </div>

        <!-- Body -->
        <div class="border border-top-0" :class="bodyComputedClass">
            <slot></slot>
        </div>
    </div>
</template>