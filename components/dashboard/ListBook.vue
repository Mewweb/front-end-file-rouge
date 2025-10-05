<script setup lang="ts">
import FitlerBook from '../form/FitlerBook.vue';
import ElementListBook from './ElementListBook.vue';

const filters = ref({ date: false, author: false, title: true, search: "" });
const basicAuth = inject("basicAuth");
let offsetPage = ref(1);

const data = ref();
const errorReport = ref();
const loading = ref(true);
interface Filters {
    date: boolean;
    author: boolean;
    title: boolean;
    search: string;
}
async function test(offset: number, filters: Filters) {
    const errorReport = ref(false);
    try {
        const apiData = ref();
        loading.value = true;
        if (filters.search != '') {
            console.log(encodeURI(filters.search));
            apiData.value = await $fetch(`http://localhost:8080/m2l/books/${offset}/9/${filters.search.replaceAll(' ', '_')}`, {
                headers: {
                    Authorization: `Basic ${basicAuth}`
                },
                credentials: 'include'
            });
            if(apiData.value){
                data.value = apiData.value;
            }
            loading.value = false;
        } else {
            apiData.value = await $fetch(`http://localhost:8080/m2l/books/${offset}/9`, {
                headers: {
                    Authorization: `Basic ${basicAuth}`
                },
                credentials: 'include'
            });
            if (apiData.value) {
                data.value = apiData.value;
            }
            loading.value = false;
        }
    } catch (e) {
        console.log(e);
        errorReport.value = true;
    }

}
test(offsetPage.value - 1, filters.value);
watch(filters.value, (newFilters)=>{
    console.log('fjf');
    test(offsetPage.value-1, newFilters);
})

watch(offsetPage, (newOffset) => {
    test(newOffset - 1, filters.value);
})


</script>
<template>
    <section class="m-auto max-w-[1200px] w-[90%] py-10">
        <div class="container px-12 py-6 mx-auto space-y-8">
            <FitlerBook @search="(search : string) => filters.search = search" :filters="filters" :search="filters.search" />
            <div v-if="loading == true">
                <p>Chargement de livre</p>
            </div>
            <div v-else-if="errorReport == true">
                <p>Une erreur a été rencontré</p>
            </div>
            <div v-else>
                <ElementListBook @change-offset="(n: number) => offsetPage = n" :allBook="data"
                    :offsetPage="offsetPage" />
                <UPagination class="m-auto my-[1em] flex justify-center"
                    :ui="{ item: 'cursor-pointer', prev: 'cursor-pointer', next: 'cursor-pointer', first: 'cursor-pointer', last: 'cursor-pointer' }"
                    v-model:page="offsetPage" show-edges :sibling-count="2" :total="data.totalPages * 10" />
            </div>
        </div>
    </section>
</template>