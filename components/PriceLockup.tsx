import { hasPrice, type PlanItem } from '@/lib/content';

/**
 * The single price lockup used everywhere on the site: plan cards, the hero
 * anchor, the comparison grid. It reads a PlanItem and renders nothing that
 * is not in the data, so an unpriced plan degrades to a "Call for pricing"
 * line rather than an empty dollar sign.
 *
 * Layout is a flex row: dollar sign, dominant integer, muted cents stacked
 * over the billing period.
 */

type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<
  Size,
  { integer: string; dollar: string; cents: string; gap: string }
> = {
  // The dominant integer stays inside the 2.5rem – 3.5rem band at every size.
  sm: {
    integer: 'text-[2.5rem] leading-[0.88]',
    dollar: 'text-lg',
    cents: 'text-xs',
    gap: 'gap-1',
  },
  md: {
    integer: 'text-[3rem] leading-[0.86]',
    dollar: 'text-xl',
    cents: 'text-[0.8125rem]',
    gap: 'gap-1.5',
  },
  lg: {
    integer: 'text-[3.5rem] leading-[0.84]',
    dollar: 'text-2xl',
    cents: 'text-sm',
    gap: 'gap-1.5',
  },
};

export default function PriceLockup({
  plan,
  size = 'md',
  tone = 'dark',
  period = '/mo.',
}: {
  plan: PlanItem;
  size?: Size;
  /** `dark` = dark ink on light surfaces. `light` = white on navy. */
  tone?: 'dark' | 'light';
  period?: string;
}) {
  const s = SIZES[size];

  const integerTone = tone === 'light' ? 'text-white' : 'text-ink';
  const dollarTone = tone === 'light' ? 'text-white/80' : 'text-spark-500';
  const mutedTone = tone === 'light' ? 'text-white/65' : 'text-mute';

  if (!hasPrice(plan)) {
    return (
      <p
        className={`font-semibold tracking-tight ${
          tone === 'light' ? 'text-white/90' : 'text-ink'
        } ${size === 'lg' ? 'text-2xl' : 'text-xl'}`}
      >
        Pricing by address
        <span className={`mt-1 block text-sm font-normal ${mutedTone}`}>
          Rates depend on the plan and your location.
        </span>
      </p>
    );
  }

  return (
    <p className={`flex items-start ${s.gap}`}>
      <span className="sr-only">
        {`$${plan.price}${plan.cents ? `.${plan.cents}` : ''} per month`}
      </span>

      <span aria-hidden="true" className="flex items-start">
        <span className={`mt-1 font-semibold ${s.dollar} ${dollarTone}`}>$</span>

        <span
          className={`font-bold tracking-[-0.03em] tabular-nums ${s.integer} ${integerTone}`}
        >
          {plan.price}
        </span>

        <span className={`ml-1 flex flex-col pt-1 ${s.cents} ${mutedTone}`}>
          {plan.cents ? (
            <span className="font-semibold tabular-nums leading-none">
              {plan.cents}
            </span>
          ) : null}
          <span className="mt-0.5 font-medium leading-none">{period}</span>
        </span>
      </span>
    </p>
  );
}
