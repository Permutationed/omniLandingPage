'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ValidationStatus = 'idle' | 'invalid' | 'valid'

export function EmailCapture() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<ValidationStatus>('idle')

  const validate = (value: string): ValidationStatus => {
    if (!value) return 'idle'
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    return isValid ? 'valid' : 'invalid'
  }

  const handleBlur = () => {
    setTouched(true)
    setStatus(validate(email))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (touched) {
      setStatus(validate(value))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationResult = validate(email)
    setStatus(validationResult)
    setTouched(true)

    if (validationResult === 'valid') {
      // TODO: Submit to waitlist API in Phase 10
      console.log('Submitting email:', email)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="flex-1 relative">
        <Input
          type="email"
          placeholder="Enter your email for demo"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          aria-describedby={status === 'invalid' && touched ? 'email-error' : undefined}
          className={cn(
            'h-12',
            status === 'invalid' && touched && 'border-destructive focus-visible:ring-destructive',
            status === 'valid' && 'border-green-500 focus-visible:ring-green-500'
          )}
        />
        {status === 'invalid' && touched && (
          <motion.p
            id="email-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-sm mt-1 absolute"
          >
            Please enter a valid email
          </motion.p>
        )}
      </div>
      <Button type="submit" size="lg" className="h-12 px-8">
        Request Demo
      </Button>
    </form>
  )
}
