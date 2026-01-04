<script setup>
    import ListBook from '~/components/dashboard/ListBook.vue';
    import SliderBookPresentation from '~/components/dashboard/SliderBookPresentation.vue';
    const {loggedIn, user,session } = useUserSession();
    </script>
<template>
    <div>
        <SliderBookPresentation />
        <div class="formListBook">
            <ListBook />
        </div>
    </div>
</template>