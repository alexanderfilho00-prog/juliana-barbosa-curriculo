import { defineConfig } from "astro/config";

// site estático — publica na Vercel sem configuração extra
export default defineConfig({
  build: { inlineStylesheets: "auto" },
});
