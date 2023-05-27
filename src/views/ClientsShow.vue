<script setup lang="ts">
import Client from '@/api/clients/dto/Client';
import Clients from '@/api/clients/clients';
import Deal from '@/api/deals/dto/Deal';
import { IDealStatus } from '@/api/deals/dto/IDealStatus';
import Deals from '@/api/deals/deals';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import Load from '@/components/layouts/Load.vue';
import Input from '@/components/ui/Input.vue';
import Select from '@/components/ui/Select.vue';
import Textarea from '@/components/ui/Textarea.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import ClientStoreRequest from '@/api/clients/requests/ClientStoreRequest';
import Modal from '@/components/ui/Modal.vue';
import Phone from '@/components/icons/Phone.vue';
import Email from '@/components/icons/Email.vue';
import Trash from '@/components/icons/Trash.vue';
import Calendar from '@/components/icons/Calendar.vue';
import Table from '@/components/ui/Table.vue';
import TableHead from '@/components/ui/TableHead.vue';
import TableBody from '@/components/ui/TableBody.vue';
import TableRow from '@/components/ui/TableRow.vue';
import TableCell from '@/components/ui/TableCell.vue';
import TableHeadCell from '@/components/ui/TableHeadCell.vue';
import Tag from '@/components/ui/Tag.vue';
import DealStoreRequest from '@/api/deals/requests/DealStoreRequest';
import type Pipeline from '@/api/pipelines/dto/Pipeline';
import Pipelines from '@/api/pipelines/pipelines';
import type Stage from '@/api/stages/dto/Stage';
import Stages from '@/api/stages/stages';

const route = useRoute();
const toaster = useToast();

const state: {
    client: Client | null,
    deals: Deal[],
    dealStoreRequest: DealStoreRequest,
    pipelines: Pipeline[],
    stages: Stage[],
} = reactive({
    client: null,
    deals: [],
    dealStoreRequest: new DealStoreRequest(),
    pipelines: [],
    stages: [],
});

const modal = ref();
const dealModal = ref();

onMounted(async () => {
    (new Clients).get(Number(route.params['id']))
        .then(data => {
            state.client = data.getData();

            if (state.client) {
                state.dealStoreRequest.clientId = state.client.getId();
                loadDeals();
                (new Pipelines).all()
                    .then(r => {
                        state.pipelines = r.getData();
                    })
                    .catch(_e => toaster.error("Failed loading pipelines"));
            }
        })
        .catch(_e => toaster.error("Failed loading the user"));
});

const loadDeals = () => {
    if (state.client) {
        (new Deals).getForClient(state.client.getId())
            .then(data => {
                state.deals = data.getData();
            })
            .catch(_e => toaster.error("Failed loading deals for this user"));
    }
};

const updateHandle = async () => {
    if (state.client) {
        const req = (new ClientStoreRequest)
        req.fromEntity(state.client);
        if (req.isValid())
            (new Clients).update(state.client.getId(), req)
                .then(_r => toaster.success("Updated!"))
                .catch(_e => toaster.error("Error!"));
    }
};

const saveDealHandle = async () => {
    (new Deals).store(state.dealStoreRequest)
        .then(_r => {
            toaster.success("Deal created");
            loadDeals();
            dealModal.value.close();
        })
        .catch(_e => toaster.error("Failed creating the deal"));
}

const dealDeleteHandle = async (dealId: number) => {
    (new Deals).delete(dealId)
        .then((_r: any) => {
            toaster.success("Deleted");
            loadDeals();
        })
        .catch((_e: any) => toaster.error("Failed loading deals for this user"));
}

