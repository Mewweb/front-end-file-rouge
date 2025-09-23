// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"; 
export default defineNuxtConfig({
  compatibilityDate:'2025-07-15',
  devtools:{enabled:true},
  css:["~/assets/css/main.css"],
  modules:[
   'nuxt-csurf',
   '@nuxt/image',
   '@nuxt/fonts',
   '@nuxt/ui',
   '@tailwindcss/vite',
   'nuxt-charts'
  ],
  runtimeConfig:{
    session:{
      password:"",
      name:"front-end-file-rouge-session",
      cookie:{
        maxAge:60 * 60 * 24 * 7,// 1 week
     }
   }
 },
 csurf:{
  https:false,
  methodsToProtect:['POST','PUT','PATCH'],
  addCsrfTokenToEventCtx: true,
  headerName:'csrf-token'
 },
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
  vite:{
    plugins:[
      tailwindcss()
    ]
 },
  app:{
    head:{
      charset:'utf-8',
      viewport:'width=device-width,initial-scale=1',
      title:'File Rouge - E-commerce',
      meta:[
        {name:'description',content:'Projet de fin d\'études - E-commerce'}
      ],
      htmlAttrs:{
        lang:'fr'
      },
      link:[
        {rel:'icon',type:'image/x-icon',href:'/favicon.ico'}
      ]
    }
  }
})