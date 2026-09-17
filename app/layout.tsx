import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { HERO, IMAGES, LEAD_PLAN, RETAILER, hasPrice } from '@/lib/content';
import SmoothScroll from '@/components/motion/SmoothScroll';

/**
 * Inter is Sparklight's own declared fallback for Effra, which is a licensed
 * face we cannot redistribute. `display: swap` keeps the headline painting
 * immediately instead of blocking on the font.
 */
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const priceFragment = hasPrice(LEAD_PLAN)
  ? ` ${LEAD_PLAN.name} from $${LEAD_PLAN.price}${
      LEAD_PLAN.cents ? `.${LEAD_PLAN.cents}` : ''
    }/mo.`
  : '';

export const metadata: Metadata = {
  title: `${RETAILER.name} Authorized Retailer | Internet, TV, Mobile & Home Phone`,
  description: `Order Sparklight Internet, TV, Mobile and Home Phone through an independent authorized retailer.${priceFragment} Check availability and order by phone.`,
  applicationName: RETAILER.name,
  robots: { index: true, follow: true },
  openGraph: {
    title: `${RETAILER.name} Authorized Retailer | Internet, TV, Mobile & Home Phone`,
    description: HERO.subline,
    type: 'website',
    images: [
      {
        url: IMAGES.og.src,
        width: IMAGES.og.width,
        height: IMAGES.og.height,
        alt: IMAGES.og.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${RETAILER.name} Authorized Retailer`,
    description: HERO.subline,
    images: [IMAGES.og.src],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // The page must stay pinch-zoomable; capping it fails WCAG 1.4.4.
  maximumScale: 5,
  /** Brand purple, matching the top disclosure bar. */
  themeColor: '#8d3b90',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">
        <SmoothScroll />
        <a
          href="#plans"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-spark-500 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to plans
        </a>
        {children}
      </body>
    </html>
  );
}