const loadStagesForPipeline = async (pipelineId: number) => {
    (new Stages).index(pipelineId)
        .then(r => {
            state.stages = r.getData();
        })
        .catch(_e => toaster.error(`Failed loading stages for pipeline ${pipelineId}`));
}
</script>
<template>
    <DashboardLayout :crumbs="[
        { label: 'Clients', route: { name: 'crm.clients.index' } },
        { label: state.client?.getFullName() }
    ]">
        <Load :until="state.client !== null">
            <!-- header -->
            <div class="flex justify-between items-center">
                <div class="flex gap-4">
                    <Card class="flex items-center">
                        <Phone class="mr-2" />
                        <a :href="`tel:+${state.client?.getPhoneNumbersOnly()}`">{{ state.client?.getPhone() }}</a>
                    </Card>
                    <Card class="flex items-center">
                        <Email class="mr-2" />
                        <a :href="`mailto:${state.client?.getEmail()}`">{{ state.client?.getEmail() }}</a>
                    </Card>
                    <Card class="flex items-center">
                        <Calendar class="mr-2" />
                        Created at: {{ state.client?.getCreatedAt().format() }}
                    </Card>
                </div>
                <Button @click="() => { modal.open() }">Edit client</Button>
            </div>

            <!-- deals -->
            <h3 class="font-h2 mt-10 mb-2 text-h3">Deals</h3>
            <Table>
                <TableHead>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                    <TableHeadCell>Pipeline</TableHeadCell>
                    <TableHeadCell>Date</TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                </TableHead>
                <TableBody>
                    <TableRow v-for="deal in state.deals" :key="deal.getId()">
                        <TableCell>
                            {{ deal.getName() }}
                        </TableCell>

                        <TableCell>
                            <Tag v-if="deal.getDealStatus() === IDealStatus.won" type="green">
                                {{ deal.getDealStatus() }}
                            </Tag>
                            <Tag v-if="deal.getDealStatus() === IDealStatus.lost" type="red">
                                {{ deal.getDealStatus() }}
                            </Tag>
                            <Tag v-if="deal.getDealStatus() === IDealStatus.open" type="tertiary">
                                {{ deal.getDealStatus() }}
                            </Tag>
                        </TableCell>

                        <TableCell>
                            <strong>{{ deal.getPipelineName() }}</strong> / {{ deal.getStageName() }}

                        </TableCell>

                        <TableCell>
                            {{ deal.getCreatedAt().format() }}
                        </TableCell>

                        <TableCell>
                            <button class="flex items-center" @click.stop="dealDeleteHandle(deal.getId())">
                                <Trash></Trash>
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div
                class="px-4 py-2 rounded-bl-md rounded-br-md border-b border-l border-r w-full border-slate-300 text-right">
                <Button :remove-margin="true" @click="() => { dealModal.open() }">+ New deal</Button>
            </div>
        </Load>
    </DashboardLayout>

    <Modal ref="dealModal" v-if="state.client">
        <form>
            <Input v-model="state.dealStoreRequest.name" label="* Name" type="text" />

            <Select v-model="state.dealStoreRequest.dealStatus"
                :options="Object.values(IDealStatus).map(v => { return { value: v, label: v } })" label="* Status" />

            <Select :options="state.pipelines.map(p => { return { label: p.getName(), value: String(p.getId()) } })"
                @update:model-value="loadStagesForPipeline($event)" label="* Pipeline" />

            <Select :options="state.stages.map(s => { return { label: s.getName(), value: String(s.getId()) } })"
                v-model="state.dealStoreRequest.stageId" label="* Stage" />

            <Textarea v-model="state.dealStoreRequest.notes" label="Notes" />

            <Button @click="saveDealHandle">Save</Button>
        </form>
    </Modal>

    <Modal ref="modal" v-if="state.client">
        <form>
            <Input v-model="state.client.data.firstName" label="First name" type="text" />
            <Input v-model="state.client.data.lastName" label="Last name" type="text" />
            <Input v-model="state.client.data.email" label="Email" type="email" />
            <Input v-model="state.client.data.phone" label="Phone number" type="text" />
            <Button @click="updateHandle">Update</Button>
        </form>
    </Modal>
</template>