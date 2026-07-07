<script setup>
const props = defineProps({
    title:String,
    value:String | Number,
    spanText:Number
})
</script>
<template>
    <UCard class="text-center shadow-lg rounded-2xl bg-linear-to-br from-indigo-50 to-pink-50">
        <h3 class="text-lg font-semibold text-gray-700">{{props.title}}</h3>
        <p class="text-xl font-bold text-purple-700 mt-2">{{props.value}}</p>
        <p v-if="!isNaN(props.spanText)" class="text-sm text-gray-600">({{props.spanText}} commandes)</p>
    </UCard>
</template>