<template>
    <section class="m-auto max-w-300 relative w-[90%] py-10">
        <div class="container mx-auto px-12">
            <UModal v-model:open="addForm" title="Ajouter un éditeur">
                <UButton color="green" class="fixed bottom-[2em] right-[2em] p-[1em] bg-green-500 transition duration-300 rounded-full text-white cursor-pointer hover:opacity-50">
                    <IconPlus />
                </UButton>
                <template #body>
                    <FormCreateEditor :isUpdate="false" @add-editor="(n) => {
                        addForm = false;
                        data.data.content.push(n)
                    }" />
                </template>
            </UModal>
            <h2 v-if="props.data == 'author'" class="text-3xl font-extrabold text-purple-900 mb-6">Gestion des auteurs</h2>
            <h2 v-else-if="props.data == 'editor'" class="text-3xl font-extrabold text-purple-900 mb-6">Gestion des éditeurs</h2>
            <!--Liste des articles-->
            <div v-if="loading == true">
                <div v-for="n in 3" :key="n"
                    class="flex flex-col animate-pulse from-indigo-50 to-purple-50 my-[1em] mx-auto md:flex-row items-center justify-between bg-white rounded-xl p-4 mb-4">
                    <div class="h-[15em] bg-gray-200 rounded-lg w-[10em]"></div>
                    <div class="flex-1 px-2 text-center w-[15%] md:text-left">
                        <div class="h-8 bg-gray-200 my-3 rounded-lg w-[75%]"></div>
                        <div class="h-5 bg-gray-200 my-1 rounded-lg w-[55%]"></div>
                        <div class="h-5 bg-gray-200 my-1 rounded-lg w-[45%]"></div>
                    </div>
                    <div class="flex flex-col px-2 w-[15%] lg:flex-row">
                        <div class="h-10 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                    <div class="flex flex-col px-2 w-[15%] lg:flex-row">
                        <div class="h-10 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                    <div class="flex flex-col px-2 w-[20%] lg:flex-row">
                        <div class="h-10 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                </div>
            </div>
            <p v-else-if="data.data.totalElements == 0 && error == false">Le panier est vide. </p>
            <p v-else-if="data.error == true" class="font-bold mb-5">Erreur durant le chargement du panier. Veuillez
                réessayer plus tard.</p>
            <div v-else>
                <div v-for="(item, index) in data.data.content" :key="index"
                    class="flex flex-col my-[1em] mx-auto md:flex-row items-center justify-between bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
                    <template v-if="props.data == 'author'">
                        <NuxtImg src="/img/example.webp" alt="Image du livre"
                            class="max-h-[15em] object-cover rounded-lg mb-4 md:mb-0" />
                        <!--Info Livre-->
                        <div class="flex-1 px-8 text-center md:text-left">
                            <h3 class="text-[1.5em] font-semibold text-purple-800">{{ item.firstname }} {{ item.lastname
                            }}
                            </h3>
                            <p class="text-sm my-[.5em] text-gray-600">Langue :<span>{{ item.langue }}</span></p>
                        </div>
                    </template>
                    <template v-else-if="props.data == 'editor'">
                        <div class="flex-1 px-8 text-left md-text-left">
                            <h3 class="text-[1.5em] font-semibold text-purple-800">{{ item.title }}</h3>
                            <p>{{ item.description }}</p>
                        </div>
                        <p>Date de création: {{ item.date }}</p>
                    </template>
                    <div class="flex flex-col lg:flex-row">
                        <!-- Supprimer -->
                        <UModal v-model:open="deleteMessage" title="Message de suppression">
                            <UButton color="red" variant="solid"
                                class="cursor-pointer mt-[.5em] lg:mt-0 hover:opacity-50 transition duration-300 ml-4">
                                Supprimer
                                <IconTrash class="w-[1.5em] ml-[.5em] fill-black h-[1.5em] inline-block" />
                            </UButton>
                            <template #body>
                                <p class="p-[1em]">Voulez-vous vraiment supprimer ?</p>
                                <div class="flex p-[1em] justify-between">
                                    <UButton @click="deleteAdminData(item.id, index)"
                                        class="bg-green-500 p-[.8em_2em] rounded-md text-white">Supprimer</UButton>
                                    <UButton @click="deleteMessage = false"
                                        class="bg-transparent p-[.8em_2em] rounded-md text-green-500 border-green-500 border-2 cursor-pointer hover:opacity-50">
                                        Annuler</UButton>
                                </div>
                            </template>
                        </UModal>
                        <NuxtLink :to="`/admin/${props.data}/${item.id}`"
                            class="cursor-pointer mt-[.5em] lg:mt-0 hover:opacity-50 transition duration-300 ml-4">
                            Modifier
                            <IconEdit class="w-[1.5em] ml-[.5em] fill-black h-[1.5em] inline-block" />
                        </NuxtLink>
                        <!--Modifier-->
                    </div>
                </div>
                <UPagination class="m-auto my-[1em] flex justify-center"
                    :ui="{ item: 'cursor-pointer', prev: 'cursor-pointer', next: 'cursor-pointer', first: 'cursor-pointer', last: 'cursor-pointer' }"
                    v-model:page="offsetPage" show-edges :sibling-count="2" :total="data.data.totalPages * 10" />

            </div>
        </div>
    </section>
