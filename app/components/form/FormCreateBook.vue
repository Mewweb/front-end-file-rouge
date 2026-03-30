<template>
    <div class="flex items-center flex-col p-[1em] gap-0 bg-white rounded-xl shadow-lg">
        <p v-if="errorMessage">{{errorMessage}}</p>
        <p v-if="successMessage">{{successMessage}}</p>
        <p v-if="loading">Chargement en cours</p>
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
                <USelectMenu :items="authorsItems" value-key="id" name="authors" id="authors" v-model="data.authors" class="w-full" placeholder="Les auteurs du livre" multiple size="lg" />
            </UFormField>
            <UFormField label="L'image du livre" name="image" required class="w-full" :ui="{label:'mb-[.5em]'}">
                <UFileUpload v-model="image" icon="i-lucide-image" label="Importer l'image" description="PNG, JPG" class="w-full" />
            </UFormField>
            <UFormField label="Le synopsis du livre" name="synopsis" required class="w-full" :ui="{label:'mb-[.5em]'}">
                <UTextarea name="synopsis" id="synopsis" v-model="data.synopsis" class="w-full" placeholder="Le synopsis du livre" size="lg" :ui="{base:'h-35'}"></UTextarea>
            </UFormField>
            <UButton type="submit" @click.prevent="submit()" class="w-auto py-3 mt-[1em] hover:opacity-50 transition duration-300 m-[2em_auto_0] bg-linear-to-r from-pink-500 to-purple-600 text-white cursor-pointer font-semibold rounded-lg shadow-md" color="primary" variant="solid">{{props.isUpdate == false ? 'Ajouter' :'Modifier'}}</UButton>
        </UForm>
    </div>

</template>
<script setup>
import * as v from 'valibot';
const config = useRuntimeConfig().public.urlBackend;
const backendUrl = config == "${BACKEND_URL}" ? "http://localhost:8080/m2l" : config;
const image = ref(),
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
    itemsStyle = ref(["Science-fiction","Aventure","Horreur"]),
    {user}= useUserSession(),
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
    submit=async()=>{
        const formData = new FormData();
        formData.append("imageFile",image.value);
        formData.append("book",new Blob([JSON.stringify(data.value)],{type:"application/json"}));
        errorMessage.value = false;
        successMessage.value = false;
        if (!props.isUpdate){
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
                if(bookData.error) errorMessage.value = 1;
                else{
                    successMessage.value = true;
                    emit("addBook",bookData.data);
                }
            }catch (e){
                console.log(e);
                errorMessage.value = 2;
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
            }catch (e){
                console.log(e);
                errorMessage.value = "";
            }
        }
    }
onMounted(async ()=>{
    if (user.value != null){
        let getAuthors = await accessData(`${backendUrl}/author/all`);
        if (getAuthors.error){
            await refreshAuth();
            getAuthors = await accessData(`${backendUrl}/author/all`);
        }
        if (!getAuthors.error){
            authorsItems.value = getAuthors.data.content.map(author=>({
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
</script>