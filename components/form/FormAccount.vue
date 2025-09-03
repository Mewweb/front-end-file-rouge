<template>
    <section class="m-auto max-w-[1200px] w-[90%] sectionAccountEdit py-10">
        <div class="container mx-auto px-6 lg:px-12">
            <!-- Titre -->
            <h2 class="text-3xl font-extrabold text-purple-900 mb-6">Modifier mes données personnelles</h2>
            <!-- Onglets -->
            <UTabs :items="items" variant="link" :ui="{trigger:'grow',indicator:'hidden',content:'bg-purple-900 rounded-b-lg p-6',root:'gap-0',label:'',list:'p-0'}" class="bg-white rounded-xl shadow-lg">
                <template #infos="{item}">
                    <!-- Onglet 1 :Infos personnelles -->
                    <div v-if="item.slot === 'infos'">
                        <form class="space-y-5 flex justify-between flex-wrap">
                            <UFormField class="w-full sm:w-[48%] inline-block" label="Prénom" :ui="{label:'text-white'}" required>
                                <UInput v-model="form.nom" class="w-full" :ui="{base:'h-10'}" placeholder="Prénom" name="firstnameInput" id="firstnameInput" />
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%] inline-block" label="Nom de famille" :ui="{label:'text-white'}" required>
                                <UInput v-model="form.prenom" class="w-full" :ui="{base:'h-10'}" placeholder="Nom" name="lastnameInput" id="lastnameInput" />
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%] inline-block" label="Adresse email" :ui="{label:'text-white'}" required>
                                <UInput v-model="form.email" class="w-full" :ui="{base:'h-10'}" type="email" placeholder="Email" name="emailInput" id="emailInput" />
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%] inline-block" label="Numéro de téléphone" :ui="{label:'text-white'}" required>
                                <UInput v-model="form.telephone" class="w-full" :ui="{base:'h-10'}" type="tel" placeholder="Numéro de téléphone" name="telephoneInput" id="telephoneInput" />
                            </UFormField>
                            <UButton type="submit" class="py-3 mt-[1em] w-auto block hover:opacity-50 bg-pink-500 hover:bg-pink-500 transition duration-300 cursor-pointer text-white font-semibold rounded-lg shadow-md">Sauvegarder</UButton>
                        </form>
                    </div>
                </template>
                <template #adresses="{item}">
                    <!-- Onglet 2 :Adresses -->
                    <div v-if="item.slot === 'adresses'">
                        <form class="space-y-5 flex justify-between flex-wrap">
                            <UFormField class="w-full sm:w-[48%]" label="Adresse de facturation" :ui="{label:'text-white'}" required>
                                <label class="w-1 h-1 overflow-hidden absolute" for="adresseFacturationInput">Adresse de facturation</label>
                                <UInput v-model="form.adresseFacturation" placeholder="Adresse de facturation" :ui="{base:'h-10'}" class="w-full" name="adresseFacturationInput" id="adresseFacturationInput" />
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%]" label="Adresse de livraison" :ui="{label:'text-white'}" required>
                                <UInput v-model="form.adresseLivraison" :ui="{base:'h-10'}" class="w-full" placeholder="Adresse de livraison" name="adresseLivraisonInput" id="adresseLivraisonInput" />
                            </UFormField>
                            <UButton type="submit" class="py-3 mt-[1em] w-auto block hover:opacity-50 bg-pink-500 hover:bg-pink-500 transition duration-300 cursor-pointer text-white font-semibold rounded-lg shadow-md">Sauvegarder</UButton>
                        </form>
                    </div>
                </template>
                <template #securite="{item}">
                    <!-- Onglet 3 :Sécurité -->
                    <div v-if="item.slot === 'securite'">
                        <form class="space-y-5 flex justify-between flex-wrap">
                            <UFormField class="w-full sm:w-[48%]" label="Mot de passe" :ui="{label:'text-white'}" required>
                                <UInput v-model="form.password" class="w-full" :ui="{base:'h-10'}" name="passwordInput" id="passwordInput" type="password" placeholder="Mot de passe" />
                                <!-- Conditions de sécurité -->
                                <ul class="text-sm text-gray-600 space-y-1 mt-2">
                                    <li :class="checkLength ? 'text-green-300' :'text-white'">✔ 8 caractères minimum</li>
                                    <li :class="checkUpper ? 'text-green-300' :'text-white'">✔ 1 majuscule</li>
                                    <li :class="checkNumber ? 'text-green-300' :'text-white'">✔ 1 chiffre</li>
                                    <li :class="checkSpecial ? 'text-green-300' :'text-white'">✔ 1 caractère spécial</li>
                                </ul>
                            </UFormField>
                            <UFormField class="w-full sm:w-[48%]" label="Confirmer le mot de passe" :ui="{label:'text-white'}" required>
                                <label class="w-1 h-1 overflow-hidden absolute" for="passwordConfirmInput">Confirmer le mot de passe</label>
                                <UInput v-model="form.confirmPassword" class="w-full" :ui="{base:'h-10'}" id="passwordConfirmInput" name="passwordConfirmInput" type="password" placeholder="Confirmation de mot de passe" />
                            </UFormField>
                            <UButton type="submit" class="py-3 mt-[1em] w-auto block hover:opacity-50 bg-pink-500 hover:bg-pink-500 transition duration-300 cursor-pointer text-white font-semibold rounded-lg shadow-md">Sauvegarder</UButton>
                        </form>
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
// Définition des onglets
const items = [{label:"Infos personnelles",description:"Gérez vos informations personnelles ici.",slot:'infos'},{label:"Adresses",description:"Gérez vos adresses de facturation et de livraison.",slot:'adresses'},{label:"Sécurité",description:"Modifiez votre mot de passe et gérez la sécurité de votre compte.",slot:'securite'}],
    // Formulaire
    form = ref({nom:"",prenom:"",email:"",telephone:"",adresseFacturation:"",adresseLivraison:"",password:"",confirmPassword:""}),
    // Conditions mot de passe
    checkLength = computed(() => form.value.password.length >= 8),
    checkUpper = computed(() => /[A-Z]/.test(form.value.password)),
    checkNumber = computed(() => /[0-9]/.test(form.value.password)),
    checkSpecial = computed(() => /[^A-Za-z0-9]/.test(form.value.password))
</script>
