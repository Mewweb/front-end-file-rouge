<template>
    <div class="flex items-center flex-col p-[1em] gap-0 bg-white rounded-xl shadow-lg">
        <p v-if="errorMessage" style="font-weight:bold; color:red;text-align:center; padding:1em 0;">{{errorMessage}}</p>
        <p v-if="successMessage">{{successMessage}}</p>
        <div v-else-if="loading" class="flex justify-between flex-wrap w-full">
            <div v-for="i in 4" class="bg-linear-to-r w-[48%] h-14 my-[.5em] animate-pulse from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg transition p-4">
            </div>
            <div v-for="i in 2" class="bg-linear-to-r w-full h-28 mt-[.5em] m-auto animate-pulse from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg transition p-4">
            </div>
        </div>
        <UForm v-else class="flex justify-between space-y-2 flex-wrap" :schema="schema" :state="data">
            <UFormField label="Le titre du livre" name="title" required class="w-full sm:w-[48%]" :ui="{label:'mb-[.5em]'}">
                <UInput type="text" name="title" id="title" v-model="data.title" class="w-full" placeholder="Le titre du livre" size="lg" />
            </UFormField>
            <UFormField label="La date du livre" name="date" required class="w-full sm:w-[48%]" :ui="{label:'mb-[.5em]'}">
                <UInput type="date" name="date" id="date" v-model="data.date" class="w-full" placeholder="La date du livre" size="lg" />
            </UFormField>
            <UFormField label="Le genre du livre" name="style" required class="w-full sm:w-[48%]" :ui="{label:'mb-[.5em]'}">
                <USelectMenu :items="itemsStyle" name="style" id="style" v-model="data.style" class="w-full" placeholder="Le genre du livre" size="lg" />
            </UFormField>
            <UFormField label="Les auteurs du livre" name="authors" required class="w-full sm:w-[48%]" :ui="{label:'mb-[.5em]'}">
                <USelectMenu v-model:search-term="searchAuthor" :items="authorsItems" value-key="id" ignore-filter name="authors" id="authors" v-model="data.authors" class="w-full" placeholder="Les auteurs du livre" multiple size="lg" />
            </UFormField>
            <UFormField label="L'image du livre" name="image" required class="w-full" :ui="{label:'mb-[.5em]'}">
                <UFileUpload v-model="image" icon="i-lucide-image" :search-input="{icon:'i-lucide-search',loading:authorSearch == true}" label="Importer l'image" description="PNG,JPG" class="w-full" />
            </UFormField>
            <UFormField label="Le synopsis du livre" name="synopsis" required class="w-full" :ui="{label:'mb-[.5em]'}">
                <UTextarea name="synopsis" id="synopsis" v-model="data.synopsis" class="w-full" placeholder="Le synopsis du livre" size="lg" :ui="{base:'h-35'}"></UTextarea>
            </UFormField>
            <UButton type="submit" @click.prevent="submit()" class="w-auto py-3 mt-[1em] hover:opacity-50 transition duration-300 m-[2em_auto_0] bg-purple-800 text-white cursor-pointer font-semibold rounded-lg shadow-md" color="primary" variant="solid">{{props.isUpdate == false ? 'Ajouter' :'Modifier'}}</UButton>
        </UForm>
    </div>
