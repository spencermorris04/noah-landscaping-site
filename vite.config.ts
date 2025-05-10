import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  server:{
    proxy: {
      "/api": "http://localhost:5173"
    }
  },
=======
>>>>>>> f76240e2ca1d67477731d450fc624d84f5b93f31
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
