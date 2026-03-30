<template>
    <section class="m-auto max-w-300 relative w-[90%] py-10">
        <div class="container mx-auto px-12">
            <UModal v-model:open="addForm" :title="props.data == 'editor' ? 'Ajouter un éditeur' :props.data == 'author' ? 'Ajouter un auteur' :props.data == 'articles' ? 'Ajouter un article' :'Ajouter un livre'">
                <UButton class="rounded-full p-[1em] text-[1em] fixed cursor-pointer hover:opacity-50 transition duration-300 right-[1em] bottom-[4.5em] bg-linear-to-r from-pink-500 to-purple-600 text-white h-[3em] w-[3em]">
                    <UIcon name="i-lucide-plus"  class="text-[1.5em] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
                </UButton>
                <template #body>
                    <FormCreateEditor v-if="props.data == 'editor'" :isUpdate="false" @add-editor="(n) =>{
                        addForm = false;
                        data.data.content.push(n)}" />
                    <FormCreateAuthor v-else-if="props.data == 'author'" :isUpdate="false" @add-author="(n) =>{
                        addForm = false;
                        data.data.content.push(n)}" />
                    <FormCreateBook v-else-if="props.data == 'books'" :isUpdate="false" @add-book="(n) =>{
                        addForm = false;
                        data.data.content.push(n)}" />
                    <FormCreateArticle v-else-if="props.data == 'articles'" :isUpdate="false" @add-article="(n) =>{
                        addForm = false;
                        if(data.data.content.length == 9) data.content.pop();
                        data.data.content.unshift(n)}" />
                </template>
            </UModal>
            <h2 v-if="props.data == 'author'" class="text-3xl font-extrabold text-purple-900 mb-6">Gestion des auteurs</h2>
            <h2 v-else-if="props.data == 'editor'" class="text-3xl font-extrabold text-purple-900 mb-6">Gestion deséditeurs</h2>
            <h2 v-else-if="props.data == 'books'" class="text-3xl font-extrabold text-purple-900 mb-6">Gestion des livres</h2>
            <h2 v-else-if="props.data == 'articles'" class="text-3xl font-extrabold text-purple-900 mb-6">Gestion des articles</h2>
            <!--Liste des articles-->
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
            <p v-else-if="data.data.totalElements == 0 && data.error == false">Le panier est vide.</p>
            <p v-else-if="data.error == true" class="font-bold mb-5">Erreur durant le chargement du panier. Veuillez réessayer plus tard.</p>
            <div v-else>
                <div v-for="(item,index) in data.data.content" :key="index" class="flex flex-col my-[1em] mx-auto md:flex-row items-center justify-between bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
                    <template v-if="props.data == 'author'">
                        <NuxtImg src="/img/example.webp" alt="Image du livre" class="max-h-[15em] object-cover rounded-lg mb-4 md:mb-0" />
                        <!--Info Livre-->
                        <div class="flex-1 px-8 text-center md:text-left">
                            <h3 class="text-[1.5em] font-semibold text-purple-800">{{item.firstname}} {{item.lastname}}</h3>
                            <p class="text-sm my-[.5em] text-gray-600">Langue :<span>{{item.langue}}</span></p>
                        </div>
                    </template>
                    <template v-else-if="props.data == 'editor'">
                        <div class="flex-1 px-8 py-5 text-left md-text-left">
                            <h3 class="text-[1.5em] font-semibold text-purple-800">{{item.title}}</h3>
                            <p>{{item.description}}</p>
                        </div>
                        <p>Date de création:{{item.date}}</p>
                    </template>
                    <template v-else-if="props.data == 'books'">
                        <NuxtImg src="img/example.webp" class="h-[10em]" alt="Image du livre" />
                        <div class="flex-1 px-8 text-left md-text-left">
                            <h3 class="text-[1.5em] font-semibold text-purple-800">{{item.title}}</h3>
                            <p>Auteur :<span v-for="(e,index) in item.authors">{{e.lastname}} {{e.firstname}}{{index + 1 != item.authors.length ? ", " :""}}</span></p>
                            <p>{{item.synopsis}}</p>
                            <p class="mt-2">Style: {{item.style}}</p>
                            <p class="my-2">Date: {{item.date}}</p>
                        </div>
                    </template>
                    <template v-else-if="props.data == 'articles'">
                        <NuxtImg src="img/example.webp" class="h-[10em]" alt="Image du livre" />
                        <div class="flex-1 px-8 text-left md-text-left">
                            <h3 class="text-[1.5em] font-semibold text-purple-800">{{item.book.title}}</h3>
                            <p>Format : {{item.title}}</p>
                            <p>Auteur : <span v-for="(e,index) in item.book.authors">{{e.lastname}} {{e.firstname}}{{index + 1 != item.book.authors.length ? ", " : ""}} </span></p>
                            <p>Éditeur : {{item.editor.title}}</p>
                            <p>Dimension : {{item.width + ' X ' + item.height + ' X ' + item.thickness}}</p>
                            <p>Prix : {{item.price}} €</p>
                            <p>Stock : il reste {{item.stock}} article{{item.stock > 1 ? "s" :""}}</p>
                        </div>
                    </template>
                    <div>
                        <!-- Supprimer -->
                        <UModal v-model:open="deleteMessage" title="Message de suppression">
                            <UButton color="red" variant="solid" @click="deleteId = [item.id,index]" class="cursor-pointer block hover:opacity-50 transition duration-300">Supprimer
                                <IconTrash class="w-[1.5em] ml-[.5em] fill-black h-[1.5em] inline-block" />
                            </UButton>
                            <template #content>
                                <p class="p-[1em]">Voulez-vous vraiment supprimer ?</p>
                                <div class="flex p-[1em] justify-between">
                                    <UButton @click="deleteAdminData(item.id,index)" class="bg-green-500 p-[.8em_2em] rounded-md text-white">Supprimer</UButton>
                                    <UButton @click="deleteMessage = false" class="bg-transparent p-[.8em_2em] rounded-md text-green-500 border-green-500 border-2 cursor-pointer hover:opacity-50">Annuler</UButton>
                                </div>
                            </template>
                        </UModal>
                        <NuxtLink :to="`/admin/${props.data}/${item.id}`" class="cursor-pointer block lg:mt-0 hover:opacity-50 transition duration-300 ml-4">
                            Modifier
                            <IconEdit class="w-[1.5em] ml-[.5em] fill-black h-[1.5em] inline-block" />
                        </NuxtLink>
                        <!--Modifier-->
                    </div>
                </div>
                <UPagination class="m-auto my-[1em] flex justify-center" :ui="{item:'cursor-pointer',prev:'cursor-pointer',next:'cursor-pointer',first:'cursor-pointer',last:'cursor-pointer'}" v-model:page="offsetPage" show-edges :sibling-count="2" :total="data.data.totalPages * 10" />
            </div>
        </div>
    </section>
