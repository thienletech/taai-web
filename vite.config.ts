import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import * as path from "path";
import https from "https";

export default defineConfig({
  plugins: [react()],
  build: {},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
