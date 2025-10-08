<script setup lang="ts">
import FitlerBook from '../form/FitlerBook.vue';
import ElementListBook from './ElementListBook.vue';
const filters = ref({date:false,author:false,title:true,search:"" }),
    basicAuth = inject("basicAuth"),
    data = ref(),
    errorReport = ref(),
    loading = ref(true);
let offsetPage = ref(1);
interface Filters{
    date:boolean;
    author:boolean;
    title:boolean;
    search:string;
}
async function test(offset:number,filters:Filters){
    const errorReport = ref(false);
    try{
        const apiData = ref();
        loading.value = true;
        if(filters.search != ''){
            apiData.value = await $fetch(`http://localhost:8080/m2l/articles/${offset}/9/${encodeURI(filters.search.replaceAll('/','-'))}`, {
                headers:{
                    Authorization:`Basic ${basicAuth}`
                },
                credentials: 'include'
            });
            if(apiData.value) data.value = apiData.value;
            loading.value = false;
        }else{
            apiData.value = await $fetch(`http://localhost:8080/m2l/articles/${offset}/9`,{
                headers:{
                    Authorization:`Basic ${basicAuth}`
                },
                credentials:'include'
            });
            if(apiData.value) data.value = apiData.value;
            loading.value = false;
        }
    }catch (e){
        console.log(e);
        errorReport.value = true;
    }
}
test(offsetPage.value - 1, filters.value);
watch(filters.value, (newFilters)=>{
    test(offsetPage.value-1, newFilters);
})
watch(offsetPage,(newOffset)=>{
    test(newOffset - 1, filters.value);
})
</script>
<template>
    <section class="m-auto max-w-[1200px] w-[90%] py-10">
        <div class="container px-12 py-6 mx-auto space-y-8">
            <FitlerBook @search="(search:string) => filters.search = search" :filters="filters" :search="filters.search" />
            <div v-if="loading == true" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="i in 9" class="bg-gradient-to-r w-full h-full m-auto animate-pulse from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
                    <div class="h-[30em] rounded-lg bg-gray-200"></div>
                    <div class="h-8 bg-gray-200 rounded-lg mt-5"></div>
                    <div class="h-5 bg-gray-200 rounded-lg mt-2"></div>
                    <div class="h-5 bg-gray-200 rounded-lg mt-2"></div>
                    <div class="h-10 bg-gray-200 rounded-lg mt-5"></div>
                    <div class="h-10 bg-gray-200 rounded-lg mt-2"></div>
                </div>
            </div>
            <div v-else-if="errorReport == true">
                <p>Une erreur a été rencontré</p>
            </div>
            <div v-else>
                <ElementListBook @change-offset="(n: number) => offsetPage = n" :allBook="data" :offsetPage="offsetPage" />
                <UPagination class="m-auto my-[1em] flex justify-center" :ui="{ item: 'cursor-pointer', prev: 'cursor-pointer', next: 'cursor-pointer', first: 'cursor-pointer', last: 'cursor-pointer' }" v-model:page="offsetPage" show-edges :sibling-count="2" :total="data.totalPages * 10" />
            </div>
        </div>
    </section>
</template>