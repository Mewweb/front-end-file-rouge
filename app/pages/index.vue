<script setup>
import ListBook from '~/components/dashboard/ListBook.vue';
import SliderBookPresentation from '~/components/dashboard/SliderBookPresentation.vue';
useSeoMeta({
    title:"2I Library",
    ogTitle:"2I Library",
    description:"Bienvenue sur le site de 2I Library. Vous retrouverez toutes les livres de formations disponible.",
    ogDescription:"Bienvenue sur le site de 2I Library. Vous retrouverez toutes les livres de formations disponible.",
    ogImage:"/img/seo/logo-seo.wepb",
    twitterCard:"summary_large_image"
})
</script>
<template>
    <main>
        <SliderBookPresentation />
        <div class="formListBook">
            <ListBook />
        </div>
    </main>
</template>