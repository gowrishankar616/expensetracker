import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxies /api calls to Spring Boot, so you don't need to configure CORS.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
