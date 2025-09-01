<script setup lang="ts">
  import {VChart} from '#components';
  const option = ref<ECOption>({
    dataset:{
      dimensions:['Product', '2015', '2016', '2017'],
      source:[
        {
          Product:'Matcha Latte',
          2015:54,
          2016:42,
          2017:23,
        },
      ],
    },
    xAxis:{type:'category'},
    yAxis:{},
    series:[{type:'bar'}]
  })
  useSeoMeta({
      title:"Tableau de bord d'activité - 2I Library",
      ogTitle:"Tableau de bord d'activité - 2I Library",
      description:"Consultez le tableau de bord d'activité de 2I Library pour suivre les statistiques clés, les performances des livres et les tendances des utilisateurs. Gérez efficacement votre bibliothèque en ligne.",
      ogDescription:"Consultez le tableau de bord d'activité de 2I Library pour suivre les statistiques clés, les performances des livres et les tendances des utilisateurs. Gérez efficacement votre bibliothèque en ligne.",
      ogImage:"/img/seo/logo-seo.webp",
      twitterCard:"summary_large_image"
  })
</script>
<template>
  <VChart :option="option" />
</template>