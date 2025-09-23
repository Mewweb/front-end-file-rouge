<script setup lang="ts">
    import FitlerBook from '../form/FitlerBook.vue';
    import ElementListBook from './ElementListBook.vue';

    
   // try{
        const basicAuth = btoa("user:c1b779aa-bf35-4edc-8907-d4c10eb5450a");

        const data = ref([]);
        try{
            data.value = await $fetch('http://localhost:8080/m2l/books/0/4', {
                headers:{
                    Authorization: `Basic ${basicAuth}`
                },
                credentials:'include'
            })
        }catch(e){
            console.log(e);
        }


   /* }catch(e){
        console.log(e);
    }*/

</script>
<template>
    <section class="m-auto max-w-[1200px] w-[90%] py-10">
        <div class="container px-12 py-6 mx-auto space-y-8">
            <FitlerBook />
            <ElementListBook :allBook="data" />
        </div>
    </section>
</template>