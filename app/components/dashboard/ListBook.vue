<script setup>
import FitlerBook from '../form/FitlerBook.vue';
import ElementListBook from './ElementListBook.vue';
const config = useRuntimeConfig().public.urlBackend,
    backendUrl = config == "" ? "http://localhost:8080/m2l":config,
    filters = ref({format:null,editor:null,genres:null,search:""}),
    loading = ref(true),
    data = ref(),
    callData=async(offset,page)=>{
        filters.value = page;
        if(page.search != ''){
            data.value = await accessDataNoJwt(`${backendUrl}/articles/${offset}/9/${encodeURI(page.search.replaceAll('/', '-'))}`);
            loading.value = false;
        }
        else{
            data.value = await accessDataNoJwt(`${backendUrl}/articles/${offset}/9`);
            loading.value = false;
        }
    }
let offsetPage = ref(1);
callData(offsetPage.value - 1, filters.value);
watch(filters.value, (newFilters)=>{
    callData(offsetPage.value - 1,newFilters)
})
watch(offsetPage,(newOffset)=>{callData(newOffset - 1,filters.value)})
</script>
<template>
    <section class="m-auto max-w-300 w-[90%] py-10">
        <div class="container px-12 py-6 mx-auto space-y-8">
            <FitlerBook @filter="(filter) => callData(offsetPage -1, filter)" />
            <div v-if="loading == true" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="i in 9" class="bg-linear-to-r w-full h-full m-auto animate-pulse from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
                    <div class="h-[30em] rounded-lg bg-gray-200"></div>
                    <div class="h-8 bg-gray-200 rounded-lg mt-5"></div>
                    <div class="h-5 bg-gray-200 rounded-lg mt-2"></div>
                    <div class="h-5 bg-gray-200 rounded-lg mt-2"></div>
                    <div class="h-10 bg-gray-200 rounded-lg mt-5"></div>
                    <div class="h-10 bg-gray-200 rounded-lg mt-2"></div>
                </div>
            </div>
            <div v-else-if="data.error">
                <p class="text-center font-bold">Une erreur a été rencontré</p>
            </div>
            <div v-else>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ElementListBook v-for="(book, index) in data.data.content" :book="book" :offsetPage="offsetPage" />
                </div>
                <UPagination v-model:page="offsetPage" show-edges :sibling-count="2" :total="data.data.page.totalPages * 10" class="m-auto my-[1em] flex justify-center" :ui="{ item: 'cursor-pointer', prev: 'cursor-pointer', next: 'cursor-pointer', first: 'cursor-pointer', last: 'cursor-pointer' }" />
            </div>
        </div>
    </section>
</template>