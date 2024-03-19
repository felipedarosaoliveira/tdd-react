/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    coverage: {
      provider: 'v8'
    },
    globals: true,
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/tests'],
    setupFiles:["./src/setupTests.ts"],
  },
  server:{
    port:3000,
    open:"/"
  }
  
})
