<script setup lang="ts">
import AdminSelect from '~/components/table/AdminSelect.vue';
useSeoMeta({
    title:"La liste des éditeurs - 2I Library",
    ogTitle:"La liste des éditeurs - 2I Library",
    description:"Voir la liste des éditeurs ainsi que pouvoir les modifier, en ajouter ou en supprimer",
    ogDescription:"Voir la liste des éditeurs ainsi que pouvoir les modifier, en ajouter ou en supprimer",
    ogImage:"/img/seo/logo-seo.webp",
    twitterCard:"summary_large_image"
})
</script>
<template>
    <main class="px-12 relative py-6">
        <AdminSelect data="editor" />
    </main>
</template>