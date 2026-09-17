'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { MOTION, type MotionTagName } from './motionTag';
import type { ElementType, ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------
   Reveal — the workhorse scroll-triggered entrance
   ------------------------------------------------------------------------- */

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 28,
  duration = 0.75,
  as = 'div',
  once = true,
  blur = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
  duration?: number;
  as?: MotionTagName;
  once?: boolean;
  /** Resolve out of a soft blur as well as translating — reads as depth
      rather than a plain slide, and is what the hero cascade uses. */
  blur?: boolean;
}) {
  const reduced = useReducedMotion();
  const MotionTag = MOTION[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        ...(blur ? { filter: 'blur(8px)' } : {}),
        ...offsetFor(direction, distance),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(blur ? { filter: 'blur(0px)' } : {}),
      }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------
   Stagger — parent/child pair for grids
   ------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.085, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
};

export function StaggerGroup({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTagName;
}) {
  const reduced = useReducedMotion();
  const MotionTag = MOTION[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTagName;
}) {
  const reduced = useReducedMotion();
  const MotionTag = MOTION[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------
   TextReveal — word-by-word headline reveal
   ------------------------------------------------------------------------- */

export function TextReveal({
  text,
  className,
  as: Tag = 'h2',
  delay = 0,
  id,
  highlight,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  id?: string;
  /**
   * A phrase inside `text` to mark with a gold sweep. The sweep is painted
   * BEHIND the words, so the type keeps its own colour and its contrast is
   * untouched — ink on gold-300 measures 8.66:1.
   *
   * Matched on word boundaries. A phrase that does not match simply renders
   * no highlight rather than throwing or mangling the headline.
   */
  highlight?: string;
}) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  // Which word indices the highlight covers.
  const hlWords = highlight ? highlight.split(' ') : [];
  const hlStart =
    hlWords.length > 0
      ? words.findIndex(
          (_, i) => words.slice(i, i + hlWords.length).join(' ') === highlight
        )
      : -1;
  const isHighlighted = (i: number) =>
    hlStart >= 0 && i >= hlStart && i < hlStart + hlWords.length;

  /** The sweep. Slightly rotated so it reads as a drawn mark. */
  const sweep = (i: number) => (
    <motion.span
      aria-hidden="true"
      className="absolute inset-x-[-0.14em] bottom-[0.1em] top-[0.24em] -rotate-[0.6deg] rounded-[0.28em] bg-gold-300"
      style={{ originX: 0 }}
      variants={
        reduced
          ? undefined
          : {
              hidden: { scaleX: 0, opacity: 0 },
              show: {
                scaleX: 1,
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: EASE,
                  // Lands just after its own word has finished rising.
                  delay: delay + (i - hlStart) * 0.045 + 0.4,
                },
              },
            }
      }
    />
  );

  const wordSpans = words.map((word, i) => (
    <span key={`${word}-${i}`} className="relative inline-block">
      {isHighlighted(i) && sweep(i)}
      {/* The mask clips the rising word. It is `relative` so it paints
          above the sweep, which is an absolutely positioned earlier
          sibling. */}
      <span className="relative inline-block overflow-hidden align-bottom">
        <motion.span
          className="inline-block"
          variants={
            reduced
              ? undefined
              : {
                  hidden: { y: '110%', opacity: 0 },
                  show: {
                    y: '0%',
                    opacity: 1,
                    transition: { duration: 0.72, ease: EASE },
                  },
                }
          }
        >
          {word}
        </motion.span>
      </span>
      {i < words.length - 1 ? ' ' : ''}
    </span>
  ));

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">{wordSpans}</span>
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className}>
      {/* The whole string stays in the accessibility tree as one label; the
          per-word spans are decorative and hidden from screen readers. */}
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.045, delayChildren: delay } },
        }}
        className="inline"
      >
        {wordSpans}
      </motion.span>
    </Tag>
  );
}
