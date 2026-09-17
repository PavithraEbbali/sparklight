/* ==========================================================================
   SINGLE SOURCE OF TRUTH
   --------------------------------------------------------------------------
   Every price, speed, promo qualifier, equipment fee and legal disclosure
   rendered anywhere on this site is read from this file.

   Change a number here and it cascades automatically to:
     - every plan card            (components/PlanCard.tsx)
     - the hero price anchor      (components/Hero.tsx)
     - the fine-print grid        (components/FinePrintGrid.tsx)
     - the marquee / trust strip  (components/Marquee.tsx)
     - the footer legal block     (components/Footer.tsx)

   No TSX layout file contains a hard-coded price, speed or fee.
   ========================================================================== */

/* -------------------------------------------------------------------------
   1. CORE DATA MODEL
   ------------------------------------------------------------------------- */

export type ServiceLine =
  | 'fiber'
  | 'cable'
  | 'bundle'
  | 'tv'
  | 'mobile'
  | 'phone';

export interface PlanItem {
  id: string;
  name: string;
  serviceLine: ServiceLine;
  speedDown?: number;
  speedUp?: number;
  price?: number;
  cents?: string;
  promoQualifier?: string;
  equipmentFee?: string;
  dataPolicy?: string;
  contractTerm?: string;
  features: string[];
  isPopular?: boolean;
  /** Optional one-line positioning statement shown under the plan name. */
  blurb?: string;
}

/* -------------------------------------------------------------------------
   2. RETAILER IDENTITY  (edit these two blocks to rebrand the whole site)
   ------------------------------------------------------------------------- */

export const RETAILER = {
  /**
   * The name shown in the wordmark, the page title and the footer.
   * This site sells Sparklight service as an authorized retailer, so it
   * trades under the Sparklight name.
   */
  name: 'Sparklight',
  shortName: 'Sparklight',
  /** Persistent, non-dismissable top-bar disclosure. */
  disclosure: 'Independent Authorized Retailer of Sparklight.',
  eyebrow: 'Authorized Retailer',
} as const;

/**
 * Placeholder number. 555-01xx is the reserved fictional range, so nothing
 * real is ever dialled before the client supplies their tracking line.
 * Replace BOTH fields together.
 */
export const PHONE = {
  display: '(888) 555-0142',
  href: 'tel:+18885550142',
} as const;

/* -------------------------------------------------------------------------
   2b. IMAGERY
   -------------------------------------------------------------------------
   Sources live in /public/images. All were converted to WebP at their native
   crop; next/image handles the responsive resizing and AVIF negotiation.

   Alt text describes what is in the frame, for someone who cannot see it.
   ------------------------------------------------------------------------- */

export interface SiteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const IMAGES = {
  hero: {
    src: '/images/hero-home.webp',
    alt: 'A bright living room in a suburban home, with a sofa beside a large window and a kitchen doorway beyond.',
    width: 1253,
    height: 768,
  },
  fiber: {
    src: '/images/fiber-build.webp',
    alt: 'A technician splicing fiber-optic strands inside a street-side utility cabinet on a residential road.',
    width: 1253,
    height: 768,
  },
  tv: {
    src: '/images/tv-livingroom.webp',
    alt: 'Two people watching television from a sofa in a softly lit living room.',
    width: 1253,
    height: 768,
  },
  mobile: {
    src: '/images/mobile-on-the-go.webp',
    alt: 'A woman checking her phone as she walks along a small-town main street.',
    width: 1253,
    height: 768,
  },
  equipment: {
    src: '/images/equipment-modem-eero.webp',
    alt: 'A cable modem and a mesh Wi-Fi unit sitting on a wooden shelf beside a window.',
    width: 1253,
    height: 768,
  },
  install: {
    src: '/images/install-technician.webp',
    alt: 'An installer kneeling beside a living-room wall outlet, connecting a cable to a modem.',
    width: 1253,
    height: 768,
  },
  family: {
    src: '/images/family-connected.webp',
    alt: 'A family at home in the evening: one person works on a laptop, a teenager plays a game and a child reads on a tablet.',
    width: 1221,
    height: 768,
  },
  phone: {
    src: '/images/home-phone.webp',
    alt: 'A corded telephone on a wooden hallway table, beside a set of keys and a stack of mail, with daylight coming through the front door behind.',
    width: 1253,
    height: 768,
  },
  /** Social share card. JPEG, because some scrapers still reject WebP. */
  og: {
    src: '/images/og-share.jpg',
    alt: 'A suburban home in late-afternoon light.',
    width: 1200,
    height: 630,
  },
} as const satisfies Record<string, SiteImage>;

