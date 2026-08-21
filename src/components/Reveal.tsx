import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger index — each step adds `step` seconds of delay. */
  index?: number;
  step?: number;
  /** Slide-in direction. */
  from?: 'bottom' | 'left' | 'right';
  duration?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}

const OFFSET = { bottom: { y: 24, x: 0 }, left: { x: -24, y: 0 }, right: { x: 24, y: 0 } };

/**
 * Scroll-triggered reveal. Collapses to a plain element when the visitor has
 * asked for reduced motion, so content still renders in its final state
 * instead of being animated in — or worse, never appearing.
 */
export default function Reveal({
  children,
  index = 0,
  step = 0.12,
  from = 'bottom',
  duration = 0.6,
  className,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...OFFSET[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay: index * step, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
