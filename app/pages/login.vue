<script setup lang="ts">
import LoginPage from '~/components/page/LoginPage.vue';
useSeoMeta({
    title:"Connexion - 2I Library",
    ogTitle:"Connexion - 2I Library",
    description:"Connectez-vous à votre compte 2I Library pour accéder à votre bibliothèque en ligne, gérer vos commandes et profiter de nos services exclusifs.",
    ogDescription:"Connectez-vous à votre compte 2I Library pour accéder à votre bibliothèque en ligne, gérer vos commandes et profiter de nos services exclusifs.",
    ogImage:"/img/seo/logo-seo.webp",
    twitterCard:"summary_large_image"
})
</script>
<template>
    <main class="px-6 sm:px-12 py-6">
        <LoginPage />
    </main>
</template>