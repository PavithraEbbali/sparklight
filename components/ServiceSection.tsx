import Image from 'next/image';
import {
  ACTIVE_SECTIONS,
  getPlansByLine,
  type ServiceSectionMeta,
} from '@/lib/content';
import PlanCard from '@/components/PlanCard';
import SectionMedia from '@/components/SectionMedia';
import Aurora from '@/components/motion/Aurora';
import SectionWipe from '@/components/motion/SectionWipe';
import { Reveal, StaggerGroup, TextReveal } from '@/components/motion/Reveal';

/**
 * Renders one service line. Driven entirely by ACTIVE_SECTIONS in
 * lib/content.ts — a service line with no plans never reaches this component,
 * so there are no empty placeholders anywhere on the page.
 */

/**
 * The requested column count is capped at the number of plans that actually
 * exist, so a service line with a single plan renders one deliberate card
 * rather than a card beside an empty grid cell.
 */
const COLUMN_CLASS: Record<1 | 2 | 3 | 4, string> = {
  1: 'max-w-md',
  2: 'sm:grid-cols-2 lg:max-w-4xl',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 xl:grid-cols-4',
};

export default function ServiceSection({
  meta,
  index,
}: {
  meta: ServiceSectionMeta;
  index: number;
}) {
  const plans = getPlansByLine(meta.line);
  if (plans.length === 0) return null;

  // Alternate surfaces so consecutive sections stay visually separated.
  const tinted = index % 2 === 1;

  const asBackground = meta.image && meta.imageMode === 'background';
  const asCard = meta.image && meta.imageMode === 'card';
  const asSide =
    meta.image && meta.imageMode !== 'background' && meta.imageMode !== 'card';

  /* Which side the photo sits on alternates by position among the sections
     that actually carry a side photo — not by position among all sections.
     Counting all of them put two consecutive photos on the same side once
     the phone section gained one. */
  const sideIndex = ACTIVE_SECTIONS.filter(
    (s) => s.image && s.imageMode !== 'background'
  ).findIndex((s) => s.line === meta.line);
  const imageOnLeft = sideIndex % 2 === 1;

  return (
    <SectionWipe
      variant={index % 3 === 2 ? 'diagonal' : 'up'}
      className={
        asBackground ? 'bg-white' : tinted ? 'bg-surface' : 'bg-white'
      }
    >
      <section
        id={`plans-${meta.line}`}
        aria-labelledby={`plans-${meta.line}-heading`}
        className="relative isolate scroll-mt-32 overflow-hidden py-16 sm:py-20 lg:py-24"
      >
        {/* ---- Full-bleed background photograph ---------------------
            The photo covers the whole section, and the white wash is kept
            as thin as the numbers allow so the picture actually reads.

            It is a gradient, not a flat tint, because the text does not
            occupy the whole section. On wide screens it runs left to right
            and the right of the frame is left almost clear. On a phone it
            runs top to bottom: dense where the heading and intro sit, then
            opening up over the rest, where the only content is the plan
            card — which is opaque white and never needed the help.

            A flat tint light enough to show the photo put the intro at
            4.03:1, under the floor. The gradient shows more of the picture
            AND reads better. Measured, not guessed; table in ai.wing. */}
        {asBackground && meta.image && (
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <Image
              src={meta.image.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/55 to-white/20 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/70 lg:to-white/5" />
          </div>
        )}

        {!asBackground && <Aurora tone="subtle" />}

        <div className="shell">
          {/* ---- Section header -------------------------------------
              With a side photograph the header becomes two columns; the
              image side alternates so consecutive illustrated sections do
              not read as a repeating template. */}
          <div
            className={
              asSide
                ? 'grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14'
                : ''
            }
          >
          <div className={asCard ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
            <Reveal direction="none" duration={0.55}>
              <p
                className={`inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.18em] ${
                  asBackground ? 'text-spark-700' : 'text-spark-600'
                }`}
              >
                <span className={asCard ? 'hidden' : 'h-px w-6 bg-spark-500'} />
                {meta.eyebrow}
              </p>
            </Reveal>

            <TextReveal
              as="h2"
              id={`plans-${meta.line}-heading`}
              text={meta.heading}
              className="balance mt-4 text-[1.75rem] font-bold leading-[1.12] tracking-[-0.03em] text-ink sm:text-4xl"
            />

            <Reveal delay={0.12}>
              <p
                className={`pretty mt-4 text-[0.9375rem] leading-relaxed sm:text-base ${
                  asBackground ? 'font-medium text-ink' : 'text-body'
                }`}
              >
                {meta.intro}
              </p>
            </Reveal>
          </div>

            {asSide && meta.image && (
              <SectionMedia
                image={meta.image}
                className={imageOnLeft ? 'lg:order-first' : ''}
              />
            )}
          </div>

          {/* ---- Cards ---------------------------------------------- */}
          <StaggerGroup
            as="ul"
            className={`mt-10 grid grid-cols-1 gap-5 sm:mt-12 ${
              COLUMN_CLASS[
                Math.min(meta.columns, plans.length) as 1 | 2 | 3 | 4
              ]
            } ${asCard ? 'mx-auto' : ''}`}
          >
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                compact={meta.columns === 4}
                backgroundImage={asCard ? meta.image : undefined}
              />
            ))}
          </StaggerGroup>
        </div>
      </section>
    </SectionWipe>
  );
}
