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
import Trash from '@/components/icons/Trash.vue';
import { useToast } from 'vue-toast-notification';
import type Pipeline from '@/api/pipelines/dto/Pipeline';
import type { Pageable } from '@/api/Pageable';
import Pagination from '@/components/ui/Pagination.vue';
import PagedRequest from '@/api/router/PagedRequest';

const toaster = useToast();

const state: {
    pipelines: Pipeline[] | null,
    pageable: Pageable | null,
} = reactive({
    pipelines: null,
    pageable: null,
})

const loadPipelines = async () => {
    const response = await (new Pipelines).index(
        new PagedRequest(state.pageable)
    );
    state.pipelines = response.getData();
    state.pageable = response.getPageable();
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
            <Button :route="{ name: 'crm.pipelines.create' }">+ New</Button>
        </div>
        <Table>
            <TableHead>
                <TableHeadCell>Name</TableHeadCell>
            </TableHead>
            <TableBody>
                <TableRow v-for="pipeline in state.pipelines" :key="pipeline.getId()">
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
        <Pagination @page-update="loadPipelines" :pageable="state.pageable"></Pagination>
    </DashboardLayout>
</template>