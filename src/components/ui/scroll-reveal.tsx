import { motion, type Variants } from "motion/react";
import type { ReactNode, JSX } from "react";
import {
  defaultRevealTransition,
  defaultViewport,
  swoopEase,
} from "@/lib/animation-variants";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: "some" | "all" | number;
  as?: keyof JSX.IntrinsicElements;
}

const directionOffsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  none: { x: 0, y: 0 },
};

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = defaultRevealTransition.duration as number,
  once = defaultViewport.once,
  amount = defaultViewport.amount,
  as = "div",
}: ScrollRevealProps) {
  const offset = directionOffsets[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: swoopEase,
      },
    },
  };

  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionComponent>
  );
}
