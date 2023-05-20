<script setup lang="ts">
import PublicNavbar from '@/components/PublicNavbar.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import { reactive } from 'vue'
import Auth from '@/api/auth/auth';

const state = reactive({
    email: '',
    password: '',
})

function loginHandle(e: Event) {
    (new Auth).login(state.email, state.password);
}
</script>
<template>
    <PublicNavbar />

    <div class="flex justify-center items-center px-5 py-20">
        <div class="rounded-md border border-slate-300 p-8 w-96">
            <RouterLink :to="{ name: 'home' }" class="text-primary">
                &lt; Go home</RouterLink>
            <h3 class="text-primary text-h3 mb-4">Log in</h3>
            <form>
                <Input v-model="state.email" label="Email" type="email" />
                <Input v-model="state.password" label="Password" type="password" />
                <Button text="Log in" @click="loginHandle" />
            </form>
        </div>
    </div>
</template>