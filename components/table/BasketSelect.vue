<template>
    <section class="m-auto max-w-[1200px] w-[90%] py-10">
        <div class="container mx-auto px-12">
            <!-- Titre -->
            <h2 class="text-3xl font-extrabold text-purple-900 mb-6">Gestion de panier</h2>
            <!-- Liste des articles -->
            <p v-if="loading == true">En cours de chargement</p>
            <p v-else-if="data.length == 0 && error == false">Le panier est vide. </p>
            <p v-else-if="error == true">Erreur durant le chargement du panier. Veuillez réssayer plus tard.</p>
            <div v-else v-for="(item,index) in data" :key="index" class="flex flex-col my-[1em] mx-auto  md:flex-row items-center justify-between bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
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
                <UButton class="inline-block mt-4 px-6 py-3 mr-[1em] hover:opacity-50 rounded-lg border-2 outline-0 border-purple-600 text-purple-600 font-semibold shadow hover:opacity-50 bg-transparent hover:bg-transparent cursor-pointer transition">Annuler</UButton>
                <UButton @click="editCartItems" :active="isEdited" :class="[!isEdited ? 'opacity-50' : '','inline-block mt-4 px-6 py-3 mr-[1em] hover:opacity-50 rounded-lg border-2 outline-0 border-purple-600 text-purple-600 font-semibold shadow hover:opacity-50 bg-transparent hover:bg-transparent cursor-pointer transition']">Mettre à jour</UButton>
                <UButton class="inline-block mt-4 px-6 py-3 hover:opacity-50 cursor-pointer rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow hover:opacity-50 transition">Acheter</UButton>
            </div>
        </div>
    </section>
</template>
<script setup>
import {ref} from "vue"
import IconTrash from "~/public/svg/IconTrash.vue"
const {loggedIn,user} = useUserSession();
const data = ref();
const loading = ref(true);
const error = ref();
const isEdited = ref(false);

async function editCartItems(){
    let dataSend = await putData(`http://localhost:8080/m2l/cartItem/panier/update`, data.value);
    if(dataSend == false){
        await refreshAuth();
        dataSend = await putData(`http://localhost:8080/m2l/cartItem/panier/update`, data.value);
    }
}

async function getCartItems() {
    if(user.value != null){
    let values = await accessData(`http://localhost:8080/m2l/cartItem/panier/${user.value.email}`);
        if (values.error == true) {
            await refreshAuth();
            values = await accessData(`http://localhost:8080/m2l/cartItem/panier/${user.value.email}`);
        }
        console.log(values.data);
        data.value = values.data;
        error.value = values.error;
        console.log(data.value);
        loading.value = false;
    }
}
getCartItems();
function changeEdited(){
    isEdited.value = true;
}
async function deleteCartItem(id,index){
    let delCartItem = await deleteData(`http://localhost:8080/m2l/cartItem/${id}`);
    if(delCartItem.error == true){
        await refreshAuth();
        delCartItem = await deleteData(`http://localhost:8080/m2l/cartItem/${id}`);
    }
    if(delCartItem.error == false){
        data.value.splice(index, 1);
    }else{
        // Changer pour juste afficher une pop-up car c'est un peu extrême
        error.value = true;
    }
}

</script>