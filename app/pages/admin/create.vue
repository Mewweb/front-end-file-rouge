<script setup lang="ts">
    import FormCreateAdmin from '~/components/form/FormCreateAdmin.vue';
    import FormSigninForm from '~/components/form/FormSigninForm.vue';
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
    <main class="m-auto max-w-300 w-[90%] py-12">
        <div class="container mx-auto p-6 lg:p-12 bg-gray-100 rounded-lg text-center">
            <FormSigninForm :isAdmin="true" />
        </div>
    </main>
</template>
