<template>
    <article class="w-full md:w-[48%] my-[1em] md:flex-row items-center justify-between bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4">
        <h3 class="text-[1.5em] font-semibold text-purple-800">Éditeur</h3>
        <div class="flex justify-between mt-[1em]">
            <NuxtLink class="rounded-full p-[.6em_1em] inline-block cursor-pointer transition duration-300 bg-transparent text-purple-800 border-purple-800 hover:text-white hover:bg-purple-800 border-2 " to="/admin/editor/all">Voir la liste</NuxtLink>
            <NuxtLink class="rounded-full relative cursor-pointer inline-block hover:opacity-50 transition duration-300 bg-purple-800 text-white h-[3em] w-[3em]" to="/admin/editor/all?create=true">
                <UIcon name="i-lucide-plus" class="text-[1.5em] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
            </NuxtLink>
        </div>
    </article>
</template>