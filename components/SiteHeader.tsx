'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import { useEffect, useId, useState } from 'react';
import { NAV_LINKS, PHONE, RETAILER } from '@/lib/content';
import Magnetic from '@/components/motion/Magnetic';

/* -------------------------------------------------------------------------
   Wordmark — drawn in the official Sparklight purple, with the spark glyph
   as the mark.
   ------------------------------------------------------------------------- */

function Wordmark() {
  return (
    <a
      href="#top"
      className="group inline-flex shrink-0 items-center gap-2.5"
      aria-label={`${RETAILER.name} — home`}
    >
      <span className="relative inline-flex size-9 items-center justify-center rounded-xl bg-spark-500 shadow-[0_8px_20px_-10px_rgba(141,59,144,0.9)]">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path
            d="M12 2.4 14.1 9 20.8 11l-6.7 2-2.1 6.6L9.9 13 3.2 11 9.9 9 12 2.4Z"
            fill="#ffffff"
          />
        </svg>
      </span>

      <span className="flex min-w-0 flex-col leading-none">
        <span className="text-[1.0625rem] font-bold tracking-[-0.02em] text-ink sm:text-[1.125rem]">
          {RETAILER.name}
        </span>
        {/* Hidden on the narrowest screens so the wordmark, call button and
            menu button all fit the bar at 320px. */}
        <span className="mt-0.5 hidden whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-spark-600 min-[420px]:block">
          {RETAILER.eyebrow}
        </span>
      </span>
    </a>
  );
}

const PhoneGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className={className}>
    <path
      d="M6.3 3.2 4.1 4.6a2 2 0 0 0-.8 2.3 15.4 15.4 0 0 0 9.8 9.8 2 2 0 0 0 2.3-.8l1.4-2.2a1 1 0 0 0-.3-1.4l-2.6-1.6a1 1 0 0 0-1.3.2l-.9 1.1a11.6 11.6 0 0 1-4.4-4.4l1.1-.9a1 1 0 0 0 .2-1.3L7 3.5a1 1 0 0 0-.7-.3Z"
      fill="currentColor"
    />
  </svg>
);

/* ------------------------------------------------------------------------- */

export default function SiteHeader() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (value) => {
    setLifted(value > 12);
    // A dropdown anchored to the header should not trail the page as it
    // scrolls away from it.
    if (open && value > 12) setOpen(false);
  });

  // Escape closes, and focus is not trapped because this is a dropdown
  // rather than a modal — the rest of the page stays operable.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="sticky top-0 z-50">
      {/* ---- Top disclosure bar: always present, no dismiss control ---- */}
      <div className="bg-spark-500 text-white">
        <div className="shell flex min-h-9 items-center justify-center py-1.5">
          <p className="text-center text-xs font-medium tracking-[0.02em] text-white">
            {RETAILER.disclosure}
          </p>
        </div>
      </div>

      {/* ---- Sticky header ---------------------------------------------- */}
      <motion.header
        animate={{
          backgroundColor: lifted
            ? 'rgba(255,255,255,0.9)'
            : 'rgba(255,255,255,1)',
          boxShadow: lifted
            ? '0 10px 30px -24px rgba(46,54,68,0.6)'
            : '0 0 0 0 rgba(46,54,68,0)',
        }}
        transition={{ duration: 0.3 }}
        className="border-b border-line backdrop-blur-md"
      >
        <div className="shell flex h-16 items-center justify-between gap-2 sm:h-[4.25rem] sm:gap-3">
          <Wordmark />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative inline-flex h-11 items-center rounded-full px-4 text-sm font-medium text-body transition-colors hover:text-spark-600"
                  >
                    {link.label}
                    <span className="absolute inset-x-4 bottom-2 h-px origin-left scale-x-0 bg-spark-500 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* The header and footer are the only places the raw number is
                shown as the button label. Below 640px it collapses to an
                icon so the bar still fits a 320px screen; the full number
                is then given prominence inside the menu. */}
            <Magnetic className="inline-flex shrink-0">
              <a
                href={PHONE.href}
                data-call-cta
                aria-label={`Call ${PHONE.display}`}
                className="group/cta inline-flex size-11 items-center justify-center gap-2 rounded-full bg-spark-500 font-semibold tracking-tight text-white shadow-[0_10px_26px_-14px_rgba(141,59,144,0.95)] transition-colors hover:bg-spark-600 sm:size-auto sm:h-11 sm:px-5 sm:text-sm"
              >
                <PhoneGlyph className="size-[1.125rem] shrink-0 transition-transform duration-300 group-hover/cta:-rotate-12 sm:size-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {PHONE.display}
                </span>
              </a>
            </Magnetic>

            {/* ---- Menu toggle, below the desktop breakpoint ---------- */}
            <button
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-spark-300 hover:text-spark-600 lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <motion.path
                  d="M4 7h16"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  animate={open ? { d: 'M6 6l12 12' } : { d: 'M4 7h16' }}
                  transition={{ duration: 0.26 }}
                />
                <motion.path
                  d="M4 12h16"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  animate={{ opacity: open ? 0 : 1 }}
                  transition={{ duration: 0.18 }}
                />
                <motion.path
                  d="M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  animate={open ? { d: 'M6 18l12 -12' } : { d: 'M4 17h16' }}
                  transition={{ duration: 0.26 }}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ---- Mobile menu panel ----------------------------------- */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={menuId}
              key="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.2 },
              }}
              className="overflow-hidden border-t border-line bg-white lg:hidden"
            >
              <div className="shell py-3">
                <ul className="flex flex-col">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-12 items-center rounded-xl px-3 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-spark-50 hover:text-spark-600"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <a
                  href={PHONE.href}
                  data-call-cta
                  onClick={() => setOpen(false)}
                  className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-spark-500 px-4 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-spark-600"
                >
                  <PhoneGlyph className="size-4 shrink-0" />
                  {PHONE.display}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
