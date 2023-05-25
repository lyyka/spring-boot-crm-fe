<script setup lang="ts">
import Auth from '@/api/auth/auth';
import { RouterLink, useRouter, type RouteRecordRaw } from 'vue-router';
import Button from '../ui/Button.vue';

export interface CrumbRoute {
    name: string, params?: any
}

export interface Crumb {
    label: string,
    route?: CrumbRoute
}

export interface Props {
    crumbs?: Crumb[],
    title: string
}

defineProps<Props>()

const router = useRouter();

const logoutHandle = () => {
    (new Auth).logout();
    router.push({ name: 'auth.login' })
}
</script>
<template>
    <div class="bg-primary py-2 px-4 flex justify-between items-center">
        <div class="flex items-center">
            <p class="text-white">CRM</p>
            <div v-for="crumb in crumbs" class="flex items-center ml-2">
                <p class="text-white mr-2">/</p>
                <RouterLink class="text-white hover:text-secondary" v-if="crumb.route"
                    :to="{ name: crumb.route.name, params: crumb.route.params }">
                    {{ crumb.label }}
                </RouterLink>
                <p class="text-slate-300" v-else>{{ crumb.label }}</p>
            </div>
        </div>
        <Button :remove-margin="true" text="Log out" @click="logoutHandle"></Button>
    </div>
    <div class="grid grid-cols-5 grid-rows-1 h-full">
        <div class="col-span-1 border-r border-slate-200 px-4 py-4">
            <p class="text-primary font-bold">CRM</p>
            <RouterLink :to="{ name: 'crm.dashboard' }" class="text-slate-600 hover:text-slate-700">
                Dashboard
            </RouterLink>
            <div class="h-1 border-b border-slate-200 my-4"></div>
            <p class="text-primary font-bold">Settings</p>
            <RouterLink :to="{ name: 'crm.pipelines.index' }" class="block text-slate-600 hover:text-slate-700">
                Pipelines
            </RouterLink>
            <RouterLink :to="{ name: 'crm.users.index' }" class="block text-slate-600 hover:text-slate-700">
                Users
            </RouterLink>
        </div>
        <div class="col-span-4 px-4 py-4">
            <h2 class="text-primary pb-2 border-b border-slate-200 text-h2 mb-4">{{ title }}</h2>
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss">
#app {
    height: 100vh;
}
</style>