<template>
    <section class="m-auto max-w-300 w-[90%] py-10">
        <h2 class="text-[2em] font-semibold text-purple-800">Administrateur</h2>
        <AreaChart :data="saleByMonthValue" :categories="categories" :height="300" :x-formatter="xFormatter" xLabel="Mois" yLabel="Nombre de vente" />
        <div class="flex justify-between flex-wrap">
            <article class="w-[45%] my-[1em] mx-auto md:flex-row items-center justify-between bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
                <h3 class="text-[1.5em] font-semibold text-purple-800">Livre</h3>
                <div class="flex justify-between mt-[1em]">
                    <NuxtLink class="rounded-full p-[.6em_1em] inline-block cursor-pointer transition duration-300 bg-transparent text-purple-800 border-purple-800 hover:text-white hover:bg-purple-800 border-2 " to="/admin/books/all">Voir la liste
                    </NuxtLink>
                    <NuxtLink class="rounded-full relative cursor-pointer inline-block hover:opacity-50 transition duration-300 bg-linear-to-r from-pink-500 to-purple-600 text-white h-[3em] w-[3em]" to="/admin/books/create">
                        <UIcon name="i-lucide-plus" class="text-[1.5em] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
                    </NuxtLink>
                </div>
            </article>
            <article class="w-[45%] my-[1em] mx-auto md:flex-row inline-block items-center justify-between bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
                <h3 class="text-[1.5em] font-semibold text-purple-800">Articles</h3>
                <div class="flex justify-between mt-[1em]">
                    <NuxtLink class="rounded-full p-[.6em_1em] inline-block cursor-pointer transition duration-300 bg-transparent text-purple-800 border-purple-800 hover:text-white hover:bg-purple-800 border-2 " to="/admin/articles/all">Voir la liste
                    </NuxtLink>
                    <NuxtLink class="rounded-full relative cursor-pointer inline-block hover:opacity-50 transition duration-300 bg-linear-to-r from-pink-500 to-purple-600 text-white h-[3em] w-[3em]" to="/admin/articles/create">
                        <UIcon name="i-lucide-plus" class="text-[1.5em] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
                    </NuxtLink>
                </div>
            </article>
            <article class="w-[45%] my-[1em] mx-auto md:flex-row items-center justify-between bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
                <h3 class="text-[1.5em] font-semibold text-purple-800">Auteurs</h3>
                <div class="flex justify-between mt-[1em]">
                    <NuxtLink class="rounded-full p-[.6em_1em] inline-block cursor-pointer transition duration-300 bg-transparent text-purple-800 border-purple-800 hover:text-white hover:bg-purple-800 border-2 " to="/admin/author/all">Voir la liste
                    </NuxtLink>
                    <NuxtLink class="rounded-full relative cursor-pointer inline-block hover:opacity-50 transition duration-300 bg-linear-to-r from-pink-500 to-purple-600 text-white h-[3em] w-[3em]" to="/admin/author/create">
                        <UIcon name="i-lucide-plus" class="text-[1.5em] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
                    </NuxtLink>
                </div>
            </article>
            <article class="w-[45%] my-[1em] mx-auto md:flex-row items-center justify-between bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
                <h3 class="text-[1.5em] font-semibold text-purple-800">Éditeur</h3>
                <div class="flex justify-between mt-[1em]">
                    <NuxtLink class="rounded-full p-[.6em_1em] inline-block cursor-pointer transition duration-300 bg-transparent text-purple-800 border-purple-800 hover:text-white hover:bg-purple-800 border-2 " to="/admin/editor/all">Voir la liste
                    </NuxtLink>
                    <NuxtLink class="rounded-full relative cursor-pointer inline-block hover:opacity-50 transition duration-300 bg-linear-to-r from-pink-500 to-purple-600 text-white h-[3em] w-[3em]" to="/admin/editor/create">
                        <UIcon name="i-lucide-plus" class="text-[1.5em] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
                    </NuxtLink>
                </div>
            </article>
        </div>
    </section>
</template>
<script setup>
const config = useRuntimeConfig().public.urlBackend;
const backendUrl = config == "${BACKEND_URL}" ? "http://localhost:8080/m2l" : config;
const allMonth = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sept','Oct','Nov','Déc']
const data = ref();
const categories = {
    data:{
        name:'Vente',
        color:'#6e11b0',
    }
}
const saleByMonthValue = ref();
onMounted(async()=>{
    data.value = await accessData(`${backendUrl}/sale/2025`);
    if(data.value.error){
        await refreshAuth();
        data.value = await accessData(`${backendUrl}/sale/2025`);
    }
    if(!data.value.error){
        saleByMonthValue.value = data.value.data.map(elt => {
            return {date:allMonth[new Date(elt[0]).getMonth()],data:elt[1]}
        })
    }
})
const xFormatter=(i)=>saleByMonthValue.value[i].date
</script>