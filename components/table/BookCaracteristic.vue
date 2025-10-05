<template>
    <section class="m-auto max-w-[1200px] w-[90%] py-10">
        <div class="container mx-auto ">
            <!-- Titre -->
            <h2 class="text-3xl font-extrabold text-purple-900 mb-6">Caractéristiques</h2>
            <!-- Tableau -->
            <div class="overflow-x-scroll rounded-xl shadow-md border border-gray-200 bg-white">
                <table class="w-full border-collapse">
                    <tbody class="divide-y divide-gray-200">
                        <!-- Date -->
                        <tr>
                            <td class="px-6 py-4 font-semibold text-purple-700 w-1/3">Date</td>
                            <td class="px-6 py-4 text-gray-700">{{date}}</td>
                        </tr>
                        <!-- Genre -->
                        <tr>
                            <td class="px-6 py-4 font-semibold text-purple-700 w-1/3">Genre</td>
                            <td class="px-6 py-4 text-gray-700">{{style}}</td>
                        </tr>
                        <!-- Éditeur -->
                        <tr>
                            <td class="px-6 py-4 font-semibold text-purple-700 w-1/3">Éditeur</td>
                            <td class="px-6 py-4 text-gray-700">{{editor}}</td>
                        </tr>
                        <!-- Auteur -->
                        <tr v-for="author in authors">
                            <td class="px-6 py-4 font-semibold text-purple-700">Auteur</td>
                            <td class="px-6 py-4 text-gray-700">{{author.firstname}} {{ author.lastname }}</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 font-semibold text-purple-700">Article</td>
                            <td class="px-6 py-4 text-gray-700">{{article.title}}</td>
                        </tr>
                        <!-- Format -->
                        <tr>
                            <td class="px-6 py-4 font-semibold text-purple-700 w-1/3">Format</td>
                            <td class="px-6 py-4 text-gray-700">{{article.format}}</td>
                        </tr>
                        <!-- ISBN -->
                        <tr>
                            <td class="px-6 py-4 font-semibold text-purple-700">Code ISBN</td>
                            <td class="px-6 py-4 text-gray-700">{{number_isbn}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
<script setup>
    const props = defineProps(["editor","authors","number_isbn","style","date","article"]);
</script>
