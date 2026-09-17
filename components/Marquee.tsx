import { MARQUEE_ITEMS } from '@/lib/content';

/**
 * Infinite trust-marker ticker.
 *
 * The track holds the list twice and translates by exactly -50%, which is
 * what makes the loop seamless. It is a CSS keyframe animation rather than
 * JS, so it runs on the compositor and costs nothing on the main thread.
 * Duration scales with the item count so adding entries does not speed it up.
 */
export default function Marquee({
  tone = 'light',
}: {
  tone?: 'light' | 'brand';
}) {
  const items = MARQUEE_ITEMS;
  const duration = `${items.length * 5.5}s`;

  const brand = tone === 'brand';

  const surface = brand
    ? 'border-y border-spark-200 bg-spark-50 text-spark-800'
    : 'border-y border-line bg-surface text-body';

  const fade = brand ? 'from-spark-50' : 'from-surface';

  return (
    <div
      className={`marquee-host relative isolate overflow-hidden ${surface}`}
      // Decorative repetition — the same facts appear in the sections below.
      aria-hidden="true"
    >
      <div
        className="marquee-track flex w-max items-center"
        style={{ ['--marquee-duration' as string]: duration }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex shrink-0 items-center gap-3 whitespace-nowrap px-5 py-3.5 text-[0.8125rem] font-medium tracking-tight sm:px-7 sm:text-sm"
              >
                <span
                  className={`size-1.5 shrink-0 rounded-full ${
                    brand ? 'bg-spark-500' : 'bg-gold-400'
                  }`}
                />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Edge fades so items dissolve rather than clipping at the bounds. */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r to-transparent sm:w-20 ${fade}`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l to-transparent sm:w-20 ${fade}`}
      />
    </div>
  );
}
