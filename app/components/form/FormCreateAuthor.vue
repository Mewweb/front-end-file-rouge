<template>
    <div class="flex items-center flex-col p-[1em] gap-0 bg-white rounded-xl shadow-lg">
        <p v-if="errorMessage" style="font-weight:bold; color:red;text-align:center; padding:1em 0;">{{errorMessage}}</p>
        <p v-else-if="successMessage">L'éditeur à bien été ajouté</p>
        <p v-if="error" class="text-red">Une erreur a été rencontré. Veuillez réessayer plus tard.</p>
        <div v-else-if="loading" class="flex justify-between flex-wrap w-full">
            <div v-for="i in 2" class="bg-linear-to-r w-[48%] h-14 my-[.5em] animate-pulse from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg transition p-4"></div>
            <div class="bg-linear-to-r w-full h-14 mt-[.5em] m-auto animate-pulse from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg transition p-4"></div>
        </div>
        <UForm v-else class="flex justify-between w-full space-y-2 flex-wrap" :schema="schema" :state="data">
            <UFormField label="Le nom de famille" name="lastname" required class="w-full sm:w-[48%]">
                <UInput type="text" name="lastname" id="lastname" v-model="data.lastname" class="w-full" placeholder="Nom de famille" size="lg" />
            </UFormField>
            <UFormField label="Le prénom" name="firstname" required class="w-full sm:w-[48%]">
                <UInput type="text" name="firstname" id="firstname" v-model="data.firstname" class="w-full" placeholder="Prénom" size="lg" />
            </UFormField>
            <UFormField label="Langue" name="langue" required class="w-full">
                <USelectMenu class="w-full" v-model="data.langue" placeholder="Langue" value-key="id" :items="contentLangue" size="lg" />
            </UFormField>
            <UButton type="submit" @click="submit()" class="w-auto py-3 mt-[1em] hover:opacity-50 transition duration-300 m-[2em_auto_0] bg-linear-to-r from-pink-500 to-purple-600 text-white cursor-pointer font-semibold rounded-lg shadow-md" color="primary" variant="solid">{{props.isUpdate == false ? 'Ajouter' :'Modifier'}}</UButton>
        </UForm>
    </div>
</template>
<script setup>
import * as v from 'valibot';
const config = useRuntimeConfig().public.urlBackend,
    backendUrl = config == "" ? "http://localhost:8080/m2l" :config,
    data = ref({
        lastname:'',
        firstname:'',
        langue:''
    }),
    {user}= useUserSession(),
    error = ref(false),
    loading = ref(true),
    props = defineProps(['isUpdate']),
    emit = defineEmits(['addAuthor']),
    errorMessage = ref(false),
    successMessage = ref(false),
    contentLangue = ref([
        {
            label:"Belgique",
            id:"BE"
        },
        {
            label:"Allemagne",
            id:"DE"
        },
        {
            label:"Australie",
            id:"AU"
        },
        {
            label:"France",
            id:"FR"
        },
        {
            label:"Royaume-Uni",
            id:"GB"
        },
        {
            label:"Italie",
            id:"IT"
        },
        {
            label:"Espagne",
            id:"ES"
        },
        {
            label:"Suède",
            id:"SE"
        }
    ]),
    schema = v.object({
        lastname:v.pipe(
            v.string("Le nom de famille doit être un texte"),
            v.nonEmpty("Le nom de famille est obligatoire"),
            v.minLength(3,"Le nom de famille doit contenir 3 caractères minimum"),
            v.maxLength(50,"Le nom de famille doit contenir 50 caractères maximim")
        ),
        firstname:v.pipe(
            v.string("Le prénom doit être en format texte"),
            v.nonEmpty("Le prénom est obligatoire"),
            v.minLength(3,"Le prénom doit contenir 3 caractères minimum"),
            v.maxLength(50,"Le prénom doit contenir 50 caractères maximum")
        ),
        langue:v.pipe(
            v.string("La langue doit être en format texte"),
            v.nonEmpty("La langue est obligatoire"),
            v.minLength(2,"La langue doit contenir 2 caractères"),
            v.maxLength(2,"La langue doit contenir 2 caractères")
        )
    }),
    submit=async()=>{
        errorMessage.value = false;
        successMessage.value = false;
        if(!props.isUpdate){
            try{
                if(!v.safeParse(schema,data.value)) errorMessage.value = "Le formulaire n'a pas été rempli correctement."
                else{
                    let authorData = await postData(`${backendUrl}/author`,data.value);
                    if(authorData.error){
                        await refreshAuth();
                        authorData = await postData(`${backendUrl}/author`,data.value);
                    }
                    if(authorData.error) errorMessage.value = "Une erreur a été rencontré. Veuillez réessayer plus tard";
                    else{
                        successMessage.value = true;
                        emit("addAuthor",authorData.data);
                    }
                }
            }catch(e){
                errorMessage.value = "Une erreur a été rencontré. Veuillez réessayer plus tard.";
            }
        }else{
            try{
                if(!v.safeParse(schema,data.value)) errorMessage.value = "Le formulaire n'a pas été rempli correctement."
                let authorData = await putData(`${backendUrl}/author/${data.value.id}`,data.value);
                if(authorData == false){
                    await refreshAuth();
                    authorData = await putData(`${backendUrl}/author/${data.value.id}`,data.value);
                }
                navigateTo('/admin/editor/all');
            }catch(e){
                errorMessage.value = "Une erreur a été rencontré. Veuillez réessayer plus tard.";
            }
        }
    }
onMounted(async()=>{
    if (user.value != null && props.isUpdate == true){
        const id = useRoute().params.id;
        let getData = await accessData(`${backendUrl}/author/${id}`);
        if(getData.error){
            await refreshAuth();
            getData = await accessData(`${backendUrl}/author/${id}`);
        }
        if(!getData.error) data.value = getData.data;
        else error.value = true;
    }
    loading.value = false;
})
</script>