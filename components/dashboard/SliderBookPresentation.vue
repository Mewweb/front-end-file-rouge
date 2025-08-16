<template>
    <section class="bg-white py-8 m-auto max-w-[1200px] mx-w-[90%]">
        <div class="container clr mx-auto">
            <UCarousel :items="books" arrows :ui="{item:'basis-full',container:'align-stretch',prev:'sm:right-auto sm:left-[1em] sm:-space-0',next:'sm:right-[1em] sm:left-auto sm:-space-0'}" loop :autoplay="{delay:5000,stopOnMouseEnter:true}" indicators class="rounded-lg overflow-hidden shadow-lg">
                <!-- Slide principal -->
                <template #default="{item}">
                    <div class="flex flex-col py-[2em] md:flex-row-reverse items-center h-full bg-gradient-to-r from-indigo-50 to-purple-50">
                        <!-- Image -->
                        <div class="w-full md:w-1/2">
                            <NuxtImg :src="item.image" alt="Couverture du livre" class="w-auto h-[30em] m-auto object-cover" />
                        </div>
                        <!-- Contenu texte -->
                        <div class="w-full md:w-1/2 pl-[4em] p-8 flex flex-col justify-start items-start text-center md:text-left space-y-4">
                            <h2 class="text-3xl md:text-4xl m-0 font-extrabold text-purple-900">{{item.title}}</h2>
                            <p class="text-sm text-gray-600">Publié le {{formatDate(item.publishDate)}}</p>
                            <p class="text-lg text-gray-800 font-medium">Par {{item.author}}</p>
                            <NuxtLink :to="`/books/${item.id}`" class="inline-block mt-4 px-6 py-3 hover:opacity-50 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow hover:opacity-90 transition">En savoir plus
                                <IconsArrowRight class="h-[1em] w-[1em] fill-white inline-block ml-[.5em] " />
                            </NuxtLink>
                        </div>
                    </div>
                </template>
                <!-- Flèches en bas -->
                <template #arrows="{prev,next}">
                    <div class="flex justify-center gap-4 mt-4">
                        <UButton icon="i-heroicons-chevron-left cursor-pointer" @click="prev" color="gray" variant="soft" />
                        <UButton icon="i-heroicons-chevron-right cursor-pointer" @click="next" color="gray" variant="soft" />
                    </div>
                </template>
            </UCarousel>
        </div>
    </section>
</template>
<script setup>
import {ref} from 'vue'
import IconsArrowRight from '~/public/svg/IconsArrowRight.vue'
const books = ref([{id:1,title:'L’IA en pratique',author:'Alice Dupont',publishDate:'2025-07-15',image:'/img/example.jpg'},{id:2,title:'Nuxt 4 pour les développeurs',author:'Jean Martin',publishDate:'2025-08-01',image:'/img/example.jpg'},{id:3,title:'Tailwind avancé',author:'Claire Bernard',publishDate:'2025-08-05',image:'/img/example.jpg'}]),
    formatDate = (isoDate) => {
        return new Date(isoDate).toLocaleDateString('fr-FR',{
            year:'numeric',
            month:'long',
            day:'numeric'
        })
    }
</script>