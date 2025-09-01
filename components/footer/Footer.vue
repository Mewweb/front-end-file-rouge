<template>
  <footer class="bg-gradient-to-r bg-indigo-900 text-white py-8">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <NuxtImg  src="img/logo.webp"  alt="Logo du site"  class="w-12 h-12 rounded-lg shadow-md" />
        <span class="font-extrabold tracking-wide">2I Library</span>
      </div>
      <!-- Menu -->
      <nav class="flex flex-col md:flex-row items-center gap-4 md:gap-8 font-medium">
        <NuxtLink to="/shopping" class="hover:text-pink-300 transition">Gestion de panier</NuxtLink>
        <NuxtLink to="/account/edit" class="hover:text-pink-300 transition">Modifier les données personnelles</NuxtLink>
        <NuxtLink to="/shopping" class="hover:text-pink-300 transition">Consulter les commandes</NuxtLink>
      </nav>
    </div>
    <!-- Ligne de séparation -->
    <div class="border-t border-purple-500/40 mt-6 pt-4 text-center text-sm text-purple-200">© 2025 2I Library. Tous droits réservés.</div>
  </footer>
</template>
