import Image from 'next/image';
import type { SiteImage } from '@/lib/content';
import { Reveal } from '@/components/motion/Reveal';

/**
 * A photograph shown beside a section heading.
 *
 * Fixed 16:10 frame so every section image occupies the same shape however
 * the source is cropped, with `object-cover` doing the fitting. Lazy by
 * default — only the hero background is eager — and `sizes` is declared so
 * next/image ships a phone-sized file to a phone rather than the full
 * desktop asset.
 */
export default function SectionMedia({
  image,
  className = '',
  priority = false,
}: {
  image: SiteImage;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Reveal
      direction="left"
      distance={26}
      duration={0.9}
      blur
      className={`min-w-0 ${className}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_54px_-40px_rgba(46,54,68,0.6)]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 30rem, (min-width: 640px) 90vw, 100vw"
          priority={priority}
          className="object-cover"
        />
        {/* A whisper of brand tint so photography sits with the palette
            rather than reading as a pasted-in stock shot. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-spark-900/12 via-transparent to-gold-400/8"
        />
      </div>
    </Reveal>
  );
}
