// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module", "@pinia/nuxt", "@vueuse/nuxt"],
  app: {
    head: {
      title: "Kanban-demo",
    },
  },
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      // env var NUXT_PUBLIC_API_BASE will override
      apiBase: "http://localhost:8000/api/",
    },
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
      theme: {
        defaultTheme: "dark",
      },
    },
  },
  pinia: {},
});
