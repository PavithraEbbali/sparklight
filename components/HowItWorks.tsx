import Image from 'next/image';
import { IMAGES, STEPS, WHY_US } from '@/lib/content';
import SectionMedia from '@/components/SectionMedia';
import CallButton from '@/components/CallButton';
import Aurora from '@/components/motion/Aurora';
import SectionWipe from '@/components/motion/SectionWipe';
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
  TextReveal,
} from '@/components/motion/Reveal';
import { Icon } from '@/components/Icons';

/**
 * Two blocks:
 *   1. "How it works" — the four ordering steps, as a numbered grid.
 *   2. "Why order here" — the benefits grid and the closing call to action.
 *
 * Both sit on light ground with drifting brand light behind them.
 */
export default function HowItWorks() {
  return (
    <>
      {/* ---- How it works -------------------------------------------- */}
      <SectionWipe variant="up" className="bg-white">
        <section
          id="how-it-works"
          aria-labelledby="how-it-works-heading"
          className="relative isolate scroll-mt-32 overflow-hidden py-16 sm:py-20 lg:py-24"
        >
          <Aurora tone="subtle" />

          <div className="shell">
            <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="max-w-3xl">
              <Reveal direction="none" duration={0.55}>
                <p className="inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-spark-600">
                  <span className="h-px w-6 bg-spark-500" />
                  How it works
                </p>
              </Reveal>

              <TextReveal
                as="h2"
                id="how-it-works-heading"
                text="Ordering in four steps"
                className="balance mt-4 text-[1.75rem] font-bold leading-[1.12] tracking-[-0.03em] text-ink sm:text-4xl"
              />

              <Reveal delay={0.12}>
                <p className="pretty mt-4 text-[0.9375rem] leading-relaxed text-body sm:text-base">
                  From confirming availability at your address to booking the
                  installation, the whole process is handled on a single call
                  with an authorized retailer.
                </p>
              </Reveal>
            </div>

              <SectionMedia image={IMAGES.install} />
            </div>

            <StaggerGroup
              as="ol"
              className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4"
            >
              {STEPS.map((step, i) => (
                <StaggerItem
                  as="li"
                  key={step.title}
                  className="group min-w-0 rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-spark-300 hover:shadow-[0_24px_52px_-34px_rgba(46,54,68,0.4)]"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-spark-50 text-sm font-bold tabular-nums text-spark-600 ring-1 ring-inset ring-spark-200 transition-colors duration-300 group-hover:bg-spark-500 group-hover:text-white group-hover:ring-spark-500">
                    {i + 1}
                  </span>

                  <h3 className="mt-5 text-[1.0625rem] font-bold tracking-tight text-ink">
                    {step.title}
                  </h3>

                  <p className="pretty mt-2 text-[0.8125rem] leading-relaxed text-body">
                    {step.body}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      </SectionWipe>

      {/* ---- Why us --------------------------------------------------- */}
      <SectionWipe variant="up" className="bg-surface">
        <section
          id="why-us"
          aria-labelledby="why-us-heading"
          className="relative isolate scroll-mt-32 overflow-hidden py-16 sm:py-20 lg:py-24"
        >
          <Aurora tone="subtle" />

          <div className="shell">
            <div className="max-w-3xl">
              <Reveal direction="none" duration={0.55}>
                <p className="inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-spark-600">
                  <span className="h-px w-6 bg-spark-500" />
                  Why order here
                </p>
              </Reveal>

              <TextReveal
                as="h2"
                id="why-us-heading"
                text="Built on the Sparklight network"
                className="balance mt-4 text-[1.75rem] font-bold leading-[1.12] tracking-[-0.03em] text-ink sm:text-4xl"
              />

              <Reveal delay={0.12}>
                <p className="pretty mt-4 text-[0.9375rem] leading-relaxed text-body sm:text-base">
                  The connection, the equipment and the installation all come
                  from Sparklight. What we add is the time to get the order
                  right the first time.
                </p>
              </Reveal>
            </div>

            <StaggerGroup
              as="ul"
              className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
            >
              {WHY_US.map((feature) => (
                <StaggerItem
                  as="li"
                  key={feature.title}
                  className="group min-w-0 rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-spark-300 hover:shadow-[0_24px_52px_-34px_rgba(46,54,68,0.4)]"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-spark-50 text-spark-600 transition-colors duration-300 group-hover:bg-spark-500 group-hover:text-white">
                    <Icon name={feature.icon} className="size-5" />
                  </span>

                  <h3 className="mt-5 text-[1.0625rem] font-bold tracking-tight text-ink">
                    {feature.title}
                  </h3>

                  <p className="pretty mt-2.5 text-[0.8125rem] leading-relaxed text-body">
                    {feature.body}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* ---- Closing call to action ---------------------------- */}
            <Reveal delay={0.1} className="mt-12">
              <div className="overflow-hidden rounded-2xl border border-spark-200 bg-white shadow-[0_20px_50px_-40px_rgba(141,59,144,0.6)]">
                <span
                  aria-hidden="true"
                  className="block h-1 w-full bg-gradient-to-r from-spark-500 via-spark-400 to-gold-400"
                />

                <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
                  {/* ---- Copy and CTA ---------------------------- */}
                  <div className="relative order-2 p-7 sm:p-10 lg:order-1">
                    <div
                      aria-hidden="true"
                      className="aurora-b absolute left-[-14%] top-[-40%] size-[22rem] rounded-full bg-[radial-gradient(circle_closest-side,rgba(242,201,76,0.28),rgba(242,201,76,0)_72%)]"
                    />
                    <div className="relative">
                      <h3 className="balance text-xl font-bold tracking-tight text-ink sm:text-2xl">
                        Ready to size the right plan for your home?
                      </h3>
                      <p className="pretty mt-2.5 max-w-lg text-[0.9375rem] leading-relaxed text-body">
                        Tell us the address and how many people are online at
                        once. We will match the speed tier and the Wi-Fi
                        setup, then place the order on the call.
                      </p>
                      <div className="mt-6">
                        <CallButton
                          label="Call to order"
                          variant="primary"
                          size="lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ---- Photograph, flush to the panel edge ----- */}
                  <div className="relative order-1 min-h-[14rem] lg:order-2 lg:min-h-0">
                    <Image
                      src={IMAGES.family.src}
                      alt={IMAGES.family.alt}
                      fill
                      sizes="(min-width: 1024px) 26rem, 100vw"
                      className="object-cover"
                    />
                    {/* Fades the photo into the panel on the left edge so
                        the join does not read as a hard seam. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent lg:from-white lg:via-white/25"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </SectionWipe>
    </>
  );
}
