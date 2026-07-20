import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Déploiement GitHub Pages
  base: "/Argent_Bank/",

  server: {
    host: true,
    port: 5173,
    open: true,
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    emptyOutDir: true,
  },
});