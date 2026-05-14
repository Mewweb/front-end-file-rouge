<script setup lang="ts">
import AdminSelect from '~/components/table/AdminSelect.vue';
useSeoMeta({
    title:"La liste des auteurs - 2I Library",
    ogTitle:"La liste des auteurs - 2I Library",
    description:"Voir la liste des auteurs ainsi que la modifier, la supprimer et en ajouter des nouveaux.",
    ogDescription:"Voir la liste des auteurs ainsi que la modifier, la supprimre et en ajouter des nouveaux.",
    twitterCard:"summary_large_image"
})
</script>
<template>
    <main class="px-12 relative py-6">
        <AdminSelect data="author" />
    </main>
</template>