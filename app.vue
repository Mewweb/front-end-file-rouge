<script setup lang="ts">
  import Menu from './components/menu/Menu.vue';
  import Footer from './components/footer/Footer.vue';
  provide("basicAuth", btoa("user:c48fe594-c124-4440-adcb-f4913b80a351"));
</script>
<template>
  <div class="flex flex-col justify-between min-h-screen bg-gray-50">
      <NuxtLayout>
        <UApp>
          <Menu />
          <NuxtPage />
          <Footer/>
        </UApp>
      </NuxtLayout>
  </div>
</template>
<style>
*{
  font-family:'Montserrat';
  box-sizing:border-box
}
.v-enter-active,.v-leave-active{transition:opacity .5s ease}
.v-enter-from,.v-leave-to{opacity:0}
</style>