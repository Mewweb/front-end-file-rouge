<template>
    <section class="m-auto max-w-[1200px] mx-w-[90%] py-10">
        <div class="container mx-auto space-y-8">
            <!-- Titre -->
            <h1 class="text-3xl md:text-4xl font-extrabold text-purple-900 uppercase mb-8">Connexion à votre espace</h1>
            <!-- Carte principale -->
            <UCard class="shadow-lg rounded-xl border border-gray-100 bg-gradient-to-br from-indigo-50 to-purple-50">
                <!-- Boutons sociaux -->
                <FormButtonSocialForm />
                <!-- Formulaire -->
                <FormLoginForm />
            </UCard>
        </div>
    </section>
</template>
<script setup>
import {ref} from 'vue'
const email = ref(''),
    password = ref(''),
    login = ()=>{
        console.log('Email:',email.value)
        console.log('Mot de passe:',password.value)
    }
</script>
