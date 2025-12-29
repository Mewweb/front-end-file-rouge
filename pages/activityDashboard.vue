<script setup>
import SellBlock from '~/components/element/SellBlock.vue';
const totalSales = ref(1250)
const newBooksSales = ref(320)
const topBook = ref({title:'L’IA en pratique',orders:280})
const salesByMonth = ref([{month:'Jan',sales:200},{month:'Fév',sales:300},{month:'Mar',sales:250},{month:'Avr',sales:400},{month:'Mai',sales:350},{month:'Juin',sales:450}])
const newBooksByMonth = ref([{month:'Jan',sales:50},{month:'Fév',sales:80},{month:'Mar',sales:60},{month:'Avr',sales:120},{month:'Mai',sales:90},{month:'Juin',sales:150}])
const datasetsSalesByMonth = ref({fill:false,tension:.1,backgroundColor:"#f97316",label:"Nombre de ventes par mois",borderColor:"#f97316",data:salesByMonth.value.map(row => row.sales)});
const datasetsNewBooksByMonth = ref({fill:false,tension:.1,backgroundColor:"#ec4899",label:"Ventes de nouveaux livres par mois",borderColor:"#f97316",data:newBooksByMonth.value.map(row => row.sales)});
useSeoMeta({
  title:"Tableau de bord d'activité - 2I Library",
  ogTitle:"Tableau de bord d'activité - 2I Library",
  description:"Consultez le tableau de bord d'activité de 2I Library pour suivre les statistiques clés,les performances des livres et les tendances des utilisateurs. Gérez efficacement votre bibliothèque en ligne.",
  ogDescription:"Consultez le tableau de bord d'activité de 2I Library pour suivre les statistiques clés,les performances des livres et les tendances des utilisateurs. Gérez efficacement votre bibliothèque en ligne.",
  ogImage:"/img/seo/logo-seo.webp",
  twitterCard:"summary_large_image"
})
definePageMeta({
  middleware:['authenticated']
})
</script>
<template>
  <section class="py-10 m-auto max-w-[1200px] w-[90%]">
    <div class="container mx-auto px-12 space-y-8">
      <!-- Titre -->
      <h2 class="text-3xl md:text-4xl font-extrabold text-purple-900 text-center">Statistiques des ventes</h2>
      <!-- Stats rapides -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SellBlock title="Ventes totales (ce mois)" :value="totalSales" :spanText="NaN" />
        <SellBlock title="Nouveaux livres vendus" :value="newBooksSales" :spanText="NaN" />
        <SellBlock title="Livre le plus commandé" :value="topBook.title" :spanText="topBook.orders" />
      </div>
      <!-- Graphiques -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Ventes par mois -->
        <StatisticBarStat :chartData="salesByMonth" :chartDatasets="datasetsSalesByMonth" label="Ventes par mois" chartId="salesByMonthChart" />
        <!-- Nouveaux livres -->
        <StatisticBarStat :chartData="newBooksByMonth" :chartDatasets="datasetsNewBooksByMonth" label="Ventes de nouveaux livres par mois" chartId="newBooksByMonthChart" />
      </div>
    </div>
  </section>
</template>