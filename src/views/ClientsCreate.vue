<script setup lang="ts">
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import { reactive } from 'vue';
import { useToast } from 'vue-toast-notification';
import ClientStoreRequest from '@/api/clients/requests/ClientStoreRequest';
import Clients from '@/api/clients/clients';

const toaster = useToast();

interface State {
    request: ClientStoreRequest,
};

const state: State = reactive({
    request: new ClientStoreRequest,
});

const createHandle = async () => {
    if (state.request.isValid()) {
        (new Clients).store(state.request)
            .then(r => toaster.success("Created!"))
            .catch(e => toaster.error("Error!"));
    }
}
</script>

<template>
    <DashboardLayout :crumbs="[
        { label: 'Clients', route: { name: 'crm.clients.index' } },
    ]" title="Create new client">
        <form>
            <Input v-model="state.request.firstName" label="First name" type="text" />
            <Input v-model="state.request.lastName" label="Last name" type="text" />
            <Input v-model="state.request.email" label="Email" type="email" />
            <Input v-model="state.request.phoneNumber" label="Phone number" type="text" />
            <Button :disabled="!state.request.isValid()" @click="createHandle">Create</Button>
        </form>
    </DashboardLayout>
</template>