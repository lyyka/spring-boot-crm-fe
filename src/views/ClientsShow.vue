<script setup lang="ts">
import Client from '@/api/clients/dto/Client';
import Clients from '@/api/clients/clients';
import Deal from '@/api/deals/dto/Deal';
import { IDealStatus } from '@/api/deals/dto/IDealStatus';
import Deals from '@/api/deals/deals';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import Input from '@/components/ui/Input.vue';
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

const route = useRoute();
const toaster = useToast();

const state: {
    client: Client | null,
    deals: Deal[],
} = reactive({
    client: null,
    deals: [],
});

const modal = ref();

onMounted(async () => {
    (new Clients).get(Number(route.params['id']))
        .then(data => {
            state.client = data.getData();

            if (state.client) {
                (new Deals).getForClient(state.client.getId())
                    .then(data => {
                        state.deals = data.getData();
                    })
                    .catch(e => toaster.error("Failed loading deals for this user"));
            }
        })
        .catch(e => toaster.error("Failed loading the user"));
});

const updateHandle = async () => {
    if (state.client) {
        const req = (new ClientStoreRequest)
        req.fromEntity(state.client);
        if (req.isValid())
            (new Clients).update(state.client.getId(), req)
                .then(r => toaster.success("Updated!"))
                .catch(e => toaster.error("Error!"));
    }
};

const dealDeleteHandle = async (dealId: number) => {

}
</script>

<template>
    <div v-if="state.client">
        <DashboardLayout :crumbs="[
            { label: 'Clients', route: { name: 'crm.clients.index' } },
            { label: state.client.getFullName() }
        ]" :title="state.client.getFullName()">
            <!-- header -->
            <div class="flex justify-between items-center">
                <div class="flex gap-4">
                    <Card class="flex items-center">
                        <Phone class="mr-2" />
                        <a :href="`tel:+${state.client.getPhoneNumbersOnly()}`">{{ state.client.getPhone() }}</a>
                    </Card>
                    <Card class="flex items-center">
                        <Email class="mr-2" />
                        <a :href="`mailto:${state.client.getEmail()}`">{{ state.client.getEmail() }}</a>
                    </Card>
                    <Card class="flex items-center">
                        <Calendar class="mr-2" />
                        Created at: {{ state.client.getCreatedAt().format({
                            year: 'numeric', month: 'numeric', day:
                                'numeric'
                        }) }}
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
                    <TableHeadCell>Stage</TableHeadCell>
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
                            {{ deal.getStageName() }}
                        </TableCell>

                        <TableCell>
                            <button class="flex items-center" @click="dealDeleteHandle(deal.getId())">
                                <Trash></Trash>
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div
                class="px-4 py-2 rounded-bl-md rounded-br-md border-b border-l border-r w-full border-slate-300 text-right">
                <Button :remove-margin="true">+ New deal</Button>
            </div>
        </DashboardLayout>

        <Modal ref="modal">
            <form>
                <Input v-model="state.client.data.firstName" label="First name" type="text" />
                <Input v-model="state.client.data.lastName" label="Last name" type="text" />
                <Input v-model="state.client.data.email" label="Email" type="email" />
                <Input v-model="state.client.data.phone" label="Phone number" type="text" />
                <Button @click="updateHandle">Update</Button>
            </form>
        </Modal>
    </div>
</template>