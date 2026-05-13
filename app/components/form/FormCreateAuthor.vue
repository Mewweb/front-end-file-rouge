<template>
    <div class="flex items-center flex-col p-[1em] gap-0 bg-white rounded-xl shadow-lg">
        <p v-if="errorMessage == 1">Une erreur a été rencontré. Veuillez réessayer plus tard</p>
        <p v-if="errorMessage == 2">Le formulaire n'est pas rempli correctement. Veuillez respecter les indications</p>
        <p v-else-if="successMessage">L'éditeur à bien été ajouté</p>
        <UForm class="flex justify-between space-y-2 flex-wrap" :schema="schema" :state="data">
            <UFormField label="Le nom de famille" name="lastname" required class="w-full sm:w-[48%]">
                <UInput type="text" name="lastname" id="lastname" v-model="data.lastname" class="w-full"
                    placeholder="Nom de famille" size="lg" />
            </UFormField>
            <UFormField label="Le prénom" name="firstname" required class="w-full sm:w-[48%]">
                <UInput type="text" name="firstname" id="firstname" v-model="data.firstname" class="w-full"
                    placeholder="Prénom" size="lg" />
            </UFormField>
            <UFormField label="Langue" name="langue" required class="w-full">
                <USelectMenu class="w-full" v-model="data.langue" placeholder="Langue" value-key="id"
                    :items="contentLangue" size="lg" />
            </UFormField>
            <UButton type="submit" @click="submit()"
                class="w-auto py-3 mt-[1em] hover:opacity-50 transition duration-300 m-[2em_auto_0] bg-linear-to-r from-pink-500 to-purple-600 text-white cursor-pointer font-semibold rounded-lg shadow-md"
                color="primary" variant="solid">{{ props.isUpdate == false ? 'Ajouter' : 'Modifier' }}</UButton>
        </UForm>
    </div>

</template>
<script setup>
import * as v from 'valibot';
const config = useRuntimeConfig().public.urlBackend,
    backendUrl = config == "" ? "http://localhost:8080/m2l" : config,
    data = ref({
        lastname: '',
        firstname: '',
        langue: ''
    }),
    { user } = useUserSession(),
    props = defineProps(['isUpdate']),
    emit = defineEmits(['addAuthor']),
    errorMessage = ref(false),
    successMessage = ref(false),
    contentLangue = ref([
        {
            label: "Belgique",
            id: "BE"
        },
        {
            label: "Allemagne",
            id: "DE"
        },
        {
            label: "Australie",
            id: "AU"
        },
        {
            label: "France",
            id: "FR"
        },
        {
            label: "Royaume-Uni",
            id: "GB"
        },
        {
            label: "Italie",
            id: "IT"
        },
        {
            label: "Espagne",
            id: "ES"
        },
        {
            label: "Suède",
            id: "SE"
        }
    ]),
    schema = v.object({
        lastname: v.pipe(
            v.string("Le nom de famille doit être un texte"),
            v.nonEmpty("Le nom de famille est obligatoire"),
            v.minLength(3, "Le nom de famille doit contenir 3 caractères minimum"),
            v.maxLength(50, "Le nom de famille doit contenir 50 caractères maximim")
        ),
        firstname: v.pipe(
            v.string("Le prénom doit être en format texte"),
            v.nonEmpty("Le prénom est obligatoire"),
            v.minLength(3, "Le prénom doit contenir 3 caractères minimum"),
            v.maxLength(50, "Le prénom doit contenir 50 caractères maximum")
        ),
        langue: v.pipe(
            v.string("La langue doit être en format texte"),
            v.nonEmpty("La langue est obligatoire"),
            v.minLength(2, "La langue doit contenir 2 caractères"),
            v.maxLength(2, "La langue doit contenir 2 caractères")
        )
    });
const submit = async () => {
    errorMessage.value = false;
    successMessage.value = false;
    if (!props.isUpdate) {
        try {
            v.parse(schema, data.value);
            let authorData = await postData(`${backendUrl}/author`, data.value);
            if (authorData.error) {
                await refreshAuth();
                authorData = await postData(`${backendUrl}/author`, data.value);
            }
            if (authorData.error) errorMessage.value = 1;
            else {
                successMessage.value = true;
                emit("addAuthor", authorData.value);
            }
        } catch (e) {
            console.log(e);
            errorMessage.value = 2;
        }
    } else {
        try {
            v.parse(schema, data.value);
            let authorData = await putData(`${backendUrl}/author/${data.value.id}`, data.value);
            if (authorData == false) authorData = await putData(`${backendUrl}/author/${data.value.id}`, data.value);
            navigateTo('/admin/editor/all');
        } catch (e) {
            console.log(e);
            errorMessage.value = 2;
        }
    }
}
if (user.value != null && props.isUpdate == true) {
    const id = useRoute().params.id;
    let getData = await accessData(`${backendUrl}/author/${id}`);
    if (getData.error) {
        await refreshAuth();
        getData = await accessData(`${backendUrl}/author/${id}`);
    }
    data.value = getData.value;
}
</script>