import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react(), mkcert()],
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://ec2-3-39-119-130.ap-northeast-2.compute.amazonaws.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },

    host: "0.0.0.0",
  },
});
