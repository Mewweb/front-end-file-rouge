<template>
    <UForm :state="filters" class="block bg-linear-to-r from-indigo-50 to-purple-50 p-4 rounded-lg shadow">
        <UFormField class="mt-[1em]">
            <div class="flex justify-between w-full">
                <UInput v-model="filters.search" placeholder="Rechercher un livre..." name="searchInput" id="searchInput" icon="i-heroicons-magnifying-glass" class="block mr-[1em] flex-1" />
                <UButton @click="filterList" class="px-6 py-2 mt-[1em] sm:m-0 bg-[#cc3399] text-white rounded block hover:bg-[#cc3399] transition cursor-pointer" variant="solid">Rechercher</UButton>
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
    //const props = defineProps(["filters", "search"]),
    emits = defineEmits(["search"]),
    filterList=()=>{
        emits("filter",filters.value);
    }
let i = 0;
</script>