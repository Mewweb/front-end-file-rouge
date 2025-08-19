<script setup lang="ts">
import Menu from './components/menu/Menu.vue';

</script>

<template>
  <div>
      <NuxtLayout>
        <UApp>
          <Menu/>
          <NuxtPage />
        </UApp>
      </NuxtLayout>
  </div>
</template>
<style>
* {
  font-family: 'Montserrat';
  box-sizing: border-box
}
.v-enter-active,.v-leave-active{transition:opacity .5s ease}
.v-enter-from,.v-leave-to{opacity:0}
</style>