/* -------------------------------------------------------------------------
   3. SPARKLIGHT PLAN CATALOGUE
   ------------------------------------------------------------------------- */

export const PLANS: PlanItem[] = [
  /* ---- FIBER ---------------------------------------------------------- */
  {
    id: 'fiber-gig',
    name: 'Sparklight Fiber 1 Gig',
    serviceLine: 'fiber',
    speedDown: 1000,
    speedUp: 1000,
    blurb: '100% fiber-optic, straight to the home.',
    promoQualifier:
      'Sparklight Fiber is built out community by community and is not available in all areas.',
    equipmentFee: 'Sparklight modem and compatible router required',
    dataPolicy: 'Unlimited data plan available',
    contractTerm: 'No annual contract',
    features: [
      'Symmetrical download and upload speeds',
      'Fully fiber-optic connection to your home',
      'Interference-free performance, even at peak hours',
      'Built to pair with eero whole-home Wi-Fi',
    ],
  },
  {
    id: 'fiber-multi-gig',
    name: 'Sparklight Multi-Gig Fiber',
    serviceLine: 'fiber',
    blurb: 'Multi-gig speeds in select growing markets.',
    promoQualifier:
      'Multi-gig tiers are offered in select markets as the fiber build expands.',
    equipmentFee: 'eero Max 7 recommended for multi-gig tiers',
    dataPolicy: 'Unlimited data plan available',
    contractTerm: 'No annual contract',
    features: [
      'Headroom for large-file creative and data work',
      'Designed for homes running many high-demand devices',
      'Future-ready speed tiers as the fiber network grows',
      'Whole-home mesh coverage with eero Max 7',
    ],
  },

  /* ---- CABLE (Sparklight Internet, fiber-powered network) -------------- */
  {
    id: 'internet-300',
    name: 'Sparklight Internet 300',
    serviceLine: 'cable',
    speedDown: 300,
    blurb: 'Reliable speeds for a seamless connection.',
    promoQualifier:
      'Regular rates run $60 to $105/mo. depending on plan and location.',
    equipmentFee: 'Modem with eero Wi-Fi device lease from $0 to $14.99/mo.',
    dataPolicy: 'Unlimited data available',
    contractTerm: 'No contracts',
    features: [
      'Free installation on qualifying online orders',
      'Free Unlimited Sparklight Mobile line for a year',
      'Whole-home Wi-Fi with eero TrueMesh',
      'No annual contract',
    ],
  },
  {
    id: 'internet-600',
    name: 'Sparklight Internet 600',
    serviceLine: 'cable',
    speedDown: 600,
    blurb: 'Plenty of speed to work at home across multiple devices.',
    promoQualifier:
      'Regular rates run $60 to $105/mo. depending on plan and location.',
    equipmentFee: 'Modem with eero Wi-Fi device lease from $0 to $14.99/mo.',
    dataPolicy: 'Unlimited data available',
    contractTerm: 'No contracts',
    features: [
      'Free installation on qualifying online orders',
      'Free Unlimited Sparklight Mobile line for a year',
      'Comfortable headroom for video calls and 4K streaming',
      'No annual contract',
    ],
  },
  {
    id: 'internet-1gig',
    name: 'Sparklight 1 Gig Internet',
    serviceLine: 'cable',
    speedDown: 1000,
    price: 40,
    cents: '00',
    isPopular: true,
    blurb: 'Great for gaming, streaming and supporting the whole house.',
    promoQualifier:
      '$40/mo. for 12 months, then $45 to $55/mo. for months 13 to 24 and $50 to $75/mo. for months 25 to 36 depending on location. New customers only. Requires Auto Pay with a checking or savings account or debit card, plus paperless billing.',
    equipmentFee: 'Modem with eero Wi-Fi device lease from $0 to $14.99/mo.',
    dataPolicy: 'Includes Unlimited data plan',
    contractTerm: 'No contracts',
    features: [
      'Free installation when you order online',
      'Free Unlimited Sparklight Mobile line for a year',
      'Supports up to nine heavy users at once',
      'Unlimited data plan included',
    ],
  },
  {
    id: 'internet-lift',
    name: 'Lift Internet',
    serviceLine: 'cable',
    speedDown: 200,
    speedUp: 20,
    price: 29,
    cents: '95',
    blurb: 'Low-cost internet for qualifying households.',
    promoQualifier:
      'Requires verified enrolment in at least one qualifying U.S. government assistance program, such as Medicaid, SNAP, TANF or WIC. Available in select areas.',
    equipmentFee: 'Wi-Fi capable modem included',
    dataPolicy: 'Unlimited data available',
    contractTerm: 'No contracts',
    features: [
      'Equipment included at no extra monthly cost',
      'No deposits and no installation fees',
      'Plenty of speed for streaming, homework and remote work',
      '30-day money-back guarantee on new service',
    ],
  },

  /* ---- BUNDLES --------------------------------------------------------- */
  {
    id: 'bundle-internet-mobile',
    name: 'Internet + Sparklight Mobile',
    serviceLine: 'bundle',
    isPopular: true,
    blurb: 'Pair home internet with nationwide 5G on one bill.',
    promoQualifier:
      'The free line covers a maximum of one mobile line at no monthly service charge for 12 consecutive billing months, up to the standard Unlimited plan rate. Requires active Sparklight Internet for the full 12-month period.',
    equipmentFee: 'Bring your own device, or choose one at checkout',
    dataPolicy:
      'Unlimited data on the home plan; mobile data subject to network management',
    contractTerm: 'No annual contracts',
    features: [
      'Free Unlimited Mobile line for one year',
      'Reliable 5G nationwide coverage',
      'Unlimited talk and text',
      'Keep your current number and your current phone',
    ],
  },
  {
    id: 'bundle-internet-tv',
    name: 'Internet + Sparklight TV',
    serviceLine: 'bundle',
    blurb: 'Your full channel lineup on the screens you already own.',
    promoQualifier:
      'Sparklight Internet is required to subscribe to Sparklight TV.',
    equipmentFee: 'No cable boxes required',
    dataPolicy: 'Unlimited data available on the home plan',
    contractTerm: 'No annual contracts',
    features: [
      'Stream live TV on up to 6 screens',
      '200 hours of cloud DVR included',
      'Video on demand and an easy-to-use guide',
      'One provider for internet and television',
    ],
  },

  /* ---- TV -------------------------------------------------------------- */
  {
    id: 'tv-economy',
    name: 'Economy Sparklight TV Plus',
    serviceLine: 'tv',
    price: 54,
    cents: '00',
    blurb: 'Up to 20 channels, including your local broadcast lineup.',
    promoQualifier:
      'Starting rate. Sparklight Internet is required to subscribe to Sparklight TV.',
    equipmentFee:
      'Modem lease of $10.50/mo. required if you do not already have Sparklight Internet',
    dataPolicy: 'Streams over your home internet connection',
    contractTerm: 'No annual contracts',
    features: [
      'Local broadcast channels in SD and HD',
      'Watch on up to 6 screens',
      '200 hours of cloud DVR',
      'Video on demand',
    ],
  },
  {
    id: 'tv-standard',
    name: 'Standard Sparklight TV Plus',
    serviceLine: 'tv',
    price: 148,
    cents: '00',
    isPopular: true,
    blurb: 'Up to 100 channels, from news and sport to lifestyle.',
    promoQualifier:
      'Starting rate. Sparklight Internet is required to subscribe to Sparklight TV.',
    equipmentFee:
      'Modem lease of $10.50/mo. required if you do not already have Sparklight Internet',
    dataPolicy: 'Streams over your home internet connection',
    contractTerm: 'No annual contracts',
    features: [
      'Everything in Economy, plus the full cable network lineup',
      'Watch on up to 6 screens',
      '200 hours of cloud DVR',
      'TV Everywhere included',
    ],
  },

  /* ---- MOBILE ---------------------------------------------------------- */
  {
    id: 'mobile-unlimited',
    name: 'Sparklight Mobile Unlimited',
    serviceLine: 'mobile',
    isPopular: true,
    blurb: 'Nationwide 5G that rides alongside your home internet.',
    promoQualifier:
      'Sparklight Mobile requires Sparklight Internet. Up to 6 mobile lines per customer. Lower-tier plans are also available.',
    equipmentFee: 'Bring your own device',
    dataPolicy:
      'Unlimited plan data is subject to network management; speeds may be reduced during congestion after the high-speed threshold',
    contractTerm: 'No annual contracts',
    features: [
      'Reliable 5G nationwide coverage',
      'Unlimited talk and text',
      'Keep your number when you switch',
      'Up to 6 lines on one account',
    ],
  },

  /* ---- PHONE ----------------------------------------------------------- */
  {
    id: 'phone-home',
    name: 'Sparklight Phone',
    serviceLine: 'phone',
    blurb: 'A home line with clear digital sound and no hidden fees.',
    promoQualifier:
      'Residential rates vary by service area. International rates are published per region and are subject to change.',
    equipmentFee: 'Works alongside your Sparklight modem',
    dataPolicy: 'Not applicable to voice service',
    contractTerm: 'No annual contracts',
    features: [
      'Local and long-distance calling',
      'Crystal-clear digital sound quality',
      'Transfer the number you already have',
      'Competitive international rates by region',
    ],
  },
];

