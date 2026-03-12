<script setup>
import BookDetails from '~/components/element/BookDetails.vue'; 
import BookCaracteristic from '~/components/table/BookCaracteristic.vue';
useSeoMeta({
    title:"Détails du livre - 2I Library",
    ogTitle:"Détails du livre - 2I Library",
    description:"Découvrez les détails complets du livre sur 2I Library. Lisez la description, consultez les caractéristiques et ajoutez-le à votre panier pour une expérience de lecture enrichissante.",
    ogDescription:"Découvrez les détails complets du livre sur 2I Library. Lisez la description, consultez les caractéristiques et ajoutez-le à votre panier pour une expérience de lecture enrichissante.",
    ogImage:"/img/seo/logo-seo.webp",
    twitterCard:"summary_large_image"
})
const loading = ref(true),
    data = ref();
data.value = await accessDataNoJwt(`${useRuntimeConfig().public.urlBackend}/articles/${useRoute().params.id}`);
loading.value = false;
</script>
<template>
    <main class="px-12 py-6">
        <div v-if="data.error">
            <p class="text-center font-bold">Erreur de chargement du livre.</p>
        </div>
        <div v-else-if="loading">
            <div class="container shadow-md bg-white mx-auto animate-pulse from-indigo-50 to-purple-50 py-12 rounded-lg px-6 lg:px-12 flex md:flex-row flex-col justify-between gap-10 items-center">
                <div class="flex justify-center w-full md:w-[48%] order-1">
                    <div class="rounded-lg bg-gray-200 h-[20em] w-full"></div>
                </div>
                <div class="order-2 w-full md:w-[48%]">
                    <div class="bg-gray-200 rounded-lg h-10 mb-6 w-[85%]"></div>
                    <div class="bg-gray-200 mb-4 rounded-lg h-5 w-[75%]"></div>
                    <div class="mb-6">
                        <div class="bg-gray-200 rounded-lg mb-1 h-5 w-full"></div>
                        <div class="bg-gray-200 rounded-lg mb-1 h-5 w-[80%]"></div>
                        <div class="bg-gray-200 rounded-lg mb-1 h-5 w-full"></div>
                        <div class="bg-gray-200 rounded-lg mb-1 h-5 w-[80%]"></div>
                    </div>
                    <div class="flex flex-wrap gap-4">
                        <div class="bg-gray-200 rounded-lg h-10 w-[35%]"></div>
                        <div class="bg-gray-200 rounded-lg h-10 w-[30%]"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <BookDetails :image="data.data.book.image" :title="data.data.book.title" :authors="data.data.book.authors" :date="data.data.book.date" :description="data.data.book.synopsis" />
            <BookCaracteristic :editor="data.data.editor.title" :authors="data.data.book.authors" :number_isbn="data.data.number_isbn" :style="data.data.book.style" :date="data.data.book.date" :article="data.data.title" :format="data.data.width + ' X ' + data.data.height + ' X ' + data.data.thickness" />
        </div>
    </main>
</template>