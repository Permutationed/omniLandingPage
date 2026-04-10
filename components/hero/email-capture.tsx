'use client'

import { useState } from 'react'

type ValidationState = 'idle' | 'invalid' | 'valid'

export function EmailCapture() {
  const [email, setEmail] = useState('')
  const [validation, setValidation] = useState<ValidationState>('idle')

  const validateEmail = (value: string) => {
    if (!value) return 'idle' as const
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'valid' as const : 'invalid' as const
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const state = validateEmail(email)
    setValidation(state)
    if (state === 'valid') {
      console.log('Email submitted:', email)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setValidation('idle') }}
        onBlur={() => email && setValidation(validateEmail(email))}
        placeholder="Enter your email"
        className="h-10 px-[14px] bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-sans w-[260px] outline-none focus:ring-1 focus:ring-foreground"
        style={{
          border: `1px solid ${validation === 'invalid' ? '#c44' : 'var(--foreground)'}`,
          borderRadius: '5px',
        }}
      />
      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 bg-foreground text-primary-foreground text-sm font-normal h-10 px-5 whitespace-nowrap"
        style={{ borderRadius: '5px', border: '1px solid var(--foreground)' }}
      >
        Request Demo
        <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
      </button>
    </form>
  )
}
