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
    <main class="px-12 relative py-6 mt-[2em]">
        <NuxtLink to="/admin/books/all" class="rounded-full p-[.6em_1em] inline-block cursor-pointer mb-[1em] transition duration-300 bg-transparent text-purple-800 border-purple-800 hover:text-white hover:bg-purple-800 border-2 ">
            <UIcon name="i-lucide-chevron-left" class="align-middle mb-[.1em] text-[1.5em]" />Retourner en arrière
        </NuxtLink>
        <FormCreateBook :isUpdate="true" />
    </main>
</template>
