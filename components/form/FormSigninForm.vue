<template>
    <form @submit.prevent="register" class="space-y-6 flex justify-between flex-wrap text-left">
                    <!-- Nom -->
                    <UFormField label="Nom" class="w-full md:w-[48%]" name="lastName" required>
                        <UInput v-model="lastName" class="w-full" type="text" placeholder="Votre nom" size="lg" />
                    </UFormField>
                    <!-- Prénom -->
                    <UFormField label="Prénom" class="w-full md:w-[48%]" name="firstName" required>
                        <UInput v-model="firstName" class="w-full" type="text" placeholder="Votre prénom" size="lg" />
                    </UFormField>
                    <!-- Téléphone -->
                    <UFormField label="Numéro de téléphone" class="w-full md:w-[48%]" name="phone" required>
                        <UInput v-model="phone" class="w-full" type="tel" placeholder="+33 6 12 34 56 78" size="lg" />
                    </UFormField>
                    <!-- Email -->
                    <UFormField label="Adresse email" class="w-full md:w-[48%]" name="email" required>
                        <UInput v-model="email" class="w-full" type="email" placeholder="exemple@email.com" size="lg" />
                    </UFormField>
                    <!-- Mot de passe -->
                    <UFormField label="Mot de passe" class="w-full md:w-[48%]" name="password" required>
                        <UInput v-model="password" class="w-full" :ui="{ base: 'h-10' }" name="passwordInput"
                            id="passwordInput" type="password" placeholder="Mot de passe" />
                        <!-- Conditions de sécurité -->
                        <ul class="text-sm text-gray-600 space-y-1 mt-2">
                            <li :class="checkLength ? 'text-green-300' : 'text-red-500'">✔ 8 caractères minimum
                            </li>
                            <li :class="checkUpper ? 'text-green-300' : 'text-red-500'">✔ 1 majuscule</li>
                            <li :class="checkNumber ? 'text-green-300' : 'text-red-500'">✔ 1 chiffre</li>
                            <li :class="checkSpecial ? 'text-green-300' : 'text-red-500'">✔ 1 caractère spécial
                            </li>
                        </ul>
                    </UFormField>
                    <!-- Confirmation mot de passe -->
                    <UFormField label="Confirmer le mot de passe" class="w-full md:w-[48%]" name="confirmPassword"
                        required>
                        <UInput v-model="confirmPassword" class="w-full" type="password" placeholder="********"
                            size="lg" />
                    </UFormField>
                    <!-- Bouton -->
                    <UButton type="submit"
                        class="w-auto ml-auto cursor-pointer hover:opacity-50 duration-300 transition py-3 font-semibold text-lg rounded-lg shadow-md"
                        color="primary" variant="solid"
                        :ui="{ color: { primary: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90' } }">
                        S’inscrire →</UButton>
                </form>
</template>
<script setup>
import { UFormField } from '#components'
import { ref } from 'vue'
const lastName = ref(''),
    firstName = ref(''),
    phone = ref(''),
    email = ref(''),
    password = ref(''),
    confirmPassword = ref(''),
    checkLength = computed(() => password.value.length >= 8),
    checkUpper = computed(() => /[A-Z]/.test(password.value)),
    checkNumber = computed(() => /[0-9]/.test(password.value)),
    checkSpecial = computed(() => /[^A-Za-z0-9]/.test(password.value)),
    register = () => {
        if (password.value !== confirmPassword.value) {
            alert("Les mots de passe ne correspondent pas !")
            return
        }
        console.log('Nom:', lastName.value)
        console.log('Prénom:', firstName.value)
        console.log('Téléphone:', phone.value)
        console.log('Email:', email.value)
        console.log('Mot de passe:', password.value)
    }
</script>
