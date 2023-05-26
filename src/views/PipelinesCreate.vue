<script setup lang="ts">
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import { reactive } from 'vue';
import Pipelines from '@/api/pipelines/pipelines';
import { useToast } from 'vue-toast-notification';

const toaster = useToast();

interface State {
    name: string | null,
};

const state: State = reactive({
    name: null,
});

const createHandle = async () => {
    if (state.name) {
        (new Pipelines).store(state.name)
            .then(r => toaster.success("Created!"))
            .catch(e => toaster.error("Error!"));
    }
}
</script>

<template>
    <DashboardLayout title="Create new pipeline">
        <form>
            <Input v-model="state.name" label="Name" type="text" />
            <Button :disabled="!state.name" @click="createHandle">Create</Button>
        </form>
    </DashboardLayout>
</template>