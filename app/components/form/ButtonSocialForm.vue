<template>
    <div class="text-center">
        <UButton title="Se connecter avec Facebook" class="w-auto inline-block cursor-pointer hover:opacity-50 p-3 font-semibold rounded-lg shadow-md" color="white" variant="solid" :ui="{ color: { white: 'bg-[#1877F2] text-white hover:opacity-90' } }">
            <IconFacebook class="w-[1.8em] h-[1.8em] fill-purple-700" />
        </UButton>
    </div>
    <div class="flex items-center my-6">
        <div class="flex-1 h-px bg-gray-300"></div>
        <span class="px-3 text-gray-500 uppercase text-sm">Ou</span>
        <div class="flex-1 h-px bg-gray-300"></div>
    </div>
</template>
<script setup>
import {UButton} from '#components';
import IconFacebook from '~/svg/IconFacebook.vue';
</script>