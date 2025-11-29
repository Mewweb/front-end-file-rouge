<template>
    <UForm @submit.prevent="Register" :schema="schema" :state="credentials" class="space-y-6 flex justify-between flex-wrap text-left">
        <!--Input nom -->
        <UFormField label="Nom" class="w-full md:w-[48%]" name="lastname" required>
            <UInput v-model="credentials.lastname" class="w-full" type="text" placeholder="Votre nom" size="lg" />
        </UFormField>
        
        <!-- Input prénom -->
        <UFormField label="Prénom" class="w-full md:w-[48%]" name="firstname" required>
            <UInput v-model="credentials.firstname" class="w-full" type="text" placeholder="Votre prénom" size="lg" />
        </UFormField>
        
        <!-- Input numéro de téléphone -->
        <UFormField label="Numéro de téléphone" class="w-full md:w-[48%]" name="phone" required>
            <UInput v-model="credentials.phone_number" class="w-full" type="tel" placeholder="+33 6 12 34 56 78" size="lg" />
        </UFormField>
        
        <!-- Input Adresse email -->
        <UFormField label="Adresse email" class="w-full md:w-[48%]" name="email" required>
            <UInput v-model="credentials.email" class="w-full" type="email" placeholder="exemple@email.com" size="lg" />
        </UFormField>

        <!--Input Adresse de livraison-->
        <UFormField label="Adresse de livraison" class="w-full md:w-[48%]" name="billingAddress" required>
            <UInput v-model="credentials.billing_address" class="w-full" type="text" placeholder="66 rue des avenues" size="lg" />
        </UFormField>

        <!-- Input Adresse de facturation -->
        <UFormField label="Adresse de facturation" class="w-full md:w-[48%]" name="deliveryAddress" required>
            <UInput v-model="credentials.delivery_address" class="w-full" type="text" placeholder="22 avenues des rues" size="lg" />
        </UFormField>

        <!-- Input Mot de passe -->
        <div class="w-full mb-[1em] md:w-[48%]">
            <UFormField label="Mot de passe" name="password" required>
                <UInput v-model="credentials.password" class="w-full" placeholder="Mot de passe" size="lg" :color="color" :type="showPassword ? 'text' :'password'" :aria-invalid="score < 4" aria-describedby="password-strength">
                    <template #trailing>
                        <UButton color="neutral" variant="link" size="sm" :icon="showPassword ? 'i-lucide-eye-off' :'i-lucide-eye'" :aria-label="showPassword ? 'Cacher le mot de passe' :'Voir le mot de passe'" :aria-pressed="showPassword" aria-controls="password"  @click="showPassword = !showPassword" />
                    </template>
                </UInput>
            </UFormField>
            <UProgress :color="color" :indicator="text" :model-value="score" :max="4" size="sm" />
            <p id="password-strength" class="text-sm font-medium">{{text}}. Doit contenir:</p>
            <ul class="space-y-1" aria-label="Le mot de passe doit contenir">
                <li v-for="(req,index) in strength" :key="index" class="flex items-center gap-0.5" :class="req.met ? 'text-success' :'text-muted'">
                    <UIcon :name="req.met ? 'i-lucide-circle-check' :'i-lucide-circle-x'" class="size-4 shrink-0" />
                    <span class="text-xs font-light">
                        {{req.text}}
                        <span class="sr-only">
                            {{req.met ? ' - Exiger' :"N'est pas exiger"}}
                        </span>
                    </span>
                </li>
            </ul>
        </div>

        <!-- Input Confirmation mot de passe -->
        <UFormField label="Confirmer le mot de passe" class="w-full md:w-[48%]" name="confirmPassword" required>
            <UInput v-model="credentials.confirmPassword" class="w-full" :type="showConfirmPassword ? 'text' :'password'" placeholder="********" size="lg">
                <template #trailing>
                    <UButton color="neutral" variant="link" size="sm" :icon="showConfirmPassword ? 'i-lucide-eye-off' :'i-lucide-eye'" :aria-label="showConfirmPassword ? 'Cacher le mot de passe ' :'Voir le mot de passe'" :aria-pressed="showConfirmPassword" aria-controls="password" @click="showConfirmPassword = !showConfirmPassword"></UButton>
                </template>
            </UInput>
        </UFormField>
        <!-- Bouton -->
        <UButton type="submit" class="w-auto ml-auto cursor-pointer hover:opacity-50 duration-300 transition py-3 font-semibold text-lg rounded-lg shadow-md" color="primary" variant="solid" :ui="{color:{primary:'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90'}}">S’inscrire →</UButton>
    </UForm>
