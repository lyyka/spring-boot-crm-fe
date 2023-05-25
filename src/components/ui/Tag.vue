<script setup lang="ts">
export interface Props {
    type: "primary" | "secondary" | "tertiary"
}

defineProps<Props>();
</script>
<template>
    <div :class="{
        'bg-secondary text-white': type === 'primary',
        'bg-primary text-white': type === 'secondary',
        'bg-slate-500': type === 'tertiary'
    }" class="rounded-full inline-block px-3 py-0">
        <slot></slot>
    </div>
</template>