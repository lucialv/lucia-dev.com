import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://lucia-dev.com",
  output: "server",
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es-ES",
          en: "en-US",
          ca: "ca-ES",
        },
      },
    }),
    react(),
  ],

  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "ca"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  adapter: vercel(),
});
