<!--
- Ajouter une pop-up quand les données ont changé ou non
-->
<template>
    <section class="sectionAccountEdit relative py-10">
        <div class="absolute top-0 left-0 text-center text-white font-bold w-full" v-if="errorPassword != null">
            <p class="bg-red-500 py-[.5em]" v-if="errorPassword == true">L'ancien mot de passe n'est pas correct. Si le problème persiste veuillez réessayer plus tard</p>
            <p class="bg-green-500 py-[.5em]" v-else>Le mot de passe à bien été enregistré</p>
        </div>
        <div class="absolute top-0 left-0 text-center text-white font-bold w-full" v-if="error != null">
            <p class="bg-red-500 py-[.5em]" v-if="error == true">Une erreur a été rencontré. Veuillez réessayer plus tard.</p>
            <p class="bg-green-500 py-[.5em]" v-else>L'utilisateur a bien été mise à jour.</p>
        </div>
        <div class="m-auto max-w-300 mt-[1em] w-[90%] container mx-auto px-6 lg:px-12">
            <!-- Titre -->
            <h2 class="text-3xl font-extrabold text-purple-900 mb-6">Modifier mes données personnelles</h2>
            <!-- Onglets -->
            <div v-if="data.error">
                <p>Une erreur a été rencontré. Veuillez réessayer plus tard.</p>
            </div>
            <div v-else-if="loading">
                <div class="flex animate-pulse from-indigo-50 to-purple-50 justify-between flex-wrap">
                    <div class="w-full p-10 mb-5 sm:w-[48%] rounded-lg inline-block bg-gray-200">
                        <div class="w-45 h-5 bg-gray-300 rounded-lg mb-4"></div>
                        <div class="w-full h-10 bg-gray-300 rounded-lg"></div>
                    </div>
                    <div class="w-full p-10 mb-5 sm:w-[48%] rounded-lg inline-block bg-gray-200">
                        <div class="w-45 h-5 bg-gray-300 rounded-lg mb-4"></div>
                        <div class="w-full h-10 bg-gray-300 rounded-lg"></div>
                    </div>
                    <div class="w-full p-10 mb-5 sm:w-[48%] rounded-lg inline-block bg-gray-200">
                        <div class="w-45 h-5 bg-gray-300 rounded-lg mb-4"></div>
                        <div class="w-full h-10 bg-gray-300 rounded-lg"></div>
                    </div>
                    <div class="w-full p-10 mb-5 sm:w-[48%] rounded-lg inline-block bg-gray-200">
                        <div class="w-45 h-5 bg-gray-300 rounded-lg mb-4"></div>
                        <div class="w-full h-10 bg-gray-300 rounded-lg"></div>
                    </div>
                    <div class="w-full p-10 sm:w-[48%] rounded-lg inline-block bg-gray-200">
                        <div class="w-45 h-5 bg-gray-300 rounded-lg mb-4"></div>
                        <div class="w-full h-10 bg-gray-300 rounded-lg"></div>
                    </div>
                    <div class="w-full p-10 sm:w-[48%] rounded-lg inline-block bg-gray-200">
                        <div class="w-45 h-5 bg-gray-300 rounded-lg mb-4"></div>
                        <div class="w-full h-10 bg-gray-300 rounded-lg"></div>
                    </div>
                </div>
            </div>
            <UTabs v-else :items="items" variant="link" :ui="{trigger:'grow',indicator:'hidden',content:'rounded-b-lg p-6',root:'gap-0',label:'',list:'p-0'}" class="bg-white rounded-xl shadow-lg">
                <template #infos="{item}">
                    <!-- Onglet 1 :Infos personnelles -->
                    <div v-if="item.slot === 'infos'">
                        <UForm :schema="schemaItem" @submit="updateUser" :state="formData" class="space-y-5 flex justify-between flex-wrap">
                            <UFormField class="w-full sm:w-[48%] inline-block" label="Nom de famille" name="lastname" required>
                                <UInput v-model="formData.lastname" class="w-full" :ui="{base:'h-10'}" placeholder="Nom de famille" />
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%] inline-block" label="Prénom" name="firstname" required>
                                <UInput v-model="formData.firstname" class="w-full" :ui="{base:'h-10'}" placeholder="Prénom" />
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%] inline-block" label="Adresse email" required name="email">
                                <UInput v-model="formData.email" class="w-full" :ui="{base:'h-10'}" type="email" placeholder="Email" />
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%] inline-block" label="Numéro de téléphone" name="phone_number" required>
                                <UInput v-model="formData.phone_number" class="w-full" :ui="{base:'h-10'}" type="tel" placeholder="Numéro de téléphone" />
                            </UFormField>
                            <UButton type="submit" class="py-3 mt-[1em] w-auto block hover:opacity-50 bg-pink-500 hover:bg-pink-500 transition duration-300 cursor-pointer text-white font-semibold rounded-lg shadow-md">Sauvegarder</UButton>
                        </UForm>
                    </div>
                </template>
                <template #adresses="{item}">
                    <!-- Onglet 2 :Adresses -->
                    <div v-if="item.slot === 'adresses'">
                        <UForm @submit="updateUser" :schema="schemaAdresse" :state="formData" class="space-y-5 flex justify-between flex-wrap">
                            <UFormField class="w-full sm:w-[48%]" label="Adresse de facturation" name="delivery_address" required>
                                <UInput v-model="formData.delivery_address" placeholder="Adresse de facturation" :ui="{base:'h-10'}" class="w-full" />
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%]" label="Adresse de livraison" name="billing_address" required>
                                <UInput v-model="formData.billing_address" :ui="{base:'h-10'}" class="w-full" placeholder="Adresse de livraison" />
                            </UFormField>
                            <UButton type="submit" class="py-3 mt-[1em] w-auto block hover:opacity-50 bg-pink-500 hover:bg-pink-500 transition duration-300 cursor-pointer text-white font-semibold rounded-lg shadow-md">Sauvegarder</UButton>
                        </UForm>
                    </div>
                </template>
                <template #securite="{item}">
                    <!-- Onglet 3 :Sécurité -->
                    <div v-if="item.slot === 'securite'">
                        <UForm :schema="schemaPassword" @submit="updatePasswordUser" :state="formPassword" class="space-y-5 flex justify-between flex-wrap">
                            <UFormField class="w-full" name="oldPassword" label="Ancien mot de passe" required>
                                <UInput v-model="formPassword.oldPassword" class="w-full" :ui="{base:'h-10'}" placeholder="Ancien mot de passe" :type="showOldPassword ? 'text' :'password'">
                                    <template #trailing>
                                        <UButton color="neutral" variant="link" size="sm" :icon="showOldPassword ? 'i-lucide-eye-off' :'i-lucide-eye'" :aria-label="showOldPassword ? 'Cacher le mot de passe' :'Voir le mot de passe'" :aria-pressed="showOldPassword" aria-controls="password" @click="showOldPassword = !showOldPassword"></UButton>
                                    </template>
                                </UInput>
                            </UFormField>
                            <div class="w-full sm:w-[48%]">
                                <UFormField label="Nouveau mot de passe" name="newPassword" required>
                                    <UInput v-model="formPassword.newPassword" placeholder="Le nouveau mot de passe" :color="color" :type="showNewPassword ? 'text' :'password'" :aria-invalid="score < 4" aria-describedby="password-strength" :ui="{base:'h-10'}" class="w-full">
                                        <template #trailing>
                                            <UButton color="neutral" variant="link" size="sm" :icon="showNewPassword ? 'i-lucide-eye-off' :'i-lucide-eye'" :aria-label="showNewPassword ? 'Cacher le mot de passe' :'Voir le mot de passe'" :aria-pressed="showNewPassword" aria-controls="password" @click="showNewPassword = !showNewPassword"></UButton>
                                        </template>
                                    </UInput>
                                </UFormField>
                                <UProgress class="my-[1em]" :color="color" :indicator="text" :model-value="score" :max="4" size="sm" />
                                <p id="password-strength" class="text-sm font-medium">{{text}}. Doit contenir:</p>
                                <ul class="space-y-1" aria-label="Le mot de passe doit contenir">
                                    <li v-for="(req,index) in strength" :key="index" class="flex-items-center gap-0.5" :class="req.met ? 'text-success' :'text-muted'">
                                        <UIcon :name="req.met ? 'i-lucide-circle-check' :'i-lucide-circle-x'" class="size-4 align-center inline-block mr-[.5em] shrink-0" />
                                        <span class="text-xs font-light">
                                            {{req.text}}
                                            <span class="sr-only">{{req.met ? '- condition remplie' :'condition non remplie'}}</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <UFormField class="w-full sm:w-[48%]" name="confirmPassword" label="Confirmer le mot de passe" required>
                                <UInput v-model="formPassword.confirmPassword" class="w-full" placeholder="Confirmer le mot de passe" :type="showConfirmPassword ? 'text' :'password'" :ui="{base:'h-10'}">
                                    <template #trailing>
                                        <UButton color="neutral" variant="link" size="sm" :icon="showConfirmPassword ? 'i-lucide-eye-off' :'i-lucide-eye'" :aria-label="showConfirmPassword ? 'Cacher le mot de passe' :'Voir le mot de passe'" :aria-pressed="showConfirmPassword" aria-controls="password" @click="showConfirmPassword = !showConfirmPassword" />
                                    </template>
                                </UInput>
                            </UFormField>
                            <UButton @click="updatePasswordUser" type="submit" class="py-3 mt-[1em] w-auto block hover:opacity-50 bg-pink-500 hover:bg-pink-500 transition duration-300 cursor-pointer text-white font-semibold rounded-lg shadow-md">Sauvegarder</UButton>
                        </UForm>
                    </div>
                </template>
            </UTabs>
        </div>
    </section>
