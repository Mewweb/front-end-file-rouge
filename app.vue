<template>
  <div>
      <NuxtLayout>
        <UApp>
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