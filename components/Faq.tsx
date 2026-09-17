'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { FAQS } from '@/lib/content';
import CallButton from '@/components/CallButton';
import Aurora from '@/components/motion/Aurora';
import SectionWipe from '@/components/motion/SectionWipe';
import { Reveal, TextReveal } from '@/components/motion/Reveal';

/**
 * FAQ accordion.
 *
 * Built from buttons and a controlled height animation rather than <details>,
 * so the open/close can be animated and only one panel is open at a time.
 * Each button carries aria-expanded and aria-controls, and the panel is
 * removed from the tree when closed.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionWipe variant="up" className="bg-surface">
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="relative isolate scroll-mt-32 overflow-hidden py-16 sm:py-20 lg:py-24"
      >
        <Aurora tone="subtle" />

        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            {/* ---- Sticky intro --------------------------------------- */}
            <div className="min-w-0">
              <div className="lg:sticky lg:top-36">
                <Reveal direction="none" duration={0.55}>
                  <p className="inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-spark-600">
                    <span className="h-px w-6 bg-spark-500" />
                    FAQ
                  </p>
                </Reveal>

                <TextReveal
                  as="h2"
                  id="faq-heading"
                  text="Questions worth asking first"
                  className="balance mt-4 text-[1.75rem] font-bold leading-[1.12] tracking-[-0.03em] text-ink sm:text-4xl"
                />

                <Reveal delay={0.12}>
                  <p className="pretty mt-4 text-[0.9375rem] leading-relaxed text-body">
                    Equipment, installation, speeds and eligibility — the
                    details that decide which plan is the right one.
                  </p>
                </Reveal>

                <Reveal delay={0.2} className="mt-7 hidden lg:block">
                  <CallButton label="Call to order" variant="primary" />
                </Reveal>
              </div>
            </div>

            {/* ---- Accordion ------------------------------------------ */}
            <Reveal delay={0.1} className="min-w-0">
              <ul className="divide-y divide-line/80 overflow-hidden rounded-3xl border border-line bg-white">
                {FAQS.map((faq, i) => {
                  const isOpen = open === i;
                  const panelId = `faq-panel-${i}`;
                  const buttonId = `faq-button-${i}`;

                  return (
                    <li key={faq.q} className="min-w-0">
                      <h3>
                        <button
                          type="button"
                          id={buttonId}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen(isOpen ? null : i)}
                          className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-spark-50/50 sm:px-7"
                        >
                          <span className="min-w-0 text-[0.9375rem] font-semibold leading-snug tracking-tight text-ink sm:text-base">
                            {faq.q}
                          </span>

                          <span
                            aria-hidden="true"
                            className={`mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                              isOpen
                                ? 'border-spark-500 bg-spark-500 text-white'
                                : 'border-line text-mute'
                            }`}
                          >
                            <motion.svg
                              viewBox="0 0 16 16"
                              className="size-3.5"
                              animate={{ rotate: isOpen ? 45 : 0 }}
                              transition={{
                                duration: 0.32,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <path
                                d="M8 3v10M3 8h10"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                              />
                            </motion.svg>
                          </span>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="panel"
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: {
                                duration: 0.38,
                                ease: [0.22, 1, 0.36, 1],
                              },
                              opacity: { duration: 0.22 },
                            }}
                            className="overflow-hidden"
                          >
                            <p className="pretty px-5 pb-6 pr-12 text-[0.875rem] leading-relaxed text-body sm:px-7 sm:pr-16">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-7 lg:hidden">
                <CallButton label="Call to order" variant="primary" fullWidth />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </SectionWipe>
  );
}
