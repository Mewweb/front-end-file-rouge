<template>
    <section class="p-[2em] max-w-[1280px] m-auto">
        <h2 class="text-[2em] font-bold uppercase text-center mb-[1em]">Nouveauté</h2>
        <div class="flex justify-between flex-wrap">
            <NuxtLink href="#" class="transition w-full sm:w-[45%] max-w-[400px] md:w-[30%] my-[1em] inline-block duration-300 rounded-md hover:bg-[#EEF3FB] pb-[1em]"  v-for="element in allData">
                <article class=" text-center ">
                    <NuxtImg class="w-full mb-[.5em]" :src="element.img" :alt="element.descriptionImg" />
                    <h3 class="text-[1.5em] uppercase text-[#3B2A7F] font-bold text-center object-cover">{{ element.title }}</h3>
                    <p class="font-bold mb-[1em]">{{ element.date }}</p>
                    <Button :icon="IconsArrowRight">En savoir plus</Button>
                </article>
            </NuxtLink>
        </div>


    </section>
</template>
<script setup>
import IconsArrowRight from '~/public/svg/IconsArrowRight.vue';
import Button from '../element/Button.vue';

    const allData = [
        {
            img:"/img/example.png",
            descriptionImg:"Lorem ipsum dolor",
            title:"Lorem ipsum",
            date:"01/01/2005"
            
        },
        {
            img:"/img/example.png",
            descriptionImg:"Lorem ipsum dolor",
            title:"Lorem ipsum",
            date:"01/01/2005"
            
        },
        {
            img:"/img/example.png",
            descriptionImg:"Lorem ipsum dolor",
            title:"Lorem ipsum",
            date:"01/01/2005"
            
        },
        {
            img:"/img/example.png",
            descriptionImg:"Lorem ipsum dolor",
            title:"Lorem ipsum",
            date:"01/01/2005"
            
        },
        {
            img:"/img/example.png",
            descriptionImg:"Lorem ipsum dolor",
            title:"Lorem ipsum",
            date:"01/01/2005"
            
        },
        {
            img:"/img/example.png",
            descriptionImg:"Lorem ipsum dolor",
            title:"Lorem ipsum",
            date:"01/01/2005"
            
        },
    ]
</script>