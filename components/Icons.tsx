import type { ReactElement, SVGProps } from 'react';

/**
 * Inline stroke icons. Kept in one file and referenced by key from
 * lib/content.ts, so a feature can change its icon without touching layout.
 */

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const ICONS: Record<
  string,
  (p: SVGProps<SVGSVGElement>) => ReactElement
> = {
    fiber: (p) => (
      <svg {...base} {...p}>
        <path d="M3 12h4M17 12h4" />
        <path d="M7 12c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5Z" />
        <path d="M12 3v2M12 19v2" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    ),
    wifi: (p) => (
      <svg {...base} {...p}>
        <path d="M2.5 9a15 15 0 0 1 19 0" />
        <path d="M5.8 12.6a10 10 0 0 1 12.4 0" />
        <path d="M9 16.2a5 5 0 0 1 6 0" />
        <circle cx="12" cy="19.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
    infinity: (p) => (
      <svg {...base} {...p}>
        <path d="M7 8.5a3.5 3.5 0 1 0 0 7c2.4 0 3.3-2 5-3.5 1.7-1.5 2.6-3.5 5-3.5a3.5 3.5 0 1 1 0 7c-2.4 0-3.3-2-5-3.5-1.7-1.5-2.6-3.5-5-3.5Z" />
      </svg>
    ),
    truck: (p) => (
      <svg {...base} {...p}>
        <path d="M3 7h10v9H3z" />
        <path d="M13 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="1.8" />
        <circle cx="17" cy="18" r="1.8" />
      </svg>
    ),
    shield: (p) => (
      <svg {...base} {...p}>
        <path d="M12 3 5 6v5.5c0 4 2.9 7.6 7 9.5 4.1-1.9 7-5.5 7-9.5V6l-7-3Z" />
        <path d="m9.2 12 2 2 3.6-3.8" />
      </svg>
    ),
    phone: (p) => (
      <svg {...base} {...p}>
        <path d="M7.5 3.8 5.2 5.3a2.2 2.2 0 0 0-.9 2.5 17 17 0 0 0 10.9 10.9 2.2 2.2 0 0 0 2.5-.9l1.5-2.3-3.5-2.2-1.3 1.5a12.8 12.8 0 0 1-4.9-4.9l1.5-1.3-3.5-3.5Z" />
      </svg>
    ),
    check: (p) => (
      <svg {...base} {...p}>
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </svg>
    ),
    spark: (p) => (
      <svg {...base} {...p}>
        <path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5-2-6.5L3.5 11 10 9l2-6.5Z" />
      </svg>
    ),
    arrow: (p) => (
      <svg {...base} {...p}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    ),
    pin: (p) => (
      <svg {...base} {...p}>
        <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    ),
  };

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Found = ICONS[name] ?? ICONS.spark;
  return <Found className={className} />;
}
