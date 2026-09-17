/**
 * Ambient brand-light background.
 *
 * Four soft radial washes in Sparklight purple and gold, drifting on long
 * offset cycles behind a light section. Pure CSS keyframes — no canvas, no
 * rAF, no JavaScript at runtime — so it adds nothing to the main thread and
 * nothing to the JS bundle. `prefers-reduced-motion` freezes it in place
 * (handled in globals.css), and it is always `aria-hidden`.
 *
 * Performance note: these deliberately carry NO `blur` filter. A radial
 * gradient that fades to `transparent` is already soft, so a blur on top is
 * visually redundant but very expensive — it forces a large offscreen
 * compositing surface per wash, and this component is used in every section.
 *
 * Contrast note: the washes sit behind body copy on white, so their opacity
 * is not a free dial. The ceiling here is set by the smallest, lightest type
 * on the page (`--color-mute` at 13px), which needs 4.5:1. Values below were
 * raised as far as that allows and then measured — see ai.wing 0.4.1. Raising
 * them further means darkening `--color-mute` first.
 */
export default function Aurora({
  tone = 'subtle',
  className = '',
}: {
  tone?: 'subtle' | 'bold';
  className?: string;
}) {
  const bold = tone === 'bold';

  const purple = bold ? 0.34 : 0.16;
  const gold = bold ? 0.32 : 0.17;
  const lilac = bold ? 0.26 : 0.13;
  const accent = bold ? 0.2 : 0.11;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div
        className="aurora-a absolute -left-[20%] -top-[30%] size-[38rem] rounded-full sm:size-[52rem]"
        style={{
          background: `radial-gradient(circle closest-side, rgba(141,59,144,${purple}), rgba(141,59,144,0) 70%)`,
        }}
      />
      <div
        className="aurora-b absolute -right-[18%] top-[-16%] size-[34rem] rounded-full sm:size-[48rem]"
        style={{
          background: `radial-gradient(circle closest-side, rgba(242,201,76,${gold}), rgba(242,201,76,0) 70%)`,
        }}
      />
      <div
        className="aurora-c absolute bottom-[-34%] left-[20%] size-[32rem] rounded-full sm:size-[44rem]"
        style={{
          background: `radial-gradient(circle closest-side, rgba(176,111,181,${lilac}), rgba(176,111,181,0) 72%)`,
        }}
      />
      {/* Fourth wash, counter-drifting, so the loop never settles into a
          recognisable rhythm. */}
      <div
        className="aurora-d absolute -bottom-[26%] right-[6%] size-[28rem] rounded-full sm:size-[40rem]"
        style={{
          background: `radial-gradient(circle closest-side, rgba(224,177,52,${accent}), rgba(224,177,52,0) 72%)`,
        }}
      />
    </div>
  );
}
