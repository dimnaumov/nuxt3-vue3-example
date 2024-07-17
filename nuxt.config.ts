// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // debug: !!process.env.NUXT_DEBUG_MODE,

  // devtools: {
  //   enabled: process.env.NODE_ENV !== 'production',
  // },

  compatibilityDate: '2024-04-03',

  // devtools: { enabled: true },

  css: [
    '~/assets/scss/_global.scss',
  ],

  modules: ["@nuxt/eslint", "@nuxt/ui"],

  eslint: {
    checker: true
  },

  components: [
    { path: '~/src/components', pathPrefix: false }
  ]
})
