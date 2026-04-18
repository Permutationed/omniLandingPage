// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://astraea-autonomous-clini-07310b47.ploy.build",
  output: "server",
  adapter: vercel(),
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      strictPort: true,
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  devToolbar: {
    enabled: false,
  },
});
