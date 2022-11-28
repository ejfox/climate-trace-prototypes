// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // add tachyons
  css: ['tachyons/css/tachyons.css'],
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ]
})
  