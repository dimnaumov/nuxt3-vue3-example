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

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/index.scss" as *;',
        },
      },
    },
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
