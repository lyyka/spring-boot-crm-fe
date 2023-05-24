<script setup lang="ts">
import type Pipeline from '@/api/pipelines/dto/Pipeline';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import Pipelines from '@/api/pipelines/pipelines';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const route = useRoute();
const toaster = useToast();

const state: {
    pipeline: Pipeline | null
} = reactive({
    pipeline: null
});

onMounted(async () => {
    state.pipeline = (await (new Pipelines).get(Number(route.params['id']))).getPipeline();
});

const updateHandle = (id: number) => {
    if (state.pipeline) {
        (new Pipelines)
            .update(id, state.pipeline?.getName())
            .then(r => {
                toaster.success("Updated!");
            })
            .catch(e => {
                toaster.error("Error!");
            })
    }
}
</script>

<template>
    <DashboardLayout :title="state.pipeline?.getName() || 'Loading ...'">
        <form v-if="state.pipeline !== null">
            <Input v-model="state.pipeline.data.name" label="Name" type="text" />
            <Button text="Update" :disabled="!state.pipeline.getName()"
                @click="state.pipeline ? updateHandle(state.pipeline.getId()) : () => { }" />
        </form>
    </DashboardLayout>
</template>