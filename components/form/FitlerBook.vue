<template>
    <!-- Formulaire de recherche -->
    <form class="flex flex-col md:flex-row gap-4 items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg shadow">
        <!-- Dropdown avec checkboxes -->
        <UDropdown>
            <UButton @click="showFilter = !showFilter" color="gray" class="cursor-pointer " variant="soft" icon="i-heroicons-adjustments-horizontal">Filtres</UButton>
            <Transition>
                <template v-if="showFilter">
                    <div class="p-4 space-y-2 absolute bg-white shadow-lg rounded border border-gray-200">
                        <label for="dateInput" class="flex items-center gap-2">
                            <input id="dateInput" name="dateInput" type="checkbox" v-model="filters.date" class="rounded border-gray-300" /> Date
                        </label>
                        <label for="authorInput" class="flex items-center gap-2">
                            <input id="authorInput" name="authorInput" type="checkbox" v-model="filters.author" class="rounded border-gray-300" /> Auteur
                        </label>
                        <label for="titleInput" class="flex items-center gap-2">
                            <input name="titleInput" id="titleInput" type="checkbox" v-model="filters.title" class="rounded border-gray-300" /> Titre
                        </label>
                    </div>
                </template>
            </Transition>
        </UDropdown>
        <!-- Barre de recherche -->
        <div class="flex w-full md:w-auto flex-1 gap-2">
            <label for="searchInput" class="absolute w-1 h-1 overflow-hidden">Chercher un livre</label>
            <UInput v-model="search" placeholder="Rechercher un livre..." name="searchInput" id="searchInput" icon="i-heroicons-magnifying-glass" class="flex-1" />
            <UButton class="px-6 py-2 bg-[#cc3399] text-white rounded hover:bg-[#cc3399] transition cursor-pointer" variant="solid" @click="applySearch">Rechercher</UButton>
        </div>
    </form>
</template>
<script setup>
import { ref } from 'vue'
const showFilter = ref(false),
    search = ref(''),
    filters = ref({
        date: true,
        author: true,
        title: true
    })
</script>