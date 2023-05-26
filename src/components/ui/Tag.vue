<script setup lang="ts">
export interface Props {
    type: "primary" | "secondary" | "tertiary" | "green" | "red"
}

defineProps<Props>();
</script>
<template>
    <div :class="{
        'bg-secondary text-white': type === 'primary',
        'bg-primary text-white': type === 'secondary',
        'bg-green-400 text-white': type === 'green',
        'bg-red-400 text-white': type === 'red',
        'bg-slate-500 text-white': type === 'tertiary'
    }" class="rounded-full inline-block px-3 py-0">
        <slot></slot>
    </div>
</template>