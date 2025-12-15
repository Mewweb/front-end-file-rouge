<script setup>
import BookDetails from '~/components/element/BookDetails.vue';
import BookCaracteristic from '~/components/table/BookCaracteristic.vue';


useSeoMeta({
    title: "Détails du livre - 2I Library",
    ogTitle: "Détails du livre - 2I Library",
    description: "Découvrez les détails complets du livre sur 2I Library. Lisez la description, consultez les caractéristiques et ajoutez-le à votre panier pour une expérience de lecture enrichissante.",
    ogDescription: "Découvrez les détails complets du livre sur 2I Library. Lisez la description, consultez les caractéristiques et ajoutez-le à votre panier pour une expérience de lecture enrichissante.",
    ogImage: "/img/seo/logo-seo.webp",
    twitterCard: "summary_large_image"
})
const data = ref();
const loading = ref(true);
/*onMounted(async () => {
    try {
        const {data: apiData, error} = await useFetch(`http://localhost:8080/m2l/articles/${useRoute().params.id}`, {
            credentials: 'include'
        });
        console.log(apiData.value);
        console.log(error.value);
        if (apiData.value) {
            data.value = apiData.value;
        }
        loading.value = false;
    } catch (e) {
        console.log(e);
        errorReport.value = true;
    }
})
*/

const { data: apiData, error } = await useFetch(`${useRuntimeConfig().public.urlBackend}/articles/2`, {
    method: 'GET',
    credentials: 'include'
});
data.value = apiData.value ?? null;
loading.value = false;


</script>
<template>
    <div class="px-12 py-6">
        <div v-if="error != undefined">
            <p>Erreur de chargement du livre.</p>
        </div>
        <div v-else-if="loading == true">
            <p>Chargement du livre...</p>
        </div>
        <div v-else>
            <BookDetails :image="data.book.image" :title="data.book.title" :authors="data.book.authors" :date="data.book.date"
                :description="data.book.synopsis" />
            <BookCaracteristic :editor="data.editor.title" :authors="data.book.authors" :number_isbn="data.number_isbn"
                :style="data.book.style" :date="data.book.date" :article="data.title" :format="data.format"  />

        </div>

    </div>
</template>