</template>
<script setup>
import * as v from 'valibot';
let intervalAuthor = null;
const authorSearch = ref(false),
    searchAuthor = ref(""),
    config = useRuntimeConfig().public.urlBackend,
    backendUrl = config == "${BACKEND_URL}" ? "http://localhost:8080/m2l" :config,
    image = ref(),
    data = ref({
        title:"",
        synopsis:"",
        date:"",
        style:"",
        image:"feer",
        authors:[]
    }),
    authorsItems = ref(),
    loading = ref(true),
    props = defineProps(['isUpdate']),
    emit = defineEmits(['addBook']),
    itemsStyle = ref(["Front-end","Back-end","Fullstack"]),
    {user} = useUserSession(),
    errorMessage = ref(),
    successMessage = ref(),
    schema = v.object({
        title:v.pipe(
            v.string("Le titre doit être en format textuel"),
            v.nonEmpty("Le titre est obligatoire"),
            v.minLength(2,"Le titre doit contenir 2 caractères minimum"),
            v.maxLength(200,"Le titre doit contenir 200 caractères maximum")
        ),
        synopsis:v.pipe(
            v.string("Le synopsis doit être en format textuel"),
            v.nonEmpty("Le synopsis est obligatoire"),
            v.minLength(20,"Le synopsis doit contenir 20 caractères minimum")
        ),
        style:v.pipe(
            v.string("Le style doit être en format textuel"),
            v.nonEmpty("Le style est obligatoire"),
            v.minLength(3,"Le style doit contenir 3 caractères minimum"),
            v.maxLength(100,"Le style doit contenir 100 caractères maximum")
        ),
        date:v.pipe(
            v.string("La date doit être en format textuel"),
            v.nonEmpty("La date est obligatoire")
        ),
    }),
    submit = async()=>{
        const formData = new FormData();
        formData.append("imageFile",image.value);
        formData.append("book",new Blob([JSON.stringify(data.value)],{type:"application/json"}));
        errorMessage.value = false;
        successMessage.value = false;
        if(!props.isUpdate){
            try{
                v.parse(schema,data.value);
                let bookData = await postData(`${backendUrl}/books`,formData,{
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                });
                if(bookData.error){
                    await refreshAuth();
                    bookData = await postData(`${backendUrl}/books`,formData,{
                        headers:{
                            "Content-Type":"multipart/form-data"
                        }
                    });
                }
                if(bookData.error)errorMessage.value = "Une erreur a été rencontré. Veuillez réessayer plus tard";
                else{
                    successMessage.value = true;
                    emit("addBook",bookData.data);
                }
            }catch(e){
                errorMessage.value = "Le formulaire n'est pas rempli correctement. Veuillez respecter les indications.";
            }
        }else{
            try{
                v.parse(schema,data.value);
                let bookData = await putData(`${backendUrl}/books/${data.value.id}`,formData,{
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                });
                if(bookData == false){
                    await refreshAuth();
                    bookData = await putData(`${backendUrl}/books/${data.value.id}`,formData,{
                        headers:{
                            "Content-Type":"multipart/form-data"
                        }
                    });
                }
                navigateTo('/admin/books/all');
            }catch(e){
                errorMessage.value = "Le formulaire n'est pas rempli correctement. Veuillez respecter les indications";
            }
        }
    }
onMounted(async()=>{
    if(user.value != null){
        let getAuthors = await accessData(`${backendUrl}/author/all`);
        if(getAuthors.error){
            await refreshAuth();
            getAuthors = await accessData(`${backendUrl}/author/all`);
        }
        if(!getAuthors.error){
            authorsItems.value = getAuthors.data.content.map(author =>({
                label:author[1],
                id:author[0]
            }));
        }
        if(props.isUpdate == true){
            const id = useRoute().params.id;
            let getData = await accessData(`${backendUrl}/books/${id}`);
            if(getData.error){
                await refreshAuth();
                getData = await accessData(`${backendUrl}/books/${id}`);
            }
            data.value = getData.data;
        }
        loading.value = false;
    }
})
watch(searchAuthor,(newSearch)=>{
    authorSearch.value = true;
    if(intervalAuthor != null)clearTimeout(intervalAuthor);
    intervalAuthor = setTimeout(async function(){
        let getAuthors = null;
        if(newSearch == ""){
            getAuthors = await accessData(`${backendUrl}/author/all`);
            if(getAuthors.error){
                await refreshAuth();
                getAuthors = await accessData(`${backendUrl}/author/all`);
            }
        }else{
            getAuthors = await accessData(`${backendUrl}/author/search/${newSearch}`);
            if(getAuthors.error){
                await refreshAuth();
                getAuthors = await accessData(`${backendUrl}/author/search/${newSearch}`);
            }
        }
        if(!getAuthors.error){
            authorsItems.value = getAuthors.data.content.map(author=>({
                label:author[1],
                id:author[0]
            }));
        }
        authorSearch.value = false;
    },500);
})
</script>