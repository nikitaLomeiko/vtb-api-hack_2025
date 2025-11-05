import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My React PWA",
        short_name: "MyPWA",
        description: "My React PWA Application",
        theme_color: "#000000",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
      "@styles": new URL("./src/styles", import.meta.url).pathname,
      "@components": new URL("./src/components", import.meta.url).pathname,
      "@hooks": new URL("./src/hooks", import.meta.url).pathname,
      "@pages": new URL("./src/pages", import.meta.url).pathname,
      "@assets": new URL("./src/assets", import.meta.url).pathname,
      "@routes": new URL("./src/routes", import.meta.url).pathname,
      "@store": new URL("./src/store", import.meta.url).pathname,
      "@lib": new URL("./src/lib", import.meta.url).pathname,
    },
  },
});
