<template>
    <RouterView v-slot="{ Component, route }">
        <Transition name="slide-vertically" mode="out-in">
            <Suspense>
                <div :key='route.path.replace("/products/", "")'>
                    <component :is="Component" />
                </div>
            </Suspense>
        </Transition>
    </RouterView>
</template>