/* -------------------------------------------------------------------------
   4. SERVICE-LINE SECTIONS  (render order is driven entirely by this array)
   ------------------------------------------------------------------------- */

export interface ServiceSectionMeta {
  line: ServiceLine;
  eyebrow: string;
  heading: string;
  intro: string;
  /** Card columns at lg and up. */
  columns: 2 | 3 | 4;
  /** Optional photograph for the section. */
  image?: SiteImage;
  /**
   * How that photograph is used.
   *   side       — a 16:10 frame next to the heading (default)
   *   background — full-bleed behind the whole section
   *   card       — the photograph becomes the plan card's own background,
   *                and the card is centred in the section
   */
  imageMode?: 'side' | 'background' | 'card';
}

export const SERVICE_SECTIONS: ServiceSectionMeta[] = [
  {
    line: 'fiber',
    eyebrow: 'Fiber',
    heading: 'Sparklight Fiber',
    intro:
      'Sparklight has invested nearly $1 billion expanding its fiber-powered network. In select communities that build reaches all the way to the home, delivering symmetrical speeds over a fully fiber-optic connection.',
    columns: 2,
    image: IMAGES.fiber,
  },
  {
    line: 'cable',
    eyebrow: 'Internet',
    heading: 'Sparklight Internet plans',
    intro:
      'Every Sparklight Internet plan runs on the same fiber-powered network and advanced HFC infrastructure, so speeds hold up when the whole house is online at once.',
    columns: 4,
  },
  {
    line: 'bundle',
    eyebrow: 'Bundles',
    heading: 'Bundle and save',
    intro:
      'Sparklight TV and Sparklight Mobile both build on a Sparklight Internet connection. Ordering them together keeps everything on a single account.',
    columns: 2,
  },
  {
    line: 'tv',
    eyebrow: 'Television',
    heading: 'Sparklight TV',
    intro:
      'Sparklight TV brings your full lineup to any screen through the app and a cloud DVR, so there are no cable boxes to find room for.',
    columns: 2,
    image: IMAGES.tv,
  },
  {
    line: 'mobile',
    eyebrow: 'Mobile',
    heading: 'Sparklight Mobile',
    intro:
      'Add nationwide 5G to your Sparklight Internet account, bring the phone you already own, and keep your number.',
    columns: 2,
    image: IMAGES.mobile,
    imageMode: 'background',
  },
  {
    line: 'phone',
    eyebrow: 'Home phone',
    heading: 'Sparklight Phone',
    intro:
      'A dependable residential line for the calls that still belong on one. Clear digital sound, popular calling features, no hidden fees.',
    columns: 2,
    image: IMAGES.phone,
    imageMode: 'card',
  },
];

