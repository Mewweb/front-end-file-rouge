<script setup lang="ts">
import AdminSelect from '~/components/table/AdminSelect.vue';
definePageMeta({
    middleware:['admin-authenticated']
})
useSeoMeta({
    title:"Liste de livre - 2I Library",
    ogTitle:"Liste de livre - 2I Library",
    description:"Voir la liste des livres, ainsi qu'en ajouter des nouveaux, les supprimer et les modifier",
    ogDescription:"Voir la liste des livres, ainsi qu'en ajouter des nouveaux, les supprimer et les modifier",
    ogImage: "/img/seo/logo-seo.webp",
    twitterCard:"summary_large_image"
})
</script>
<template>
    <main class="px-12 relative py-6">
        <AdminSelect data="books" />
    </main>
</template>