</template>
<script setup>
import IconEdit from '~/svg/IconEdit.vue';
import IconPlus from '~/svg/IconPlus.vue';
import IconTrash from '~/svg/IconTrash.vue';
const backendUrl = useRuntimeConfig().public.urlBackend == "${BACKEND_URL}" ? "http://localhost:8080/m2l" : useRuntimeConfig().public.backendUrl;
const{user}= useUserSession(),
    props = defineProps(['data']),
    loading = ref(true),
    deleteId = ref([]),
    data = ref(),
    deleteMessage = ref(false),
    addForm = ref(false),
    offsetPage = ref(1),
    getData=async(offset)=>{
        loading.value = true;
        if (user.value != null){
            data.value = await accessData(`${backendUrl}/${props.data}/all/${offset - 1}`);
            if (data.value.error){
                await refreshAuth();
                data.value = await accessData(`${backendUrl}/${props.data}/all/${offset - 1}`);
            }
        }
        loading.value = false;
    },
    deleteAdminData=async()=>{
        let delData = await deleteData(`${backendUrl}/${props.data}/${deleteId.value[0]}`);
        if(delData.error == true){
            await refreshAuth();
            delData = await deleteData(`${backendUrl}/${props.data}/${deleteId.value[0]}`);
        }
        if(delData.error == false){
            data.value.data.content.splice(deleteId.value[1],1);
            deleteMessage.value = false;
        }else data.value.error = true;
    }
getData(offsetPage.value);
watch(offsetPage,(newOffset)=>getData(newOffset));
</script>