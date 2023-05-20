<script lang="ts">
import PublicNavbar from '@/components/PublicNavbar.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import { defineComponent, reactive } from 'vue'
import Auth from '@/api/auth/auth';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    components: { PublicNavbar, Input, Button },
    setup() {
        const state = reactive({
            email: '',
            password: '',
            error: '',
        })

        const router = useRouter();

        async function loginHandle(e: Event) {
            state.error = '';
            const success = await (new Auth).login(state.email, state.password);
            if (success) {
                router.push({ name: 'crm.dashboard' });
            } else {
                state.error = "Invalid login";
            }
        }

        return {
            state,
            loginHandle,
        }
    }
})
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
                <label v-if="state.error" class="text-red-600">{{ state.error }}</label>
            </form>
        </div>
    </div>
</template>