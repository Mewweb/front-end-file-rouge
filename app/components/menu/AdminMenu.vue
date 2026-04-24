<template>
    <aside class="w-[15em]">
        <div class="fixed p-[1em] w-[15em] h-screen bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <UNavigationMenu orientation="vertical" :items="adminLinks"></UNavigationMenu>
        </div>
    </aside>
</template>
<script setup>
const open = ref(true),
    adminLinks = ref([
        {
            label: 'Livre',
            children: [
                {
                    label: 'Voir la liste',
                    to: "/admin/books/all"
                },
                {
                    label: 'Ajouter un livre',
                    to: "/admin/books/add"
                }
            ]
        },
        {
            label: 'Article',
            children: [
                {
                    label: 'Voir la liste',
                    to: "/admin/articles/all"
                },
                {
                    label: 'Ajouter un article',
                    to: "/admin/articles/add"
                }
            ]
        },
        {
            label: 'Éditeur',
            children: [
                {
                    label: "Voir la liste",
                    to: "/admin/editor/all"
                },
                {
                    label: 'Ajouter un éditeur',
                    to: "/admin/editor/add"
                }
            ]
        },
        {
            label: "auteur",
            children: [
                {
                    label: 'Voir la liste',
                    to: "/admin/author/all"
                },
                {
                    label: 'Ajouter un auteur',
                    to: "/admin/author/add"
                }
            ]
        }
    ])
</script>