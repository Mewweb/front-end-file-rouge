<template>
    <section class="m-auto max-w-[1200px] w-[90%] py-10">
        <div class="container mx-auto px-6 py-6 lg:px-12 w-full bg-white shadow-lg rounded-2xl">
            <!-- Titre -->
            <h2 class="text-2xl font-bold text-purple-900 mb-6 text-center">Ajouter un livre</h2>
            <!-- Formulaire -->
            <UForm v-if="loading == false" :schema="schema" :state="form" @submit="handleSubmit"
                class="space-y-6 flex justify-between flex-wrap">
                <!--Titre du livre-->
                <UFormField class="w-full md:w-[48%]" name="title" id="title" label="Titre du livre" required>
                    <UInput class="w-full" minlength="2" maxlength="200" v-model="form.title" placeholder="Titre du livre" size="lg" />
                </UFormField>
                <!--Le nombre de stock du livre-->
                <UFormField class="w-full md:w-[48%]" name="stock" id="stock" label="Le nombre de stock du livre"
                    required>
                    <UInputNumber class="w-full" v-model="form.stock" placeholder="Le nombre de stock du livre"
                        size="lg" :min="0" :max="1000" />
                </UFormField>
                <!--Le genre du livre-->
                <UFormField class="w-full md:w-[48%]" name="style" id="style" label="Le genre du livre" required>
                    <USelectMenu class="w-full" v-model="form.style" :items="style" placeholder="Choisissez un genre"
                        size="lg" />
                </UFormField>
                <!--La date du livre-->
                <UFormField class="w-full md:w-[48%]" name="date" id="date" label="La date du livre" required>
                    <UInput class="w-full" v-model="form.date" type="date" placeholder="La date du livre" size="lg" />
                </UFormField>
                <!--L'image du livre-->
                <UFormField class="w-full md:w-[48%]" name="image" id="image" label="L'image du livre" required>
                    <UInput class="w-full" type="file" v-model="form.image" placeholder="L'image du livre" siez="lg" />
                </UFormField>
                <!--Les auteurs du livre-->
                <UFormField class="w-full md:w-[48%]" name="authors" id="authors" label="Les auteurs du livre" required>
                    <USelectMenu v-model:search-term="authorSearch" multiple value-key="id" v-model="form.authorsId" :items="authors"
                        :loading="loadingAuthor == true" ignore-filter icon="i-lucide-user" placeholder="Auteur"
                        class="w-full"></USelectMenu>
                </UFormField>
                <!--Synopsis du livre-->
                <UFormField class="w-full" name="synopsis" id="synopsis" label="Synopsis du livre" required>
                    <UTextarea class="w-full" :rows="7" v-model="form.synopsis" placeholder="Synopsis du livre"
                        size="lg" autoresize="" />
                </UFormField>
                <!-- Bouton -->
                <div class="pt-4 text-right w-full">
                    <UButton type="submit"
                        class="px-6 py-2 bg-[#cc3399] hover:opacity-50 transition duration-300 text-white rounded hover:bg-[#cc3399] transition cursor-pointer"
                        variant="solid"> Ajouter un livre</UButton>
                </div>
            </UForm>
            <div v-else-if="errorReport">
                <p>Erreur de chargement des données</p>
                <p>{{ errorReport }}</p>
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
import * as v from 'valibot';
const schema = v.object({
    title: v.pipe(
        v.string("Le titre doit être un texte"),
        v.nonEmpty("Le titre est obligatoire"),
        v.minLength(2, "Le titre doit avoir minimum 2 caractères"),
        v.maxLength(200, "Le titre doit avoir maximum 200 caractères")
    ),
    stock: v.pipe(
        v.integer("Le stock doit être un nombre"),
        v.nonEmpty("Le stock est obligatoire"),
        v.minSize(3, "La taille du stock est de minimum de 0"),
        v.maxSize(1000,"La taille du stock est de maximum de 1000")
    ),
    style: v.pipe(
        v.string("Le style doit être un texte"),
        v.nonEmpty("Le style est obligatoire"),
        v.minLength(3, "Le genre doit avoir minimum 3 caractères"),
        v.maxLength(255,"Le genre doit avoir maximum 255 caractères")
    ),
    date: v.pipe(
        v.string("La date doit être une date"),
        v.nonEmpty("La date est obligatoire"),
        v.regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/, "La date n'est pas dans le bon format")
    ),
    image: v.pipe(
        v.string("L'image doit être un texte"),
        v.nonEmpty("L'image est obligatoire"),
        v.minSize(3,"L'image doit avoir minimum 3 caractères"),
        v.maxSize(255,"L'image doit avoir 255 caractères maximum")
    ),
    synopsis:v.pipe(
        v.string("Le synopsis doit être un texte"),
        v.nonEmpty("Le synopsis est obligatoire"),
        v.minSize(20, "Le synopsis doit avoir 20 minimum caractères")
    )
})
//type Schema = v.InferOutput;

const basicAuth = inject("basicAuth"),
    authors = ref([]),
    errorReport = ref(),
    loading = ref(),
    loadingAuthor = ref(),
    style = ["Science-fiction", "Drame", "Fantaisie"],
    form = ref({
        title: "",
        stock: 0,
        style: "",
        date: "",
        image: "",
        authorsId: [],
        synopsis: ""
    }),
    authorSearch = ref();
let authorDelay = null;


watch(authorSearch, (newSearch) => {
    clearTimeout(authorDelay);
    authorDelay = setTimeout(async function () {
        try {
            const apiData = ref(),
                url = "http://localhost:8080/m2l/author" + (newSearch != "" ? `/${encodeURI(newSearch.replaceAll('/', '-'))}` : "/all");
            loadingAuthor.value = true;
            apiData.value = await $fetch(url, {
                headers: {
                    Authorization: `Basic ${basicAuth}`
                },
                credentials: 'include'
            });
            if(apiData.value){
                authors.value = [];
                apiData.value.content.forEach((value) => {
                    authors.value.push({
                        id:value[0],
                        label:value[1]
                    })
                })
            }
            //if (apiData.value) authors.value = apiData.value;
            loadingAuthor.value = false;
        } catch (e) {
            console.log(e);
            errorReport.value = true;
        }
    }, 500)
})
async function callAll() {
    const errorReport = ref(false);
    try {
        const apiData = ref();
        loading.value = true;
        apiData.value = await $fetch('http://localhost:8080/m2l/author/all', {
            headers: {
                Authorization: `Basic ${basicAuth}`
            },
            credentials: 'include'
        });
        if(apiData.value){
            apiData.value.content.forEach((value) => {
                authors.value.push({
                    id:value[0],
                    label:value[1]
                })
            })
        }
        loading.value = false;
    } catch (e) {
        console.log(e);
        errorReport.value = true;
    }
    
}
callAll();

function applySearch() {
    console.log("Reacherche appliquée avec les criètres : ", form.value);
    alert("Recherche appliquée avec succès !")
}
/*const handleFileUpload = (e) => {
    form.value.image = e.target.files[0]
    console.log("je suis un test");
}*/

async function handleSubmit(event){
    const apiData = ref();
    apiData.value = await $fetch('http://localhost:8080/m2l/books',{
        method:'POST',
        body:form.value,
        headers:{
            Authorization: `Basic ${basicAuth}`
        },
        credentials:'include'
    });
    
    /*if(!form.value.title){
        alert("Merci de remplir tous les champs obligatoires")
        return
    }
    console.log(event);*/
}
</script>