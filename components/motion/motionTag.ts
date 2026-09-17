import { motion } from 'motion/react';

/**
 * `motion.create()` mints a fresh component on every call, so calling it in a
 * render body would remount the subtree and discard any running animation.
 * These are the already-built motion components, looked up by tag name.
 *
 * Keeping it to a fixed map (rather than a generic factory) also preserves
 * the prop types — a `motion.create(tag as never)` result types its props as
 * `unknown` and rejects `className`.
 */
export const MOTION_TAGS = {
  div: motion.div,
  span: motion.span,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
} as const;

export type MotionTagName = keyof typeof MOTION_TAGS;

/**
 * Every entry accepts the same animation props. Call sites index this map
 * directly rather than going through a factory: a function call that returns
 * a component trips react-hooks/static-components, a property lookup on a
 * module constant does not.
 */
export type MotionTagMap = Record<MotionTagName, typeof motion.div>;

export const MOTION: MotionTagMap = MOTION_TAGS as unknown as MotionTagMap;
