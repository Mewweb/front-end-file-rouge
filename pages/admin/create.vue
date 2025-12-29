<script setup lang="ts">
    import FormCreateAdmin from '~/components/form/FormCreateAdmin.vue';
    definePageMeta({
        middleware:['authenticated']
    })
    useSeoMeta({
        title:"Création d'un administrateur - 2I Library",
        ogTitle:"Création d'un administrateur - 2I Library",
        description:"Créez un nouveau compte administrateur dans l'administration de 2I Library. Gérez les utilisateurs, les livres et les commandes facilement.",
        ogDescription:"Créez un nouveau compte administrateur dans l'administration de 2I Library. Gérez les utilisateurs, les livres et les commandes facilement.",
        ogImage:"/img/seo/logo-seo.webp",
        twitterCard:"summary_large_image"
    })
</script>
<template>
    <div class="py-6 px-12">
        <FormCreateAdmin/>
    </div>
</template>
