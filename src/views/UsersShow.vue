<script setup lang="ts">
import User from '@/api/users/dto/User';
import Users from '@/api/users/users';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import Input from '@/components/ui/Input.vue';
import Checkbox from '@/components/ui/Checkbox.vue';
import Select from '@/components/ui/Select.vue';
import Button from '@/components/ui/Button.vue';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import Roles from '@/api/roles/roles';
import Role from '@/api/roles/dto/Role';
import UserStoreRequest from '@/api/users/requests/UserStoreRequest';

const route = useRoute();
const toaster = useToast();

const state: {
    user: User | null,
    roles: Role[],
} = reactive({
    user: null,
    roles: []
});

onMounted(async () => {
    (new Users).get(Number(route.params['id']))
        .then(async (data) => {
            state.roles = (await (new Roles).index()).getData();
            state.user = data.getData();
        })
        .catch(e => toaster.error("Failed loading the user"));
});

const updateHandle = async () => {
    if (state.user) {
        const req = (new UserStoreRequest)
        req.fromEntity(state.user);
        if (req.isValid())
            (new Users).update(state.user.getId(), req)
                .then(r => toaster.success("Updated!"))
                .catch(e => toaster.error("Error!"));
    }
};
</script>

<template>
    <div v-if="state.user">
        <DashboardLayout :crumbs="[
            { label: 'Users', route: { name: 'crm.users.index' } },
            { label: state.user.getFullName() }
        ]" :title="state.user.getFullName()">
            <form>
                <Input v-model="state.user.data.firstName" label="First name" type="text" />
                <Input v-model="state.user.data.lastName" label="Last name" type="text" />
                <Input v-model="state.user.data.email" label="Email" type="email" />
                <Select v-model="state.user.data.role.data.id" label="Role" :options="state.roles.map((role): any => {
                    return { value: role.getId(), label: role.getName() }
                })"></Select>
                <Checkbox v-model="state.user.data.enabled" label="Enabled" />
                <Button text="Update" @click="updateHandle" />
            </form>
        </DashboardLayout>
    </div>
</template>