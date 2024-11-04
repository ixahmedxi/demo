import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@org/api', '@org/utils', '@org/utils/base-url'],
    },
  },
})
