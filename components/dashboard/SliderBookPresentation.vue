<template>
    <section class="bg-gradient-to-r bookPresentation py-[5em] text-white relative from-[#43009E] to-[#AA4792]">
        <UCarousel v-slot="{ item }" :items="allData" :autoplay="{ delay: 5000 }" loop arrows class="w-full max-w-md mx-auto">
            <NuxtLink href="#">
                <article class="max-w-6xl text-center">
                    <NuxtImg src="/img/example.png" class="m-auto mb-[2em] w-full" alt="Image d'exemple"></NuxtImg>
                    <hgroup class="w-full">
                        <h2 class="text-4xl uppercase font-bold">{{item.title}}</h2>
                        <p class="text-xl font-bold uppercase my-[.5em]">{{ item.description }}</p>
                        <Button :icon="IconsArrowRight">En savoir plus</Button>
                    </hgroup>
                </article>
            </NuxtLink>
        </UCarousel>
    </section>
</template>
<script setup>
import IconsArrowRight from '~/public/svg/IconsArrowRight.vue';
import Button from '../element/Button.vue';
const allData = [
    {
        title: "Lorem ipsum dolor sit amet",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        id: 1
    },
    {
        title: "Lorem ipsum dolor sit amet",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        id: 2
    },
    {
        title: "Lorem ipsum dolor sit amet",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        id: 3
    }
]
</script>
<style>
    .bookPresentation > .relative{position:initial}
    .bookPresentation button{cursor:pointer}
    .bookPresentation button[aria-label="Prev"]{left:5%}
    .bookPresentation button[aria-label="Next"]{right:5%}
</style>