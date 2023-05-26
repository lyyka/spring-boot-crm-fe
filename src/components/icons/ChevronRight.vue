<script setup lang="ts">
defineProps<{
    disabled?: boolean
}>();
</script>

<template>
    <svg :class="{'cursor-not-allowed': disabled}" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline fill="none" id="Right" points="8.5 5 15.5 12 8.5 19" :stroke="disabled ? '#0000004D' : '#000000'"
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
    </svg>
</template>