<template>
    <!-- Formulaire de recherche -->
    <form
        class="block md:flex flex-col md:flex-row gap-4 items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg shadow">
        <!-- Dropdown avec checkboxes -->
        <UDropdownMenu class="mb-[1em] md:m-0" :items="items" :ui="{ content: 'w-48' }">
            <UButton label="Filtres" color="neutral" variant="outline" icon="i-lucide-menu" />
        </UDropdownMenu>
        <!-- Barre de recherche -->
        <div class="block sm:flex w-full  md:w-auto flex-1 gap-2">
            <label for="searchInput" class="absolute w-1 h-1 overflow-hidden">Chercher un livre</label>
            <UInput v-model="search" placeholder="Rechercher un livre..." name="searchInput" id="searchInput" icon="i-heroicons-magnifying-glass" class="block flex-1" />
            <UButton class="px-6 py-2 mt-[1em] sm:m-0 bg-[#cc3399] text-white rounded block hover:bg-[#cc3399] transition cursor-pointer" variant="solid" @click="applySearch">Rechercher</UButton>
        </div>
    </form>
</template>
<script setup>
import { ref } from 'vue'
const showBookmarks = ref(true)
const showHistory = ref(false)
const showDownloads = ref(false)
const items = computed(() => [{
    label: 'Auteur',
    icon: 'i-lucide-bookmark',
    type: 'checkbox',
    checked: showBookmarks.value,
    onUpdateChecked(checked) {
        filters.value.author = checked
    },
    onSelect(e) {
        e.preventDefault()
    }
}, {
    label: 'Date',
    icon: 'i-lucide-clock',
    type: 'checkbox',
    checked: showHistory.value,
    onUpdateChecked(checked) {
        filters.value.date = checked
    }
}, {
    label: 'Titres',
    icon: 'i-lucide-download',
    type: 'checkbox',
    checked: showDownloads.value,
    onUpdateChecked(checked) {
        filters.value.title = checked
    }
}])

const showFilter = ref(false),
    search = ref(''),
    filters = ref({ date: true, author: true, title: true })
function applySearch() {
    // Logique pour appliquer la recherche
    console.log('Recherche appliquée:', search.value, filters.value)
}
</script>