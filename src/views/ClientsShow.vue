<script setup lang="ts">
import Client from '@/api/clients/dto/Client';
import Clients from '@/api/clients/clients';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import ClientStoreRequest from '@/api/clients/requests/ClientStoreRequest';

const route = useRoute();
const toaster = useToast();

const state: {
    client: Client | null,
} = reactive({
    client: null,
});

onMounted(async () => {
    (new Clients).get(Number(route.params['id']))
        .then(async (data) => {
            state.client = data.getData();
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
</script>

<template>
    <div v-if="state.client">
        <DashboardLayout :crumbs="[
            { label: 'Clients', route: { name: 'crm.clients.index' } },
            { label: state.client.getFullName() }
        ]" :title="state.client.getFullName()">
            <form>
                <Input v-model="state.client.data.firstName" label="First name" type="text" />
                <Input v-model="state.client.data.lastName" label="Last name" type="text" />
                <Input v-model="state.client.data.email" label="Email" type="email" />
                <Input v-model="state.client.data.phone" label="Phone number" type="text" />
                <Button text="Update" @click="updateHandle" />
            </form>
        </DashboardLayout>
    </div>
</template>