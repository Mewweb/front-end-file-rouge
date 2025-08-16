<template>
    <!-- Catalogue de livres -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="book in filteredBooks" :key="book.id" class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
            <NuxtImg :src="book.image" alt="Couverture du livre" class="h-auto w-auto object-contain object-top rounded" />
            <div class="mt-4 flex-1 flex flex-col justify-between">
                <div class="space-y-1">
                    <h3 class="text-lg font-semibold text-gray-800">{{ book.title }}</h3>
                    <p class="text-sm text-gray-500">{{ formatDate(book.publishDate) }}</p>
                    <p class="text-sm text-gray-700">Par {{ book.author }}</p>
                </div>
                <div>
                    <NuxtLink :to="`/books/${book.id}`" class="mt-4 inline-block w-full px-4 py-2 bg-[#cc3399] text-white rounded hover:opacity-50 cursor-pointer transition text-center">En savoir plus</NuxtLink>
                    <NuxtLink :to="'#'" class="mt-[.5em] inline-block w-full px-4 py-2 bg-[#3B2A7F] text-white rounded hover:opacity-50 cursor-pointer transition text-center flex items-center justify-center gap-2" @click="addToCart(book)"><span>Ajouter au panier</span><span aria-hidden="true"><IconCartShopping class="w-[1em] ml-[1em] fill-white h-[1em] inline-block" /></span></NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import IconCartShopping from '~/public/svg/IconCartShopping.vue'
const books = ref([
    { id: 1, title: 'L’IA en pratique', author: 'Alice Dupont', publishDate: '2025-07-15', image: '/img/example.jpg' },
    { id: 2, title: 'Nuxt 4 pour les développeurs', author: 'Jean Martin', publishDate: '2025-08-01', image: '/img/example.jpg' },
    { id: 3, title: 'Tailwind avancé', author: 'Claire Bernard', publishDate: '2025-08-05', image: '/img/example.jpg' },
    { id: 3, title: 'Tailwind avancé', author: 'Claire Bernard', publishDate: '2025-08-05', image: '/img/example.jpg' }
]),
    search = ref(''),
    filters = ref({
        date: true,
        author: true,
        title: true
    }),
    // Filtrage
    filteredBooks = computed(() => {
        return books.value.filter(book => {
            const searchTerm = search.value.toLowerCase()
            let match = false
            if (filters.value.title && book.title.toLowerCase().includes(searchTerm)) match = true
            if (filters.value.author && book.author.toLowerCase().includes(searchTerm)) match = true
            if (filters.value.date && formatDate(book.publishDate).toLowerCase().includes(searchTerm)) match = true
            return match || searchTerm === ''
        })
    }),
    formatDate = (isoDate) => {
        return new Date(isoDate).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
</script>