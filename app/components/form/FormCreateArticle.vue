<template>
    <div class="flex items-center flex-col p-[1em] gap-0 bg-white rounded-xl shadow-lg">
        <p v-if="errorMessage"  style="font-weight:bold; color:red;text-align:center; padding:1em 0;">{{errorMessage}}</p>
        <p v-else-if="successMessage">{{successMessage}}</p>
        <p v-if="error" class="text-red">Une erreur a été rencontré. Veuillez réessayer plus tard.</p>
        <div v-else-if="loading" class="flex justify-between flex-wrap w-full">
            <div v-for="i in 8" class="bg-linear-to-r w-[48%] h-14 my-[.5em] animate-pulse from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg transition p-4">
            </div>
            <div class="bg-linear-to-r w-full h-14 mt-[.5em] m-auto animate-pulse from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg transition p-4">
            </div>
        </div>
        <UForm v-else class="flex justify-between space-y-2 flex-wrap" :schema="schema" :state="data">
            <UFormField label="Le titre de l'article" name="title" required class="w-full sm:w-[48%]" :ui="{label:'mb-[.5em]'}">
                <UInput type="text" name="title" id="title" v-model="data.title" class="w-full" placeholder="Le titre de l'article" size="lg" />
            </UFormField>
            <UFormField label="La longueur de l'article" name="width" required class="w-full sm:w-[48%]" :ui="{label:'mb-[.5em]'}">
                <UInput type="number" name="width" id="width" v-model="data.width" class="w-full" placeholder="La longueur de l'article" size="lg" />
            </UFormField>
            <UFormField label="La largeur de l'article" name="height" required class="w-full sm:w-[48%]" :ui="{label:'mb-[.5em]'}">
                <UInput type="number" name="height" id="heigth" v-model="data.height" class="w-full" placeholder="La largeur de l'article" size="lg" />
            </UFormField>
            <UFormField label="L'épaisseur de l'article" name="thickness" required class="w-full sm:w-[48%]" :ui="{label:'mb-[.5em]'}">
                <UInput type="number" name="thickness" id="thickness" v-model="data.thickness" class="w-full" placeholder="L'épaisseur de l'article" size="lg" />
            </UFormField>
            <UFormField label="Le prix de l'article" name="price" required class="w-full sm:w-[48%]" :ui="{label:'mb-[.5em]'}">
                <UInput type="number" name="price" id="price" v-model="data.price" class="w-full" placeholder="Le prix de l'article" size="lg" />
            </UFormField>
            <UFormField label="Le stock de l'article" name="stock" required class="w-full sm:w-[48%]" :ui="{label:'mb-[.5em]'}">
                <UInput type="number" name="stock" id="stock" v-model="data.stock" class="w-full" placeholder="Le stock de l'article" size="lg" />
            </UFormField>
            <UFormField label="L'éditeur de l'article" name="editor" required class="w-full sm:w-[48%]" :ui="{label:'mb-[.5em]'}">
                <USelectMenu value-key="id" name="editor" id="editor" :items="editorItems" v-model="data.editor" class="w-full" placeholder="L'éditeur de l'article" />
            </UFormField>
            <UFormField label="Le livre de l'article" name="book" required class="w-full sm:w-[48%]" :ui="{label:'mb-[.5em]'}">
                <USelectMenu value-key="id" name="book" id="book" :items="bookItems" v-model="data.book" class="w-full" placeholder="Le livre de l'article" size="lg" />
            </UFormField>
            <UFormField label="L'ISBN de l'article" name="number_isbn" required class="w-full" :ui="{label:'mb-[.5em]'}">
                <UInput type="text" name="number_isbn" id="number_isbn" v-model="data.number_isbn" class="w-full" placeholder="L'ISBN de l'article" size="lg" />
            </UFormField>
            <UButton type="submit" @click.prevent="submit()" class="w-auto py-3 mt-[1em] hover:opacity-50 transition duration-300 m-[2em_auto_0] bg-purple-800 text-white cursor-pointer font-semibold rounded-lg shadow-md" color="primary" variant="solid">{{props.isUpdate == false ? 'Ajouter' :'Modifier'}}</UButton>
        </UForm>
    </div>
