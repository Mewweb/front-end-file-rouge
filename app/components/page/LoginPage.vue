<template>
    <section class="m-auto max-w-300 w-[90%] py-10">
        <div class="container mx-auto space-y-8">
            <!-- Titre -->
            <h1 class="text-3xl md:text-4xl font-extrabold text-purple-900 uppercase mb-8">Connexion à votre espace</h1>
            <!-- Carte principale -->
            <UCard class="shadow-lg rounded-xl border border-gray-100 bg-linear-to-br from-indigo-50 to-purple-50">
                <!-- Boutons sociaux -->
                <!--<ButtonSocialForm />-->
                <!-- Formulaire -->
                <LoginForm />
            </UCard>
            <p>Vous n'avez pas de compte ? <NuxtLink to="/signin" class="text-purple-600 transition duration-300 hover:opacity-50">Inscrivez-vous !</NuxtLink></p>
        </div>
    </section>
</template>
<script setup>
import LoginForm from '../form/LoginForm.vue';
//import ButtonSocialForm from '../form/ButtonSocialForm.vue';
</script>
