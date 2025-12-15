<template>
    <div class="h-[4em]">
        <nav class="bg-white  fixed z-99999 w-full shadow-md border-b border-gray-200">
            <div class="m-auto max-w-[1200px] w-[90%]">
                <div class="container flex items-center justify-between px-6 py-3 mx-auto">
                    <!-- Logo -->
                    <NuxtLink to="/" class="flex items-center hover:opacity-50 transition duration-300 gap-2">
                        <NuxtImg src="img/logo.webp" alt="Logo de 2I Library" class="h-10 w-auto" />
                        <span class="text-xl sm:inline-block hidden font-bold text-purple-800">2I Library</span>
                    </NuxtLink>
                    <!-- Barre de recherche -->
                    <div class="flex-1 mx-6 hidden md:flex">
                        <UInput v-model="search" class="w-full" placeholder="Rechercher un livre..." icon="i-heroicons-magnifying-glass" size="lg" />
                    </div>
                    <!-- Actions à droite -->
                    <div class="flex items-center gap-4">
                        <!-- Lien gestion panier -->
                        <NuxtLink to="/shopping" class="text-purple-700 font-medium hover:opacity-50 duration-300 transition">Gestion de panier</NuxtLink>
                        <!-- Dropdown utilisateur -->
                        <UDropdownMenu class="cursor-pointer" :items="userMenu" :popper="{placement:'bottom-end'}">
                            <UButton color="gray" variant="ghost" icon="i-heroicons-user-circle" title="Voir le compte utilisateur" class="rounded-full hover:opacity-50 transition duration-300" />
                        </UDropdownMenu>
                    </div>
                </div>
            </div>
            <!-- Barre de recherche visible seulement sur mobile -->
            <div class="md:hidden px-6 pb-3">
                <UInput v-model="search" placeholder="Rechercher un livre..." icon="i-heroicons-magnifying-glass" size="lg" class="w-full" />
            </div>
        </nav>
    </div>
</template>
<script setup>
import{ref} from "vue"
const search = ref("");
    // Dropdown utilisateur
const {loggedIn} = useUserSession();
const {clear} = useUserSession();

const userMenu = loggedIn.value ?
    [[{label:"Modifier les données personnelles",icon:"i-lucide-square-pen",to:"/account/edit"},],[{label:"Consulter les commandes",icon:"i-lucide-archive",to:"/shopping"}],[{label:"Se déconnecter", icon:"i-lucide-log-out", onSelect: async (e) =>{
        console.log("Se déconnecter");
        await $fetch("/api/auth/logout");
        clear();
        navigateTo("/login");
    }}]]  
    : [[{label:"Se connecter", icon:"i-lucide-log-in", to:"/login"}]]


</script>
