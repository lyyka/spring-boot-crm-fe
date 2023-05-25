<script setup lang="ts">
import { useRoute } from 'vue-router';

const currentRoute = useRoute();

defineProps<{
    route: { name: string, params?: any },
}>();
</script>
<template>
    <RouterLink :to="{ name: route.name, params: route.params }"
        :class="currentRoute.name === route.name ? 'bg-slate-200 rounded-md' : ''"
        class="block p-2 text-slate-600 hover:text-slate-700 hover:bg-slate-100 hover:rounded-md">
        <slot></slot>
    </RouterLink>
</template>