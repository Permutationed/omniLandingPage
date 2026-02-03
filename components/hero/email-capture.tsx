'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getSupabaseClient } from '@/lib/supabase'

type ValidationStatus = 'idle' | 'invalid' | 'valid'

export function EmailCapture() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<ValidationStatus>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

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
    setErrorMessage(null)
    setSuccess(false)
    if (touched) {
      setStatus(validate(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationResult = validate(email)
    setStatus(validationResult)
    setTouched(true)

    if (validationResult === 'valid') {
      try {
        setIsSubmitting(true)
        setErrorMessage(null)

        const supabase = getSupabaseClient()
        const normalizedEmail = email.trim().toLowerCase()

        const { data: existingEmail, error: existingError } = await supabase
          .from('waitlist')
          .select('email')
          .eq('email', normalizedEmail)
          .single()

        if (existingError && (existingError as { code?: string }).code !== 'PGRST116') {
          throw existingError
        }

        if (existingEmail) {
          setErrorMessage("You're already on the waitlist. We'll be in touch soon.")
          return
        }

        const { error: insertError } = await supabase
          .from('waitlist')
          .insert([
            {
              email: normalizedEmail,
              name: 'Landing Page Signup',
              created_at: new Date().toISOString()
            }
          ])

        if (insertError) {
          const duplicate =
            insertError.code === '23505' ||
            insertError.message?.includes('duplicate key') ||
            insertError.message?.includes('unique constraint') ||
            insertError.message?.includes('waitlist_email_unique')

          if (duplicate) {
            setErrorMessage("You're already on the waitlist. We'll be in touch soon.")
            return
          }

          throw insertError
        }

        setEmail('')
        setStatus('idle')
        setTouched(false)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 4000)
      } catch (error) {
        console.error('Error submitting email to waitlist:', error)
        const message =
          typeof error === 'object' && error !== null && 'message' in error
            ? String((error as { message?: string }).message)
            : 'Something went wrong. Please try again.'

        setErrorMessage(message || 'Something went wrong. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="flex-1 relative">
        <Input
          type="email"
          placeholder="Enter your email"
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
      <Button type="submit" size="lg" className="h-12 px-8" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
      </Button>
      <div className="min-h-[1.5rem] w-full">
        {errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-sm text-center"
          >
            {errorMessage}
          </motion.p>
        )}
        {success && !errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-center text-emerald-500"
          >
            Thanks for joining the waitlist — we’ll be in touch soon.
          </motion.p>
        )}
      </div>
    </form>
  )
}
