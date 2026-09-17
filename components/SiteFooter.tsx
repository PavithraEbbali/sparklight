import {
  FOOTER_COLUMNS,
  LEGAL,
  LOWEST_PRICE,
  PHONE,
  RETAILER,
  formatSpeed,
} from '@/lib/content';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Footer.
 *
 * Structure follows the reference build at bestfiberinternet.us — a brand
 * blurb beside three uppercase link columns, a contact block carrying the
 * raw number, then a dense "offer details and required disclosures" slab.
 *
 * The ground is light rather than dark: the site has no dark theme, so the
 * footer sits on the lavender surface tint and closes with a purple bar that
 * mirrors the disclosure bar at the top of the page.
 */
export default function SiteFooter() {
  const lowest = LOWEST_PRICE;

  return (
    <footer className="bg-surface text-body">
      <div className="shell pb-10 pt-16 sm:pt-[4.5rem]">
        {/* ---- Brand + link columns --------------------------------- */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.85fr)] lg:gap-16">
          <Reveal direction="none" duration={0.6} className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-spark-500">
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                  <path
                    d="M12 2.4 14.1 9 20.8 11l-6.7 2-2.1 6.6L9.9 13 3.2 11 9.9 9 12 2.4Z"
                    fill="#ffffff"
                  />
                </svg>
              </span>
              <span className="text-[1.0625rem] font-bold tracking-[-0.02em] text-ink">
                {RETAILER.name}
              </span>
            </div>

            <p className="pretty mt-5 max-w-sm text-[0.875rem] leading-relaxed text-body">
              Independent authorized retailer helping U.S. households order
              Sparklight Internet, TV, Mobile and Home Phone.
            </p>

            {lowest && (
              <p className="mt-4 text-[0.8125rem] text-mute">
                Plans from{' '}
                <span className="font-semibold text-ink">
                  ${lowest.price}
                  {lowest.cents ? `.${lowest.cents}` : ''}/mo.
                </span>{' '}
                {formatSpeed(lowest.speedDown)
                  ? `at ${formatSpeed(lowest.speedDown)}.`
                  : ''}
              </p>
            )}
          </Reveal>

          <div className="grid min-w-0 grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            {FOOTER_COLUMNS.map((column) => (
              <nav
                key={column.title}
                aria-label={column.title}
                className="min-w-0"
              >
                <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink">
                  {column.title}
                </h2>
                <ul className="mt-3 space-y-0.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex min-h-11 items-center text-[0.8125rem] leading-relaxed text-body transition-colors hover:text-spark-600 sm:min-h-9"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* ---- Contact block ---------------------------------------- */}
        <div className="mt-12 border-t border-line pt-8">
          <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink">
            Talk to a human
          </h2>

          {/* The footer is one of only two places the raw number is the
              link text; every other CTA says "Call to order". */}
          <a
            href={PHONE.href}
            data-call-cta
            className="mt-3 inline-block text-2xl font-bold tracking-[-0.02em] text-spark-600 transition-colors hover:text-spark-700 sm:text-[1.75rem]"
          >
            {PHONE.display}
          </a>

          <p className="mt-2.5 text-[0.8125rem] text-mute">
            Mon–Fri 8AM–9PM ET · Sat–Sun 9AM–6PM ET
          </p>
        </div>

        {/* ---- Required disclosures --------------------------------- */}
        <div className="mt-12 border-t border-line pt-8">
          <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink">
            Offer details &amp; required disclosures
          </h2>

          <div className="mt-5 space-y-4 text-[0.75rem] leading-relaxed text-mute">
            <p className="pretty">{LEGAL.disclosure}</p>
            <p className="pretty">{LEGAL.pricingNote}</p>
            <p className="pretty">{LEGAL.wifiNote}</p>
          </div>
        </div>

        {/* ---- Bottom bar ------------------------------------------- */}
        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-mute">
            © {new Date().getFullYear()} Independent Authorized Retailer of
            Sparklight. All rights reserved.
          </p>

          <p className="text-[0.75rem] font-medium text-body">
            {RETAILER.disclosure}
          </p>
        </div>
      </div>

      {/* Purple rule closing the page, mirroring the top disclosure bar. */}
      <div aria-hidden="true" className="h-1.5 w-full bg-spark-500" />
    </footer>
  );
}
