<script setup>
import { ref } from 'vue'
import IconsArrowRight from '~/public/svg/IconsArrowRight.vue'
const basicAuth = inject("basicAuth"),
    data = ref(),
    error = ref(false),
    loading = ref(true),
    formatDate = (isoDate) => {
        return new Date(isoDate).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
try {
    const apiData = ref(await $fetch("http://localhost:8080/m2l/articles/lastArticle", {
        headers: {
            Authorization: `Basic ${basicAuth}`
        },
        credentials: 'include'
    }));
    if (apiData.value) {
        data.value = apiData.value;
    }
    loading.value = false;
} catch (e) {
    console.log(e);
    error.value = true;
}
</script>
<template>
    <section class="py-8 m-auto max-w-[1200px] w-[90%]">
        <div v-if="loading == true">
            <p>Chargement du contenu</p>
        </div>
        <div v-else-if="error == true">
            <p>Erreur de chargement</p>
        </div>
        <div v-else class="container py-6 px-12 clr mx-auto">
            <UCarousel class="rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg" :items="data.content" auto-height dots :autoplay="{ delay: 5000, stopOnMouseEnter: true }" loop v-slot="item" :ui="{ container: 'transition-[height]', controls: 'h-[2em] flex justify-center items-center inset-x-12', dots: 'initial!', dot: 'w-6 h-3' }">
                <!-- Slide principal -->
                <div class="flex flex-col py-[2em] md:flex-row-reverse items-center h-full">
                    <!-- Image -->
                    <div class="w-full md:w-1/2">
                        <NuxtImg src="/img/example.webp" alt="Couverture du livre" class="h-auto w-[75%] max-w-[15em] md:max-w-max md:w-auto md:h-[30em] m-auto object-cover" />
                    </div>
                    <!-- Contenu texte -->
                    <div
                        class="w-full md:w-1/2  p-8 flex flex-col justify-start items-start text-left md:text-left space-y-4">
                        <h2 class="text-xl md:text-3xl md:text-4xl m-0 font-extrabold text-purple-900">{{item.item.book.title }}</h2>
                        <p class="text-sm text-gray-600">Publié le {{ formatDate(item.item.book.date) }}</p>
                        <p class="text-gray-800 font-medium">Par <span v-for="author in item.item.book.authors">{{ author.lastname }} {{ author.firstname }}</span></p>
                        <NuxtLink :to="`/book/${item.item.book.id}`" class="inline-block mt-4 px-6 py-3 hover:opacity-50 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow hover:opacity-90 transition">En savoir plus
                            <IconsArrowRight class="h-[1em] w-[1em] fill-white inline-block ml-[.5em]" />
                        </NuxtLink>
                    </div>
                </div>
            </UCarousel>
        </div>
    </section>
</template>
