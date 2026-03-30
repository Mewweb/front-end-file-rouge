<template>
    <main>
        <section class="m-auto max-w-300 relative w-[90%] py-10">
            <NuxtLink to="/admin/editor/all">Retourner en arrière</NuxtLink>
            <FormCreateEditor :isUpdate="true" />
        </section>
    </main>

</template>
<script setup>
import FormCreateEditor from '~/components/form/FormCreateEditor.vue'
definePageMeta({
    middleware: ['admin-authenticated']
})
useSeoMeta({
    title: "Création d'un auteur - 2I Library",
    ogTitle: "Création d'un auteur - 2I Library",
    description: "Créer un nouvel auteur dans l'administration de 2I Library. Gérez votre bibliothèque facilement.",
    ogDescription: "Créer un nouvel auteur dans l'administration de 2I Library. Gérez votre bibilothèque fecilement.",
    ogImage: "/img/seo/logo-seo.webp",
    twitterCard: "summary_large_image"
})
</script>