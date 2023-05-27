<script setup lang="ts">
defineProps<{
    active?: boolean,
}>();
</script>
<template>
    <div :class="{ 'bg-slate-200 rounded-md': active }"
        class="cursor-pointer block p-2 text-slate-600 hover:text-slate-700 hover:bg-slate-100 hover:rounded-md">
        <slot></slot>
    </div>
</template>