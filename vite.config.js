import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Load all env vars (empty prefix) to get NEXT_PUBLIC_ variables
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    // Expose NEXT_PUBLIC_ prefixed variables to the client (similar to Next.js behavior)
    // This makes them available at build time and runtime
    define: {
      'import.meta.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify(
        env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      ),
      'import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      ),
    }
  }
})

