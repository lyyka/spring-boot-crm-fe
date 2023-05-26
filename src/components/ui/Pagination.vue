<script setup lang="ts">
import type { Pageable } from '@/api/Pageable';
import ChevronLeft from '@/components/icons/ChevronLeft.vue';
import ChevronRight from '@/components/icons/ChevronRight.vue';

const emit = defineEmits(["pageUpdate"])

const props = defineProps<{
    pageable: Pageable | null
}>();

enum Increment {
    next = 1,
    prev = -1,
}

const changePageHandle = (increment: Increment) => {
    if (!props.pageable) {
        return;
    }

    if (increment === Increment.next && props.pageable.last) {
        return;
    }

    if (increment === Increment.prev && props.pageable.first) {
        return;
    }

    props.pageable.pageNumber = props.pageable.pageNumber + increment

    emit('pageUpdate', props.pageable)
}
</script>

<template>
    <div v-if="pageable"
        class="border-b border-l border-r border-slate-300 w-full py-2 px-4 flex items-center justify-between">
        <p class="text-slate-500">{{ pageable.pageNumber * pageable.pageSize + 1 }} - {{ Math.min((pageable.pageNumber + 1)
            * pageable.pageSize,
            pageable.numberOfElements) }} of {{
        pageable.totalElements }}</p>
        <div class="flex items-center justify-between cursor-pointer">
            <ChevronLeft :disabled="pageable.first" @click="changePageHandle(Increment.prev)" />
            <ChevronRight :disabled="pageable.last" @click="changePageHandle(Increment.next)" />
        </div>
    </div>
</template>