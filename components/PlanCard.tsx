import Image from 'next/image';
import {
  ctaLabel,
  hasPrice,
  speedSummary,
  type PlanItem,
  type SiteImage,
} from '@/lib/content';
import CallButton from '@/components/CallButton';
import PriceLockup from '@/components/PriceLockup';
import { StaggerItem } from '@/components/motion/Reveal';
import { Icon } from '@/components/Icons';

/**
 * One plan card. Everything it shows — name, speed, price, qualifier, fees,
 * CTA wording — is derived from the PlanItem it is handed. There is no plan
 * data in this file.
 *
 * Card order is fixed: header, price, features, fine print, then the call
 * button as the last element. The CTA always sits flush at the bottom of the
 * card, and `mt-auto` keeps it aligned across cards of different heights.
 *
 * Hover is deliberately minimal — a small lift, a border tint and a slightly
 * deeper shadow. No tilt, no glare.
 *
 * `backgroundImage` puts a photograph behind the whole card. A card carries a
 * lot of small text — name, blurb, price line, four features, three fine-print
 * rows — and a tint flat enough to keep all of that legible would leave almost
 * nothing of the picture showing. So the photo is given the top of the card to
 * itself and the copy sits below it, with a gradient handling the join: the
 * picture reads at full strength where there is no text, and the content sits
 * on effectively solid white.
 */
export default function PlanCard({
  plan,
  compact = false,
  backgroundImage,
}: {
  plan: PlanItem;
  compact?: boolean;
  backgroundImage?: SiteImage;
}) {
  const speed = speedSummary(plan);
  const priced = hasPrice(plan);

  return (
    <StaggerItem as="li" className="min-w-0">
      <div
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 ${
          plan.isPopular
            ? 'border-spark-300 shadow-[0_16px_40px_-32px_rgba(141,59,144,0.75)] hover:border-spark-500 hover:shadow-[0_26px_56px_-34px_rgba(141,59,144,0.55)]'
            : 'border-line shadow-[0_12px_32px_-30px_rgba(46,54,68,0.6)] hover:border-spark-300 hover:shadow-[0_24px_52px_-34px_rgba(46,54,68,0.4)]'
        }`}
      >
        {/* ---- Photographic header -------------------------------
            The image box is the 208px band ONLY, never the whole card.
            Stretching it over the full card makes `object-cover` solve
            against a tall narrow box: measured at 337x778 it rendered the
            frame at 1265px wide and threw away 930px of it, leaving 26%
            of the width — and the visible band was only the top 27% of
            that. Roughly 7% of the photograph reached the screen, all of
            it out-of-focus wall, with the subject cropped out entirely.

            Bounded to the band, cover solves against 337x208 instead, which
            is very close to the source aspect, so almost the whole frame
            survives. */}
        {backgroundImage && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-52 overflow-hidden"
          >
            <Image
              src={backgroundImage.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 60vw, 92vw"
              className="object-cover object-center"
            />
            {/* Fades the foot of the band into the card so the join is not
                a hard edge. Percentages are fine here — unlike the card,
                the band has a fixed height. */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_56%,rgba(255,255,255,0.88)_86%,#fff_100%)]" />
          </div>
        )}

        {/* Popular plans get a gradient rail along the top edge. */}
        {plan.isPopular && (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-spark-500 via-spark-400 to-gold-400"
          />
        )}

        {/* Padding is composed rather than layered. Appending `pt-52` to
            `p-6 sm:p-7` does not work: `sm:p-7` lives in a media query, so
            from 640px up it wins over the unprefixed `pt-52` and the copy
            climbs back onto the photograph. The photo variant therefore sets
            its sides and bottom only, leaving padding-top uncontested. */}
        <div
          className={`relative flex h-full flex-col ${
            backgroundImage
              ? 'px-6 pb-6 pt-52 sm:px-7 sm:pb-7'
              : compact
                ? 'p-5 sm:p-6'
                : 'p-6 sm:p-7'
          }`}
        >
          {/* ---- Header --------------------------------------------- */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[1.0625rem] font-bold leading-snug tracking-tight text-ink sm:text-lg">
              {plan.name}
            </h3>

            {plan.isPopular && (
              <span className="shrink-0 rounded-full bg-spark-100 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.08em] text-spark-700">
                Popular
              </span>
            )}
          </div>

          {speed && (
            <p className="mt-1.5 text-sm font-semibold text-spark-600">
              {speed}
            </p>
          )}

          {plan.blurb && (
            <p className="pretty mt-2 text-[0.8125rem] leading-relaxed text-mute">
              {plan.blurb}
            </p>
          )}

          {/* ---- Price lockup --------------------------------------- */}
          <div className="mt-5 min-h-[4.5rem]">
            <PriceLockup plan={plan} size={compact ? 'sm' : 'md'} />
          </div>

          {/* ---- Features ------------------------------------------- */}
          <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-body"
              >
                <Icon
                  name="check"
                  className="mt-px size-4 shrink-0 text-spark-500"
                />
                <span className="min-w-0">{feature}</span>
              </li>
            ))}
          </ul>

          {/* ---- Fine print ------------------------------------------ */}
          <dl className="mt-5 space-y-1.5 border-t border-line pt-4 text-xs leading-relaxed text-mute">
            {plan.equipmentFee && (
              <div className="flex gap-1.5">
                <dt className="shrink-0 font-semibold text-body">Equipment:</dt>
                <dd className="min-w-0">{plan.equipmentFee}</dd>
              </div>
            )}
            {plan.dataPolicy && (
              <div className="flex gap-1.5">
                <dt className="shrink-0 font-semibold text-body">Data:</dt>
                <dd className="min-w-0">{plan.dataPolicy}</dd>
              </div>
            )}
            {plan.contractTerm && (
              <div className="flex gap-1.5">
                <dt className="shrink-0 font-semibold text-body">Term:</dt>
                <dd className="min-w-0">{plan.contractTerm}</dd>
              </div>
            )}
          </dl>

          {plan.promoQualifier && (
            <p className="mt-3 text-[0.6875rem] leading-relaxed text-mute/85">
              {priced ? '' : 'Availability: '}
              {plan.promoQualifier}
            </p>
          )}

          {/* ---- CTA: always the last element in the card -------------
              `mt-auto` pushes it to the bottom edge, so the buttons line up
              across a row even when the cards carry different amounts of
              copy. */}
          <div className="mt-auto pt-6">
            <CallButton
              label={ctaLabel(plan)}
              variant={plan.isPopular ? 'primary' : 'outline'}
              size="md"
              fullWidth
            />
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}
