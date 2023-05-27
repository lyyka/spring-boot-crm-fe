<script setup lang="ts">
import Stages from '@/api/stages/stages';
import Stage from '@/api/stages/dto/Stage';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import type Pipeline from '@/api/pipelines/dto/Pipeline';
import Load from '@/components/layouts/Load.vue';

const route = useRoute();
const toaster = useToast();

const state: {
    stage: Stage | null
    pipeline: Pipeline | null,
} = reactive({
    stage: null,
    pipeline: null,
})

onMounted(async () => {
    (new Stages).get(Number(route.params['id']))
        .then(e => {
            state.stage = e.getStage();
            if (state.stage)
                state.pipeline = state.stage.getPipeline();
        })
});

const updateHandle = (id: number) => {
    if (state.stage) {
        (new Stages)
            .update(id, state.stage?.getName())
            .then(r => toaster.success("Stage updated"))
            .catch(e => toaster.error("Error!"));
    }
}

</script>

<template>
    <DashboardLayout :crumbs="[
        { label: 'Pipelines', route: { name: 'crm.pipelines.index' } },
        { label: state.pipeline?.getName(), route: { name: 'crm.pipelines.show', params: { id: state.pipeline?.getId() } } },
        { label: state.stage?.getName() },
    ]" :title="state.stage?.getName()">
        <Load :until="state.stage !== null">
            <form v-if="state.stage !== null">
                <Input v-model="state.stage.data.name" label="Name" type="text" />
                <Button :disabled="!state.stage.getName()"
                    @click="state.stage ? updateHandle(state.stage.getId()) : () => { }">Update</Button>
            </form>
        </Load>
    </DashboardLayout>
</template>