import { ACTIVE_SECTIONS } from '@/lib/content';
import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ServiceSection from '@/components/ServiceSection';
import FinePrintGrid from '@/components/FinePrintGrid';
import HowItWorks from '@/components/HowItWorks';
import Faq from '@/components/Faq';
import SiteFooter from '@/components/SiteFooter';

/**
 * Canonical page order:
 *   1  top disclosure bar          (inside SiteHeader)
 *   2  sticky header               (inside SiteHeader)
 *   3  hero
 *   -  trust marquee
 *   4  service lines, in the order set by ACTIVE_SECTIONS:
 *        fiber -> cable -> bundle -> tv -> mobile -> phone
 *      A line with no plans in lib/content.ts is dropped entirely, so the
 *      page never renders an empty section or a placeholder card.
 *   7  fine-print grid
 *   8  how it works / why us
 *   9  FAQ
 *  10  footer
 */
export default function Page() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Hero />

        <Marquee tone="brand" />

        <div id="plans" className="scroll-mt-32">
          {ACTIVE_SECTIONS.map((meta, index) => (
            <ServiceSection key={meta.line} meta={meta} index={index} />
          ))}
        </div>

        <FinePrintGrid />

        <HowItWorks />

        <Faq />
      </main>

      <SiteFooter />
    </>
  );
}