/* -------------------------------------------------------------------------
   5. HERO
   ------------------------------------------------------------------------- */

export const HERO = {
  h1: 'Fiber-powered internet for every room in your home.',
  /**
   * The phrase inside h1 that gets the gold highlight sweep. Must appear in
   * h1 verbatim, on a word boundary; if it does not match, the headline just
   * renders unhighlighted rather than breaking.
   */
  h1Highlight: 'Fiber-powered',
  subline:
    'Sparklight delivers speeds from 300 Mbps to 1 Gig across the communities it serves, with whole-home Wi-Fi built on eero TrueMesh and no annual contract. Confirm availability at your address, then place your order by phone.',
  /** Drives the hero price anchor and the offer ribbon. Must match a PlanItem id. */
  leadPlanId: 'internet-1gig',
  /** Short label that sits on the highlighted offer ribbon. */
  offerEyebrow: 'Limited-time offer',
  offerNote: 'Free installation when you order online',
  trustChips: [
    'Reliable Speeds',
    'Unlimited Data Plans Available',
    'Wall-to-Wall Wi-Fi',
  ],
  /** The metric strip that closes the hero. */
  highlights: [
    { value: '300 Mbps – 1 Gig', label: 'Speed tiers available' },
    { value: 'No annual contract', label: 'On every residential plan' },
    { value: 'eero TrueMesh', label: 'Whole-home Wi-Fi coverage' },
  ],
} as const;

