import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "@vueuse/core",
        "lucide-vue-next",
        "reka-ui",
      ],
    },
  },
  modules: ["@nuxt/content", "@nuxt/eslint", "@nuxt/fonts", "shadcn-nuxt"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
