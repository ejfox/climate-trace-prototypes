// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // add tachyons
  css: ['tachyons/css/tachyons.css'],
  vite: {
    define: {
      'process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE': '1000000',
      'process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS': '1000000',
    },
  },
  build: {
    // transpile: ['@turf/turf'],
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ]
})
  