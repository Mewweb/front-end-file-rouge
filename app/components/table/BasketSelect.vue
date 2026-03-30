<template>
    <section class="m-auto max-w-300 w-[90%] py-10">
        <div class="container mx-auto px-12">
            <!-- Titre -->
            <h2 class="text-3xl font-extrabold text-purple-900 mb-6">Gestion de panier</h2>
            <!-- Liste des articles -->
            <div v-if="loading == true">
                <div v-for="n in 3" :key="n" class="flex flex-col animate-pulse from-indigo-50 to-purple-50 my-[1em] mx-auto md:flex-row items-center justify-between bg-white rounded-xl p-4 mb-4">
                    <div class="h-[15em] bg-gray-200 rounded-lg w-[10em]"></div>
                    <div class="flex-1 px-2 text-center w-[15%] md:text-left">
                        <div class="h-8 bg-gray-200 my-3 rounded-lg w-[75%]"></div>
                        <div class="h-5 bg-gray-200 my-1 rounded-lg w-[55%]"></div>
                        <div class="h-5 bg-gray-200 my-1 rounded-lg w-[45%]"></div>
                    </div>
                    <div class="flex flex-col px-2 w-[15%] lg:flex-row">
                        <div class="h-10 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                    <div class="flex flex-col px-2 w-[15%] lg:flex-row">
                        <div class="h-10 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                    <div class="flex flex-col px-2 w-[20%] lg:flex-row">
                        <div class="h-10 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                </div>
            </div>
            <p v-else-if="data.data.length == 0 && error == false">Le panier est vide. </p>
            <p v-else-if="data.error == true" class="font-bold mb-5">Erreur durant le chargement du panier. Veuillez réessayer plus tard.</p>
            <div v-else v-for="(item,index) in data.data" :key="index" class="flex flex-col my-[1em] mx-auto  md:flex-row items-center justify-between bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
                <!--Image-->
                <NuxtImg src="/img/example.webp" alt="Image du livre" class="max-h-[15em] object-cover rounded-lg mb-4 md:mb-0" />
                <!--Info Livre-->
                <div class="flex-1 px-8 text-center md:text-left">
                    <h3 class="text-[1.5em] font-semibold text-purple-800">{{item.article.book.title}}</h3>
                    <p class="text-sm my-[.5em] text-gray-600">Auteur : <span v-for="author in item.article.book.authors">{{author.firstname}} {{author.lastname}}</span></p>
                    <p class="text-sm my-[.5em] text-gray-800 font-medium">Prix unitaire : {{item.article.price}} €</p>
                </div>
                <div class="flex flex-col lg:flex-row">
                    <!-- Quantité + Total -->
                    <div class="flex items-center gap-4">
                        <label class="w-1 h-1 overflow-hidden absolute" :for="'quantity' + index + 'input'">Quantité</label>
                        <UInput v-model="item.quantity" @input="changeEdited" default-value="1" :name="'quantity' + index + 'input'" :id="'quantity' + index + 'input'" type="number" min="1" class="w-20 text-center" />
                        <p class="text-gray-900 font-semibold">{{(item.article.price * item.quantity).toFixed(2)}} €</p>
                    </div>
                    <!-- Supprimer -->
                    <UButton color="red" variant="solid" class="cursor-pointer mt-[.5em] lg:mt-0 hover:opacity-50 transition duration-300 ml-4" @click="deleteCartItem(item.id,index)">Supprimer
                        <IconTrash class="w-[1.5em] ml-[.5em] fill-black h-[1.5em] inline-block" />
                    </UButton>
                </div>
            </div>
            <!-- Boutons de gestion -->
            <div class="block text-right">
                <UButton class="inline-block mt-4 px-6 py-3 mr-[1em] hover:opacity-50 rounded-lg border-2 outline-0 border-purple-600 text-purple-600 font-semibold shadow bg-transparent hover:bg-transparent cursor-pointer transition">Annuler</UButton>
                <UButton @click="editCartItems" :active="isEdited" :class="[!isEdited ? 'opacity-50' :'','inline-block mt-4 px-6 py-3 mr-[1em] hover:opacity-50 rounded-lg border-2 outline-0 border-purple-600 text-purple-600 font-semibold shadow bg-transparent hover:bg-transparent cursor-pointer transition']">Mettre à jour</UButton>
                <UButton class="inline-block mt-4 px-6 py-3 hover:opacity-50 cursor-pointer rounded-lg bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold shadow transition">Acheter</UButton>
            </div>
        </div>
    </section>
</template>
<script setup>
import{ref}from "vue"
import IconTrash from "~/svg/IconTrash.vue"
const backendUrl = useRuntimeConfig().public.urlBackend == "${BACKEND_URL}" ? "http://localhost:8080/m2l" : useRuntimeConfig().public.backendUrl;
const{loggedIn,user}= useUserSession(),
    data = ref({data:[],error:false}),
    loading = ref(true),
    error = ref(),
    isEdited = ref(false),
    editCartItems=async()=>{
        let dataSend = await putData(`${backendUrl}/cartItem/panier/update`,data.value.data);
        if(dataSend == false){
            await refreshAuth();
            dataSend = await putData(`${backendUrl}/cartItem/panier/update`,data.value.data);
        }
    },
    changeEdited=()=>{isEdited.value = true},
    deleteCartItem=async(id,index)=>{
        let delCartItem = await deleteData(`${backendUrl}/cartItem/${id}`);
        if(delCartItem.error == true){
            await refreshAuth();
            delCartItem = await deleteData(`${backendUrl}/cartItem/${id}`);
        }
        if(delCartItem.error == false) data.value.data.splice(index,1);
        else{
            // Changer pour juste afficher une pop-up car c'est un peu extrême
            data.value.error = true;
        }
    }
if(user.value != null){
    data.value = await accessData(`${backendUrl}/cartItem/panier/${user.value.email}`);
    if(data.value.error == true){
        await refreshAuth();
        data.value = await accessData(`${backendUrl}/cartItem/panier/${user.value.email}`);
    }
}
loading.value = false;
</script>