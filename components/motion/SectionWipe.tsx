'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef, type ReactNode } from 'react';

/**
 * Clip-path wipe used as the transition between major sections.
 *
 * Two elements rather than one: the outer element is observed and never
 * clipped, the inner element carries the animation.
 *
 * The observer is deliberately kept off the animated element. `clip-path`
 * is a paint-time effect and should not affect what IntersectionObserver
 * reports, but separating the two removes the question entirely, and it
 * costs one div. It also reads better — the section background lives on the
 * outer element, so content wipes in over its own background rather than
 * over a white gap.
 *
 * Root margin is given in px rather than %, so it is unambiguous.
 */
export default function SectionWipe({
  children,
  className,
  variant = 'up',
  duration = 1.05,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'diagonal';
  duration?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Margin in px, not %, so the root margin is unambiguous across browsers.
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const from =
    variant === 'diagonal'
      ? 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
      : 'inset(100% 0% 0% 0%)';

  const to =
    variant === 'diagonal'
      ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      : 'inset(0% 0% 0% 0%)';

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ clipPath: from, opacity: 0.45 }}
        animate={inView ? { clipPath: to, opacity: 1 } : undefined}
        transition={{
          duration,
          delay,
          ease: [0.76, 0, 0.24, 1],
          opacity: { duration: duration * 0.45, delay },
        }}
        style={{ willChange: 'clip-path' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