/* -------------------------------------------------------------------------
   6. MARQUEE / TICKER
   ------------------------------------------------------------------------- */

export const MARQUEE_ITEMS: string[] = [
  'Fiber-powered network',
  'No annual contracts',
  'Free installation on qualifying online orders',
  'eero TrueMesh whole-home Wi-Fi',
  'Unlimited data plans available',
  'Nationwide 5G with Sparklight Mobile',
  'Cloud DVR on every TV plan',
  '24/7 technical support',
];

/* -------------------------------------------------------------------------
   7. FINE-PRINT GRID  (hardware, monthly fees, inclusions)
   ------------------------------------------------------------------------- */

export interface FinePrintRow {
  item: string;
  cost: string;
  detail: string;
}

export const FINE_PRINT: FinePrintRow[] = [
  {
    item: 'Modem + eero Wi-Fi device lease',
    cost: '$0 to $14.99/mo.',
    detail:
      'The exact lease rate depends on the plan and eero model. Sparklight recommends its own modem and eero router because both are tested against the network.',
  },
  {
    item: 'Sparklight TV modem',
    cost: '$10.50/mo.',
    detail:
      'Only required if you take Sparklight TV without an existing Sparklight Internet connection.',
  },
  {
    item: 'Lift Internet equipment',
    cost: 'Included',
    detail:
      'A Wi-Fi capable DOCSIS 3.1 modem is included in the Lift Internet rate, with no deposit and no installation fee.',
  },
  {
    item: 'Installation',
    cost: 'Free on qualifying online orders',
    detail:
      'Professional installation and self-install kits are both offered. Same-day installation is available in some areas.',
  },
  {
    item: 'Data allowance',
    cost: 'Unlimited on most plans',
    detail:
      'The 1 Gig promotional rate includes the Unlimited data plan. Usage remains subject to the Acceptable Use Policy.',
  },
  {
    item: 'Contract term',
    cost: 'None',
    detail:
      'Sparklight residential internet, TV and mobile services are sold without an annual contract.',
  },
  {
    item: 'Taxes, surcharges and fees',
    cost: 'Not included',
    detail:
      'Advertised rates exclude taxes, surcharges and fees for most plans. Pricing and availability vary by location.',
  },
];

/* -------------------------------------------------------------------------
   8. HOW IT WORKS / WHY US
   ------------------------------------------------------------------------- */

export interface FeatureItem {
  title: string;
  body: string;
  /** Key into the icon map in components/Icons.tsx */
  icon: string;
}

export const WHY_US: FeatureItem[] = [
  {
    title: 'A fiber-powered network',
    body: 'Nearly $1 billion has gone into extending fiber through the Sparklight footprint, with an advanced HFC design carrying it the rest of the way. That is what keeps speeds consistent through the evening peak.',
    icon: 'fiber',
  },
  {
    title: 'Wall-to-wall Wi-Fi',
    body: 'eero TrueMesh uses several access points working as one network, steering bandwidth to whichever room needs it. A single eero Pro 6E covers up to 2,000 sq ft, and you can add devices for more.',
    icon: 'wifi',
  },
  {
    title: 'Unlimited data plans available',
    body: 'Most Sparklight Internet plans offer unlimited data, and the 1 Gig promotional rate includes the Unlimited data plan outright. No counting gigabytes at the end of the month.',
    icon: 'infinity',
  },
  {
    title: 'Installed the way you prefer',
    body: 'Choose a technician appointment with text updates on the day, collect a self-install kit from your local store, or have one shipped with tracking. Same-day install is available in some areas.',
    icon: 'truck',
  },
  {
    title: 'No annual contracts',
    body: 'Residential internet, TV and mobile are all sold without a term commitment, so the plan can change when the household does.',
    icon: 'shield',
  },
  {
    title: 'One call, one order',
    body: 'Tell us the address and how the house actually uses the internet. We match the speed tier, the eero setup and any TV, mobile or phone add-ons, then place the order on the line.',
    icon: 'phone',
  },
];

