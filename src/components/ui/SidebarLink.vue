<script setup lang="ts">
import SidebarItem from './SidebarItem.vue';

defineProps<{
    route: { name: string, params?: any },
    active?: boolean,
}>();
</script>
<template>
    <SidebarItem :active="active">
        <RouterLink :to="{ name: route.name, params: route.params }" class=" block">
            <slot></slot>
        </RouterLink>
    </SidebarItem>
</template>