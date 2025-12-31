<template>
    <section class="m-auto max-w-[1200px] w-[90%] sectionAccountEdit py-10">
        <div class="container mx-auto px-6 lg:px-12">
            <!-- Titre -->
            <h2 class="text-3xl font-extrabold text-purple-900 mb-6">Modifier mes données personnelles</h2>
            <!-- Onglets -->
            <UTabs :items="items" variant="link" :ui="{trigger:'grow',indicator:'hidden',content:'rounded-b-lg p-6',root:'gap-0',label:'',list:'p-0'}" class="bg-white rounded-xl shadow-lg">
                <template #infos="{item}">
                    <!-- Onglet 1 :Infos personnelles -->
                    <div v-if="item.slot === 'infos'">
                        <UForm :schema="schemaItem" :state="formItem" class="space-y-5 flex justify-between flex-wrap">
                            <UFormField class="w-full sm:w-[48%] inline-block" label="Prénom" name="firstname" required>
                                <UInput v-model="formItem.lastname" class="w-full" :ui="{base:'h-10'}" placeholder="Prénom" />
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%] inline-block" label="Nom de famille" name="lastname" required>
                                <UInput v-model="formItem.firstname" class="w-full" :ui="{base:'h-10'}" placeholder="Nom" />
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%] inline-block" label="Adresse email" required name="email">
                                <UInput v-model="formItem.email" class="w-full" :ui="{base:'h-10'}" type="email" placeholder="Email" />
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%] inline-block" label="Numéro de téléphone" name="phone_number" required>
                                <UInput v-model="formItem.phone_number" class="w-full" :ui="{base:'h-10'}" type="tel" placeholder="Numéro de téléphone" />
                            </UFormField>
                            <UButton type="submit" class="py-3 mt-[1em] w-auto block hover:opacity-50 bg-pink-500 hover:bg-pink-500 transition duration-300 cursor-pointer text-white font-semibold rounded-lg shadow-md">Sauvegarder</UButton>
                        </UForm>
                    </div>
                </template>
                <template #adresses="{item}">
                    <!-- Onglet 2 :Adresses -->
                    <div v-if="item.slot === 'adresses'">
                        <UForm :schema="schemaAdresse" :state="formAddress" class="space-y-5 flex justify-between flex-wrap">
                            <UFormField class="w-full sm:w-[48%]" label="Adresse de facturation" name="delivery_address" required>
                                <UInput v-model="formAddress.billing_address" placeholder="Adresse de facturation" :ui="{base:'h-10'}" class="w-full" />
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%]" label="Adresse de livraison" name="billing_address" required>
                                <UInput v-model="formAddress.delivery_address" :ui="{base:'h-10'}" class="w-full" placeholder="Adresse de livraison" />
                            </UFormField>
                            <UButton type="submit" class="py-3 mt-[1em] w-auto block hover:opacity-50 bg-pink-500 hover:bg-pink-500 transition duration-300 cursor-pointer text-white font-semibold rounded-lg shadow-md">Sauvegarder</UButton>
                        </UForm>
                    </div>
                </template>
                <template #securite="{item}">
                    <!-- Onglet 3 :Sécurité -->
                    <div v-if="item.slot === 'securite'">
                        <UForm :schema="schemaPassword" :state="formPassword" class="space-y-5 flex justify-between flex-wrap">
                            <div class="w-full sm:w-[48%]">
                                <UFormField label="Mot de passe" name="password" required>
                                    <UInput v-model="formPassword.password" placeholder="Le mot de passe" :color="color" :type="showPassword ? 'text' : 'password'" :aria-invalid="score < 4" aria-describedby="password-strength" :ui="{trailing:'pe-1'}" class="w-full" >
                                    <template #trailing>
                                        <UButton color="neutral" variant="link" size="sm" :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" :aria-label="showPassword ? 'Cacher le mot de passe' : 'Voir le mot de passe'" :aria-pressed="showPassword" aria-controls="password" @click="showPassword != showPassword" />
                                    </template>
                                    </UInput>
                                </UFormField>
                                <UProgress class="my-[1em]" :color="color" :indicator="text" :model-value="score" :max="4" size="sm"/>
                                <p id="password-strength" class="text-sm font-medium">
                                    {{ text }}. Doit contenir: 
                                </p>
                                <ul class="space-y-1" aria-label="Le mot de passe doit contenir">
                                    <li v-for="(req, index) in strength" :key="index" class="flex-items-center gap-0.5" :class="req.met ? 'text-success' : 'text-muted'">
                                        <UIcon :name="req.met ? 'i-lucide-circle-met' : 'i-lucide-circle-x'" class="size-4 align-center inline-block mr-[.5em] shrink-0" />
                                        <span class="text-xs font-light">
                                            {{ req.text }}
                                            <span class="sr-only">
                                                {{ req.met ? '- condition remplie' : 'condition non remplie' }}
                                            </span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <UFormField class="w-full sm:w-[48%]" name="confirmPasswordInput" label="Confirmer le mot de passe" required>
                                <UInput v-model="formPassword.confirmPassword" class="w-full" :ui="{base:'h-10'}" type="password" placeholder="Confirmation de mot de passe" />
                            </UFormField>
                            <UButton type="submit" class="py-3 mt-[1em] w-auto block hover:opacity-50 bg-pink-500 hover:bg-pink-500 transition duration-300 cursor-pointer text-white font-semibold rounded-lg shadow-md">Sauvegarder</UButton>
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
import {ref,computed} from "vue"
import * as v from 'valibot'
const {user} = useUserSession();
const showPassword = ref(false);
let userData = await accessData(`http://localhost:8080/m2l/getUser/${user.value.email}`);
if(userData.error == true){
    console.log("Je suis un test");
    await refreshAuth();
    userData = await accessData(`http://localhost:8080/m2l/getUser/${user.value.email}`);
}
console.log(userData.data);
function checkStrength(str){
    const requirements = [
        {regex: /.{8,}/, text:'Le mot de passe doit contenir 8 caractères minimum'},
        {regex:/\d/, text:'Le mot de passe doit contenir un chiffre'},
        {regex:/[a-z]/, text:'Le mot de passe doit contenir une lettre en minuscule'},
        {regex:/[A-Z]/, text:'Le mot de passe doit contenir une lettre en majuscule'}
    ]
    return requirements.map(req => ({met:req.regex.test(str), text:req.text}))
}

