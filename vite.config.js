import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    watch: {
      // Kecualikan folder-folder ini dari pemantauan file
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**']
    }
  }
})
