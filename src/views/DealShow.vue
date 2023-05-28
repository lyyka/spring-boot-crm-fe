<!-- <script setup lang="ts">
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import { useToast } from 'vue-toast-notification';

const toaster = useToast();

</script>

<template>
    <DashboardLayout :crumbs="[
        { label: 'Clients', route: { name: 'crm.clients.index' } },
        { label: state.client?.getFullName() }
    ]" :title="state.deal?.getName()">
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
    </DashboardLayout>
</template> -->