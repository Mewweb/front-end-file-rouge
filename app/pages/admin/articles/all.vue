<script setup>
import AdminSelect from '~/components/table/AdminSelect.vue'
useSeoMeta({
    title:"La liste des articles - 2I Library",
    ogTitle:"La liste des articles - 2I Library",
    description:"Voir la liste des articles ainsi que la modifier, en supprimer et en ajouter des nouveaux",
    ogDescription:"Voir la liste des articles ainsi que la modifier, en supprimer et en ajouter des nouveaux",
    ogImage:"/img/seo/logo-seo.webp",
    twitterCard:"summary_large_image"
})
</script>
<template>
    <main class="px-12 relative py-6">
        <AdminSelect data="articles" />
    </main>
</template>