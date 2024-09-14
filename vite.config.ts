import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    viteSingleFile(),
    viteCompression({
      filter: /\.(html)$/, // Only compress HTML files
      algorithm: "gzip", // Use gzip compression
      ext: ".gz", // Output file extension
    }),
  ],
  // server: {
  //   proxy: {
  //     "/api": { target: "http://svitlopulse.local/", changeOrigin: true },
  //   },
  // },
});
