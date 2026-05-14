<template>
    <form @submit.prevent="login" class="flex justify-between flex-wrap">
        <UFormField class="w-full sm:w-[45%] mb-[1em]" label="Prénom" required>
            <UInput name="firstnameInput" id="firstnameInput" v-model="email" class="w-full" type="email" placeholder="Prénom" size="lg" />
        </UFormField>
        <UFormField class="w-full sm:w-[45%] mb-[1em]" label="Nom de famille" required>
            <UInput name="lastnameInput" id="lastnameInput" v-model="email" class="w-full" type="email" placeholder="Nom de famille" size="lg" />
        </UFormField>
        <!-- Email -->
        <UFormField class="w-full sm:w-[48%]" label="Adresse mail" required>
            <UInput name="emailInput" id="emailInput" v-model="email" class="w-full" type="email" placeholder="exemple@email.com" size="lg" />
        </UFormField>
        <!-- Mot de passe -->
        <UFormField class="w-full sm:w-[48%]" label="Mot de passe" required>
            <UInput name="passwordInput" id="passwordInput" v-model="password" class="w-full" type="password" placeholder="********" size="lg" />
        </UFormField>
        <!-- Bouton de connexion -->
        <UButton type="submit" class="w-full py-3 mt-[1em]  block hover:opacity-50 transition duration-300 m-[2em_auto_0] bg-linear-to-r from-pink-500 to-purple-600 text-white cursor-pointer font-semibold rounded-lg shadow-md" color="primary" variant="solid">S'inscrire
            <IconsArrowRight class="w-[1em] ml-[1em] fill-white h-[1em] inline-block" />
        </UButton>
    </form>
</template>
<script setup>
import{ref}from 'vue'
import IconsArrowRight from '~/svg/IconsArrowRight.vue'
const email = ref(''),
    password = ref(''),
    login=()=>{
        console.log('Email:', email.value)
        console.log('Mot de passe:', password.value)
    }
</script>
