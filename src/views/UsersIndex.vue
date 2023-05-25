<script setup lang="ts">
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import Table from '@/components/ui/Table.vue';
import TableHead from '@/components/ui/TableHead.vue';
import TableBody from '@/components/ui/TableBody.vue';
import TableRow from '@/components/ui/TableRow.vue';
import TableCell from '@/components/ui/TableCell.vue';
import Button from '@/components/ui/Button.vue';
import TableHeadCell from '@/components/ui/TableHeadCell.vue';
import { onMounted, reactive } from 'vue';
import Trash from '@/components/icons/Trash.vue';
import Tag from '@/components/ui/Tag.vue';
import { useToast } from 'vue-toast-notification';
import User from "@/api/users/dto/User";
import Users from "@/api/users/users";

const toaster = useToast();

const state: {
    users: User[] | null
} = reactive({
    users: null
})

const loadUsers = async () => {
    state.users = (await (new Users).index()).getData();
}

const deleteHandle = async (id: number) => {
    (new Users).delete(id)
        .then(async (r) => {
            toaster.success("Deleted!");
            await loadUsers();
        })
        .catch(e => {
            toaster.error("Error!");
        });
}

onMounted(async () => {
    await loadUsers();
})
</script>

<template>
    <DashboardLayout title="Users">
        <div class="flex justify-end">
            <Button text="+ New" :route="{ name: 'crm.users.create' }"></Button>
        </div>
        <Table>
            <TableHead>
                <TableHeadCell>User</TableHeadCell>
                <TableHeadCell>Role</TableHeadCell>
                <TableHeadCell>Account enabled</TableHeadCell>
                <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody>
                <TableRow v-for="user in state.users" :key="user.getId()">
                    <TableCell>
                        <RouterLink class="hover:text-secondary"
                            :to="{ name: 'crm.users.show', params: { id: user.getId() } }">
                            {{ user.getFullName() + " (" + user.getEmail() + ")" }}
                        </RouterLink>
                    </TableCell>

                    <TableCell>
                        <Tag type="primary">
                            {{ user.getRoleName() }}
                        </Tag>
                    </TableCell>

                    <TableCell>
                        {{ user.getEnabled() ? 'Yes' : 'No' }}
                    </TableCell>

                    <TableCell>
                        <button class="flex items-center" @click="deleteHandle(user.getId())">
                            <Trash></Trash>
                        </button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </DashboardLayout>
</template>