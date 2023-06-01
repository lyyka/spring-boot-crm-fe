<script setup lang="ts">
import Trash from '@/components/icons/Trash.vue';
import DraggableIndicator from '@/components/icons/DraggableIndicator.vue';
import type Pipeline from '@/api/pipelines/dto/Pipeline';
import Table from '@/components/ui/Table.vue';
import TableHead from '@/components/ui/TableHead.vue';
import TableHeadCell from '@/components/ui/TableHeadCell.vue';
import TableRow from '@/components/ui/TableRow.vue';
import TableCell from '@/components/ui/TableCell.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import Pipelines from '@/api/pipelines/pipelines';
import Stages from '@/api/stages/stages';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import Load from '@/components/layouts/Load.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import type Stage from '@/api/stages/dto/Stage';
import StageStoreRequest from "@/api/stages/requests/StageStoreRequest";
import Modal from '@/components/ui/Modal.vue';
import draggable from 'vuedraggable';

const route = useRoute();
const toaster = useToast();

const state: {
    pipeline: Pipeline | null,
    stages: Stage[],
    stageStoreRequest: StageStoreRequest,
} = reactive({
    pipeline: null,
    stages: [],
    stageStoreRequest: new StageStoreRequest(),
});

const stageModal = ref();

const loadStages = () => {
    if (state.pipeline) {
        (new Stages).index(state.pipeline.getId())
            .then(r => state.stages = r.getData())
            .catch(_e => toaster.error("Error loading stages for this pipeline"));
    }
}

onMounted(async () => {
    (new Pipelines).get(Number(route.params['id']))
        .then(r => {
            state.pipeline = r.getPipeline();
            loadStages();
        }).catch(_e => toaster.error("Failed loading the pipeline"));
});

const updateHandle = (id: number) => {
    if (state.pipeline) {
        (new Pipelines)
            .update(id, state.pipeline?.getName())
            .then(_r => toaster.success("Pipeline updated"))
            .catch(_e => toaster.error("Error!"));
    }
}

const saveStageHandle = () => {
    if (state.pipeline) {
        state.stageStoreRequest.pipelineId = state.pipeline.getId();
        (new Stages).store(state.stageStoreRequest)
            .then(_r => {
                state.stageStoreRequest = new StageStoreRequest();
                toaster.success("Stage created");
                stageModal.value.close();
                loadStages();
            })
            .catch(_e => {
                toaster.error("Error!");
            })
    }
}

const deleteStageHandle = (id: number) => {
    (new Stages).delete(id)
        .then(_r => {
            toaster.success("Stage deleted");
            loadStages();
        })
        .catch(_e => toaster.error("Error!"));
}

const stageReorderHandle = (event: any) => {
    const stageToUpdate: Stage = state.stages[event.newIndex];
    (new Stages).updateOrder(stageToUpdate.getId(), event.newIndex + 1)
        .then(_r => {
            toaster.success("Order updated!");
        })
        .catch(_e => toaster.error("Failed updating the order"));
}
</script>

<template>
    <DashboardLayout :crumbs="[
        { label: 'Pipelines', route: { name: 'crm.pipelines.index' } },
    ]" :title="state.pipeline?.getName()">
        <Load :until="state.pipeline !== null">
            <form v-if="state.pipeline !== null">
                <Input v-model="state.pipeline.data.name" label="Name" type="text" />
                <Button :disabled="!state.pipeline.getName()"
                    @click="state.pipeline ? updateHandle(state.pipeline.getId()) : () => { }">Update</Button>
            </form>

            <div class="flex justify-between items-center border-b border-slate-200 my-4 pb-2">
                <h3 class="text-primary text-h3">
                    Stages
                </h3>
                <Button @click="() => { stageModal.open() }">+ New</Button>
            </div>
            <Table>
                <TableHead>
                    <TableHeadCell>Name</TableHeadCell>
                </TableHead>
                <draggable v-model="state.stages" group="people" ghost-class="opacity-30" tag="TableBody" item-key="data.id"
                    @end="stageReorderHandle">
                    <template #item="{ element }">
                        <TableRow class="hover:cursor-grab">
                            <TableCell>
                                <div class="flex justify-between">
                                    <div class="flex items-center">
                                        <DraggableIndicator class="mr-1" />
                                        <RouterLink class="hover:text-secondary"
                                            :to="{ name: 'crm.stages.show', params: { id: element.getId() } }">
                                            {{ element.getName() }}
                                        </RouterLink>
                                    </div>

                                    <button class="flex items-center" @click="deleteStageHandle(element.getId())">
                                        <Trash></Trash>
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </template>
                </draggable>
            </Table>
        </Load>
    </DashboardLayout>

    <Modal ref="stageModal">
        <form>
            <Input v-model="state.stageStoreRequest.name" label="Name" type="text" />
            <Button @click="saveStageHandle">Save</Button>
        </form>
    </Modal>
</template>