<script setup lang="ts">
import Trash from '@/components/icons/Trash.vue';
import type Pipeline from '@/api/pipelines/dto/Pipeline';
import Table from '@/components/ui/Table.vue';
import TableHead from '@/components/ui/TableHead.vue';
import TableHeadCell from '@/components/ui/TableHeadCell.vue';
import TableBody from '@/components/ui/TableBody.vue';
import TableRow from '@/components/ui/TableRow.vue';
import TableCell from '@/components/ui/TableCell.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import Pipelines from '@/api/pipelines/pipelines';
import Stages from '@/api/stages/stages';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import type Stage from '@/api/stages/dto/Stage';

const route = useRoute();
const toaster = useToast();

const state: {
    pipeline: Pipeline | null,
    stages: Stage[]
} = reactive({
    pipeline: null,
    stages: []
});

const loadStages = () => {
    if (state.pipeline) {
        (new Stages).index(state.pipeline.getId())
            .then(r => state.stages = r.getData())
            .catch(e => toaster.error("Error loading stages for this pipeline"));
    }
}

onMounted(async () => {
    state.pipeline = (await (new Pipelines).get(Number(route.params['id']))).getPipeline();
    loadStages();
});

const updateHandle = (id: number) => {
    if (state.pipeline) {
        (new Pipelines)
            .update(id, state.pipeline?.getName())
            .then(r => toaster.success("Pipeline updated"))
            .catch(e => toaster.error("Error!"));
    }
}

const deleteStageHandle = (id: number) => {
    (new Stages).delete(id)
        .then(r => {
            toaster.success("Stage deleted");
            loadStages();
        })
        .catch(e => toaster.error("Error!"));
}
</script>

<template>
    <DashboardLayout :crumbs="[
        { label: 'Pipelines', route: { name: 'crm.pipelines.index' } },
        { label: state.pipeline?.getName() || '' }
    ]" :title="state.pipeline?.getName() || 'Loading ...'">
        <form v-if="state.pipeline !== null">
            <Input v-model="state.pipeline.data.name" label="Name" type="text" />
            <Button :disabled="!state.pipeline.getName()"
                @click="state.pipeline ? updateHandle(state.pipeline.getId()) : () => { }">Update</Button>
        </form>

        <h3 class="text-primary pb-2 border-b border-slate-200 text-h3 mb-4 mt-4">
            Stages
        </h3>
        <Table>
            <TableHead>
                <TableHeadCell>Name</TableHeadCell>
            </TableHead>
            <TableBody>
                <TableRow v-for="stage in state.stages" :key="stage.getId()">
                    <TableCell>
                        <div class="flex justify-between">
                            <RouterLink class="hover:text-secondary"
                                :to="{ name: 'crm.stages.show', params: { id: stage.getId() } }">
                                {{ stage.getName() }}
                            </RouterLink>

                            <button class="flex items-center" @click="deleteStageHandle(stage.getId())">
                                <Trash></Trash>
                            </button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </DashboardLayout>
</template>