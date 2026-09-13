import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Override the base path for self-hosting:
  //   Vercel/Netlify (root domain): VITE_BASE_PATH=/
  //   GitHub Pages (project site):  VITE_BASE_PATH=/<repo-name>/
  base: process.env["VITE_BASE_PATH"] ?? "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
