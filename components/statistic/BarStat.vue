<script setup>
import Chart from 'chart.js/auto';
const props =  defineProps({
    chartData: Array,
    chartDatasets: Object,
    label:String,
    chartId:String
 })
 onMounted(()=>{
    new Chart(document.getElementById(props.chartId),{
        type:'bar',
        options:{
            responsive:true,
            maintainAspectRatio:true
        },
        data:{
            labels:props.chartData.map(row => row.month),
            datasets:[props.chartDatasets]
        }
    });
 });
</script>
<template>
    <UCard class="shadow-lg rounded-2xl">
        <h3 class="text-lg font-bold text-purple-800 mb-4">{{ props.label }}</h3>
        <canvas :id="props.chartId"></canvas>
    </UCard>
</template>