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
    const data = ref();
    const errorReport = ref();
    const loading = ref(true);
    try{
        const apiData = ref(await $fetch(`http://localhost:8080/m2l/articles/${useRoute().params.id}`,{
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
</script>
<template>
    <div class="px-12 py-6">
        <BookDetails 
        :image="data.book.image" 
        :title="data.book.title" 
        :authors="data.book.authors"
        :date="data.book.date"
        :description="data.book.synopsis" />
        <BookCaracteristic
        :editor="data.editor.title"
        :authors="data.book.authors"
        :number_isbn="data.book.number_isbn"
        :style="data.book.style"
        :date="data.book.date"
        :article="data.title"
        :format="data.format"
        />
    </div>
</template>