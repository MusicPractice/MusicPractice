// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["normalize.css"],

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'works-id',
        path: '/works/:id/',
        component: resolve(__dirname, 'pages/works/_id/index.vue')
      })
    }
  },
});
