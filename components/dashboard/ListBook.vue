<script setup lang="ts">
    import FitlerBook from '../form/FitlerBook.vue';
    import ElementListBook from './ElementListBook.vue';
</script>
<template>
    <section class="m-auto max-w-[1200px] mx-w-[90%] py-10">
        <div class="container px-12 py-6 mx-auto space-y-8">
            <FitlerBook />
            <ElementListBook />
        </div>
    </section>
</template>