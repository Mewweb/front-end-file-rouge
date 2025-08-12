<template>
    <form class="text-right p-[2em] max-w-[1280px] m-auto">
        <div>
            <fieldset  class="relative inline-block" tabindex="100">
                <span @click="visibleDropdown = !visibleDropdown" class="relative hover:opacity-50 transition duration-300 cursor-pointer rounded-l-md inline-block p-[.8em_1em] bg-[#CC3399] text-white">Filtrer <IconAngleRight :class="visibleDropdown ? 'rotate-90' : ''" class="w-[1.3em] transition fill-white duration-300 h-[1.3em] inline-block" /></span>
                <Transition>
                    <div v-if="visibleDropdown"  class="p-[2px] m-0 absolute rounded-b-md text-left w-full bg-white border-1 border-t-0">
                        <div class="list-none p-[.2em]" v-for="element in items">
                            <label class="w-full block cursor-pointer hover:opacity-50 transition duration-300">{{ element.label }} <input type="checkbox" :value="element.checked" /></label>
                        </div>
                    </div>
                </Transition>

            </fieldset>
            <fieldset class="inline-block">
                <UInput icon="i-lucide-search" class="text-base searchInput" variant="outline" placeholder="Rechercher..." />
            </fieldset>
        </div>
        <Button class="mt-[1em]" :icon="IconFilter">Chercher</Button>
    </form>

</template>

<style>
    .formListBook form .searchInput input{
        font-size:1em;
        border-radius:0 .5em .5em .0;
        padding-block:.8em
    }
    .v-enter-active,.v-leave-active{transition:opacity .3s ease}
    .v-enter-from,.v-leave-to{opacity:0}
</style>
<script setup >
import IconAngleRight from '~/public/svg/IconAngleRight.vue';
import IconFilter from '~/public/svg/IconFilter.vue';
import Button from '../element/Button.vue';
let visibleDropdown = ref(false);
const items = [
    {
        label: 'Date',
        checked: false,
    },
    {
        label: 'Titre',
        checked: false,

    },
    {
        label: 'Auteur',
        checked:false
    }
]

</script>