<script setup lang="ts">
import Client from '@/api/clients/dto/Client';
import Clients from '@/api/clients/clients';
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
import Calendar from '@/components/icons/Calendar.vue';

const route = useRoute();
const toaster = useToast();

const state: {
    client: Client | null,
} = reactive({
    client: null,
});

const modal = ref();

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
                <Button text="Edit client" @click="() => { modal.open() }"></Button>
            </div>
        </DashboardLayout>

        <Modal ref="modal">
            <form>
                <Input v-model="state.client.data.firstName" label="First name" type="text" />
                <Input v-model="state.client.data.lastName" label="Last name" type="text" />
                <Input v-model="state.client.data.email" label="Email" type="email" />
                <Input v-model="state.client.data.phone" label="Phone number" type="text" />
                <Button text="Update" @click="updateHandle" />
            </form>
        </Modal>
    </div>
</template>