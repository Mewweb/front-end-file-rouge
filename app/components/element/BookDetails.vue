<template>
    <section class=" m-auto max-w-300 py-12">
        <div class="container shadow-md bg-white mx-auto py-12 rounded-lg px-6 lg:px-12 flex md:flex-row flex-col justify-between gap-10 items-center">
            <div class="flex justify-center w-full md:w-[48%] order-1">
                <NuxtImg :src="backendUrl + '/files/' + props.image" :alt="'La couverture du livre ' + props.title" class="rounded-xl shadow-lg max-h-112.5 object-cover" />
            </div>
            <div class="order-2 w-full md:w-[48%]">
                <h1 class="text-2xl md:text-3xl font-extrabold text-purple-900 mb-4">{{ props.title }}</h1>
                <p class="text-gray-600 mb-2"><span class="font-semibold text-purple-700"><template v-for="(author,index) in authors">{{  author.firstname + " " + author.lastname }}{{ index != authors.length - 1 ? ", " : "" }} </template></span> • {{ formatDate(props.date) }}</p>
                <p class="text-gray-700 leading-relaxed mb-6">{{ props.description }}</p>
                <div class="flex flex-wrap gap-4">
                    <UButton class="px-6 py-3 block w-full text-lg font-semibold rounded-lg shadow-md bg-purple-800 text-white cursor-pointer transition duration-300 hover:opacity-50" color="primary" variant="solid">Acheter <IconsArrowRight class="w-[1em] ml-[1em] fill-white h-[1em] inline-block" /></UButton>
                    <UButton @click="addToCart()" class="px-6 py-3 text-lg block w-full font-semibold rounded-lg shadow-md border-2 border-purple-800 text-purple-800 cursor-pointer transition duration-300 hover:bg-transparent hover:opacity-50" variant="outline">Ajouter <IconCartShopping class="w-[1em] ml-[1em] fill-purple-800 h-[1em] inline-block" /></UButton>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import IconCartShopping from '~/svg/IconCartShopping.vue';
import IconsArrowRight from '~/svg/IconsArrowRight.vue';
const {user} = useUserSession();
const config = useRuntimeConfig().public.urlBackend,
    backendUrl = config == "" ? "http://localhost:8080/m2l" :config,
    props = defineProps(["image","title","authors","date","description"]),
    formatDate=(isoDate)=>{
        return new Date(isoDate).toLocaleDateString('fr-FR',{
            year:'numeric',
            month:'long',
            day:'numeric'
        })
    }
    const addToCart = async () => {
        const id = useRoute().params.id;
        const dataCart = {article:id, quantity:1, user:user.value.email}
        let addCart = await postData(`${backendUrl}/cartItem/panier/add`,dataCart);
        if(addCart.error){
            await refreshAuth();
            addCart = await postData(`${backendUrl}/cartItem/panier/add`,dataCart);
        }
        
    }
</script>