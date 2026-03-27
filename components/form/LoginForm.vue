<template>
    <UForm @submit.prevent="Login" :schema="schema" :state="credentials" class="flex justify-between flex-wrap">
        <!-- Email -->
        <UFormField label="Adresse mail" name="email" required class="w-full md:w-[48%]">
            <UInput name="emailInput" id="emailInput" v-model="credentials.email" class="w-full" type="email" placeholder="exemple@email.com" size="lg" />
        </UFormField>
        <!-- Mot de passe -->
        <UFormField label="Le mot de passe" name="password" required class="w-full md:w-[48%]">
            <UInput name="passwordInput" id="passwordInput" v-model="credentials.password" class="w-full" type="password" placeholder="********" size="lg" />
        </UFormField>
        <!-- Bouton de connexion -->
        <UButton type="submit" class="w-full py-3 mt-[1em] block hover:opacity-50 transition duration-300 m-[2em_auto_0] bg-linear-to-r from-pink-500 to-purple-600 text-white cursor-pointer font-semibold rounded-lg shadow-md" color="primary" variant="solid">Se connecter
            <IconsArrowRight class="w-[1em] ml-[1em] fill-white h-[1em] inline-block" />
        </UButton>
    </UForm>
</template>
<script setup>
import * as v from 'valibot';
import IconsArrowRight from '~/public/svg/IconsArrowRight.vue'
const backendUrl = useRuntimeConfig().public.urlBackend == "${BACKEND_URL}" ? "http://localhost:8080/m2l" : useRuntimeConfig().public.backendUrl;
const{fetch:refreshSession} = useUserSession(),
    schema = v.object({
        email:v.pipe(
            v.string("L'email doit être en format textuel"),
            v.email("L'email doit être dans le format :***@***.***"),
            v.nonEmpty("Ce champ est obligatoire")
        ),
        password:v.pipe(
            v.string("Le mot de passe doit être en format textuel"),
            v.nonEmpty("Ce champ est obligatoire")
        )
    }),
    credentials = ref({
        email:"test@test.fr",
        password:"test@test.fr",
        grantType:"PASSWORD"
    }),
    Login=async(e)=>{
        e.preventDefault();
        try{
            const data = await $fetch(`${backendUrl}/authenticate`,{
                method:'POST',
                body:credentials.value,
                credentials:'include'
            });
            await $fetch('/api/auth/login',{
                method:'POST',
                body:data
            })
            await refreshSession();
            navigateTo('/');
        }catch (e){console.log(e)}
    }
</script>
