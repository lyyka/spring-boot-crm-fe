<script setup lang="ts">
export interface Option {
    value: string, label: string
}

defineProps<{
    label: string
    options: Option[]
    modelValue: any
}>();

const emit = defineEmits(['update:modelValue'])

function changeHandle(e: Event) {
    emit('update:modelValue', e.target?.value)
}
</script>
<template>
    <div class="mb-3">
        <label class="mb-2 text-slate-800 block">{{ label }}</label>
        <select :value="modelValue" @change="changeHandle"
            class="block rounded-md p-1 border border-slate-400 text-base w-full">
            <option v-for="option in options" :value="option.value">{{
                option.label }}</option>
        </select>
    </div>
</template>