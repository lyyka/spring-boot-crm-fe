<script setup lang="ts">
defineProps<{
    label: string
    type: string
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
        <input :type="type" :value="modelValue" @input="inputHandle" class="block rounded-md p-1 border border-slate-400 text-base w-full" />
    </div>
</template>