<script setup lang="ts">
import Auth from '@/api/auth/auth';
import { RouterLink, useRouter, type RouteRecordRaw, useRoute } from 'vue-router';
import Divider from '@/components/ui/Divider.vue';
import LogOut from '@/components/icons/LogOut.vue';
import SidebarLink from '@/components/ui/SidebarLink.vue';
import SidebarItem from '@/components/ui/SidebarItem.vue';
import SidebarTitle from '@/components/ui/SidebarTitle.vue';
import { onBeforeUpdate, onMounted, onUpdated, reactive } from 'vue';
import { computed } from '@vue/reactivity';
import { RoleName } from '@/api/auth/RoleName';

export interface CrumbRoute {
    name: string, params?: any
}

export interface Crumb {
    label?: string,
    route?: CrumbRoute
}

export interface Props {
    crumbs?: Crumb[],
    title?: string
}

const props = defineProps<Props>()

const router = useRouter();
const route = useRoute();

const state: {
    crumbs?: Crumb[],
    autoCrumbDone: boolean,
} = reactive({
    crumbs: [],
    autoCrumbDone: false,
});

const auth = new Auth;

const autoCrumb = () => {
    if (!state.autoCrumbDone) {
        state.crumbs = props.crumbs;
        if (props.title) {
            const autoCrumb = { label: props.title };
            if (state.crumbs) {
                state.crumbs.push(autoCrumb);
            } else {
                state.crumbs = [autoCrumb];
            }
            state.autoCrumbDone = true;
        }
    }
};

onMounted(autoCrumb);
onBeforeUpdate(autoCrumb);

const logoutHandle = () => {
    (new Auth).logout();
    router.push({ name: 'auth.login' })
}

const plainUsername = computed(() => Auth.getPlainUsername())
const encryptedUsername = computed(() => Auth.getEncryptedUsername())

</script>
<template>
    <div class="bg-primary py-2 px-4 flex justify-between items-center">
        <div class="flex items-center">
            <p class="text-white">CRM</p>
            <div v-for="crumb in state.crumbs" class="flex items-center ml-2">
                <p class="text-white mr-2">/</p>
                <RouterLink class="text-white hover:text-secondary" v-if="crumb.route"
                    :to="{ name: crumb.route.name, params: crumb.route.params }">
                    {{ crumb.label }}
                </RouterLink>
                <p class="text-slate-300" v-else>{{ crumb.label }}</p>
            </div>
        </div>

        <div class="flex items-center gap-4">
            <img style="width: 24px; height: 24px;" alt="Avatar"
                :src="`https://source.boringavatars.com/beam/120/${encryptedUsername}?colors=cbd5e1,5b21b6,c4b5fd,a78bfa,7c3aed`" />
            <p class="text-white">{{ plainUsername }}</p>
        </div>
    </div>
    <div class="grid grid-cols-5 grid-rows-1 h-full">
        <div class="col-span-1 border-r border-slate-200 px-2 py-4">
            <SidebarTitle>CRM</SidebarTitle>
            <SidebarLink :active="route.name?.toString().startsWith('crm.clients')" :route="{ name: 'crm.clients.index' }">
                Clients
            </SidebarLink>
            <div v-if="auth.hasAnyAuthority([RoleName.ADMIN_VIEW_PIPELINE, RoleName.ADMIN_VIEW_USER])">
                <Divider />
                <SidebarTitle>Settings</SidebarTitle>
                <SidebarLink v-if="auth.hasAnyAuthority([RoleName.ADMIN_VIEW_PIPELINE])"
                    :active="route.name?.toString().startsWith('crm.pipelines') || route.name?.toString().startsWith('crm.stages')"
                    :route="{ name: 'crm.pipelines.index' }">
                    Pipelines
                </SidebarLink>
                <SidebarLink v-if="auth.hasAnyAuthority([RoleName.ADMIN_VIEW_USER])"
                    :active="route.name?.toString().startsWith('crm.users')" :route="{ name: 'crm.users.index' }">
                    Users
                </SidebarLink>
            </div>
            <Divider />
            <SidebarItem @click="logoutHandle">
                <div class="flex items-center gap-2">
                    <LogOut /> Log out
                </div>
            </SidebarItem>
        </div>
        <div class="col-span-4 px-4 py-4 relative">
            <!-- <h2 v-if="title" class="text-primary pb-2 border-b border-slate-200 text-h2 mb-4">{{ title }}</h2> -->
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss">
#app {
    height: 100vh;
}
</style>