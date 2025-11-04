import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
      "@styles": new URL("./src/styles", import.meta.url).pathname,
      "@components": new URL("./src/components", import.meta.url).pathname,
      "@utils": new URL("./src/utils", import.meta.url).pathname,
      "@hooks": new URL("./src/hooks", import.meta.url).pathname,
      "@pages": new URL("./src/pages", import.meta.url).pathname,
      "@assets": new URL("./src/assets", import.meta.url).pathname,
    },
  },
});
