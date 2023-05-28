<script setup lang="ts">
defineProps<{
    label?: string
    placeholder?: string
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
        <label v-if="label" class="mb-2 text-slate-800 block">{{ label }}</label>
        <input :type="type" :placeholder="placeholder" :value="modelValue" @input="inputHandle"
            class="block rounded-sm py-1.5 px-3 focus:ring-0 focus:border-slate-400 border border-slate-300 text-base w-full" />
    </div>
</template>