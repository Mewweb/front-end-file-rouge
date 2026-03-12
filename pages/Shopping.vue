<script setup lang="ts">
    import BasketSelect from '~/components/table/BasketSelect.vue';
    definePageMeta({
        middleware:['authenticated']
    })
    useSeoMeta({
        title:"Gestion de panier - 2I Library",
        ogTitle:"Gestion de panier - 2I Library",
        description:"Gérez votre panier sur 2I Library. Consultez, modifiez et finalisez vos commandes facilement dans votre espace dédié.",
        ogDescription:"Gérez votre panier sur 2I Library. Consultez, modifiez et finalisez vos commandes facilement dans votre espace dédié.",
        ogImage:"/img/seo/logo-seo.webp",
        twitterCard:"summary_large_image"
    })
</script>
<template>
    <main>
        <BasketSelect/>
    </main>
</template>