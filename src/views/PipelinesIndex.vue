<script setup lang="ts">
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import Table from '@/components/ui/Table.vue';
import TableHead from '@/components/ui/TableHead.vue';
import TableBody from '@/components/ui/TableBody.vue';
import TableRow from '@/components/ui/TableRow.vue';
import TableCell from '@/components/ui/TableCell.vue';
import Button from '@/components/ui/Button.vue';
import TableHeadCell from '@/components/ui/TableHeadCell.vue';
import { onMounted, reactive } from 'vue';
import Pipelines from "@/api/pipelines/pipelines";
import PipelineIndexResponse from "@/api/pipelines/responses/PipelineIndexResponse";
import Trash from '@/components/icons/Trash.vue';
import { useToast } from 'vue-toast-notification';

const toaster = useToast();

const state: {
    pipelines: PipelineIndexResponse | null
} = reactive({
    pipelines: null
})

const loadPipelines = async () => {
    state.pipelines = await (new Pipelines).index();
}

const deleteHandle = async (id: number) => {
    (new Pipelines).delete(id)
        .then(async (r) => {
            toaster.success("Deleted!");
            await loadPipelines();
        })
        .catch(e => {
            toaster.error("Error!");
        });
}

onMounted(async () => {
    await loadPipelines();
})
</script>

<template>
    <DashboardLayout title="Pipelines">
        <div class="flex justify-end">
            <Button text="+ New" :route="{ name: 'crm.pipelines.create' }"></Button>
        </div>
        <Table>
            <TableHead>
                <TableHeadCell>Name</TableHeadCell>
            </TableHead>
            <TableBody>
                <TableRow v-for="pipeline in state.pipelines?.getData()" :key="pipeline.getId()">
                    <TableCell>
                        <div class="flex justify-between">
                            <RouterLink class="hover:text-secondary"
                                :to="{ name: 'crm.pipelines.show', params: { id: pipeline.getId() } }">
                                {{ pipeline.getName() }}
                            </RouterLink>

                            <button class="flex items-center" @click="deleteHandle(pipeline.getId())">
                                <Trash></Trash>
                            </button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </DashboardLayout>
</template>