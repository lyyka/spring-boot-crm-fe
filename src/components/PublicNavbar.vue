<script setup lang="ts">
import Github from "@/components/icons/Github.vue"
</script>
<template>
    <header>
        <nav class="px-5 py-3 bg-primary flex justify-between items-center">
            <RouterLink :to="{ name: 'home' }" class="text-white">CRM</RouterLink>
            <a class="flex items-center text-white" target="_blank" href="https://github.com/lyyka">
                <Github class="mr-2" />
                Github
            </a>
        </nav>
    </header>
</template>

<style scoped lang="scss"></style>