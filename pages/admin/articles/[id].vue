<template>
    <section class="m-auto max-w-300 relative w-[90%] py-10">
        <NuxtLink to="/admin/articles/all">Retourner en arrière</NuxtLink>
        <FormCreateArticle :isUpdate="true" />
    </section>
</template>