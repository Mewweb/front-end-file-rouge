<script setup lang="ts">
import IconsArrowRight from '~/public/svg/IconsArrowRight.vue';
const props = defineProps(['icon']);
console.log(props);

</script>

<template>
    <NuxtLink class="bg-[#CC3399] inline-block p-[.8em_1em] text-white rounded-md border border-[#CC3399] hover:opacity-50 transition duration-300" to="#">
        <slot />
        <component class="h-[1.5em] w-[1.5em] fill-white inline-block ml-[.5em] transition duration-300" :is="props.icon" />
    </NuxtLink>
    </template>