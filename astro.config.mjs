// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://astraea-autonomous-clini-07310b47.ploy.build",
  output: "server",
  build: {
    // Ploy-reserved directory so tenant assets don't collide with a `defaultFallback`
    // origin that serves its own `/_astro/`. Keep in sync with
    // WELL_KNOWN_ASSET_ROUTES in ploy-world.
    assets: "_ploy_static/_astro",
  },
  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: true,
      configPath: "./wrangler.toml",
    },
  }),
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD
        ? { "react-dom/server": "react-dom/server.edge" }
        : undefined,
    },
    ssr: {
      noExternal: ["xxhash-wasm"],
      ...(import.meta.env.PROD && {
        resolve: {
          conditions: ["workerd", "worker", "node"],
          externalConditions: ["workerd", "worker", "node"],
        },
      }),
    },
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