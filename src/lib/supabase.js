import { createClient } from '@supabase/supabase-js'

// Get environment variables - Vite uses import.meta.env
// The vite.config.js exposes NEXT_PUBLIC_ variables via define
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables.')
  console.error('Make sure you have set in your .env file:')
  console.error('  NEXT_PUBLIC_SUPABASE_URL or VITE_SUPABASE_URL')
  console.error('  NEXT_PUBLIC_SUPABASE_ANON_KEY or VITE_SUPABASE_ANON_KEY')
  console.error('Current values:', {
    url: supabaseUrl ? '✓ Set' : '✗ Missing',
    key: supabaseAnonKey ? '✓ Set' : '✗ Missing'
  })
} else {
  // Log which database is being used (only in development)
  if (import.meta.env.DEV) {
    console.log('🔗 Supabase connected to:', supabaseUrl.replace(/https?:\/\/([^.]+).*/, '$1'))
  }
}

// Create client with fallback empty strings to prevent errors
// The app will show errors if these are missing, but won't crash
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

