'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';
import { PHONE } from '@/lib/content';

/**
 * ZIP availability checker.
 *
 * This is a front-end build with no backend, so the field does exactly what
 * it says: it validates the ZIP format and hands the caller straight to an
 * agent who can confirm what is built out on that street. It never claims to
 * have queried a coverage database.
 */
export default function ZipChecker({
  tone = 'dark',
}: {
  tone?: 'light' | 'dark';
}) {
  const inputId = useId();
  const [zip, setZip] = useState('');
  const [checked, setChecked] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDark = tone === 'dark';

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = zip.trim();

    if (!/^\d{5}$/.test(trimmed)) {
      setError('Enter a 5-digit ZIP code.');
      setChecked(null);
      return;
    }

    setError(null);
    setChecked(trimmed);
  };

  return (
    <div className="w-full">
      <form onSubmit={submit} noValidate className="w-full">
        <label
          htmlFor={inputId}
          className={`mb-2 block text-[0.8125rem] font-medium ${
            onDark ? 'text-white/70' : 'text-mute'
          }`}
        >
          Check availability at your address
        </label>

        <div
          className={`flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-1.5 ${
            onDark
              ? 'sm:border sm:border-white/15 sm:bg-white/8 sm:backdrop-blur'
              : 'sm:border sm:border-line sm:bg-white'
          }`}
        >
          <input
            id={inputId}
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="ZIP code"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, '').slice(0, 5));
              if (error) setError(null);
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={`h-12 w-full min-w-0 rounded-full px-5 text-base font-medium tracking-tight outline-none transition sm:h-11 sm:bg-transparent ${
              onDark
                ? 'border border-white/15 bg-white/8 text-white placeholder:text-white/45 sm:border-0'
                : 'border border-line bg-white text-ink placeholder:text-mute/70 sm:border-0'
            }`}
          />

          <button
            type="submit"
            className={`h-12 shrink-0 rounded-full px-6 text-[0.9375rem] font-semibold tracking-tight transition-colors duration-200 sm:h-11 ${
              onDark
                ? 'bg-white text-ink hover:bg-spark-50'
                : 'bg-spark-500 text-white hover:bg-spark-600'
            }`}
          >
            Check my ZIP
          </button>
        </div>
      </form>

      <div aria-live="polite" className="min-h-[1.5rem]">
        <AnimatePresence mode="wait" initial={false}>
          {error && (
            <motion.p
              key="error"
              id={`${inputId}-error`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
              className={`mt-2 text-sm font-medium ${
                onDark ? 'text-spark-200' : 'text-spark-600'
              }`}
            >
              {error}
            </motion.p>
          )}

          {checked && !error && (
            <motion.div
              key={checked}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`mt-3 flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between ${
                onDark
                  ? 'border border-white/12 bg-white/8 backdrop-blur'
                  : 'border border-spark-200 bg-spark-50'
              }`}
            >
              <p
                className={`text-sm leading-relaxed ${
                  onDark ? 'text-white/80' : 'text-ink'
                }`}
              >
                <span className="font-semibold">ZIP {checked}.</span> Speed
                tiers are built out street by street. One quick call confirms
                exactly what is available at your address.
              </p>

              <a
                href={PHONE.href}
                data-call-cta
                aria-label={`Call to order — ${PHONE.display}`}
                className={`inline-flex h-11 shrink-0 items-center justify-center rounded-full px-5 text-sm font-semibold tracking-tight transition-colors ${
                  onDark
                    ? 'bg-white text-ink hover:bg-spark-50'
                    : 'bg-spark-500 text-white hover:bg-spark-600'
                }`}
              >
                Call to order
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
