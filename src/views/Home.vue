<script setup lang="ts">
import Auth from '@/api/auth/auth';
import PublicNavbar from '@/components/PublicNavbar.vue';
import Button from '@/components/ui/Button.vue';

const isAuthenticated = Auth.isAuthenticated();
</script>

<template>
    <PublicNavbar />

    <div class="bg-gradient-to-b from-primary from-80% to-secondary to-100% h-screen p-5 flex flex-col items-center">
        <h1 class="text-white text-h1">CRM software example</h1>
        <p class="text-slate-300">This app is designed as an example application showcasing a CRM</p>
        <Button :route="isAuthenticated ? { name: 'crm.dashboard' } : { name: 'auth.login' }">
            {{ isAuthenticated ? 'Dashboard' : 'Log in now' }}
        </Button>
    </div>
</template>