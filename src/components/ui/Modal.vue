<script setup lang="ts">
import { reactive } from 'vue';
import Close from '@/components/icons/Close.vue';

const state: { opened: boolean } = reactive({
    opened: false,
});

const open = () => {
    state.opened = true;
}

const close = () => {
    state.opened = false;
}

defineExpose({
    open, close,
});

</script>
<template>
    <!-- wrapper -->
    <div @keydown.esc="close" tabindex="0" :class="state.opened ? 'flex' : 'hidden'"
        class="fixed w-full h-full top-0 left-0 justify-center items-center bg-neutral-950 bg-opacity-50">
        <!-- modal -->
        <div class="w-1/2 rounded-md bg-white border border-slate-300 p-6">
            <div class="mb-4 flex justify-end">
                <Close class="cursor-pointer" @click="close" />
            </div>
            <slot></slot>
        </div>
    </div>
</template>