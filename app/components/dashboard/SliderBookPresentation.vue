<script setup>
import IconsArrowRight from '~/svg/IconsArrowRight.vue'
const config = useRuntimeConfig().public.urlBackend,
    backendUrl = config == "" ? "http://localhost:8080/m2l" :config;
    loading = ref(true),
    formatDate = (isoDate) => {
        return new Date(isoDate).toLocaleDateString('fr-FR', {
            year:'numeric',
            month:'long',
            day:'numeric'
        })
    },
    data = ref();
data.value = await accessDataNoJwt(`${backendUrl}/articles/lastArticle`);
loading.value = false;
</script>
<template>
    <section class="py-8 m-auto max-w-300 w-[90%]">
        <div v-if="data.error == true">
            <p class="text-center font-bold">Erreur de chargement</p>
        </div>
        <div v-else-if="loading == true">
            <div class="flex flex-col animate-pulse from-indigo-50 to-purple-50 py-[2em] md:flex-row-reverse items-center h-full">
                <!-- Image -->
                <div class="w-full md:w-1/2">
                    <div class="p-0 rounded-lg m-auto w-[75%] max-w-[20em] md:h-[30em] h-[25em] bg-gray-200"></div>
                </div>
                <!-- Contenu texte -->
                <div class="w-full md:w-1/2  p-8 flex flex-col justify-start items-start text-left md:text-left space-y-4">
                    <div class="h-10 rounded-lg w-full bg-gray-200"></div>
                    <div class="h-3 rounded-lg w-20 bg-gray-200"></div>
                    <div class="h-5 rounded-lg w-50 bg-gray-200"></div>
                    <div class="h-10 rounded-lg w-40 bg-gray-200"></div>
                </div>
            </div>
        </div>
        <div v-else class="container py-6 px-12 clr mx-auto">
            <UCarousel class="rounded-lg bg-linear-to-r from-indigo-50 to-purple-50 shadow-lg" :items="data.data.content" auto-height dots :autoplay="{ delay:5000 }" loop v-slot="item" :ui="{ container:'transition-[height]', controls:'h-[2em] flex justify-center items-center inset-x-12', dots:'initial!', dot:'w-6 h-3' }">
                <!-- Slide principal -->
                <div class="flex flex-col py-[2em] md:flex-row-reverse items-center h-full">
                    <!-- Image -->
                    <div class="w-full md:w-1/2 p-8">
                        <NuxtImg :src="backendUrl + '/files/' + item.item.book.image" :alt="'Couverture du livre ' + item.item.book.title + ' en ' + item.item.title" class="h-auto w-[75%] max-w-[15em] md:max-w-max md:w-full md:h-auto m-auto object-cover" />
                    </div>
                    <!-- Contenu texte -->
                    <div class="w-full md:w-1/2  p-8 flex flex-col justify-start items-start text-left md:text-left space-y-4">
                        <h2 class="text-xl md:text-3xl  m-0 font-extrabold text-purple-900">{{ item.item.book.title }}</h2>
                        <p class="text-sm text-gray-600">Publié le {{ formatDate(item.item.book.date) }}</p>
                        <p class="text-gray-800 font-medium">Par <span v-for="author in item.item.book.authors">{{ author.lastname }} {{ author.firstname }}</span></p>
                        <NuxtLink :to="`/book/${item.item.book.id}`" class="inline-block mt-4 px-6 py-3 hover:opacity-50 rounded-lg bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold shadow transition">En savoir plus <IconsArrowRight class="h-[1em] w-[1em] fill-white inline-block ml-[.5em]" /></NuxtLink>
                    </div>
                </div>
            </UCarousel>
        </div>
    </section>
</template>