<template>
    <section class="m-auto max-w-[1200px] w-[90%] py-10">
        <div class="container mx-auto px-6 py-6 lg:px-12 w-full bg-white shadow-lg rounded-2xl">
            <!-- Titre -->
            <h2 class="text-2xl font-bold text-purple-900 mb-6 text-center">Ajouter un livre</h2>
            <!-- Formulaire -->
            <form v-if="loading == false" @submit.prevent="handleSubmit" class="space-y-6 flex justify-between flex-wrap">
                <!--Titre du livre-->
                <UFormField class="w-full md:w-[48%]" label="Titre du livre" required>
                    <UInput class="w-full" v-model="form.titre" placeholder="Titre du livre" size="lg" />
                </UFormField>
                <!--Le nombre de stock du livre-->
                <UFormField class="w-full md:w-[48%]" label="Le nombre de stock du livre" required>
                    <UInputNumber class="w-full" v-model="form.stock" placeholder="Le nombre de stock du livre" size="lg" :min="0" :max="100" />
                </UFormField>
                <!--Le genre du livre-->
                <UFormField class="w-full md:w-[48%]" label="Le genre du livre" required>
                    <USelectMenu class="w-full" v-model="form.style" :items="style" placeholder="Choisissez un genre" size="lg" />
                </UFormField>
                <!--La date du livre-->
                <UFormField class="w-full md:w-[48%]" label="La date du livre" required>
                    <UInput class="w-full" v-model="form.date" placeholder="La date du livre" size="lg" />
                </UFormField>
                <!--L'image du livre-->
                <UFormField class="w-full md:w-[48%]" label="L'image du livre" required>
                    <UInput class="w-full" v-model="form.image" placeholder="L'image du livre" siez="lg" />
                </UFormField>
                <!--Les auteurs du livre-->
                <UFormField class="w-full md:w-[48%]" label="Les auteurs du livre" required>
                    <USelectMenu v-model:search-term="authorSearch" :items="authors.content" :loading="loadingAuthor == true" ignore-filter icon="i-lucide-user" placeholder="Auteur" class="w-full"></USelectMenu>
                </UFormField>
                <!--Synopsis du livre-->
                <UFormField class="w-full" label="Synopsis du livre" required>
                    <UTextarea class="w-full" :rows="7" v-model="form.synopsis" placeholder="Synopsis du livre" size="lg" autoresize="" />
                </UFormField>
   
                <!-- Bouton -->
                <div class="pt-4 text-right w-full">
                    <UButton class="px-6 py-2 bg-[#cc3399] hover:opacity-50 transition duration-300 text-white rounded hover:bg-[#cc3399] transition cursor-pointer" variant="solid" @click="applySearch"> Ajouter un livre</UButton>
                </div>
            </form>
            <div v-else-if="errorReport">
                <p>Erreur de chargement des données</p>
                <p>{{errorReport}}</p>
            </div>
            <div v-else class="space-y-6 flex justify-between flex-wrap">
                <div v-for="n in 6" class="p-5 bg-gray-50 animate-pulse rounded-md w-full md:w-[48%]">
                    <div class="h-5 mb-5 rounded-md bg-gray-100"></div>
                    <div class="h-10 rounded-md bg-gray-100"></div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import{ref}from "vue"
// Exemples d’options(normalement tu les récupères depuis ton backend)
const basicAuth = inject("basicAuth"),
    authors = ref(),
    editors = ref(),
    errorReport = ref(),
    loading = ref(),
    loadingAuthor = ref(),
    loadingEditor = ref(),
    article = ref(["Grand format", "Livre de poche"]),
    styles = ref(["Roman","Science-Fiction","Essai","Biographie","Manga"]),
    form = ref({isbn:"",style:"",image:null,date:"",format:"",stock:0,titre:"",editeur:"",auteur:""}),
    authorSearch = ref(),
    editorSearch = ref();
let authorDelay = null;
let editorDelay = null;
watch(authorSearch,(newSearch)=>{
    clearTimeout(authorDelay);
    authorDelay = setTimeout(async function(){
        try{
            const apiData = ref(),
                url = "http://localhost:8080/m2l/author" +(newSearch != "" ? `/${encodeURI(newSearch.replaceAll('/','-'))}` :"/all");
            loadingAuthor.value = true;
            apiData.value = await $fetch(url,{
                headers:{
                    Authorization:`Basic ${basicAuth}`
                },
                credentials:'include'
            });
            if(apiData.value)authors.value = apiData.value;
            loadingAuthor.value = false;
        }catch(e){
            console.log(e);
            errorReport.value = true;
        }
    })
});
watch(editorSearch,(newSearch)=>{
    clearTimeout(editorDelay);
    editorDelay = setTimeout(async function(){
        try{
            const apiData = ref(),
                url = "http://localhost:8080/m2l/editor" +(newSearch != "" ? `/${encodeURI(newSearch.replaceAll('/','-'))}` :"/all");
            loadingEditor.value = true;
            apiData.value = await $fetch(url,{
                headers:{
                    Authorization:`Basic ${basicAuth}`
                },
                credentials:'include'
            });
            if(apiData.value)editors.value = apiData.value;
            loadingEditor.value = false;
        }catch(e){
            console.log(e);
            errorReport.value = true;
        }
    })
})
async function callAll(){
    const errorReport = ref(false);
    try{
        const apiData = ref();
        loading.value = true;
        apiData.value = await $fetch('http://localhost:8080/m2l/author/all',{
            headers:{
                Authorization:`Basic ${basicAuth}`
            },
            credentials:'include'
        });
        if(apiData.value)authors.value = apiData.value;
        apiData.value = await $fetch('http://localhost:8080/m2l/editor/all',{
            headers:{
                Authorization:`Basic ${basicAuth}`
            },
            credentials:'include'
        })
        if(apiData.value)editors.value = apiData.value;
        loading.value = false;
    }
    catch(e){
        console.log(e);
        errorReport.value = true;
    }
}
callAll();
function applySearch(){
    console.log("Recherche appliquée avec les critères :",form.value);
    alert("Recherche appliquée avec succès !");
}
// Upload image
const handleFileUpload =(e)=> form.value.image = e.target.files[0],

    // Validation simple
    handleSubmit =()=>{
        if(!form.value.isbn || !form.value.titre){
            alert("❌ Merci de remplir tous les champs obligatoires.")
            return
        }
        console.log("✅ Livre ajouté :",form.value)
        alert("Livre ajouté avec succès !")
    }
</script>
