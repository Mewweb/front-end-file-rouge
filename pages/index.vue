<script setup>
    import ListBook from '~/components/dashboard/ListBook.vue';
    import SliderBookPresentation from '~/components/dashboard/SliderBookPresentation.vue';

    const {loggedIn, user,session } = useUserSession();
    console.log(loggedIn.value);
    console.log(user.value);
    console.log(session.value);
    </script>
<template>
    <div>
        <SliderBookPresentation />
        <div class="formListBook">
            <ListBook />
        </div>
    </div>
</template>