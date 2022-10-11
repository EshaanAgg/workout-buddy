// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["@/assets/css/styles.css"],
  buildModules: ["@pinia/nuxt"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      endpoint: process.env.NUXT_APP_ENDPOINT,
      project: process.env.NUXT_APP_PROJECT,
      collectionID: process.env.NUXT_APP_COLLECTION_ID,
      database: process.env.NUXT_APP_DATABASE_ID.toString(),
    },
  },
});
