<template>
    <main class="px-12 relative py-6">
        <NuxtLink to="/admin/books/all" class="rounded-full p-[.6em_1em] inline-block cursor-pointer mb-[1em] transition duration-300 bg-transparent text-purple-800 border-purple-800 hover:text-white hover:bg-purple-800 border-2 ">
            <UIcon name="i-lucide-chevron-left" class="text-[1.5em] mb-[.1em] align-middle" />Retourner en arrière
        </NuxtLink>
        <FormCreateArticle :isUpdate="true" />
    </main>
</template>