</template>
<script setup>
import * as v from 'valibot';
const config = useRuntimeConfig().public.urlBackend,
    backendUrl = config == "" ? "http://localhost:8080/m2l" :config,
    data = ref({
        title:"",
        width:null,
        height:null,
        thickness:null,
        number_isbn:"",
        price:null,
        stock:null,
        editor:null,
        book:null
    }),
    loading = ref(true),
    props = defineProps(['isUpdate']),
    error = ref(false),
    emit = defineEmits(['addArticle']),
    schema = v.object({
        title:v.pipe(
            v.string("Le titre doit être en format textuel"),
            v.nonEmpty("Le titre est obligatoire"),
            v.minLength(1,"Le titre doit contenir 1 caractère minimum"),
            v.maxLength(50,"Le titre doit contenir 50 caractères maximum")
        ),
        width:v.pipe(
            v.number("La longueur du livre doit être en format numérique"),
            v.nonEmpty("La longueur du livre est obligatoire"),
            v.minSize(1,"La longueur du livre doit être supérieur ou égale à 1"),
            v.maxSize(1000,"La longueur du livre doit être inférieur ou égale à 1000")
        ),
        height:v.pipe(
            v.number("La largeur du livre doit être en format numérique"),
            v.nonEmpty("La largeur du livre est obligatoire"),
            v.minSize(1,"La largeur du livre doit être supérieur ou égale à 1"),
            v.maxSize(1000,"La largeur du livre doit être inférieur ou égale à 1000")
        ),
        thickness:v.pipe(
            v.number("L'épaisseur du livre doit être en format numérique"),
            v.nonEmpty("L'épaisseur du livre est obligatoire"),
            v.minSize(1,"L'épaisseur du livre doit être supérieur ou égale à 1"),
            v.maxSize(1000,"L'épaisseur du livre doit être inférieur ou égale à 1000")
        ),
        number_isbn:v.pipe(
            v.string("L'ISBN doit être en format textuel"),
            v.nonEmpty("L'ISBN est obligatoire"),
            v.minLength(10,"L'ISBN doit contenir 10 caractères minimum"),
            v.maxLength(14,"L'ISBN doit contenir 14 caractères maximum")
        ),
        price:v.pipe(
            v.number("Le prix doit être en format numérique"),
            v.nonEmpty("Le prix est obligatoire"),
            v.minSize(1,"Le prix doit être supérieur ou égale à 1"),
            v.maxSize(1000,"Le prix doit être inférieur ou égale à 1000")
        ),
        stock:v.pipe(
            v.number("Le stock doit être en format numérique"),
            v.nonEmpty("Le stock est obligatoire"),
            v.minSize(0,"Le stock doit être supérieur ou égale à 1"),
            v.maxSize(1000,"Le stock doit être inférieur ou égale à 1000")
        ),
        editor:v.pipe(
            v.number("L'éditeur doit être en format numérique"),
            v.nonEmpty("L'éditeur est obligatoire"),
            v.minSize(0,"Veuillez choisir un éditeur valide")
        ),
        book:v.pipe(
            v.number("Le livre doit être en format numérique"),
            v.nonEmpty("Le livre est obligatoire"),
            v.minSize(0,"Veuillez choisir un livre valide")
        )
    }),
    {user}= useUserSession(),
    errorMessage = ref(),
    successMessage = ref(),
    bookItems = ref(),
    editorItems = ref(),
    submit=async()=>{
        errorMessage.value = false;
        successMessage.value = false;
        if(!props.isUpdate){
            try{
                if(!v.safeParse(schema,data.value)) errorMessage.value = "Le formulaire n'a pas bien été rempli.";
                else{
                    let articleData = await postData(`${backendUrl}/articles`,data.value);
                    if(articleData.error){
                        await refreshAuth();
                        articleData = await postData(`${backendUrl}/articles`,data.value);
                    }
                    if(articleData.error) errorMessage.value = "Une erreur a été rencontré. Veuillez réessayer plus tard.";
                    else{
                        successMessage.value = true;
                        emit("addArticle",articleData.data);
                    }
                }
            }catch(e){
                errorMessage.value = "Une erreur a été rencontré. Veuillez réessayer plus tard.";
            }
        }else{
            try{
                if(!v.safeParse(schema,data.value)) errorMessage.value = "Le formulaire n'a pas bien été rempli."
                else{
                    let articleData = await putData(`${backendUrl}/articles/${data.value.id}`,data.value);
                    if (articleData == false){
                        await refreshAuth();
                        articleData = await putData(`${backendUrl}/articles/${data.value.id}`,data.value);
                    }
                    navigateTo('/admin/articles/all');
                }
            }catch(e){
                errorMessage.value = "Une erreur a été rencontré. Veuillez réessayer plus tard.";
            }
        }
    }
onMounted(async () =>{
    const id = useRoute().params.id;
    if(user.value != null){
        let getBook = await accessData(`${backendUrl}/books/all`);
        if(getBook.error){
            await refreshAuth();
            getBook.value = await accessData(`${backendUrl}/books/all`);
        }
        if(!getBook.error){
            bookItems.value = getBook.data.content.map(book => ({
                label:book[1],
                id:book[0]
            }))
        }else error.value = true;
        let getEditor = await accessData(`${backendUrl}/editor/admin/all`);
        if(getEditor.error){
            await refreshAuth();
            getEditor.value = await accessData(`${backendUrl}/editor/admin/all`);
        }
        if(!getEditor.error){
            editorItems.value = getEditor.data.content.map(editor => ({
                label:editor[1],
                id:editor[0]
            }))
        }else{
            error.value = true;
            return;
        }
        if(props.isUpdate == true){
            let getData = await accessData(`${backendUrl}/articles/admin/${id}`);
            if (getData.error){
                await refreshAuth();
                getData.value = accessData(`${backendUrl}/articles/admin/${id}`);
            }
            data.value = getData.data;
        }
        loading.value = false;
    }
})
</script>