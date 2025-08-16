<template>
    <section class="bg-gray-50 py-10">
        <div class="container mx-auto px-6 lg:px-12">
            <!-- Titre -->
            <h2 class="text-3xl font-extrabold text-purple-900 mb-6">Gestion de panier</h2>
            <!-- Liste des articles -->
            <div v-for="(item, index) in cart" :key="index" class="flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
                <!-- Image -->
                <NuxtImg :src="item.image" alt="Image du livre" class="h-[15em] object-cover rounded-lg mb-4 md:mb-0" />
                <!-- Infos livre -->
                <div class="flex-1 px-8 text-center md:text-left">
                    <h3 class="text-lg font-semibold text-purple-800">{{ item.title }}</h3>
                    <p class="text-sm text-gray-600">Auteur :{{ item.author }}</p>
                    <p class="text-sm text-gray-800 font-medium">Prix unitaire :{{ item.price }} €</p>
                </div>
                <!-- Quantité + Total -->
                <div class="flex items-center gap-4">
                    <UInput v-model="item.quantity" type="number" min="1" class="w-20 text-center" />
                    <p class="text-gray-900 font-semibold">{{ (item.price * item.quantity).toFixed(2) }} €</p>
                </div>
                <!-- Supprimer -->
                <UButton color="red" variant="solid" class="cursor-pointer hover:opacity-50 transition duration-300 ml-4" @click="removeItem(index)">Supprimer <IconTrash class="w-[1.5em] ml-[.5em] fill-black h-[1.5em] inline-block" /></UButton>
            </div>
            <!-- Boutons de gestion -->
            <div class="flex justify-between mt-6">
                <UButton color="gray" variant="outline">Annuler</UButton>
                <UButton color="purple" variant="solid">Acheter</UButton>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from "vue"
import IconTrash from "~/public/svg/IconTrash.vue"
const cart = ref([
    {
        title:"Apprendre Nuxt 4",
        author:"Jean Dupont",
        price:29.99,
        quantity:1,
        image:"/img/example.jpg",
    },
    {
        title:"Vue.js Avancé",
        author:"Marie Curie",
        price:34.99,
        quantity:2,
        image:"/img/example.jpg",
    },
])
const removeItem = (index)=>{
    cart.value.splice(index, 1)
}
</script>
