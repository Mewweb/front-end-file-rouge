<script setup lang="ts">
    import SigninPage from '~/components/page/SigninPage.vue';
    useSeoMeta({
        title:"Inscription - 2I Library",
        ogTitle:"Inscription - 2I Library",
        description:"Inscrivez-vous sur 2I Library pour accéder à une vaste collection de livres en ligne, gérer votre compte et profiter de nos services exclusifs.",
        ogDescription:"Inscrivez-vous sur 2I Library pour accéder à une vaste collection de livres en ligne, gérer votre compte et profiter de nos services exclusifs.",
        ogImage:"/img/seo/logo-seo.webp",
        twitterCard:"summary_large_image"
    })
</script>
<template>
    <main>
        <SigninPage :isAdmin="false" />
    </main>
</template>