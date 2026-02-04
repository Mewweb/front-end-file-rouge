<template>
    <p v-if="errorMessage == 1">Une erreur a été rencontré. Veuillez réessayer plus tard.</p>
    <p v-if="errorMessage == 2">Le formulaire n'est pas rempli correctement. Veuillez respecter les indications</p>
    <p v-else-if="successMessage">L'éditeur à bien été ajouté</p>
    <UForm class="flex justify-between space-y-2 flex-wrap" :schema="schema" :state="data">
        <UFormField label="Le titre" name="title" required class="w-full sm:w-[48%]">
            <UInput type="text" name="title" id="title" v-model="data.title" class="w-full" placeholder="Titre"
                size="lg" />
        </UFormField>
        <UFormField label="La date" name="date" required class="w-full sm:w-[48%]">
            <UInput type="date" name="date" id="date" v-model="data.date" class="w-full" placeholder="Date" size="lg" />
        </UFormField>
        <UFormField label="La description" name="description" required class="w-full">
            <UTextarea name="description" id="description" v-model="data.description" class="w-full"
                placeholder="Description" size="lg"></UTextarea>
        </UFormField>
        <UButton type="submit" @click="submit(data, index)"
            class="w-auto py-3 mt-[1em] hover:opacity-50 transition duration-300 m-[2em_auto_0] bg-linear-to-r from-pink-500 to-purple-600 text-white cursor-pointer font-semibold rounded-lg shadow-md"
            color="primary" variant="solid">Ajouter</UButton>
    </UForm>
</template>
<script setup>
import * as v from 'valibot'
const data = ref({
    title: "",
    description: "",
    date: ""
})
const emit = defineEmits(['addEditor']);
const errorMessage = ref(false);
const successMessage = ref(false);
const schema = v.object({
    title: v.pipe(
        v.string("Le titre doit être en format textuel"),
        v.nonEmpty("Le titre est obligatoire"),
        v.minLength(2, "Le titre doit contenir 2 caractères minimum"),
        v.maxLength(50, "Le titre doit contenir 50 caractères maximum")
    ),
    description: v.pipe(
        v.string("La description doit être en format textuel"),
        v.nonEmpty("La description est obligatoire"),
        v.minLength(20, "La description doit contenir 20 caractères")
    ),
    date: v.pipe(
        v.string("La date doit être en format textuel"),
        v.nonEmpty("La date est obligatoire")
    )
})
const submit = async () => {
    errorMessage.value = false;
    successMessage.value = false;
    try {
        v.parse(schema, data.value)
        let editorData = await postData(`http://localhost:8080/m2l/editor`, data.value);
        if (editorData.error) {
            await refreshAuth();
            editorData = await postData(`http://localhost:8080/m2l/editor`, data.value);
        }
        if (editorData.error) errorMessage.value = 1;
        else {
            successMessage.value = true;
            emit("addEditor", editorData.data);
        }
    } catch (e) {
        console.log(e);
        errorMessage.value = 2;
    }
}
</script>