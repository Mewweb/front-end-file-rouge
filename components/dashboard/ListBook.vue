<script setup lang="ts">
    import FitlerBook from '../form/FitlerBook.vue';
    import ElementListBook from './ElementListBook.vue';

    const filters = ref({date:false,author:false,title:true, search:""});
    const basicAuth = inject("basicAuth");    
    let offsetPage = ref(1);
    
    const data = ref();
    const errorReport = ref();
    const loading = ref(true);
    async function test(offset:number){
        try{
            const apiData = ref(await $fetch(`http://localhost:8080/m2l/books/${offset}/9`, {
                headers:{
                    Authorization: `Basic ${basicAuth}`
                },
                credentials:'include'
            }));
            if(apiData.value){
                data.value = apiData.value;
            }
            loading.value = false;
        }catch(e){
            console.log(e);
            errorReport.value = true;
        }
    }
    test(offsetPage.value-1);
    watch(offsetPage, (newOffset) => {
        test(newOffset-1);
    })

</script>
<template>
    <section class="m-auto max-w-[1200px] w-[90%] py-10">
        <div class="container px-12 py-6 mx-auto space-y-8">
            <FitlerBook :filters="filters" />
            <div v-if="loading == true">
                <p>Chargement de livre</p>
            </div>
            <div v-else-if="errorReport == true">
                <p>Une erreur a été rencontré</p>
            </div>
            <div v-else>
                <ElementListBook @change-offset="(n: number) => offsetPage = n" :allBook="data" :offsetPage="offsetPage" />
                <UPagination class="m-auto my-[1em] flex justify-center" :ui="{item:'cursor-pointer', prev:'cursor-pointer',next:'cursor-pointer',first:'cursor-pointer',last:'cursor-pointer'}" v-model:page="offsetPage" show-edges :sibling-count="2" :total="data.totalPages*10" />
            </div>
        </div>
    </section>
</template>