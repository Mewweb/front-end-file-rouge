<template>
    <div v-if="loading" class="flex justify-between flex-wrap w-full">
            <div v-for="i in 2" class="bg-linear-to-r w-[48%] h-14 my-[.5em] animate-pulse from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg transition p-4"></div>
            <div v-for="i in 2" class="bg-linear-to-r w-full h-14 mt-[.5em] m-auto animate-pulse from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg transition p-4"></div>
        </div>
    <div v-else-if="data.error">
        <p class="text-red">Une erreur a été rencontré</p>
    </div>
    <UForm v-else :state="data.data" :schema="schema" class="flex justify-between space-y-2 flex-wrap">
        <UFormField label="Nom de famille" name="lastname" required class="w-full sm:w-[48%]">
            <UInput name="lastname" id="lastname" v-model="data.data.lastname" type="text" class="w-full" placeholder="Nom de famille" size="lg" />
        </UFormField>
        <UFormField label="Prénom" name="firstname" required class=" w-full sm:w-[48%]">
            <UInput name="firstname" id="firstname" v-model="data.data.firstname" type="text" class="w-full" placeholder="Prénom" size="lg" />
        </UFormField>
        <UFormField label="Langue" name="langue" required class="w-full">
            <USelectMenu class="w-full" v-model="data.data.langue" placeholder="Langue" value-key="id" :items="contentLangue" size="lg" />
        </UFormField>
        <UButton type="submit" @click="editAuthor(data.data.id,index)" class="w-full py-3 mt-[1em] block hover:opacity-50 transition duration-300 m-[2em_auto_0] bg-linear-to-r from-pink-500 to-purple-600 text-white cursor-pointer font-semibold rounded-lg shadow-md" color="primary" variant="solid">Modifier
            <IconsArrowRight class="w-[1em] ml-[1em] fill-white h-[1em] inline-block" />
        </UButton>
    </UForm>
</template>
<script setup>
import * as v from 'valibot';
import IconsArrowRight from '~/svg/IconsArrowRight.vue'
const config = useRuntimeConfig().public.urlBackend,
    backendUrl = config == "" ? "http://localhost:8080/m2l" :config,
    data = ref({data:[],error:false}),
    {user} = useUserSession(),
    loading = ref(true),
    id = useRoute().params.id,
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
    editAuthor=async(id,index)=>{
        let dataSend = await putData(`${backendUrl}/author/${id}`,data.value.data);
        if(dataSend == false){
            await refreshAuth();
            dataSend = await putData(`${backendUrl}/author/${id}`,data.value.data);
        }
    }
if(user.value != null){
    data.value = await accessData(`${backendUrl}/author/${id}`);
    if(data.value.error == true){
        await refreshAuth();
        data.value = await accessData(`${backendUrl}/author/${id}`);
    }
}
loading.value = false;
</script>
