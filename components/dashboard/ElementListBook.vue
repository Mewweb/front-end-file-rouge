<template>
     <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div  v-for="(book,index) in contentAllBook" :key="index" class="bg-gradient-to-r h-full m-auto from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
            <NuxtImg src="/img/example.webp" alt="Couverture du livre" class="h-auto w-[15em] m-auto md:w-auto  object-contain object-top rounded" />
            <div class="mt-4 flex-1 flex flex-col justify-between">
                <h3 class="text-lg font-semibold text-gray-800">{{ book.book.title }}</h3>
                <p class="text-sm text-gray-500">{{ formatDate(book.book.date) }}</p>
                <p class="text-sm text-gray-700"><span v-for="author, index in book.book.authors">{{ author.firstname }} {{ author.lastname }}{{ index != book.book.authors.length-1 ? ", " :""}}</span></p>
            </div>
            <div>
                <NuxtLink :to="`/book/${book.book.id}`" class="mt-4 inline-block w-full px-4 py-2 bg-[#cc3399] text-white rounded hover:opacity-50 cursor-pointer transition text-center">En savoir plus</NuxtLink>

                <NuxtLink v-if="loggedIn" :to="'#'" class="mt-[.5em] inline-block w-full px-4 py-2 bg-[#3B2A7F] text-white rounded hover:opacity-50 cursor-pointer transition text-center flex items-center justify-center gap-2" @click="addToCart(book)"><span>Ajouter au panier</span></NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
    import{ref,computed} from 'vue'
    watch(useUserSession("loggedIn"), (newTest) => {
        console.log("CHANGEMENT");
    })
    const {loggedIn} = useUserSession("loggedIn");
    const search = ref(''),
        filters = ref({date:true,author:true,title:true}),
        props = defineProps(['allBook','offsetPage']);
        console.log(props.allBook.content);
        const contentAllBook = ref({}),
        filteredBooks = computed(() => {
            return contentAllBook.filter(book =>{
                const searchTerm = search.value.toLowerCase();
                let match = false;
                if (filters.value.title && book.title.toLowerCase().includes(searchTerm)) match = true
                if (filters.value.date && formatDate(book.date).toLowerCase().includes(searchTerm)) match = true;
                return match || searchTerm === '';
            })
        }),
        // Filtrage
        /*filteredBooks = computed(() =>{
            return books.value.filter(book =>{
                const searchTerm = search.value.toLowerCase()
                let match = false
                if (filters.value.title && book.title.toLowerCase().includes(searchTerm)) match = true
                if (filters.value.author && book.author.toLowerCase().includes(searchTerm)) match = true
                if (filters.value.date && formatDate(book.publishDate).toLowerCase().includes(searchTerm)) match = true
                return match || searchTerm === ''
            })
        }),*/
        formatDate = (isoDate) =>{
            return new Date(isoDate).toLocaleDateString('fr-FR',{
                year:'numeric',
                month:'long',
                day:'numeric'
            })
        };
    contentAllBook.value = props.allBook.content;

</script>