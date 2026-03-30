<template>
    <main>
        <FormAccount/>
    </main>
</template>
<script setup>
    import FormAccount from '~/components/form/FormAccount.vue';
    definePageMeta({
        middleware:['authenticated']
    })
    useSeoMeta({
        title:"Modification du compte - 2I Library",
        ogTitle:"Modification du compte - 2I Library",
        description:"Modifier les informations de votre compte sur 2I library. Mettez à jour vos détails personnels et gérez vos préférences facilement dans votre espace dédié.",
        ogDescription:"Modifier les informations de votre compte sur 2I Library. Mettez à jour vos détails personnels et gérez vos préférences facilement dans votre espace dédié.",
        ogImage:"/img/so/logo-seo.webp",
        twitterCard:"summary_large_image"
    })
</script>