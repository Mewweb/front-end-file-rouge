// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"; 
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  
  modules: ['nuxt-csurf', '@nuxt/image', '@nuxt/fonts','@nuxt/ui', '@tailwindcss/vite'],
  fonts:{
    defaults:{
      weights:[500,700,900],
      styles:['normal'],
      subsets:[
        'latin',
        'latin-ext'
      ]
    }
  },
   ui:{
    colorMode:false
   },
  vite: {
    plugins:[
      tailwindcss()
    ]
  }
})