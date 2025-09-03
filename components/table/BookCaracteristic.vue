<template>
    <section class="m-auto max-w-[1200px] w-[90%] py-10">
        <div class="container mx-auto ">
            <!-- Titre -->
            <h2 class="text-3xl font-extrabold text-purple-900 mb-6">Caractéristiques</h2>
            <!-- Tableau -->
            <div class="overflow-x-scroll rounded-xl shadow-md border border-gray-200 bg-white">
                <table class="w-full border-collapse">
                    <tbody class="divide-y divide-gray-200">
                        <!-- Éditeur -->
                        <tr>
                            <td class="px-6 py-4 font-semibold text-purple-700 w-1/3">Éditeur</td>
                            <td class="px-6 py-4 text-gray-700">{{book.publisher}}</td>
                        </tr>
                        <!-- Auteur -->
                        <tr>
                            <td class="px-6 py-4 font-semibold text-purple-700">Auteur</td>
                            <td class="px-6 py-4 text-gray-700">{{book.author}}</td>
                        </tr>
                        <!-- ISBN -->
                        <tr>
                            <td class="px-6 py-4 font-semibold text-purple-700">Code ISBN</td>
                            <td class="px-6 py-4 text-gray-700">{{book.isbn}}</td>
                        </tr>
                        <!-- Référence -->
                        <tr>
                            <td class="px-6 py-4 font-semibold text-purple-700">Référence</td>
                            <td class="px-6 py-4 text-gray-700">{{book.reference}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
<script setup>
const book = {publisher:"OpenAI Press",author:"Jean Dupont",isbn:"978-2-1234-5678-9",reference:"REF-NUXT-2025"}
</script>
