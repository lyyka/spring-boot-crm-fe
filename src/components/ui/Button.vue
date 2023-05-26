<script setup lang="ts">
import { RouterLink } from 'vue-router';
defineProps<{
    href?: string
    route?: object
    removeMargin?: boolean
    disabled?: boolean,
}>()

const emit = defineEmits(['click'])

function onClick(e: Event) {
    emit('click', e)
}
</script>
<template>
    <RouterLink v-if="href" :to="href" class="bg-secondary my-2 rounded-md px-4 text-white py-1 inline-block">
        <slot></slot>
    </RouterLink>
    <RouterLink v-if="route" :to="route" class="bg-secondary my-2 rounded-md px-4 text-white py-1 inline-block">
        <slot></slot>
    </RouterLink>
    <button v-if="!href && !route" @click="onClick" type="button" :class="{ 'my-2': !removeMargin }" :disabled="disabled"
        class="bg-secondary disabled:bg-violet-300 disabled:cursor-not-allowed rounded-md px-4 text-white py-1 inline-block">
        <slot></slot>
    </button>
</template>