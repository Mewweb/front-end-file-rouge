<template>
    <div class="bg-linear-to-r h-full w-full m-auto from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg p-4 flex flex-col">
        <NuxtImg :src="backendUrl + '/files/' + book.book.image" :alt="'Couverture du livre ' + book.book.title + ' en ' + book.title" loading="lazy" class="h-auto w-[15em] m-auto md:w-auto  object-contain object-top rounded" />
        <div class="mt-4 flex-1 flex flex-col justify-between">
            <h3 class="text-lg font-semibold text-gray-800">{{ book.book.title }}</h3>
            <p class="text-sm text-gray-500">{{ formatDate(book.book.date) }}</p>
            <p class="text-sm text-gray-700"><span v-for="author, index in book.book.authors">{{ author.firstname }} {{ author.lastname }} {{ index != book.book.authors.length - 1 ? "," :"" }}</span></p>
        </div>
        <div>
            <NuxtLink :to="`/book/${book.book.id}`" class="mt-4 inline-block w-full px-4 py-2 bg-[#cc3399] text-white rounded hover:opacity-50 cursor-pointer transition text-center">En savoir plus</NuxtLink>
            <NuxtLink v-if="loggedIn" :to="'#'" class="mt-[.5em] inline-block w-full px-4 py-2 bg-[#3B2A7F] text-white rounded hover:opacity-50 cursor-pointer transition text-center items-center justify-center gap-2" @click="addToCart(book)"><span>Ajouter au panier</span></NuxtLink>
        </div>
    </div>
</template>
<script setup>
const config = useRuntimeConfig().public.urlBackend,
    backendUrl = config == "${BACKEND_URL}" ? "http://localhost:8080/m2l" :config,
    {loggedIn} = useUserSession("loggedIn"),
    props = defineProps(['book','offsetPage']),
    formatDate=(isoDate)=>{
        return new Date(isoDate).toLocaleDateString('fr-FR',{
            year:'numeric',
            month:'long',
            day:'numeric'
        })
    };
</script>
