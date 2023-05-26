<script setup lang="ts">
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import Input from '@/components/ui/Input.vue';
import Checkbox from '@/components/ui/Checkbox.vue';
import Select from '@/components/ui/Select.vue';
import Button from '@/components/ui/Button.vue';
import { onMounted, reactive } from 'vue';
import { useToast } from 'vue-toast-notification';
import UserStoreRequest from '@/api/users/requests/UserStoreRequest';
import Users from '@/api/users/users';
import Roles from '@/api/roles/roles';
import Role from '@/api/roles/dto/Role';

const toaster = useToast();

interface State {
    request: UserStoreRequest,
    roles: Role[],
};

const state: State = reactive({
    request: new UserStoreRequest,
    roles: []
});

onMounted(async () => {
    state.roles = (await (new Roles).index()).getData();
});

const createHandle = async () => {
    if (state.request.isValid()) {
        (new Users).store(state.request)
            .then(r => toaster.success("Created!"))
            .catch(e => toaster.error("Error!"));
    }
}
</script>

<template>
    <DashboardLayout title="Create new user">
        <form>
            <Input v-model="state.request.firstName" label="First name" type="text" />
            <Input v-model="state.request.lastName" label="Last name" type="text" />
            <Input v-model="state.request.email" label="Email" type="email" />
            <Select v-model="state.request.roleId" label="Role" :options="state.roles.map((role): any => {
                return { value: role.getId(), label: role.getName() }
            })"></Select>
            <Checkbox v-model="state.request.enabled" label="Enabled" />
            <Button :disabled="!state.request.isValid()" @click="createHandle">Create</Button>
        </form>
    </DashboardLayout>
</template>