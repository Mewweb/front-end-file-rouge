// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate:'2025-07-15',
  ssr:true,
  devtools:{ enabled:true },
  css:["~/assets/css/main.css"],
  modules:['@nuxt/image','@nuxt/fonts','@nuxt/ui','@vueuse/nuxt','nuxt-auth-utils','nuxt-security','nuxt-charts'],
  imports:{
    global:true
  },
  runtimeConfig:{
    public:{
      urlBackend:""
    },
    session:{
      password:"",
      name:"front-end-file-rouge-session",
      cookie:{
        maxAge:60 * 60 * 24 * 7,
      }
    }
  },
  fonts:{
    defaults:{
      weights:[500, 700, 900],
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
  security:{
    headers:{
      contentSecurityPolicy:{
        'img-src': ["'self'",'data:', 'http://localhost:8080/']
      }
    }
  },
  app:{
    head:{
      charset:'utf-8',
      viewport:'width=device-width,initial-scale=1',
      title:'File Rouge - E-commerce',
      meta:[
        { name:'description', content:"2IL est une librairie spécialisée dans le domaine de la formation, disposant d'un magasin situé à Lyon." }
      ],
      htmlAttrs:{
        lang:'fr'
      },
      link:[
        { rel:'icon', type:'image/x-icon', href:'/fav.ico' }
      ]
    }
  }
})