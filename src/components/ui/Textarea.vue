<script setup lang="ts">
defineProps<{
    label: string
    modelValue: any
}>()
const emit = defineEmits(['update:modelValue'])

function inputHandle(e: Event) {
    emit('update:modelValue', e.target?.value)
}
</script>
<template>
    <div class="mb-3">
        <label class="mb-2 text-slate-800 block">{{ label }}</label>
        <textarea :value="modelValue" @input="inputHandle"
            class="block rounded-sm p-1 border border-slate-300 focus:border-slate-400 text-base w-full"></textarea>
    </div>
</template>