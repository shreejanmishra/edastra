import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

// Conditionally load ViteImageOptimizer only when sharp is available (locally).
// On Vercel, sharp native binaries are often missing, which can stall the build.
let imageOptimizerPlugin = null;
try {
  // Attempt to resolve sharp before loading the plugin
  await import("sharp");
  const { ViteImageOptimizer } = await import("vite-plugin-image-optimizer");
  imageOptimizerPlugin = ViteImageOptimizer({
    jpg: { quality: 80 },
    jpeg: { quality: 80 },
    png: { quality: 80 },
  });
} catch {
  // sharp not available — skip image optimization (e.g. on Vercel)
  console.log("⚠ sharp not found — skipping vite-plugin-image-optimizer");
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imageOptimizerPlugin,
    viteCompression({ algorithm: "brotliCompress" }),
  ].filter(Boolean),
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
