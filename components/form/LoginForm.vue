<template>
    <form @submit.prevent="login" class="flex justify-between flex-wrap">
        <!-- Email -->
        <UFormField label="Adresse mail" name="email" required class="w-full md:w-[48%]">
            <label class="w-1 h-1 overflow-hidden absolute" for="emailInput">Adresse mail</label>
            <UInput name="emailInput" id="emailInput" v-model="email" class="w-full" type="email" placeholder="exemple@email.com" size="lg" />
        </UFormField>
        <!-- Mot de passe -->
        <UFormField label="Le mot de passe" name="password" required class="w-full md:w-[48%]">
            <label class="w-1 h-1 overflow-hidden absolute" for="passwordInput">Le mot de passe</label>
            <UInput name="passwordInput" id="passwordInput" v-model="password" class="w-full" type="password" placeholder="********" size="lg" />
        </UFormField>
        <!-- Bouton de connexion -->
        <UButton type="submit" class="w-full py-3 mt-[1em] w-auto block hover:opacity-50 transition duration-300 m-[2em_auto_0] bg-gradient-to-r from-pink-500 to-purple-600 text-white cursor-pointer font-semibold rounded-lg shadow-md" color="primary" variant="solid">Se connecter
            <IconsArrowRight class="w-[1em] ml-[1em] fill-white h-[1em] inline-block" />
        </UButton>
    </form>
</template>
<script setup>
import{ref} from 'vue'
import IconsArrowRight from '~/public/svg/IconsArrowRight.vue'
const email = ref(''),
    password = ref(''),
    login = ()=>{
        console.log('Email:',email.value)
        console.log('Mot de passe:',password.value)
    }
</script>
