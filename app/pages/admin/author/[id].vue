<template>
    <main class="px-12 relative mt-[2em] py-6">
        <NuxtLink to="/admin/books/all" class="rounded-full p-[.6em_1em] inline-block cursor-pointer mb-[1em] transition duration-300 bg-transparent text-purple-800 border-purple-800 hover:text-white hover:bg-purple-800 border-2 ">
            <UIcon name="i-lucide-chevron-left" class="text-[1.5em] mb-[.1em] align-middle" />Retourner en arrière
        </NuxtLink>
        <FormCreateAuthor :isUpdate="true" />
    </main>
</template>
<script setup>
    useSeoMeta({
        title:"Modifier un auteur - 2I Library",
        ogTitle:"Modifier un auteur - 2I Library",
        description:"Pouvoir modifier un auteur spécifiquement choisi dans la liste",
        ogDescription:"Pouvoir modifier un auteur spécifiquement choisi dans la liste",
        ogImage:"/img/seo/logo-seo.webp",
        twitterCard:"summary_large_image"
    })
</script>