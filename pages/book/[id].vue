<script setup lang="ts">
    import BookDetails from '~/components/element/BookDetails.vue';
    import BookCaracteristic from '~/components/table/BookCaracteristic.vue';
    useSeoMeta({
        title:"Détails du livre - 2I Library",
        ogTitle:"Détails du livre - 2I Library",
        description:"Découvrez les détails complets du livre sur 2I Library. Lisez la description, consultez les caractéristiques et ajoutez-le à votre panier pour une expérience de lecture enrichissante.",
        ogDescription:"Découvrez les détails complets du livre sur 2I Library. Lisez la description, consultez les caractéristiques et ajoutez-le à votre panier pour une expérience de lecture enrichissante.",
        ogImage:"/img/seo/logo-seo.webp",
        twitterCard:"summary_large_image"
    })
</script>
<template>
    <div class="px-12 py-6">
        <BookDetails/>
        <BookCaracteristic/>
    </div>
</template>