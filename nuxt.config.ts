// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "node:path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["normalize.css", '~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    '@': path.resolve(__dirname),
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'works-id',
        path: '/works/:id/',
        component: resolve(__dirname, 'pages/works/_id/index.vue')
      })
    }
  },

  modules: ['@vueuse/nuxt'],
});