</template>
<script setup>
import IconEdit from '~/public/svg/IconEdit.vue';
import IconPlus from '~/public/svg/IconPlus.vue';
import IconTrash from '~/public/svg/IconTrash.vue';

const { user } = useUserSession();
const props = defineProps(['data']);
const loading = ref(true);
const error = ref();
const data = ref();
const deleteMessage = ref(false);
const addForm = ref(false);
const offsetPage = ref(1);
const deleteAdminData = async (id, index) => {
    let delData = await deleteData(`http://localhost:8080/m2l/${props.data}/${id}`);
    if(delData.error == true){
        await refreshAuth();
        delData = await deleteData(`http://localhost:8080/m2l/${props.data}/${id}`);
    }
    if(delData.error == false){
        data.value.data.content.splice(index,1);
        deleteMessage.value = false;
    }else{
        data.value.error = true;
    }
}
if (user.value != null) {
    data.value = await accessData(`http://localhost:8080/m2l/${props.data}/all/${offsetPage.value - 1}`);
    if (data.value.error == true) {
        await refreshAuth();
        data.value = await accessData(`http://localhost:8080/m2l/${props.data}/all/${offsetPage.value - 1}`);
    }
}
loading.value = false;
</script>
<!--<template>
    <section class="m-auto max-w-300 relative w-[90%] py-10">
        <div class="container mx-auto px-12">
            <UModal v-model:open="addForm" title="Ajouter un auteur">
                <UButton color="green" class="fixed bottom-[2em] right-[2em] p-[1em] bg-green-500 transition duration-300 rounded-full text-white cursor-pointer hover:opacity-50">
                    <IconPlus />
                </UButton>
                <template #body>
                    <UForm :state="credentials" :schema="schema" class="flex justify-between space-y-2 flex-wrap">
                        <UFormField label="Nom de famille" name="lastname" required class="w-full sm:w-[48%]">
                            <UInput name="lastname" id="lastname" v-model="credentials.lastname" type="text" class="w-full" placeholder="Nom de famille" size="lg" />
                        </UFormField>
                        <UFormField label="Prénom" name="firstname" required class=" w-full sm:w-[48%]">
                            <UInput name="firstname" id="firstname" v-model="credentials.firstname" type="text" class="w-full" placeholder="Prénom" size="lg" />
                        </UFormField>
                        <UFormField label="Langue" name="langue" required class="w-full">
                            <USelectMenu class="w-full" v-model="credentials.langue" placeholder="Langue" value-key="id" :items="contentLangue" size="lg" />
                        </UFormField>
                        <UButton type="submit" @click="addAuthor(index)" class="w-full py-3 mt-[1em] block hover:opacity-50 transition duration-300 m-[2em_auto_0] bg-linear-to-r from-pink-500 to-purple-600 text-white cursor-pointer font-semibold rounded-lg shadow-md" color="primary" variant="solid">
                            Ajouter un auteur
                            <IconsArrowRight class="w-[1em] ml-[1em] fill-white h-[1em] inline-block" />
                        </UButton>
                    </UForm>
                </template>
            </UModal>
            <!-- Titre --
            <h2 class="text-3xl font-extrabold text-purple-900 mb-6">Gestion des auteurs</h2>
            <!-- Liste des articles --
            <div v-if="loading == true">
                <div v-for="n in 3" :key="n" class="flex flex-col animate-pulse from-indigo-50 to-purple-50 my-[1em] mx-auto md:flex-row items-center justify-between bg-white rounded-xl p-4 mb-4">
                    <div class="h-[15em] bg-gray-200 rounded-lg w-[10em]"></div>
                    <div class="flex-1 px-2 text-center w-[15%] md:text-left">
                        <div class="h-8 bg-gray-200 my-3 rounded-lg w-[75%]"></div>
                        <div class="h-5 bg-gray-200 my-1 rounded-lg w-[55%]"></div>
                        <div class="h-5 bg-gray-200 my-1 rounded-lg w-[45%]"></div>
                    </div>
                    <div class="flex flex-col px-2 w-[15%] lg:flex-row">
                        <div class="h-10 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                    <div class="flex flex-col px-2 w-[15%] lg:flex-row">
                        <div class="h-10 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                    <div class="flex flex-col px-2 w-[20%] lg:flex-row">
                        <div class="h-10 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                </div>
            </div>
            <p v-else-if="data.data.totalElements == 0 && error == false">Le panier est vide. </p>
            <p v-else-if="data.error == true" class="font-bold mb-5">Erreur durant le chargement du panier. Veuillez réessayer plus tard.</p>
            <div v-else>
                <div v-for="(item,index) in data.data.content" :key="index" class="flex flex-col my-[1em] mx-auto md:flex-row items-center justify-between bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
                    <!--Image--
                    <NuxtImg src="/img/example.webp" alt="Image du livre" class="max-h-[15em] object-cover rounded-lg mb-4 md:mb-0" />
                    <!--Info Livre--
                    <div class="flex-1 px-8 text-center md:text-left">
                        <h3 class="text-[1.5em] font-semibold text-purple-800">{{item.firstname}} {{item.lastname}}</h3>
                        <p class="text-sm my-[.5em] text-gray-600">Langue :<span>{{item.langue}}</span></p>
                    </div>
                    <div class="flex flex-col lg:flex-row">
                        <!-- Supprimer --
                        <UModal v-model:open="deleteMessage" title="Message de suppression">
                            <UButton color="red" variant="solid" class="cursor-pointer mt-[.5em] lg:mt-0 hover:opacity-50 transition duration-300 ml-4">
                                Supprimer
                                <IconTrash class="w-[1.5em] ml-[.5em] fill-black h-[1.5em] inline-block" />
                            </UButton>
                            <template #body>
                                <p class="p-[1em]">Voulez-vous vraiment supprimer ?</p>
                                <div class="flex p-[1em] justify-between">
                                    <UButton @click="deleteCartItem(item.id,index)" class="bg-green-500 p-[.8em_2em] rounded-md text-white">Supprimer</UButton>
                                    <UButton @click="deleteMessage = false" class="bg-transparent p-[.8em_2em] rounded-md text-green-500 border-green-500 border-2 cursor-pointer hover:opacity-50">Annuler</UButton>
                                </div>
                            </template>
                        </UModal>
                        <UButton color="green" variant="solid" class="cursor-pointer mt-[.5em] lg:mt-0 hover:opacity-50 transition duration-300 ml-4">
                            Modifier
                            <IconEdit class="w-[1.5em] ml-[.5em] fill-black h-[1.5em] inline-block" />
                        </UButton>
                        <!--Modifier--
                    </div>
                </div>
                <UPagination class="m-auto my-[1em] flex justify-center" :ui="{item:'cursor-pointer',prev:'cursor-pointer',next:'cursor-pointer',first:'cursor-pointer',last:'cursor-pointer'}" v-model:page="offsetPage" show-edges :sibling-count="2" :total="data.data.totalPages * 10" />
            </div>
        </div>
    </section>
