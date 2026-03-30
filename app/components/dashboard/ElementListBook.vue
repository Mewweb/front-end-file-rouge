<template>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(book,index) in contentAllBook" ref="elementsBook" :key="index" class="bg-linear-to-r h-full  m-auto from-indigo-50 to-purple-50 rounded-lg shadow hover:shadow-lg p-4 flex flex-col">
            <NuxtImg src="/img/example.webp"  alt="Couverture du livre" class="h-auto w-[15em] m-auto md:w-auto  object-contain object-top rounded" />
            <div class="mt-4 flex-1 flex flex-col justify-between">
                <h3 class="text-lg font-semibold text-gray-800">{{book.book.title}}</h3>
                <p class="text-sm text-gray-500">{{formatDate(book.book.date)}}</p>
                <p class="text-sm text-gray-700"><span v-for="author,index in book.book.authors">{{author.firstname}} {{author.lastname}} {{index != book.book.authors.length - 1 ? ", " :""}}</span></p>
            </div>
            <div>
                <NuxtLink :to="`/book/${book.book.id}`" class="mt-4 inline-block w-full px-4 py-2 bg-[#cc3399] text-white rounded hover:opacity-50 cursor-pointer transition text-center">En savoir plus</NuxtLink>
                <NuxtLink v-if="loggedIn" :to="'#'" class="mt-[.5em] inline-block w-full px-4 py-2 bg-[#3B2A7F] text-white rounded hover:opacity-50 cursor-pointer transition text-center items-center justify-center gap-2" @click="addToCart(book)"><span>Ajouter au panier</span></NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
    import gsap from 'gsap'
//import { ScrollTrigger } from 'gsap/all';
import{ref,computed} from 'vue'
/*gsap.registerPlugin(ScrollTrigger)
const testTemplate = useTemplateRef('elementsBook');
onMounted(() => {
    let i = 0;
    setInterval(function(){
        if(i >= testTemplate.value.length){
            clearInterval();
        }else{
            console.log(testTemplate.value[i]);
            gsap.to(testTemplate.value[i], {
                scrollTrigger: testTemplate.value[i],
                duration:1,
                opacity:1,
                y:0,
                x:0,
                stagger:{
                    each:.5
                },
                ease:"ease"
            });
            i++;
        }
    },250);
})
console.log(testTemplate);*/
const{loggedIn} = useUserSession("loggedIn"),
    search = ref(''),
    filters = ref({date:true,author:true,title:true}),
    props = defineProps(['allBook','offsetPage']),
    contentAllBook = ref({}),
    filteredBooks = computed(()=>{
        return contentAllBook.filter(book=>{
            const searchTerm = search.value.toLowerCase();
            let match = false;
            if(filters.value.title && book.title.toLowerCase().includes(searchTerm)) match = true
            if(filters.value.date && formatDate(book.date).toLowerCase().includes(searchTerm)) match = true;
            return match || searchTerm === '';
        })
    }),
    formatDate=(isoDate)=>{
        return new Date(isoDate).toLocaleDateString('fr-FR',{
            year:'numeric',
            month:'long',
            day:'numeric'
        })
    };
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
contentAllBook.value = props.allBook.content;
</script>