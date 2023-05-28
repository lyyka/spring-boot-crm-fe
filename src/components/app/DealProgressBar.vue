<script setup lang="ts">
import type Deal from '@/api/deals/dto/Deal';
import { IDealStatus } from '@/api/deals/dto/IDealStatus';
import type Stage from '@/api/stages/dto/Stage';
import { ref } from 'vue';

const props = defineProps<{
    deal: Deal,
    stages: Stage[],
}>();


const dealStatusClass = ref();
if (props.deal.getDealStatus() === IDealStatus.won) {
    dealStatusClass.value = 'text-white bg-green-400';
} else if (props.deal.getDealStatus() === IDealStatus.open) {
    dealStatusClass.value = 'text-white bg-slate-500';
} else if (props.deal.getDealStatus() === IDealStatus.lost) {
    dealStatusClass.value = 'text-white bg-red-400';
}
</script>
<template>
    <div class="grid grid-flow-col auto-cols-fr w-80">
        <div v-for="stage in stages"
            :class="deal.getStageId() <= stage.getId() ? dealStatusClass : `${dealStatusClass}/50`">

        </div>
    </div>
</template>