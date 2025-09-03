<template>
    <section class="m-auto max-w-[1200px] w-[90%]  py-10">
        <div class="container mx-auto px-6 py-6 lg:px-12 w-full bg-white shadow-lg rounded-2xl">
            <!-- Titre -->
            <h2 class="text-2xl font-bold text-purple-900 mb-6 text-center">Créer un administrateur</h2>
            <!-- Formulaire -->
            <form @submit.prevent="handleSubmit" class="space-y-5 flex justify-between flex-wrap">
                <!-- Nom -->
                <UFormField class="w-full md:w-[48%]" label="Nom" required>
                    <UInput v-model="form.nom" class="w-full" placeholder="Entrez le nom" size="lg" />
                </UFormField>
                <!-- Prénom -->
                <UFormField class="w-full md:w-[48%]" label="Prénom" required>
                    <UInput v-model="form.prenom" class="w-full" placeholder="Entrez le prénom" size="lg" />
                </UFormField>
                <!-- Email -->
                <UFormField class="w-full md:w-[48%]" label="Email" required>
                    <UInput v-model="form.email" class="w-full" type="email" placeholder="exemple@email.com" size="lg" />
                </UFormField>
                <!-- Téléphone -->
                <UFormField class="w-full md:w-[48%]" label="Téléphone" required>
                    <UInput v-model="form.telephone" class="w-full" type="tel" placeholder="+33 6 12 34 56 78" size="lg" />
                </UFormField>
                <!-- Mot de passe -->
                <UFormField class="w-full md:w-[48%]" label="Mot de passe" required>
                    <UInput v-model="form.password" class="w-full" type="password" placeholder="Entrez le mot de passe" size="lg" />
                </UFormField>
                <!-- Confirmation mot de passe -->
                <UFormField class="w-full md:w-[48%]" label="Confirmez le mot de passe" required>
                    <UInput v-model="form.confirmPassword" class="w-full" type="password" placeholder="Confirmez le mot de passe" size="lg" />
                </UFormField>
                <!-- Bouton -->
                <div class="pt-4 text-right w-full">
                    <UButton class="px-6 py-2 bg-[#cc3399] hover:opacity-50 transition duration-300 text-white rounded hover:bg-[#cc3399] transition cursor-pointer" variant="solid" @click="applySearch"> Ajouter un administrateur</UButton>
                </div>
            </form>
        </div>
    </section>
</template>
<script setup>
import{ref} from "vue"
const form = ref({nom:"",prenom:"",email:"",telephone:"",password:"",confirmPassword:""})
function applySearch(){
    // Logique pour appliquer la recherche
    console.log('Recherche appliquée:',form.value)
}
const handleSubmit = ()=>{
    if (form.value.password !== form.value.confirmPassword){
        alert("❌ Les mots de passe ne correspondent pas.")
        return
    }
    console.log("✅ Nouvel administrateur :",form.value)
    alert("Administrateur ajouté avec succès !")
}
</script>