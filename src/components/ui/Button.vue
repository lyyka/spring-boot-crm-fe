<script setup lang="ts">
import { RouterLink } from 'vue-router';
defineProps<{
    text: string
    href?: string
    route?: object
}>()
</script>
<template>
    <RouterLink v-if="href" :to="href" class="bg-secondary my-4 rounded-md px-4 text-white py-1 inline-block">{{
        text
    }}
    </RouterLink>
    <RouterLink v-if="route" :to="route" class="bg-secondary my-4 rounded-md px-4 text-white py-1 inline-block">{{
        text
    }}
    </RouterLink>
    <button v-if="!href && !route" class="bg-secondary my-4 rounded-md px-4 text-white py-1 inline-block">{{ text
    }}</button>
</template>