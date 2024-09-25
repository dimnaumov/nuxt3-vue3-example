// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // debug: !!process.env.NUXT_DEBUG_MODE,

  // devtools: {
  //   enabled: process.env.NODE_ENV !== 'production',
  // },
  // devtools: { enabled: true },

  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
    },
    private: {
      WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    },
  },

  compatibilityDate: '2024-04-03',

  css: [
    '~/assets/scss/global.scss',
  ],

  app: {
    head: {
      titleTemplate: '%s - Наумов Дмитрий, Nuxt3/Vue3',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'minimum-scale=1.0, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      ],
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/index.scss" as *;',
        },
      },
    },

    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 24678,
      },

      watch: {
          usePolling: true,
          interval: 1000,
      },
    }
  },

  modules: ["@nuxt/eslint", "@nuxt/ui"],

  eslint: {
    checker: true,
  },

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  colorMode: {
    preference: 'light',
  },
})
