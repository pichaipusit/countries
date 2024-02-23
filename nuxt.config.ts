// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@element-plus/nuxt"],
  css: ["@fontsource-variable/nunito-sans", "@/assets/styles/colors.css"],
  ssr: false,
});
