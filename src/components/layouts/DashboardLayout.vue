<script setup lang="ts">
import Auth from '@/api/auth/auth';
import { RouterLink, useRouter, type RouteRecordRaw } from 'vue-router';
import Button from '@/components/ui/Button.vue';
import Divider from '@/components/ui/Divider.vue';
import SidebarLink from '@/components/ui/SidebarLink.vue';
import SidebarTitle from '@/components/ui/SidebarTitle.vue';

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
        <Button :remove-margin="true" @click="logoutHandle">Log out</Button>
    </div>
    <div class="grid grid-cols-5 grid-rows-1 h-full">
        <div class="col-span-1 border-r border-slate-200 px-2 py-4">
            <SidebarTitle>CRM</SidebarTitle>
            <SidebarLink :route="{ name: 'crm.dashboard' }">
                Dashboard
            </SidebarLink>
            <SidebarLink :route="{ name: 'crm.clients.index' }">
                Clients
            </SidebarLink>
            <Divider />
            <SidebarTitle>Settings</SidebarTitle>
            <SidebarLink :route="{ name: 'crm.pipelines.index' }">
                Pipelines
            </SidebarLink>
            <SidebarLink :route="{ name: 'crm.users.index' }">
                Users
            </SidebarLink>
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