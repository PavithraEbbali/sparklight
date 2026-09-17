import Image from 'next/image';
import {
  HERO,
  IMAGES,
  LEAD_PLAN,
  RETAILER,
  ctaLabel,
  hasPrice,
  speedSummary,
} from '@/lib/content';
import CallButton from '@/components/CallButton';
import PriceLockup from '@/components/PriceLockup';
import ZipChecker from '@/components/ZipChecker';
import Aurora from '@/components/motion/Aurora';
import { Reveal, TextReveal } from '@/components/motion/Reveal';
import { Icon } from '@/components/Icons';

/**
 * Hero.
 *
 *   left   — eyebrow, headline, subline, ZIP checker, call button, chips
 *   right  — the photograph, carrying the offer
 *   below  — the metric strip
 *
 * The offer used to be a full-width gold bar above everything, which read as
 * a second navigation strip and put the page's strongest commercial message
 * in its weakest position — a band people scroll past on the way to the
 * headline. It now sits on the photograph, so the picture and the price
 * reinforce each other instead of competing for attention.
 *
 * The photograph itself is highlighted rather than decorated: a brand-light
 * bloom behind the panel and a gradient hairline around it. Nothing is laid
 * over the picture except the two anchored overlays, so it still shows
 * untouched.
 *
 * Copy never sits on the photo, which is what keeps contrast fixed at every
 * viewport width — see the 0.4.0 note in ai.wing for why that matters.
 */

// Entrance timeline, in seconds.
const T = {
  eyebrow: 0.06,
  headline: 0.14,
  subline: 0.36,
  zip: 0.48,
  cta: 0.58,
  chips: 0.68,
  photo: 0.12,
  offer: 0.72,
  metrics: 0.8,
} as const;

export default function Hero() {
  const lead = LEAD_PLAN;
  const speed = speedSummary(lead);

  return (
    <section id="top" className="relative isolate overflow-hidden bg-white">
      <Aurora tone="bold" />

      <div className="shell relative pb-16 pt-10 sm:pt-14 lg:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
          {/* ================= Left: copy and controls ================= */}
          <div className="min-w-0">
            <Reveal direction="none" duration={0.6} delay={T.eyebrow} blur>
              <p className="inline-flex items-center gap-2 rounded-full border border-spark-200 bg-spark-50 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-spark-600">
                <span className="size-1.5 rounded-full bg-spark-500" />
                {RETAILER.eyebrow}
              </p>
            </Reveal>

            <TextReveal
              as="h1"
              text={HERO.h1}
              highlight={HERO.h1Highlight}
              delay={T.headline}
              className="balance mt-6 text-[2.125rem] font-bold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[2.75rem] lg:text-[3.25rem]"
            />

            <Reveal delay={T.subline} distance={20} blur className="mt-5">
              <p className="pretty max-w-xl text-[0.9375rem] leading-relaxed text-body sm:text-base">
                {HERO.subline}
              </p>
            </Reveal>

            <Reveal delay={T.zip} distance={20} blur className="mt-7">
              <ZipChecker tone="light" />
            </Reveal>

            <Reveal delay={T.cta} distance={20} blur className="mt-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <CallButton label="Call to order" variant="primary" size="lg" />
                <p className="text-[0.8125rem] text-mute">
                  Or order on the call with an authorized retailer.
                </p>
              </div>
            </Reveal>

            <Reveal delay={T.chips} distance={16} blur className="mt-7">
              <ul className="flex flex-wrap gap-2">
                {HERO.trustChips.map((chip) => (
                  <li
                    key={chip}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-[0.8125rem] font-medium text-body"
                  >
                    <Icon name="check" className="size-3.5 text-spark-500" />
                    {chip}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ============ Right: photograph, carrying the offer ============ */}
          <Reveal
            direction="left"
            distance={30}
            duration={0.95}
            delay={T.photo}
            blur
            className="min-w-0"
          >
            {/* Bottom padding leaves room for the offer card to hang below
                the frame without being clipped. */}
            <div className="relative mx-auto w-full max-w-[34rem] pb-24 sm:pb-20 lg:max-w-none">
              {/* Brand-light bloom behind the panel — the highlight. */}
              <div
                aria-hidden="true"
                className="aurora-b absolute -inset-5 -z-10 rounded-[2.5rem] bg-gradient-to-br from-spark-400/40 via-spark-200/25 to-gold-300/45 blur-2xl"
              />

              <div className="relative">
                {/* Gradient hairline, drawn as a padded wrapper so the ring
                    can carry a gradient rather than a flat border colour. */}
                <div className="rounded-[1.9rem] bg-gradient-to-br from-spark-400 via-spark-200 to-gold-400 p-[2px] shadow-[0_34px_80px_-48px_rgba(141,59,144,0.85)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.8rem] bg-surface">
                    <Image
                      src={IMAGES.hero.src}
                      alt={IMAGES.hero.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 46vw, (min-width: 640px) 90vw, 100vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>

                {/* Free-install roundel, top-right corner. */}
                <div className="absolute -right-3 -top-4 sm:-right-5 sm:-top-5">
                  <div className="flex size-[4.75rem] flex-col items-center justify-center rounded-full bg-spark-500 text-center shadow-[0_16px_34px_-14px_rgba(141,59,144,0.9)] ring-[5px] ring-white sm:size-[5.25rem]">
                    <span className="text-[0.625rem] font-bold uppercase leading-none tracking-[0.12em] text-gold-300">
                      Free
                    </span>
                    <span className="mt-1 text-[0.875rem] font-bold uppercase leading-none tracking-[0.02em] text-white">
                      Install
                    </span>
                  </div>
                </div>

                {/* ---- The offer, anchored to the foot of the photo ---- */}
                <Reveal
                  direction="none"
                  duration={0.7}
                  delay={T.offer}
                  blur
                  className="absolute inset-x-3 -bottom-16 sm:inset-x-6 sm:-bottom-12"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 p-4 shadow-[0_22px_48px_-24px_rgba(224,177,52,0.95)] ring-1 ring-inset ring-white/55 sm:p-5">
                    <span
                      aria-hidden="true"
                      className="offer-sheen pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/45"
                    />

                    <div className="relative flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <p className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-spark-500 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-white">
                          <Icon name="spark" className="size-3" />
                          {HERO.offerEyebrow}
                        </p>

                        <p className="flex min-w-0 flex-wrap items-baseline gap-x-2 text-sm font-bold tracking-tight text-spark-800">
                          <span>{lead.name}</span>
                          {speed && (
                            <span className="font-semibold text-gold-700">
                              {speed}
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        {hasPrice(lead) && (
                          <PriceLockup plan={lead} size="sm" />
                        )}
                        <CallButton
                          label={ctaLabel(lead)}
                          variant="primary"
                          size="md"
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ================= Metric strip ================= */}
        <Reveal delay={T.metrics} distance={20} blur className="mt-20 sm:mt-16">
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {HERO.highlights.map((item) => (
              <div key={item.value} className="bg-white/85 px-5 py-6 backdrop-blur-sm">
                <dt className="text-[1.0625rem] font-bold tracking-tight text-ink sm:text-lg">
                  {item.value}
                </dt>
                <dd className="mt-1 text-[0.8125rem] text-mute">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
