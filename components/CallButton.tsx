import { PHONE } from '@/lib/content';
import Magnetic from '@/components/motion/Magnetic';

/**
 * Every tel: link on the site goes through this component, which is how
 * `data-call-cta` is guaranteed to be present on all of them for call
 * tracking. The label is passed in — plan cards supply "Call to order" or
 * "Call for pricing" from lib/content.ts, and only the header and footer
 * render the raw number.
 */

type Variant = 'primary' | 'onDark' | 'outline' | 'ghost';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-spark-500 text-white shadow-[0_10px_28px_-12px_rgba(141,59,144,0.9)] hover:bg-spark-600',
  onDark:
    'bg-white text-spark-700 shadow-[0_10px_30px_-14px_rgba(61,25,64,0.7)] hover:bg-spark-50',
  outline:
    'border border-spark-300 bg-white text-spark-600 hover:border-spark-500 hover:bg-spark-50',
  ghost:
    'border border-spark-200 bg-spark-50 text-spark-700 hover:bg-spark-100',
};

const SIZES = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-7 text-base',
} as const;

export default function CallButton({
  label,
  variant = 'primary',
  size = 'md',
  className = '',
  magnetic = true,
  fullWidth = false,
  showIcon = true,
}: {
  label: string;
  variant?: Variant;
  size?: keyof typeof SIZES;
  className?: string;
  magnetic?: boolean;
  fullWidth?: boolean;
  showIcon?: boolean;
}) {
  const anchor = (
    <a
      href={PHONE.href}
      data-call-cta
      aria-label={`${label} — ${PHONE.display}`}
      className={`group/cta inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-200 ${
        VARIANTS[variant]
      } ${SIZES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {showIcon && (
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="size-[1.05em] shrink-0 transition-transform duration-300 group-hover/cta:-rotate-12"
        >
          <path
            d="M6.3 3.2 4.1 4.6a2 2 0 0 0-.8 2.3 15.4 15.4 0 0 0 9.8 9.8 2 2 0 0 0 2.3-.8l1.4-2.2a1 1 0 0 0-.3-1.4l-2.6-1.6a1 1 0 0 0-1.3.2l-.9 1.1a11.6 11.6 0 0 1-4.4-4.4l1.1-.9a1 1 0 0 0 .2-1.3L7 3.5a1 1 0 0 0-.7-.3Z"
            fill="currentColor"
          />
        </svg>
      )}
      <span>{label}</span>
    </a>
  );

  // A full-width button has nowhere to travel without pushing past its
  // container, so the magnet is skipped there rather than risking overflow.
  if (!magnetic || fullWidth) return anchor;

  return <Magnetic className="inline-flex">{anchor}</Magnetic>;
}
