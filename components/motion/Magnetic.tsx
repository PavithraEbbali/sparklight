'use client';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { useCallback, useRef, type ReactNode } from 'react';

/**
 * Magnetic hover.
 *
 * The wrapper tracks the pointer and pulls the button toward it, with the
 * label drifting slightly further for a parallax feel. Pointer-only: touch
 * devices and reduced-motion users get a plain wrapper, and the whole effect
 * runs on springs rather than layout so it never triggers reflow.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.34,
  radius = 90,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of the pointer offset the element travels. */
  strength?: number;
  /** How far outside the element the magnet still reaches, in px. */
  radius?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 18, mass: 0.35 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  // The inner label lags behind the shell, which is what sells the depth.
  const labelX = useTransform(sx, (v) => v * 0.38);
  const labelY = useTransform(sy, (v) => v * 0.38);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (event.pointerType !== 'mouse') return;
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);

      // Clamp so a fast pointer cannot fling the button across the layout.
      const clamp = (v: number) => Math.max(-radius, Math.min(radius, v));
      x.set(clamp(dx) * strength);
      y.set(clamp(dy) * strength);
    },
    [radius, strength, x, y]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      <motion.span style={{ x: labelX, y: labelY, display: 'inline-flex' }}>
        {children}
      </motion.span>
    </motion.span>
  );
}
