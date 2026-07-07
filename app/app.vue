<script setup>
import Menu from './components/menu/Menu.vue';
import Footer from './components/footer/Footer.vue';
const {user} = useUserSession(),
  route = useRoute();
</script>
<template>
  <div class="flex flex-col justify-between min-h-screen bg-gray-50">
    <NuxtLayout>
      <UApp>
        <Menu />
          <div>
            <NuxtPage />
          </div>
        <Footer />
        <NuxtLink to="/admin" class="rounded-full p-[1em] fixed z-999 cursor-pointer hover:opacity-50 transition duration-300 right-[1em] bottom-[1em] bg-purple-800 text-white h-[3em] w-[3em]" v-if="user != null && user.role == 'ADMIN' && route.fullPath.search('admin') == -1">
          <UIcon name="i-lucide-clipboard-pen" class="size-4" />
        </NuxtLink>
      </UApp>
    </NuxtLayout>
  </div>
</template>
<style>
* {
  font-family:'Montserrat';
  box-sizing:border-box
}
.v-enter-active,.v-leave-active{transition:opacity .5s ease}
.v-enter-from,.v-leave-to{opacity:0}
</style>