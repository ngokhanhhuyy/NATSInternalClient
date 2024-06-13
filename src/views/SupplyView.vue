<template>
    <router-view v-slot="{ Component, route }">
        <transition name="slide-vertically" mode="out-in">
            <suspense>
                <div :key='route.path.replace("/supplies/", "")'>
                    <component :is="Component" />
                </div>
            </suspense>
        </transition>
    </router-view>
</template>

<style scoped>
</style>