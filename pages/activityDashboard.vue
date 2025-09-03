<script setup>
import Chart from 'chart.js/auto';
const totalSales = ref(1250)
const newBooksSales = ref(320)
const topBook = ref({title:'L’IA en pratique',orders:280})
const salesByMonth = ref([{month:'Jan',sales:200},{month:'Fév',sales:300},{month:'Mar',sales:250},{month:'Avr',sales:400},{month:'Mai',sales:350},{month:'Juin',sales:450}])
const newBooksByMonth = ref([{month:'Jan',sales:50},{month:'Fév',sales:80},{month:'Mar',sales:60},{month:'Avr',sales:120},{month:'Mai',sales:90},{month:'Juin',sales:150}])
const datasetsSalesByMonth = ref({fill:false,tension:.1,backgroundColor:"#f97316",label:"Nombre de ventes par mois",borderColor:"#f97316",data:salesByMonth.value.map(row => row.sales)});
const datasetsNewBooksByMonth = ref({fill:false,tension:.1,backgroundColor:"#ec4899",label:"Ventes de nouveaux livres par mois",borderColor:"#f97316",data:newBooksByMonth.value.map(row => row.sales)});
onMounted(() => {
  new Chart(document.getElementById('salesByMonthChart'),{type:'bar',options:{responsive:true,maintainAspectRatio:true,},data:{labels:salesByMonth.value.map(row => row.month),datasets:[datasetsSalesByMonth.value]}});
  new Chart(document.getElementById('newBooksByMonthChart'),{type:'bar',options:{responsive:true,maintainAspectRatio:true,},data:{labels:newBooksByMonth.value.map(row => row.month),datasets:[datasetsNewBooksByMonth.value]}});
})
useSeoMeta({
  title:"Tableau de bord d'activité - 2I Library",
  ogTitle:"Tableau de bord d'activité - 2I Library",
  description:"Consultez le tableau de bord d'activité de 2I Library pour suivre les statistiques clés,les performances des livres et les tendances des utilisateurs. Gérez efficacement votre bibliothèque en ligne.",
  ogDescription:"Consultez le tableau de bord d'activité de 2I Library pour suivre les statistiques clés,les performances des livres et les tendances des utilisateurs. Gérez efficacement votre bibliothèque en ligne.",
  ogImage:"/img/seo/logo-seo.webp",
  twitterCard:"summary_large_image"
})
</script>
<template>
  <section class="py-10 m-auto max-w-[1200px] mx-w-[90%]">
    <div class="container mx-auto px-12 space-y-8">
      <!-- Titre -->
      <h2 class="text-3xl md:text-4xl font-extrabold text-purple-900 text-center">Statistiques des ventes</h2>
      <!-- Stats rapides -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UCard class="text-center shadow-lg rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50">
          <h3 class="text-lg font-semibold text-gray-700">Ventes totales (ce mois)</h3>
          <p class="text-3xl font-extrabold text-purple-700 mt-2">{{totalSales}}</p>
        </UCard>
        <UCard class="text-center shadow-lg rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50">
          <h3 class="text-lg font-semibold text-gray-700">Nouveaux livres vendus</h3>
          <p class="text-3xl font-extrabold text-pink-600 mt-2">{{newBooksSales}}</p>
        </UCard>
        <UCard class="text-center shadow-lg rounded-2xl bg-gradient-to-br from-indigo-50 to-pink-50">
          <h3 class="text-lg font-semibold text-gray-700">Livre le plus commandé</h3>
          <p class="text-xl font-bold text-purple-700 mt-2">{{topBook.title}}</p>
          <p class="text-sm text-gray-600">({{topBook.orders}} commandes)</p>
        </UCard>
      </div>
      <!-- Graphiques -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Ventes par mois -->
        <UCard class="shadow-lg rounded-2xl">
          <h3 class="text-lg font-bold text-purple-800 mb-4">Nombre de ventes par mois</h3>
          <canvas id="salesByMonthChart"></canvas>
        </UCard>
        <!-- Nouveaux livres -->
        <UCard class="shadow-lg rounded-2xl">
          <h3 class="text-lg font-bold text-purple-800 mb-4">Ventes de nouveaux livres par mois</h3>
          <canvas id="newBooksByMonthChart"></canvas>
        </UCard>
      </div>
    </div>
  </section>
</template>