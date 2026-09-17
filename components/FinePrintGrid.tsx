import { FINE_PRINT, IMAGES } from '@/lib/content';
import SectionMedia from '@/components/SectionMedia';
import Aurora from '@/components/motion/Aurora';
import SectionWipe from '@/components/motion/SectionWipe';
import { Reveal, StaggerGroup, StaggerItem, TextReveal } from '@/components/motion/Reveal';

/**
 * The honest fine-print grid: hardware costs, monthly fees and inclusions,
 * stated plainly rather than buried in an asterisk.
 *
 * Renders as a real table on desktop and as stacked cards on mobile — one
 * data source, two layouts, so nothing is ever cut off at 320px.
 */
export default function FinePrintGrid() {
  return (
    <SectionWipe variant="up" className="bg-white">
      <section
        id="hardware"
        aria-labelledby="hardware-heading"
        className="relative isolate scroll-mt-32 overflow-hidden py-16 sm:py-20 lg:py-24"
      >
        <Aurora tone="subtle" />

        <div className="shell">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div className="max-w-3xl">
            <Reveal direction="none" duration={0.55}>
              <p className="inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-spark-600">
                <span className="h-px w-6 bg-spark-500" />
                Hardware and fees
              </p>
            </Reveal>

            <TextReveal
              as="h2"
              id="hardware-heading"
              text="Equipment, installation and monthly fees"
              className="balance mt-4 text-[1.75rem] font-bold leading-[1.12] tracking-[-0.03em] text-ink sm:text-4xl"
            />

            <Reveal delay={0.12}>
              <p className="pretty mt-4 text-[0.9375rem] leading-relaxed text-body sm:text-base">
                A line-by-line breakdown of the charges that sit alongside the
                monthly rate, so the total cost of service is clear before you
                order.
              </p>
            </Reveal>
          </div>

            <SectionMedia image={IMAGES.equipment} className="lg:order-first" />
          </div>

          {/* ---- Desktop table ------------------------------------- */}
          <Reveal delay={0.16} className="mt-10 hidden lg:block">
            <div className="overflow-hidden rounded-3xl border border-line">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Sparklight hardware costs, monthly service fees and
                  inclusions
                </caption>
                <thead>
                  <tr className="bg-spark-500 text-white">
                    <th
                      scope="col"
                      className="w-[30%] px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-[0.12em]"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="w-[22%] px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-[0.12em]"
                    >
                      Cost
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-[0.6875rem] font-bold uppercase tracking-[0.12em]"
                    >
                      What that means
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FINE_PRINT.map((row, i) => (
                    <tr
                      key={row.item}
                      className={`border-t border-line/80 transition-colors hover:bg-spark-50/60 ${
                        i % 2 === 1 ? 'bg-surface/50' : 'bg-white'
                      }`}
                    >
                      <th
                        scope="row"
                        className="px-6 py-5 align-top text-sm font-semibold text-ink"
                      >
                        {row.item}
                      </th>
                      <td className="px-6 py-5 align-top text-sm font-bold tabular-nums text-spark-600">
                        {row.cost}
                      </td>
                      <td className="pretty px-6 py-5 align-top text-[0.8125rem] leading-relaxed text-body">
                        {row.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* ---- Mobile / tablet cards ----------------------------- */}
          <StaggerGroup
            as="ul"
            className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden"
          >
            {FINE_PRINT.map((row) => (
              <StaggerItem
                as="li"
                key={row.item}
                className="min-w-0 rounded-2xl border border-line bg-white p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="text-[0.9375rem] font-semibold tracking-tight text-ink">
                    {row.item}
                  </h3>
                  <p className="text-sm font-bold tabular-nums text-spark-600">
                    {row.cost}
                  </p>
                </div>
                <p className="pretty mt-2.5 text-[0.8125rem] leading-relaxed text-mute">
                  {row.detail}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </SectionWipe>
  );
}
