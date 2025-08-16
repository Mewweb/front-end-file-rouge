<template>
    <form @submit.prevent="login" class="flex justify-between flex-wrap">
        <fieldset class="w-[45%] mb-[1em]">
            <label class="w-1 h-1 overflow-hidden absolute" for="firstnameInput">Prénom</label>
            <UInput name="firstnameInput" id="firstnameInput" v-model="email" class="w-full" type="email" placeholder="Prénom" size="lg" />
        </fieldset>
        <fieldset class="w-[45%] mb-[1em]">
            <label class="w-1 h-1 overflow-hidden absolute" for="lastnameInput">Nom de famille</label>
            <UInput name="lastnameInput" id="lastnameInput" v-model="email" class="w-full" type="email" placeholder="Nom de famille" size="lg" />
        </fieldset>
        <!-- Email -->
        <fieldset class="w-[45%]">
            <label class="w-1 h-1 overflow-hidden absolute" for="emailInput">Adresse mail</label>
            <UInput name="emailInput" id="emailInput" v-model="email" class="w-full" type="email" placeholder="exemple@email.com" size="lg" />
        </fieldset>
        <!-- Mot de passe -->
        <fieldset class="w-[45%]">
            <label class="w-1 h-1 overflow-hidden absolute" for="passwordInput">Le mot de passe</label>
            <UInput name="passwordInput" id="passwordInput" v-model="password" class="w-full" type="password" placeholder="********" size="lg" />
        </fieldset>
        <!-- Bouton de connexion -->
        <UButton type="submit" class="w-full py-3 mt-[1em] w-auto block hover:opacity-50 transition duration-300 m-[2em_auto_0] bg-gradient-to-r from-pink-500 to-purple-600 text-white cursor-pointer font-semibold rounded-lg shadow-md" color="primary" variant="solid">S'inscrire
            <IconsArrowRight class="w-[1em] ml-[1em] fill-white h-[1em] inline-block" />
        </UButton>
    </form>
</template>
<script setup>
import {ref} from 'vue'
import IconsArrowRight from '~/public/svg/IconsArrowRight.vue'
const email = ref('')
const password = ref('')
const login = ()=>{
    console.log('Email:',email.value)
    console.log('Mot de passe:',password.value)
}
</script>
