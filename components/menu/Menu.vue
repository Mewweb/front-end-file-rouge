<template>
    <div class="h-[4em]">
        <nav class="bg-white  fixed z-99999 w-full shadow-md border-b border-gray-200">
            <div class="m-auto max-w-[1200px] mx-w-[90%]">
                <div class="container flex items-center justify-between px-6 py-3 mx-auto">
                    <!-- Logo -->
                    <NuxtLink to="/" class="flex items-center gap-2">
                        <NuxtImg src="img/logo.png" alt="Logo de 2I Library" class="h-10 w-auto" />
                        <span class="text-xl sm:inline-block hidden font-bold text-purple-800">2IAcademy</span>
                    </NuxtLink>
                    <!-- Barre de recherche -->
                    <div class="flex-1 mx-6 hidden md:flex">
                        <UInput v-model="search" class="w-full" placeholder="Rechercher un livre..." icon="i-heroicons-magnifying-glass" size="lg" />
                    </div>
                    <!-- Actions à droite -->
                    <div class="flex items-center gap-4">
                        <!-- Lien gestion panier -->
                        <NuxtLink to="/panier" class="text-purple-700 font-medium hover:text-purple-900 transition">Gestion de panier</NuxtLink>
                        <!-- Dropdown utilisateur -->
                        <UDropdownMenu :items="userMenu" :popper="{placement:'bottom-end'}">
                            <UButton color="gray" variant="ghost" icon="i-heroicons-user-circle" class="rounded-full" />
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
    import {ref} from "vue"
    const search = ref(""),
    // Dropdown utilisateur
        userMenu = [
        [
            {
                label:"Modifier les données personnelles",
                icon:"i-heroicons-pencil-square",
                click:()=>console.log("Modifier profil"),
            },
        ],
        [
            {
                label:"Consulter les commandes",
                icon:"i-heroicons-archive-box",
                click:()=>console.log("Consulter commandes"),
            },
        ],
    ]
</script>
