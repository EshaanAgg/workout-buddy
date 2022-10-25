// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  css: ["@/assets/css/styles.css"],
  buildModules: ["@pinia/nuxt"],
  runtimeConfig: {
    public: {
      endpoint: process.env.NUXT_APP_ENDPOINT,
      project: process.env.NUXT_APP_PROJECT,
      workoutCollectionID: process.env.NUXT_APP_COLLECTION_ID,
      databaseID: process.env.NUXT_APP_DATABASE_ID,
    },
  },
});
