<template>
    <header :class="user != null && user.role == 'ADMIN' && route.fullPath.search('admin') == 1 ? 'h-[6em]' :'h-[4em]'">
        <nav class="bg-white fixed z-99999 w-full shadow-md border-b border-gray-200">
            <div class="m-auto max-w-300 w-[90%]">
                <div class="container flex items-center justify-between px-6 py-3 mx-auto">
                    <!-- Logo -->
                    <NuxtLink to="/" class="flex items-center hover:opacity-50 transition duration-300 gap-2">
                        <NuxtImg src="img/logo.webp" alt="Logo de 2I Library" loading="lazy" class="h-10 w-auto" />
                        <span class="text-xl sm:inline-block hidden font-bold text-purple-800">2I Library</span>
                    </NuxtLink>
                    <!-- Actions à droite -->
                    <div class="flex items-center gap-4" v-if="loggedIn">
                        <!-- Lien gestion panier -->
                        <NuxtLink to="/shopping"
                            class="text-purple-700 font-medium hover:opacity-50 duration-300 transition">Gestion de
                            panier</NuxtLink>
                        <!-- Dropdown utilisateur -->
                        <UDropdownMenu class="cursor-pointer" :items="userMenu" :popper="{ placement:'bottom-end' }">
                            <UButton color="gray" variant="ghost" icon="i-heroicons-user-circle"
                                title="Voir le compte utilisateur"
                                class="rounded-full hover:opacity-50 transition duration-300" />
                        </UDropdownMenu>
                    </div>
                    <div class="flex items-center gap-4" v-else>
                        <NuxtLink to="/login"
                            class="text-purple-700 font-meium hover:opacity-50 duration-300 transition">Se connecter
                        </NuxtLink>
                    </div>
                </div>
            </div>
            
        </nav>
    </header>
</template>
<script setup>
import { ref } from "vue"
const { user } = useUserSession(),
    route = useRoute(),
    adminLinks = ref([
        {
            label:'Accueil',
            to:"/admin"
        },
        {
            label:'Livre',
            children:[
                {
                    label:'Voir la liste',
                    to:"/admin/books/all"
                },
                {
                    label:'Ajouter un livre',
                    to:"/admin/books/add"
                }
            ]
        },
        {
            label:'Article',
            children:[
                {
                    label:'Voir la liste',
                    to:"/admin/articles/all"
                },
                {
                    label:'Ajouter un article',
                    to:"/admin/articles/add"
                }
            ]
        },
        {
            label:'Éditeur',
            children:[
                {
                    label:"Voir la liste",
                    to:"/admin/editor/all"
                },
                {
                    label:'Ajouter un éditeur',
                    to:"/admin/editor/add"
                }
            ]
        },
        {
            label:"auteur",
            children:[
                {
                    label:'Voir la liste',
                    to:"/admin/author/all"
                },
                {
                    label:'Ajouter un auteur',
                    to:"/admin/author/add"
                }
            ]
        }
    ]),
    // Dropdown utilisateur
    { loggedIn } = useUserSession(),
    { clear } = useUserSession(),
    userMenu = [
        [
            {
                label:"Modifier les données personnelles",
                icon:"i-lucide-square-pen",
                to:"/account/edit"
            },
        ],
        [
            {
                label:"Consulter les commandes",
                icon:"i-lucide-archive",
                to:"/shopping"
            }
        ],
        [
            {
                label:"Se déconnecter",
                icon:"i-lucide-log-out",
                onSelect:async (e) => {
                    await $fetch("/api/auth/logout");
                    clear();
                    navigateTo("/login");
                }
            }
        ]
    ];
</script>