</template>
<script setup>
import{ref}from "vue"
import IconEdit from "~/public/svg/IconEdit.vue";
import * as v from "valibot";
import IconsArrowRight from '~/public/svg/IconsArrowRight.vue'
import IconPlus from "~/public/svg/IconPlus.vue";
import IconTrash from "~/public/svg/IconTrash.vue"
const deleteMessage = ref(false),
    addForm = ref(false),
    contentLangue = ref([
        {
            label:"Belgique",
            id:"BE"
        },
        {
            label:"Allemagne",
            id:"DE"
        },
        {
            label:"Australie",
            id:"AU"
        },
        {
            label:"France",
            id:"FR"
        },
        {
            label:"Royaume-Uni",
            id:"GB"
        },
        {
            label:"Italie",
            id:"IT"
        },
        {
            label:"Espagne",
            id:"ES"
        },
        {
            label:"Suède",
            id:"SE"
        }
    ]),
    credentials = ref({
        lastname:'',
        firstname:'',
        langue:''
    }),
    schema = v.object({
        lastname:v.pipe(
            v.string("Le nom de famille doit être un texte"),
            v.nonEmpty("Le nom de famille est obligatoire"),
            v.minLength(3,"Le nom de famille doit contenir 3 caractères minimum"),
            v.maxLength(50,"Le nom de famille doit contenir 50 caractères maximim")
        ),
        firstname:v.pipe(
            v.string("Le prénom doit être en format texte"),
            v.nonEmpty("Le prénom est obligatoire"),
            v.minLength(3,"Le prénom doit contenir 3 caractères minimum"),
            v.maxLength(50,"Le prénom doit contenir 50 caractères maximum")
        ),
        langue:v.pipe(
            v.string("La langue doit être en format texte"),
            v.nonEmpty("La langue est obligatoire"),
            v.minLength(2,"La langue doit contenir 2 caractères"),
            v.maxLength(2,"La langue doit contenir 2 caractères")
        )
    }),
    {user}= useUserSession(),
    data = ref({data:[],error:false}),
    loading = ref(true),
    offsetPage = ref(1),
    error = ref(),
    deleteCartItem = async (id,index)=>{
        let delCartItem = await deleteData(`http://localhost:8080/m2l/author/${id}`);
        if (delCartItem.error == true){
            await refreshAuth();
            delCartItem = await deleteData(`http://localhost:8080/m2l/author/${id}`);
        }
        if (delCartItem.error == false){
            data.value.data.content.splice(index,1);
            deleteMessage.value = false;
        }
        else{
            // Changer pour juste afficher une pop-up car c'est un peu extrême
            data.value.error = true;
        }
    },
    addAuthor = async(id,index)=>{
        let authorData = await postData(`http://localhost:8080/m2l/author`,credentials.value);
        console.log(authorData.error);
        if(authorData.error = true){
            await refreshAuth();
            authorData = await postData(`http://localhost/8080/m2l/author`,credentials.value);
        }
    }
if (user.value != null){
    data.value = await accessData(`http://localhost:8080/m2l/author/all/${offsetPage.value - 1}`);
    if (data.value.error == true){
        await refreshAuth();
        data.value = await accessData(`http://localhost:8080/m2l/author/all/${offsetPage.value - 1}`);
    }
}
loading.value = false;
</script>-->