const strength = computed(() => checkStrength(formPassword.value.password))
const score = computed(() => strength.value.filter(req => req.met).length)
const color = computed(() => {
    if(score.value === 0) return 'neutral'
    if(score.value <= 1) return 'error'
    if(score.value <= 2) return 'warning'
    if(score.value === 3) return 'warning'
    return 'success'
})

const text = computed(() => {
    if(score.value === 0 ) return ''
    if(score.value <= 2) return 'Mot de passe faible'
    if(score.value === 3) return 'Mot de passe moyen'
    return 'Mot de passe fort'
})

// Définition des onglets
const items = [
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
            v.minLength(6, "Le numéro de téléphone doit contenir 6 caractères minimum"),
            v.maxLength(20,"Le numéro de téléphone doit contenir 20 caractères maximum")
        ),
        email:v.pipe(
            v.string("Le mail doit être en format textuel"),
            v.email("Le mail doit être être composé de : ***@***.***"),
            v.nonEmpty("Le mail est obligatoire"),
            v.minLength(5, "Le mail doit contenir 5 caractères minimum"),
            v.maxLength(254, "Le mail doit contenir 254 caractères maximum")
        ),
    }),
    schemaAdresse = v.object({
        billing_address:v.pipe(
            v.string("L'adresse de facturation doit être en format textuel"),
            v.nonEmpty("L'adresse de facturation est obligatoire"),
            v.minLength(2, "L'adresse de facturation doit contenir 2 caractères minimum"),
            v.maxLength(100, "L'adresse de facturation doit contenir 100 caractères maximum")
        ),
        delivery_address:v.pipe(
            v.string("L'adresse de livraison doit être en format textuel"),
            v.nonEmpty("L'adresse de livraison est obligatoire"),
            v.minLength(2, "L'adresse de livraison doit contenir 2 caractères minimum"),
            v.maxLength(100,"L'adresse de livraison doit contenir 100 caractères maximum")
        )
    }),
    schemaPassword = v.object({

        password:v.pipe(
            v.string("Le mot de passe doit être en format textuel"),
            v.nonEmpty("Le mot de passe est obligatoire"),
            v.minLength(10, "Le mot de passe doit contenir 10 caractères minimum")
        ),
        confirmPassword:v.pipe(
            v.string("Me mot de passe de confirmation doit être en format textuel"),
            v.nonEmpty("Le mot de passe de confirmation est obligatoire")
        )
    }),
    // Formulaire
    formItem = ref({
        lastname:userData.data.lastname,
        firstname:userData.data.firstname,
        email:user.value.email,
        phone_number:userData.data.phone_number
    }),
    formAddress = ref({
        delivery_address:userData.data.delivery_address,
        billing_address:userData.data.billing_address
    }),
    formPassword = ref({
        password:"",
        confirmPassword:""
    });
</script>