</template>
<script setup>
import{UFormField} from '#components'
import * as v from 'valibot'
import{ref} from 'vue'
const showPassword = ref(false);
const showConfirmPassword = ref(false);
function checkStrength(str){
    const requirements = [
        {regex:/.{8}/,text:'Doit contenir 8 caractères minimum'},
        {regex:/\d/,text:"Doit contenir 1 nombre minimum"},
        {regex:/[a-z]/,text:"Doit contenir une lettre en minuscule"},
        {regex:/[A-Z]/,text:"Doit contenir une lettre en majuscule"}
    ]
    return requirements.map(req=>({
        met:req.regex.test(str),
        text:req.text
    }))
}
const strength = computed(() => checkStrength(credentials.value.password))
const score = computed(() => strength.value.filter(req => req.met).length);
const color = computed(()=>{
    if (score.value === 0) return 'neutral'
    if (score.value <= 1) return 'error'
    if (score.value <= 2) return 'warning'
    if (score.value === 3) return 'warning';
    return 'success'
})
const text = computed(() =>{
    if (score.value === 0) return "Entrer un mot de passe"
    if (score <= 2) return "Mot de passe faible";
    if (score === 3) return "Mot de passe moyen";
    return "Mot de passe fort"
})
const schema = v.object({
    lastname:v.pipe(
        v.string("Le champ doit être en format textuel"),
        v.nonEmpty("Le champ est obligatoire"),
        v.minLength(3,"Le champ doit contenir au moins trois caractères minimum"),
        v.maxLength(50,"Le champ doit contenir 50 caractères majuscule")
    ),
    firstname:v.pipe(
        v.string("Le champ doit être en format textuel"),
        v.nonEmpty("Le champ est obligatoire"),
        v.minLength(3,"Le champ doit contenir au moins trois caractères minimum"),
        v.maxLength(50,"Le champ doit contenir 50 caractères majuscule")
    ),
    phone_number:v.pipe(
        v.string("Le champ doit être en format textuel"),
        v.nonEmpty("Le champ est obligatoire"),
        v.minLength("Le champ doit contenir 3 caractères minimum"),
        v.maxLength("Le champ doit contenir 20 caractères maximum")
    ),
    email:v.pipe(
        v.string("Le champ doit être en format textuel"),
        v.nonEmpty("Le champ est obligatoire"),
        v.email("Le champ n'est pas dans le bon format :***@***.***"),
        v.minLength(10,"Le champ doit contenir 10 caractères minimum"),
        v.maxLength(100,"Le champ doit contenir 100 caractères maximum")
    ),
    billing_address:v.pipe(
        v.string("Le champ doit être en format textuel"),
        v.nonEmpty("Le champ est obligatoire"),
        v.minLength(2,"Le champ doit contenir 2 caractères minimum"),
        v.maxLength(100,"Le champ doit contenir 100 caractères maximum")
    ),
    delivery_address:v.pipe(
        v.string("Le champ doit être en format textuel"),
        v.nonEmpty("Le champ est obligatoire"),
        v.minLength(2,"Le champ doit contenir 2 caractères minimum"),
        v.maxLength(100,"Le champ doit contenir 100 caractères maximum")
    ),
    password:v.pipe(
        v.string("Le champ doit être en format textuel"),
        v.nonEmpty("Le champ est obligatoire"),
        v.minSize(8,"Le mot de passe doit contenir 8 caractères minimum"),
        v.maxSize(50,"Le mot de passe doit contenir 50 caractères maximum")
    ),
    confirmPassword:v.pipe(
        v.string("Le champ doit être en format textuel"),
        v.nonEmpty("Le champ est obligatoire"),
        v.minSize(8,"Le mot de passe doit contenir 8 caractères minimum"),
        v.maxSize(50,"Le mot de passe doit contenir 50 caractères maximum"),

    )
})
const credentials = ref({
    lastname:"",
    firstname:"",
    phone_number:"",
    email:"",
    billing_address:"",
    delivery_address:"",
    password:"",
    confirmPassword:""
})

const test = ref({
    lastname:"Doe",
    firstname:"John",
    phone_number:"01 02 03 04",
    email:"mail@gmail.com",
    password:"test@test.fr",
    billing_address:"66 rue des avenues",
    delivery_address:"55 rue des avenues",
})

const Register=async (e)=>{
    e.preventDefault();
         console.log('Nom:', credentials.value.lastname)
        console.log('Prénom:',credentials.value.firstname)
        console.log('Téléphone:',credentials.value.phone_number)
        console.log('Email:',credentials.value.email)
        console.log('Mot de passe:',credentials.value.password);
        console.log('Confirmation de mot de passe',credentials.value.confirmPassword);
        console.log('Adresse de livraison', credentials.value.billing_address);
        console.log("Adresse de facturation", credentials.value.delivery_address);
    try{
        const data=  await $fetch('http://localhost:8080/m2l/register',{
            method:'POST',
            body:credentials.value,
            credentials:'include'
        })

        navigateTo('/login');
    }catch(e){
        console.log(e);
    }
}

const register=()=>{
        if(credentials.value.password !== credentials.value.confirmPassword){
            alert("Les mots de passe ne correspondent pas !")
            return
        }
        console.log('Nom:', credentials.value.lastname)
        console.log('Prénom:',credentials.value.firstname)
        console.log('Téléphone:',credentials.value.phone)
        console.log('Email:',credentials.value.email)
        console.log('Mot de passe:',credentials.value.password);
        console.log('Confirmation de mot de passe',credentials.value.confirmPassword);
        console.log('Adresse de livraison', credentials.value.billingAddress);
        console.log("Adresse de facturation", credentials.value.deliveryAddress);
    }
</script>