export interface StepItem {
  title: string;
  body: string;
}

export const STEPS: StepItem[] = [
  {
    title: 'Check the address',
    body: 'Enter your ZIP to confirm the Sparklight footprint reaches you, and which speed tiers are built out on your street.',
  },
  {
    title: 'Pick the right speed',
    body: 'We size the plan around device count and household habits rather than selling the largest tier by default.',
  },
  {
    title: 'Set up whole-home Wi-Fi',
    body: 'We work out how many eero devices your floorplan actually needs so the signal reaches the far corners.',
  },
  {
    title: 'Book the install',
    body: 'Choose a technician visit or a self-install kit, then get your appointment window or tracking details.',
  },
];

/* -------------------------------------------------------------------------
   9. FAQ
   ------------------------------------------------------------------------- */

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: 'What equipment do I need for Sparklight Internet?',
    a: 'A Sparklight modem plus a compatible router. Sparklight leases a modem together with an eero Wi-Fi device from $0 to $14.99 per month depending on the plan and model, and recommends its own equipment because it is tested against the network.',
  },
  {
    q: 'Is Sparklight Internet delivered over fiber?',
    a: 'The network is fiber-powered throughout most of the system, using fiber alongside an advanced HFC design. In select communities Sparklight runs fiber the whole way to the property, which is where the symmetrical Sparklight Fiber speeds come from.',
  },
  {
    q: 'How does installation work?',
    a: 'You can book a technician and pick an appointment window, with text updates before they arrive. If your order qualifies for self-install, you can collect a kit from your local Sparklight store or have one shipped with tracking. Every kit includes a modem, one or more eero devices, cables and a setup guide.',
  },
  {
    q: 'Do Sparklight Internet plans have data caps?',
    a: 'Unlimited data is offered on most available plans, and the 1 Gig promotional rate includes the Unlimited data plan. All usage remains subject to the Sparklight Acceptable Use Policy.',
  },
  {
    q: 'Am I locked into a contract?',
    a: 'No. Sparklight residential internet, TV and mobile services are sold without an annual contract.',
  },
  {
    q: 'Do I need Sparklight Internet to add TV or Mobile?',
    a: 'Yes. Both Sparklight TV and Sparklight Mobile are built on a Sparklight Internet connection. If you take Sparklight TV without internet service, a modem lease of $10.50 per month is required.',
  },
  {
    q: 'Can I keep my current phone number?',
    a: 'Yes, on both services. Sparklight Phone will transfer an existing landline number, and Sparklight Mobile lets you keep your number and bring your own device when you switch.',
  },
  {
    q: 'What is Lift Internet and how do I qualify?',
    a: 'Lift Internet is a low-cost plan running at 200 Mbps download and 20 Mbps upload for $29.95 per month with a Wi-Fi capable modem included. You qualify by verifying enrolment in at least one qualifying U.S. government assistance program, such as Medicaid, SNAP, TANF or WIC. It is offered in select areas.',
  },
  {
    q: 'How much Wi-Fi coverage should I expect?',
    a: 'A single eero Pro 6E covers up to 2,000 sq ft in ideal conditions. Larger or multi-storey homes usually want an additional eero device, and eero Outdoor 7 extends the same mesh to a patio, yard or workshop. Real coverage varies with building materials and layout.',
  },
  {
    q: 'What devices can I use with Sparklight TV?',
    a: 'The app runs on Amazon Fire TV devices, Apple TV, iPhone and iPad, Android phones and tablets, NVIDIA Shield, Sony and Sharp TVs with Fire TV built in, and desktop browsers including Chrome, Edge, Firefox and Safari.',
  },
];

/* -------------------------------------------------------------------------
   10. NAVIGATION + FOOTER
   ------------------------------------------------------------------------- */

