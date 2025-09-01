<template>
    <section class="m-auto max-w-[1200px] mx-w-[90%] py-10">
        <div class="container mx-auto px-6 py-6 lg:px-12 w-full bg-white shadow-lg rounded-2xl">
            <!-- Titre -->
            <h2 class="text-2xl font-bold text-purple-900 mb-6 text-center">Ajouter un livre</h2>
            <!-- Formulaire -->
            <form @submit.prevent="handleSubmit" class="space-y-6 flex justify-between flex-wrap">
                <!-- Titre -->
                <UFormField class="w-full md:w-[48%]" label="Titre du livre" required>
                    <UInput class="w-full" v-model="form.titre" placeholder="Titre du livre" size="lg" />
                </UFormField>
                <!-- Style -->
                <UFormField class="w-full md:w-[48%]" label="Style du livre" required>
                    <USelectMenu class="w-full" v-model="form.style" :items="styles" placeholder="Choisissez un style" />
                </UFormField>
                <!-- Auteur -->
                <!---->
                <UFormField class="w-full md:w-[48%]" label="Auteur" required>
                    <USelectMenu class="w-full" v-model="form.auteur" :items="auteurs" placeholder="Rechercher un auteur" />
                </UFormField>
                <!-- Image -->
                <UFormField class="w-full md:w-[48%]" label="Image du livre" required>
                    <UInput type="file" accept="image/*" class="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2" @change="handleFileUpload" />
                </UFormField>
                <!-- Editeur -->
                <UFormField class="w-full md:w-[48%]" label="Éditeur" required>
                    <USelectMenu class="w-full" v-model="form.editeur" :items="editeurs" placeholder="Rechercher un éditeur" />
                </UFormField>
                <!-- Format -->
                <UFormField class="w-full md:w-[48%]" label="Format du livre" required>
                    <UInput class="w-full" v-model="form.format" placeholder="ex:Broché, Ebook..." size="lg" />
                </UFormField>
                <!-- Stock -->
                <UFormField class="w-full md:w-[48%]" label="Nombre de stock" required>
                    <UInput class="w-full" v-model="form.stock" type="number" min="0" size="lg" />
                </UFormField>
                <!-- ISBN -->
                <UFormField class="w-full md:w-[48%]" label="Numéro ISBN" required>
                    <UInput class="w-full" v-model="form.isbn" placeholder="978-1234567890" size="lg" />
                </UFormField>
                <!-- Bouton -->
                <div class="pt-4 text-right w-full">
                    <UButton class="px-6 py-2 bg-[#cc3399] hover:opacity-50 transition duration-300 text-white rounded hover:bg-[#cc3399] transition cursor-pointer" variant="solid" @click="applySearch"> Ajouter un administrateur</UButton>
                </div>
            </form>
        </div>
    </section>
</template>
<script setup>
import {ref} from "vue"
// Exemples d’options (normalement tu les récupères depuis ton backend)
const styles = ref(["Roman","Science-Fiction","Essai","Biographie","Manga"]),
    editeurs = ref(["Gallimard","Hachette","Flammarion","Pocket","Fayard"]),
    auteurs = ref(["Victor Hugo","Jules Verne","George Orwell","Albert Camus"]),
    form = ref({isbn:"",style:"",image:null,format:"",stock:0,titre:"",editeur:"",auteur:""})
function applySearch(){
    console.log("Recherche appliquée avec les critères :",form.value);
    alert("Recherche appliquée avec succès !");
}
// Upload image
const handleFileUpload = (e)=>form.value.image = e.target.files[0],

// Validation simple
    handleSubmit = ()=>{
    if(!form.value.isbn || !form.value.titre){
        alert("❌ Merci de remplir tous les champs obligatoires.")
        return
    }
    console.log("✅ Livre ajouté :",form.value)
    alert("Livre ajouté avec succès !")
}
</script>
