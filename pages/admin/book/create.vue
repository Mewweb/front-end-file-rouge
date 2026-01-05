<script setup lang="ts">
    import FormCreateBook from '~/components/form/FormCreateBook.vue';
    definePageMeta({
        middleware:['admin-authenticated']
    })
    useSeoMeta({
        title:"Création d'un livre - 2I Library",
        ogTitle:"Création d'un livre - 2I Library",
        description:"Créez un nouveau livre dans l'administration de 2I Library. Ajoutez des détails, des catégories et gérez votre bibliothèque facilement.",
        ogDescription:"Créez un nouveau livre dans l'administration de 2I Library. Ajoutez des détails, des catégories et gérez votre bibliothèque facilement.",
        ogImage:"/img/seo/logo-seo.webp",
        twitterCard:"summary_large_image"
    })
</script>
<template>
    <div class="px-12 py-6">
        <FormCreateBook/>
    </div>
</template>