export const NAV_LINKS = [
  { label: 'Plans', href: '#plans' },
  { label: 'Hardware', href: '#hardware' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: 'Plans',
    links: [
      { label: 'Sparklight Fiber', href: '#plans-fiber' },
      { label: 'Sparklight Internet', href: '#plans-cable' },
      { label: 'Bundles', href: '#plans-bundle' },
      { label: 'Sparklight TV', href: '#plans-tv' },
      { label: 'Sparklight Mobile', href: '#plans-mobile' },
      { label: 'Sparklight Phone', href: '#plans-phone' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'Hardware and fees', href: '#hardware' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Why order with us', href: '#why-us' },
      { label: 'Frequently asked questions', href: '#faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#legal-privacy' },
      { label: 'Terms of Use', href: '#legal-terms' },
      { label: 'Accessibility', href: '#legal-accessibility' },
      { label: 'Do Not Sell My Info', href: '#legal-dns' },
    ],
  },
] as const;

export const LEGAL = {
  /**
   * Primary reseller disclosure, repeated in the footer.
   * Phrased in the third person rather than as "<name> is an independent
   * retailer of <name>", because the site trades under the Sparklight name.
   */
  disclosure:
    'This site is operated by an independent authorized retailer of Sparklight and is not the Sparklight corporate website. Sparklight and the Sparklight logo are trademarks of Cable One, Inc. and its affiliates. All other trademarks are the property of their respective owners.',
  pricingNote:
    'Pricing, speeds and availability vary by location and are subject to change. Advertised rates exclude taxes, surcharges and fees for most plans. Promotional rates require the qualifying conditions shown on each plan. Actual speeds vary with equipment, in-home conditions, the number of connected devices and other factors. Not all services and offers are available in all areas.',
  wifiNote:
    'eero and all related marks are trademarks of Amazon.com, Inc., eero LLC or their affiliates. Wi-Fi coverage and speed depend on model type, building materials and layout, and cannot be guaranteed.',
} as const;

/* -------------------------------------------------------------------------
   11. DERIVED HELPERS  (the cascade layer)
   ------------------------------------------------------------------------- */

export const getPlansByLine = (line: ServiceLine): PlanItem[] =>
  PLANS.filter((p) => p.serviceLine === line);

export const getPlanById = (id: string): PlanItem | undefined =>
  PLANS.find((p) => p.id === id);

/** The hero price anchor. Falls back to the first priced plan. */
export const LEAD_PLAN: PlanItem =
  getPlanById(HERO.leadPlanId) ??
  PLANS.find((p) => p.price !== undefined) ??
  PLANS[0];

/** A plan is "callable for price" whenever no price is published. */
export const hasPrice = (plan: PlanItem): boolean =>
  typeof plan.price === 'number';

/**
 * The only place CTA wording is decided. Priced plans say "Call to order",
 * unpriced plans say "Call for pricing". Used by every card and section.
 */
export const ctaLabel = (plan: PlanItem): string =>
  hasPrice(plan) ? 'Call to order' : 'Call for pricing';

/** Renders 1000 -> "1 Gig", 300 -> "300 Mbps". */
export const formatSpeed = (mbps?: number): string | undefined => {
  if (mbps === undefined) return undefined;
  if (mbps >= 1000) {
    const gigs = mbps / 1000;
    return `${Number.isInteger(gigs) ? gigs : gigs.toFixed(1)} Gig`;
  }
  return `${mbps} Mbps`;
};

/** "1 Gig download" or "200 Mbps down / 20 Mbps up". */
export const speedSummary = (plan: PlanItem): string | undefined => {
  const down = formatSpeed(plan.speedDown);
  if (!down) return undefined;
  const up = formatSpeed(plan.speedUp);
  if (!up) return `${down} download`;
  if (plan.speedDown === plan.speedUp) return `${down} symmetrical`;
  return `${down} down / ${up} up`;
};

/** Sections that actually have plans. Empty service lines never render. */
export const ACTIVE_SECTIONS: ServiceSectionMeta[] = SERVICE_SECTIONS.filter(
  (s) => getPlansByLine(s.line).length > 0
);

/** Lowest published price across the catalogue, for the footer summary. */
export const LOWEST_PRICE: PlanItem | undefined = PLANS.filter(hasPrice).sort(
  (a, b) => (a.price ?? 0) - (b.price ?? 0)
)[0];
