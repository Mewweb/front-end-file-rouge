<script setup >
import FitlerBook from '../form/FitlerBook.vue';
import ElementListBook from './ElementListBook.vue';
const filters = ref({date:false,author:false,title:true,search:"" }),
    apiData = ref(),
    errorReport = ref(),
    loading = ref(true);
let offsetPage = ref(1);

async function test(offset,filters){
    if(filters.search != ''){
        let {data,error} = await useFetch(`http://localhost:8080/m2l/articles/${offset}/9/${encodeURI(filters.search.replaceAll('/','-'))}`, {
            credentials: 'include'
        });
        if(data.value){
            apiData.value = data.value;
            console.log("--search--");
            console.log(apiData.value);
        } 
        else errorReport.value = true;
        console.log(error.value);
        loading.value = false;
    }
    else{
        let {data,error} = await useFetch(`http://localhost:8080/m2l/articles/${offset}/9`,{
            credentials:'include'
        });
        if(data.value){
            apiData.value = data.value;
            console.log("--no search--");
            console.log(apiData.value);
        } 
        else errorReport.value = true;
        console.log(error.value);
        loading.value = false;
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
            <FitlerBook @search="(search) => filters.search = search" :filters="filters" :search="filters.search" />
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
                <ElementListBook @change-offset="(n) => offsetPage = n" :allBook="apiData" :offsetPage="offsetPage" />
                <UPagination class="m-auto my-[1em] flex justify-center" :ui="{ item: 'cursor-pointer', prev: 'cursor-pointer', next: 'cursor-pointer', first: 'cursor-pointer', last: 'cursor-pointer' }" v-model:page="offsetPage" show-edges :sibling-count="2" :total="apiData.totalPages * 10" />
            </div>
        </div>
    </section>
</template>