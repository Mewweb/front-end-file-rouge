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
    /*'nuxt-security'*/,
    'nuxt-charts'
  ],
  imports: {
    global: true
  },
  runtimeConfig: {
    public: {
      urlBackend: ""
    },

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