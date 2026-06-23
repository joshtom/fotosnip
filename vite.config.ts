import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      'import.meta.env.GEMINI_API_KEY': JSON.stringify(
        env.GEMINI_API_KEY ?? '',
      ),
    },
    plugins: [react(), tailwindcss()],
  }
})
