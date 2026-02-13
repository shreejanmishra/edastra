import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
    }),
    viteCompression({ algorithm: "brotliCompress" }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    target: "es2020",
    cssTarget: "chrome80",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["lucide-react"],
          charts: ["d3"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
