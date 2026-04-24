// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr:true,
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    'nuxt-vue3-google-signin'
    /*'nuxt-security'*/,
    'nuxt-charts'
  ],
  googleSignIn: {
    clientId: "1097983058534-pltb62a3dvk566qe49j697pd8fk5nlcg.apps.googleusercontent.com",
  },
  imports: {
    global: true
  },
  runtimeConfig: {
    public: {
      urlBackend: ""
    },
    /*oauth:{
      google:{
        clientId:"1097983058534-pltb62a3dvk566qe49j697pd8fk5nlcg.apps.googleusercontent.com",
        clientSecret:" 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"
      }
    },*/

    session: {
      password: "",
      name: "front-end-file-rouge-session",
      cookie: {
        maxAge: 60 * 60 * 24 * 7,// 1 week
      }
    }
  },
  fonts: {
    defaults: {
      weights: [500, 700, 900],
      styles: ['normal'],
      subsets: [
        'latin',
        'latin-ext'
      ]
    }
  },
  ui: {
    colorMode: false
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width,initial-scale=1',
      title: 'File Rouge - E-commerce',
      meta: [
        { name: 'description', content: 'Projet de fin d\'études - E-commerce' }
      ],
      htmlAttrs: {
        lang: 'fr'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})