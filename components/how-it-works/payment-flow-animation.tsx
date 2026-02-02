'use client'

import { motion, useTransform, MotionValue } from 'motion/react'
import { CreditCard, Building2, Gift } from 'lucide-react'

interface PaymentFlowAnimationProps {
  progress: MotionValue<number>
}

export function PaymentFlowAnimation({ progress }: PaymentFlowAnimationProps) {
  // Phase 1: Card Swipe (0% - 33% scroll)
  const cardX = useTransform(progress, [0, 0.33], ['-100%', '0%'])
  const cardOpacity = useTransform(progress, [0, 0.1], [0, 1])
  const cardScale = useTransform(progress, [0.2, 0.33], [0.9, 1])

  // Phase 2: Path Drawing (25% - 70% scroll)
  const pathLength = useTransform(progress, [0.25, 0.7], [0, 1])

  // Phase 3: Split Animation (60% - 100% scroll)
  const achY = useTransform(progress, [0.6, 0.9], ['0%', '-40%'])
  const achOpacity = useTransform(progress, [0.6, 0.75], [0, 1])
  const rewardsY = useTransform(progress, [0.6, 0.9], ['0%', '40%'])
  const rewardsOpacity = useTransform(progress, [0.6, 0.75], [0, 1])

  // Step labels (show as user progresses)
  const step1Opacity = useTransform(
    progress,
    [0, 0.15, 0.4, 0.5],
    [0, 1, 1, 0]
  )
  const step2Opacity = useTransform(
    progress,
    [0.3, 0.45, 0.7, 0.8],
    [0, 1, 1, 0]
  )
  const step3Opacity = useTransform(progress, [0.65, 0.8], [0, 1])

  return (
    <div className="relative w-full h-full max-w-4xl mx-auto px-4">
      {/* Background heading */}
      <div className="absolute top-8 left-0 right-0 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
      </div>

      {/* Animation area */}
      <div className="relative h-full flex items-center justify-center">
        {/* Step 1: Card */}
        <motion.div
          style={{ x: cardX, opacity: cardOpacity, scale: cardScale }}
          className="absolute left-[10%]"
        >
          <div className="w-32 h-20 md:w-48 md:h-28 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-xl">
            <CreditCard className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </div>
          <motion.p
            style={{ opacity: step1Opacity }}
            className="text-center mt-4 font-medium"
          >
            Swipe your card
          </motion.p>
        </motion.div>

        {/* Step 2: Flow path SVG */}
        <svg
          viewBox="0 0 400 200"
          className="absolute w-full max-w-lg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background path (faint) */}
          <path
            d="M 50 100 C 120 100, 180 100, 200 100 L 200 100 C 220 100, 280 50, 350 30 M 200 100 C 220 100, 280 150, 350 170"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground/20"
          />
          {/* Animated path */}
          <motion.path
            d="M 50 100 C 120 100, 180 100, 200 100 L 200 100 C 220 100, 280 50, 350 30 M 200 100 C 220 100, 280 150, 350 170"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-primary"
            style={{ pathLength }}
            strokeLinecap="round"
          />
        </svg>

        {/* Step 2 label */}
        <motion.p
          style={{ opacity: step2Opacity }}
          className="absolute text-center font-medium"
        >
          Payment processes
        </motion.p>

        {/* Step 3: ACH destination (top) */}
        <motion.div
          style={{ y: achY, opacity: achOpacity }}
          className="absolute right-[10%] top-[20%]"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-surface border-2 border-border flex flex-col items-center justify-center">
            <Building2 className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
            <span className="text-xs mt-1">School</span>
          </div>
          <p className="text-center mt-2 text-sm text-muted-foreground">
            ACH Transfer
          </p>
        </motion.div>

        {/* Step 3: Rewards destination (bottom) */}
        <motion.div
          style={{ y: rewardsY, opacity: rewardsOpacity }}
          className="absolute right-[10%] bottom-[20%]"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-2 border-amber-500/50 flex flex-col items-center justify-center">
            <Gift className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />
            <span className="text-xs mt-1 text-amber-600">You</span>
          </div>
          <p className="text-center mt-2 text-sm font-medium text-amber-600">
            Earn Rewards
          </p>
        </motion.div>

        {/* Step 3 label */}
        <motion.p
          style={{ opacity: step3Opacity }}
          className="absolute bottom-16 text-center font-medium"
        >
          Everyone wins
        </motion.p>
      </div>
    </div>
  )
}
