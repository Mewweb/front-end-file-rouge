<template>
    <UForm :state="filters" class="block bg-linear-to-r from-indigo-50 to-purple-50 p-4 rounded-lg shadow">
        <UFormField>
            <div class="sm:flex sm:justify-between w-full">
                <UInput v-model="filters.search" placeholder="Rechercher un livre..." name="searchInput" id="searchInput" icon="i-heroicons-magnifying-glass" class="block sm:mr-[1em] flex-1" />
                <UButton @click="filterList" class="px-6 py-2 ml-auto mt-[1em] sm:mt-0 sm:m-0 bg-fuchsia-800 text-white rounded block hover:bg-fuchsia-800 transition cursor-pointer" variant="solid">Rechercher</UButton>
            </div>
        </UFormField>
    </UForm>
</template>
<script setup>
import {UButton} from '#components';
import {ref} from 'vue'
const filters = ref({
    search:''
}),
    emits = defineEmits(["search"]),
    filterList=()=>{
        emits("filter",filters.value);
    }
</script>