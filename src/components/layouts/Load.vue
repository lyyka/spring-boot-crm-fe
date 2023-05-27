<script setup lang="ts">
import Loading from '@/components/icons/Loading.vue';
defineProps<{ until: boolean }>();
</script>
<template>
    <div v-if="!until" class="absolute w-full h-full top-0 left-0 flex items-center justify-center">
        <Loading />
    </div>
    <slot v-else></slot>
</template>