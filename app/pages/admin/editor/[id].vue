<template>
    <main class="px-12 relative py-6">
        <NuxtLink to="/admin/books/all" class="rounded-full p-[.6em_1em] inline-block cursor-pointer mb-[1em] transition duration-300 bg-transparent text-purple-800 border-purple-800 hover:text-white hover:bg-purple-800 border-2 ">
            <UIcon name="i-lucide-chevron-left" />Retourner en arrière
        </NuxtLink>
        <FormCreateEditor :isUpdate="true" />
    </main>

</template>
<script setup>
import FormCreateEditor from '~/components/form/FormCreateEditor.vue'
definePageMeta({
    middleware:['admin-authenticated']
})
useSeoMeta({
    title:"Création d'un auteur - 2I Library",
    ogTitle:"Création d'un auteur - 2I Library",
    description:"Créer un nouvel auteur dans l'administration de 2I Library. Gérez votre bibliothèque facilement.",
    ogDescription:"Créer un nouvel auteur dans l'administration de 2I Library. Gérez votre bibilothèque fecilement.",
    ogImage:"/img/seo/logo-seo.webp",
    twitterCard:"summary_large_image"
})
</script>