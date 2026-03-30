<template>
    <section class="m-auto max-w-300 w-[90%] py-12">
        <div class="container mx-auto px-6 lg:px-12 text-center">
            <!-- Titre -->
            <h1 class="text-3xl md:text-4xl font-extrabold text-purple-900 uppercase mb-8">Créez votre compte</h1>
            <!-- Options sociales -->
            <div class=" gap-4 mb-6">
                <FormButtonSocialForm />
            </div>
            <!-- Séparateur -->
            <div class="relative flex items-center my-6">
                <div class="grow border-t border-gray-300"></div>
                <span class="px-4 text-gray-500 text-sm">ou avec votre email</span>
                <div class="grow border-t border-gray-300"></div>
            </div>
            <!-- Formulaire -->
            <UCard class="shadow-lg rounded-xl border border-gray-100 p-6 bg-linear-to-br from-indigo-50 to-purple-50">
                <FormSigninForm :isAdmin="false" />
            </UCard>
        </div>
    </section>
</template>
<script setup>
    import FormSigninForm from '../form/FormSigninForm.vue';
</script>