</template>
<style>
.sectionAccountEdit div button[aria-selected="true"]{
    background:var(--color-purple-900);
    border-radius:.25rem .25rem 0 0;
    color:white
}
.sectionAccountEdit div button[aria-selected]{
    cursor:pointer;
    padding:.7em 0;
    transition:.3s all ease
}
.sectionAccountEdit div button:hover{opacity:.5}
</style>
<script setup>
import{ref,computed} from "vue"
import * as v from 'valibot'
const config = useRuntimeConfig().public.urlBackend;
const backendUrl = config == "${BACKEND_URL}" ? "http://localhost:8080/m2l" : config;
const{user} = useUserSession(),
    showNewPassword = ref(false),
    showOldPassword = ref(false),
    showConfirmPassword = ref(false),
    errorPassword = ref(null),
    loading = ref(true),
    data = ref({data:null,error:false}),
    error = ref(null),
    formData = ref({
        lastname:"",
        firstname:"",
        email:"",
        phone_number:"",
        billing_address:"",
        delivery_address:""
    }),
    // Formulaire
    formPassword = ref({
        id:0,
        oldPassword:"",
        newPassword:"",
        confirmPassword:""
    }),
    strength = computed(()=>checkStrength(formPassword.value.newPassword)),
    score = computed(()=>strength.value.filter(req => req.met).length),
    color = computed(()=>{
        if(score.value === 0) return 'neutral'
        if(score.value <= 1) return 'error'
        if(score.value <= 2) return 'warning'
        if(score.value === 3) return 'warning'
        return 'success'
    }),
    text = computed(()=>{
        if(score.value === 0) return ''
        if(score.value <= 2) return 'Mot de passe faible'
        if(score.value === 3) return 'Mot de passe moyen'
        return 'Mot de passe fort'
    }),
    // Définition des onglets
    items = [
        {
            label:"Infos personnelles",
            description:"Gérez vos informations personnelles ici.",
            slot:'infos'
        },
        {
            label:"Adresses",
            description:"Gérez vos adresses de facturation et de livraison.",
            slot:'adresses'
        },
        {
            label:"Sécurité",
            description:"Modifiez votre mot de passe et gérez la sécurité de votre compte.",
            slot:'securite'
        }
    ],
    schemaItem = v.object({
        lastname:v.pipe(
            v.string("Le nom de famille doit être en format textuel"),
            v.nonEmpty("Le nom de famille doit être obligatoire"),
            v.minLength(3,"Le nom de famille doit contenir 3 caractères minimum"),
            v.maxLength(50,"Le nom de famille doit contenir 50 caractères maximum")
        ),
        firstname:v.pipe(
            v.string("Le prénom doit être en format textuel"),
            v.nonEmpty("Le prénom doit être obligatoire"),
            v.minLength(3,"Le prénom doit contenir 3 caractères minimum"),
            v.maxLength(50,"Le prénom doit contenir 50 caractères maximum")
        ),
        phone_number:v.pipe(
            v.string("Le numéro de téléphone doit être en format textuel"),
            v.nonEmpty("Le numéro de téléphone doit être obligatoire"),
            v.minLength(6,"Le numéro de téléphone doit contenir 6 caractères minimum"),
            v.maxLength(20,"Le numéro de téléphone doit contenir 20 caractères maximum")
        ),
        email:v.pipe(
            v.string("Le mail doit être en format textuel"),
            v.email("Le mail doit être être composé de :***@***.***"),
            v.nonEmpty("Le mail est obligatoire"),
            v.minLength(5,"Le mail doit contenir 5 caractères minimum"),
            v.maxLength(254,"Le mail doit contenir 254 caractères maximum")
        ),
    }),
    schemaAdresse = v.object({
        billing_address:v.pipe(
            v.string("L'adresse de facturation doit être en format textuel"),
            v.nonEmpty("L'adresse de facturation est obligatoire"),
            v.minLength(2,"L'adresse de facturation doit contenir 2 caractères minimum"),
            v.maxLength(100,"L'adresse de facturation doit contenir 100 caractères maximum")
        ),
        delivery_address:v.pipe(
            v.string("L'adresse de livraison doit être en format textuel"),
            v.nonEmpty("L'adresse de livraison est obligatoire"),
            v.minLength(2,"L'adresse de livraison doit contenir 2 caractères minimum"),
            v.maxLength(100,"L'adresse de livraison doit contenir 100 caractères maximum")
        )
    }),
    schemaPassword = v.object({
        password:v.pipe(
            v.string("Le mot de passe doit être en format textuel"),
            v.nonEmpty("Le mot de passe est obligatoire"),
            v.minLength(10,"Le mot de passe doit contenir 10 caractères minimum")
        ),
        confirmPassword:v.pipe(
            v.string("Me mot de passe de confirmation doit être en format textuel"),
            v.nonEmpty("Le mot de passe de confirmation est obligatoire")
        )
    }),
    checkStrength=(str)=>{
        const requirements = [
            {regex:/.{8,}/,text:'Le mot de passe doit contenir 8 caractères minimum'},
            {regex:/\d/,text:'Le mot de passe doit contenir un chiffre'},
            {regex:/[a-z]/,text:'Le mot de passe doit contenir une lettre en minuscule'},
            {regex:/[A-Z]/,text:'Le mot de passe doit contenir une lettre en majuscule'}
        ]
        return requirements.map(req => ({met:req.regex.test(str),text:req.text}))
    },
    updateUser=async()=>{
        let dataSend = await putData(`${backendUrl}/editUser`,formData.value)
        if(dataSend == false){
            await refreshAuth();
            dataSend = await putData(`${backendUrl}/editUser`,formData.value);
        }
        if(dataSend == false) error.value = true;
        else error.value = false;
    },
    updatePasswordUser=async()=>{
        if(formPassword.value.newPassword == formPassword.value.confirmPassword || score == 4){
            let dataSend = await putData(`${backendUrl}/editUser/password`,formPassword.value);
            if(dataSend == false){
                await refreshAuth();
                dataSend = await putData(`${backendUrl}/editUser/password`,formPassword.value);
            }
            if(dataSend == false) errorPassword.value = true;
            else errorPassword.value = false;
        }
    }
if(user.value == null) await refreshAuth();
if(user.value == null) data.value.error = true;
else{
    data.value = await accessData(`${backendUrl}/getUser/${user.value.email}`);
    if(data.value.error == true){
        await refreshAuth();
        data.value = await accessData(`${backendUrl}/m2l/getUser/${user.value.email}`);
    }
    formData.value = data.value.data;
    formPassword.value.id = data.value.data.id;
}
loading.value = false
</script>