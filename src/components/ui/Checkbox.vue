<script setup lang="ts">
defineProps<{
    label: string
    modelValue: boolean
}>();

const emit = defineEmits(['update:modelValue'])

function changeHandle(e: Event) {
    emit('update:modelValue', e.target?.checked)
}
</script>
<template>
    <div class="mb-3 flex items-center">
        <input type="checkbox" class="block" :checked="modelValue" @change="changeHandle" />
        <label class="ml-2 text-slate-800 inline-block">{{ label }}</label>
    </div>
</template>
