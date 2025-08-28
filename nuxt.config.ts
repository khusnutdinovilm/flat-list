// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  typescript: {
    typeCheck: true,
  },

  app: {
    head: {
      titleTemplate: "FlatList | %s",

      htmlAttrs: {
        lang: "ru",
      },

      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/x-icon", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "icon", type: "image/x-icon", sizes: "32x32", href: "/favicon-32x32.png" },
        {
          rel: "apple-touch-icon",
          type: "image/x-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/x-icon",
          sizes: "192x192",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/x-icon",
          sizes: "512x512",
          href: "/android-chrome-512x512.png",
        },
      ],

      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Тестовое задание со списком и фильтрацией квартир для фирмы ООО Кельник Студиос ",
        },
      ],
    },
  },

  css: ["~/assets/styles/main.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/styles/mixins/index.scss" as *;
          `,
        },
      },
    },
  },
});
