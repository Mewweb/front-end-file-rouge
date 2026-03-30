<script setup>
import gsap from 'gsap';
import SellBlock from '~/components/element/SellBlock.vue';
const loading = ref(false),
  totalSales = ref(1250),
  newBooksSales = ref(320),
  topBook = ref(
    {
      title:'L’IA en pratique',
      orders:280
    }
  ),
  salesByMonth = ref(
    [
      {
        month:'Jan',
        sales:200
      },
      {
        month:'Fév',
        sales:300
      },
      {
        month:'Mar',
        sales:250
      },
      {
        month:'Avr',
        sales:400
      },
      {
        month:'Mai',
        sales:350
      },
      {
        month:'Juin',
        sales:450
      }
    ]
  ),
  newBooksByMonth = ref(
    [
      {
        month:'Jan',
        sales:50
      },
      {
        month:'Fév',
        sales:80
      },
      {
        month:'Mar',
        sales:60
      },
      {
        month:'Avr',
        sales:120
      },
      {
        month:'Mai',
        sales:90
      },
      {
        month:'Juin',
        sales:150
      }
    ]
  ),
  datasetsSalesByMonth = ref(
    {
      fill:false,
      tension:.1,
      backgroundColor:"#f97316",
      label:"Nombre de ventes par mois",
      borderColor:"#f97316",
      data:salesByMonth.value.map(row => row.sales)
    }),
  datasetsNewBooksByMonth = ref(
    {
      fill:false,
      tension:.1,
      backgroundColor:"#ec4899",
      label:"Ventes de nouveaux livres par mois",
      borderColor:"#f97316",
      data:newBooksByMonth.value.map(row => row.sales)
    }
  ),
  animDiv = [useTemplateRef("totalTemplate"),useTemplateRef("bookSallTemplate"),useTemplateRef("topBookSell"),useTemplateRef("statisticBarStat"),useTemplateRef("statisticBarStat1")];
onMounted(()=>{
  let i = 0;
  setInterval(()=>{
    if(i >= animDiv.length) clearInterval()
    else{
      gsap.to(animDiv[i].value,{
        duration:1,
        opacity:1,
        y:0,
        x:0,
        stagger:{
          each:.5
        },
        ease:"ease"
      });
      i++;
    }
  },250);
})
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
  <section class="py-10 m-auto max-w-300 w-[90%]">
    <div>
      <!-- Titre -->
      <h2 class="text-3xl mb-8 md:text-4xl font-extrabold text-purple-900 text-center">Statistiques des ventes</h2>
      <div class="container mx-auto px-12 space-y-8" v-if="loading == true">
        <div class="grid grid-cols-1 rounded-lg p-5 bg-gray-200 lg:grid-cols-3 gap-6">
          <div class="h-30 rounded-lg bg-gray-300"></div>
          <div class="h-30 rounded-lg bg-gray-300"></div>
          <div class="h-30 rounded-lg bg-gray-300"></div>
        </div>
        <div class="grid grid-cols-1 rounded-lg p-5 bg-gray-200 md:grid-cols-2 gap-8">
          <div class="h-60 rounded-lg bg-gray-300"></div>
          <div class="h-60 rounded-lg bg-gray-300"></div>
        </div>
      </div>
      <div class="container mx-auto px-12 space-y-8" v-else>
        <!-- Stats rapides -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div ref="totalTemplate" class="translate-x-[-5em] opacity-0">
            <SellBlock title="Ventes totales (ce mois)" :value="totalSales" :spanText="NaN" />
          </div>
          <div ref="bookSallTemplate" class="translate-x-[-5em] opacity-0">
            <SellBlock title="Nouveaux livres vendus" :value="newBooksSales" :spanText="NaN" />
          </div>
          <div ref="topBookSell" class="translate-x-[-5em] opacity-0">
            <SellBlock title="Livre le plus commandé" :value="topBook.title" :spanText="topBook.orders" />
          </div>
        </div>
        <!-- Graphiques -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div ref="statisticBarStat" class="translate-y-[5em] opacity-0">
            <!-- Ventes par mois -->
            <StatisticBarStat :chartData="salesByMonth" :chartDatasets="datasetsSalesByMonth" label="Ventes par mois" chartId="salesByMonthChart" />
          </div>
          <div ref="statisticBarStat1" class="translate-y-[5em] opacity-0">
            <!-- Nouveaux livres -->
            <StatisticBarStat :chartData="newBooksByMonth" :chartDatasets="datasetsNewBooksByMonth" label="Ventes de nouveaux livres par mois" chartId="newBooksByMonthChart" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>