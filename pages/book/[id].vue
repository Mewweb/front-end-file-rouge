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
    const errorReport = ref();
    const apiData = ref();
    const loading = ref(true);
      const {data,error} = await useFetch(`http://localhost:8080/m2l/articles/${useRoute().params.id}`, {
            credentials: 'include'
        });
        if(data.value){
            apiData.value = data.value;
            console.log(apiData.value);
        } 
        else errorReport.value = true;
        console.log(error.value);
        loading.value = false;
    
</script>
<template>
    <div class="px-12 py-6">
        <BookDetails 
        :image="apiData.book.image" 
        :title="apiData.book.title" 
        :authors="apiData.book.authors"
        :date="apiData.book.date"
        :description="apiData.book.synopsis" />
        <BookCaracteristic
        :editor="apiData.editor.title"
        :authors="apiData.book.authors"
        :number_isbn="apiData.book.number_isbn"
        :style="apiData.book.style"
        :date="apiData.book.date"
        :article="apiData.title"
        :format="apiData.format"
        />
    </div>
</template>