<template>
    <form class="block md:flex flex-col md:flex-row gap-4 items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg shadow">
        <UDropdownMenu class="mb-[1em] md:m-0" :items="items" :ui="{ content: 'w-48' }">
            <UButton label="Filtres" color="neutral"  variant="outline" icon="i-lucide-menu" />
        </UDropdownMenu>
        <div class="block sm:flex w-full  md:w-auto flex-1 gap-2">
            <label for="searchInput" class="absolute w-1 h-1 overflow-hidden">Chercher un livre</label>
            <UInput v-model="filters.search" placeholder="Rechercher un livre..." name="searchInput" id="searchInput" icon="i-heroicons-magnifying-glass"  class="block flex-1" />
            <UButton class="px-6 py-2 mt-[1em] sm:m-0 bg-[#cc3399] text-white rounded block hover:bg-[#cc3399] transition cursor-pointer" variant="solid"  @click="applySearch">Rechercher</UButton>
        </div>
    </form>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps(["filters"]);
const emits = defineEmits(["filters"]);

const showFilter = ref(false),
    search = ref('');
const items = computed(() => [{
    label: 'Auteur',
    icon: 'i-lucide-bookmark',
    type: 'checkbox',
    checked: props.filters.author,
    onUpdateChecked(checked) {
        props.filters.author = checked;
        props.filters.title = false;
        props.filters.date = false;        
    },
    onSelect(e) {
        e.preventDefault()
    }
}, {
    label: 'Date',
    icon: 'i-lucide-clock',
    type: 'checkbox',
    checked: props.filters.date,
    onUpdateChecked(checked) {
        props.filters.date = checked
        props.filters.author = false;
        props.filters.title = false;
    },
    onSelect(e){
        e.preventDefault();
    }
}, {
    label: 'Titres',
    icon: 'i-lucide-download',
    type: 'checkbox',
    checked: props.filters.title,
    onUpdateChecked(checked) {
        props.filters.title = checked;
        props.filters.author = false;
        props.filters.date = false;
    },
    onSelect(e){
        e.preventDefault();
    }
}])

function applySearch(e) {
    e.preventDefault();
    emits("filters");
    console.log('Recherche appliquée:', props.filters)
}
</script>