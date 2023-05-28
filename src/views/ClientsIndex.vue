<script setup lang="ts">
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import ClientIndexFilterRequest from '@/api/clients/requests/ClientIndexFilterRequest';
import Table from '@/components/ui/Table.vue';
import TableHead from '@/components/ui/TableHead.vue';
import TableBody from '@/components/ui/TableBody.vue';
import TableRow from '@/components/ui/TableRow.vue';
import TableCell from '@/components/ui/TableCell.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import TableHeadCell from '@/components/ui/TableHeadCell.vue';
import { onMounted, reactive, watch } from 'vue';
import Trash from '@/components/icons/Trash.vue';
import { useToast } from 'vue-toast-notification';
import Client from "@/api/clients/dto/Client";
import Clients from "@/api/clients/clients";
import type { Pageable } from '@/api/Pageable';
import Pagination from '@/components/ui/Pagination.vue';
import PagedRequest from '@/api/router/PagedRequest';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const toaster = useToast();

const state: {
    clients: Client[] | null,
    pageable: Pageable | null,
    filter: ClientIndexFilterRequest
} = reactive({
    clients: null,
    pageable: null,
    filter: new ClientIndexFilterRequest()
})

watch(
    () => state.filter,
    async () => {
        await loadClients()
    },
    { deep: true }
)

const loadClients = async () => {
    const response = (await (new Clients).index(
        new PagedRequest(state.pageable),
        state.filter
    ));
    state.clients = response.getData();
    state.pageable = response.getPageable();
}

const deleteHandle = async (id: number) => {
    (new Clients).delete(id)
        .then(async (r) => {
            toaster.success("Deleted!");
            await loadClients();
        })
        .catch(e => {
            toaster.error("Error!");
        });
}

onMounted(async () => {
    await loadClients();
})
</script>

<template>
    <DashboardLayout title="Clients">
        <div class="flex justify-end">
            <Button :route="{ name: 'crm.clients.create' }">+ New</Button>
        </div>

        <div class="mb-0 grid grid-cols-2 gap-4">
            <Input placeholder="Search..." type="text" label="" v-model="state.filter.search" />
            <VueDatePicker v-model="state.filter.createdAtRange" range utc="preserve" :auto-apply="true"
                placeholder="Created at from - to" :start-date="new Date()" :max-date="new Date()"
                :prevent-min-max-navigation="true" :no-disabled-range="true" :clearable="true"
                :enable-time-picker="false" />
        </div>

        <Table>
            <TableHead>
                <TableHeadCell>User</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Phone</TableHeadCell>
                <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody>
                <TableRow v-for="client in state.clients" :key="client.getId()">
                    <TableCell>
                        <RouterLink class="hover:text-secondary"
                            :to="{ name: 'crm.clients.show', params: { id: client.getId() } }">
                            {{ client.getFullName() }}
                        </RouterLink>
                    </TableCell>

                    <TableCell>
                        {{ client.getCreatedAt().format() }}
                    </TableCell>

                    <TableCell>
                        {{ client.getEmail() }}
                    </TableCell>

                    <TableCell>
                        {{ client.getPhone() }}
                    </TableCell>

                    <TableCell>
                        <button class="flex items-center" @click="deleteHandle(client.getId())">
                            <Trash></Trash>
                        </button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <Pagination @page-update="loadClients" :pageable="state.pageable"></Pagination>
    </DashboardLayout>
</template>