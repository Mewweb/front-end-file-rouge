<template>
    <form class="block md:flex flex-col md:flex-row gap-4 items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg shadow">
        <!--<UDropdownMenu class="mb-[1em] md:m-0" :items="items" :ui="{ content: 'w-48' }">
            <UButton label="Filtres" color="neutral"  variant="outline" icon="i-lucide-menu" />
        </UDropdownMenu>-->
        <UModal>
            <UButton label="Filtres" color="neutral" variant="outline" icon="i-lucide-menu" />
            <template #content>
                <UForm>
                    <UFormField label="Rechercher un livre">
                        <UInput type="search" />
                    </UFormField>
                    <UFormField>
                        <UDropdownMenu :items="genres" :ui="{content:'w-48'}">
                            <UButton label="Genre" color="neutral" variant="outline" icon="i-lucide-menu" />
                        </UDropdownMenu>
                    </UFormField>
                    <UFormField>
                        <UDropdownMenu :items="editor" :ui="{content:'w-48'}">
                            <UButton label="Éditeur" color="neutral" variant="outline" icon="i-lucide-menu" />
                        </UDropdownMenu>
                    </UFormField>
                    <UFormField label="Date">
                        <UInput type="date" />
                    </UFormField>
                    
                    <UButton type="submit">Filtrer</UButton>
                </UForm>
            </template>
        </UModal>
        <div class="block sm:flex w-full  md:w-auto flex-1 gap-2">
            <label for="searchInput" class="absolute w-1 h-1 overflow-hidden">Chercher un livre</label>
            <UInput v-model="inputSearch" placeholder="Rechercher un livre..." name="searchInput" id="searchInput" icon="i-heroicons-magnifying-glass"  class="block flex-1" />
            <p @click="filterList">test</p>
            <!--<UButton class="px-6 py-2 mt-[1em] sm:m-0 bg-[#cc3399] text-white rounded block hover:bg-[#cc3399] transition cursor-pointer" variant="solid">Rechercher</UButton>
        -->
        </div>
    </form>
</template>
<script setup>
import { UButton } from '#components';
import { ref } from 'vue'
const props = defineProps(["filters","search"]);
const emits = defineEmits(["search"]);
const inputSearch = ref();

function filterList(){
    emits("search", inputSearch.value);
}




//const genres = ref(["Science-fiction","Drame","Western","Thriller","Horreur","Fantastique","Fantasie"]);
const genres = ref([{label:"Science-fiction"},{label:"Drame"},{label:"Western"},{label:"Thriller"},{label:"Horreur"},{label:"Fantastique"},{label:"Fantasie"}])
//const editor = ref(["J'ai lu","Le livre de poche"]);
const editor = ref([{label:"J'ai lu"},{label:"Le livre de poche"}])
let i = 0;

</script>