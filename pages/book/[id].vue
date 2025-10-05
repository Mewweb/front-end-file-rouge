<script setup lang="ts">
    import BookDetails from '~/components/element/BookDetails.vue';
    import BookCaracteristic from '~/components/table/BookCaracteristic.vue';
    useSeoMeta({
        title:"Détails du livre - 2I Library",
        ogTitle:"Détails du livre - 2I Library",
        description:"Découvrez les détails complets du livre sur 2I Library. Lisez la description, consultez les caractéristiques et ajoutez-le à votre panier pour une expérience de lecture enrichissante.",
        ogDescription:"Découvrez les détails complets du livre sur 2I Library. Lisez la description, consultez les caractéristiques et ajoutez-le à votre panier pour une expérience de lecture enrichissante.",
        ogImage:"/img/seo/logo-seo.webp",
        twitterCard:"summary_large_image"
    })
    const basicAuth = inject("basicAuth");
    console.log(useRoute().params.id);
    const data = ref();
    const errorReport = ref();
    const loading = ref(true);
    try{
        const apiData = ref(await $fetch(`http://localhost:8080/m2l/books/${useRoute().params.id}`,{
            headers:{
                Authorization:`Basic ${basicAuth}`
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
    console.log(data.value);
</script>
<template>
    <div class="px-12 py-6">
        
        <BookDetails 
        :image="data.image" 
        :title="data.title" 
        :authors="data.authors"
        :date="data.date"
        :description="data.synopsis" />
        <BookCaracteristic
        :editor="data.editor"
        :authors="data.authors"
        :number_isbn="data.number_isbn"
        :style="data.style"
        :date="data.date"
        :article="data.article"
        />
    </div>
</template>