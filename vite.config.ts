import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test:{
    environment:"jsdom",
    setupFiles:"./src/setupTest.ts",
    globals:true,
    css:true,
    coverage:{
      reporter:["text","lcov"],
      include:["src/**/*.{ts,tsx}"],
      exclude:["src/main.tsx","src/vite-env.d.ts"]
    }
  }
})