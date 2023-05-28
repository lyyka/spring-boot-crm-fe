<script setup lang="ts">
import Deals from '@/api/deals/deals';
import type Deal from '@/api/deals/dto/Deal';
import { IDealStatus } from '@/api/deals/dto/IDealStatus';
import { onMounted, reactive, ref } from 'vue';
import { useToast } from 'vue-toast-notification';

const toaster = useToast();

const props = defineProps<{
    deal: Deal,
    stages: { [key: number]: { id: number, name: string }[] },
}>();

const state: {
    deal: Deal | null
} = reactive({
    deal: null,
});

const dealStatusClass = ref();

onMounted(() => {
    state.deal = props.deal;

    if (state.deal.getDealStatus() === IDealStatus.won) {
        dealStatusClass.value = 'text-white bg-green-400';
    } else if (state.deal.getDealStatus() === IDealStatus.open) {
        dealStatusClass.value = 'text-white bg-slate-500';
    } else if (state.deal.getDealStatus() === IDealStatus.lost) {
        dealStatusClass.value = 'text-white bg-red-400';
    }
})


const updateStage = (stageId: number) => {
    (new Deals)
        .updateStage(props.deal.getId(), stageId)
        .then(_r => {
            state.deal?.setStageId(stageId);
        })
        .catch(_e => toaster.error("Failed updating the stage"))
}
</script>
<template>
    <div class="grid grid-flow-col auto-cols-fr w-full">
        <div v-for="stage in stages[deal.getPipelineId()]" @click="updateStage(stage.id)"
            class="w-full h-6 text-center cursor-pointer border-white border-r-2"
            :class="deal.getStageId() >= stage.id ? dealStatusClass : `${dealStatusClass} opacity-50`">
            {{ stage.name }}
        </div>
    </div>
</template>