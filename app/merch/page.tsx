'use client';

import Hero from '@/components/Hero';
import { useState, useRef, useCallback } from 'react';

const MIN_SECONDS_ON_PAGE = 3;

const TSHIRT_SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL'] as const;
const POLO_SIZES   = ['S', 'M', 'L', 'XL', '2XL', '3XL'] as const;

const tshirtPrice = (size: string) => (['2XL', '3XL'].includes(size) ? 26 : 23);
const poloPrice   = (size: string) => (['2XL', '3XL'].includes(size) ? 38 : 35);
const APRON_PRICE = 35;

type SizeQtys = Record<string, number>;

const inputClass =
  'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent text-gray-900 bg-white';
const labelClass  = 'block text-sm font-medium text-gray-900 mb-2';
const sectionHead = 'text-base font-semibold text-garden-800 border-b border-garden-200 pb-1 mb-4';

function QtyInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <input
      type="number"
      min={0}
      max={99}
      value={value || ''}
      placeholder="0"
      onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
      className="w-14 px-2 py-1.5 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-garden-500 focus:border-transparent text-gray-900 bg-white"
    />
  );
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full aspect-square max-w-[240px] mx-auto mb-4 rounded-xl border-2 border-dashed border-garden-300 bg-garden-50 flex flex-col items-center justify-center text-garden-400 gap-2">
      <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="text-xs font-medium text-center px-2">{label}<br/>mockup coming soon</span>
    </div>
  );
}

export default function Merch() {
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const [tshirtQtys, setTshirtQtys] = useState<SizeQtys>({});
  const [poloMQtys,  setPoloMQtys]  = useState<SizeQtys>({});
  const [poloLQtys,  setPoloLQtys]  = useState<SizeQtys>({});
  const [apronQty,   setApronQty]   = useState(0);

  const loadTimeRef = useRef<number>(Date.now());

  const setQty = useCallback(
    (setter: React.Dispatch<React.SetStateAction<SizeQtys>>, size: string) =>
      (v: number) => setter((prev) => ({ ...prev, [size]: v })),
    [],
  );

  const tshirtTotal = TSHIRT_SIZES.reduce(
    (sum, s) => sum + (tshirtQtys[s] || 0) * tshirtPrice(s), 0,
  );
  const poloMTotal = POLO_SIZES.reduce(
    (sum, s) => sum + (poloMQtys[s] || 0) * poloPrice(s), 0,
  );
  const poloLTotal = POLO_SIZES.reduce(
    (sum, s) => sum + (poloLQtys[s] || 0) * poloPrice(s), 0,
  );
  const apronTotal  = apronQty * APRON_PRICE;
  const grandTotal  = tshirtTotal + poloMTotal + poloLTotal + apronTotal;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const secondsOnPage = (Date.now() - loadTimeRef.current) / 1000;
    if (secondsOnPage < MIN_SECONDS_ON_PAGE) {
      setError('Please take a moment to complete the form before submitting.');
      return;
    }

    if (grandTotal === 0) {
      setError('Please select at least one item before submitting.');
      return;
    }

    setSubmitting(true);
    const form     = e.currentTarget;
    const formData = new FormData(form);
    formData.set('form-name', 'merch-order');
    formData.set('order-total', `$${grandTotal}`);

    // Encode size quantities into readable strings for the email
    const tshirtSummary = TSHIRT_SIZES
      .filter((s) => (tshirtQtys[s] || 0) > 0)
      .map((s) => `${s}: ${tshirtQtys[s]}`)
      .join(', ');
    const poloMSummary = POLO_SIZES
      .filter((s) => (poloMQtys[s] || 0) > 0)
      .map((s) => `${s}: ${poloMQtys[s]}`)
      .join(', ');
    const poloLSummary = POLO_SIZES
      .filter((s) => (poloLQtys[s] || 0) > 0)
      .map((s) => `${s}: ${poloLQtys[s]}`)
      .join(', ');

    if (tshirtSummary) formData.set('tshirts', tshirtSummary);
    if (poloMSummary)  formData.set('polos-mens', poloMSummary);
    if (poloLSummary)  formData.set('polos-ladies', poloLSummary);
    if (apronQty > 0)  formData.set('aprons', String(apronQty));

    const params = new URLSearchParams();
    formData.forEach((value, key) => params.append(key, value.toString()));

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Hero title="Order Received!" subtitle="We'll be in touch to arrange pickup and payment" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 text-center">
            <svg className="h-16 w-16 text-garden-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-700 mb-6">
              Your order has been submitted. A club officer will reach out to confirm details and arrange payment.
            </p>
            <p className="text-xl font-semibold text-garden-700 mb-6">Order Total: ${grandTotal}</p>
            <a href="/" className="inline-block px-6 py-3 bg-garden-600 text-white rounded-lg hover:bg-garden-700 transition-colors">
              Return to Home
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Hero title="Merch" subtitle="Greenville Garden Club" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8">
          <form
            name="merch-order"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <input type="hidden" name="form-name" value="merch-order" />
            <input type="hidden" name="order-total" value="" />
            <input type="hidden" name="tshirts" value="" />
            <input type="hidden" name="polos-mens" value="" />
            <input type="hidden" name="polos-ladies" value="" />
            <input type="hidden" name="aprons" value="" />
            <p className="hidden">
              <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
            </p>

            {/* ── Contact ── */}
            <div>
              <p className={sectionHead}>Contact Information</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className={labelClass}>Name</label>
                  <input type="text" id="name" name="name" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone</label>
                  <input type="tel" id="phone" name="phone" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="date-needed" className={labelClass}>Date needed by</label>
                  <input type="date" id="date-needed" name="date-needed" className={inputClass} />
                </div>
              </div>
            </div>

            {/* ── T-Shirts ── */}
            <div>
              <p className={sectionHead}>T-Shirts</p>
              <ImagePlaceholder label="T-Shirt" />
              <p className="text-sm text-gray-500 mb-4">S–XL: $23 &nbsp;|&nbsp; 2XL–3XL: $26</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {TSHIRT_SIZES.map((s) => (
                        <th key={s} className="pb-2 px-1 font-medium text-gray-600 text-center">
                          {s}
                          <div className="text-xs font-normal text-gray-400">${tshirtPrice(s)}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {TSHIRT_SIZES.map((s) => (
                        <td key={s} className="pt-3 px-1 text-center">
                          <QtyInput
                            value={tshirtQtys[s] || 0}
                            onChange={setQty(setTshirtQtys, s)}
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              {tshirtTotal > 0 && (
                <p className="text-right text-sm font-medium text-garden-700 mt-2">
                  T-Shirt subtotal: ${tshirtTotal}
                </p>
              )}
            </div>

            {/* ── Polos ── */}
            <div>
              <p className={sectionHead}>Polos</p>
              <ImagePlaceholder label="Polo" />
              <p className="text-sm text-gray-500 mb-4">S–XL: $35 &nbsp;|&nbsp; 2XL–3XL: $38</p>

              {/* Men's */}
              <p className="text-sm font-semibold text-gray-700 mb-2">Men&apos;s cut</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {POLO_SIZES.map((s) => (
                        <th key={s} className="pb-2 px-1 font-medium text-gray-600 text-center">
                          {s}
                          <div className="text-xs font-normal text-gray-400">${poloPrice(s)}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {POLO_SIZES.map((s) => (
                        <td key={s} className="pt-3 px-1 text-center">
                          <QtyInput
                            value={poloMQtys[s] || 0}
                            onChange={setQty(setPoloMQtys, s)}
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              {poloMTotal > 0 && (
                <p className="text-right text-sm font-medium text-garden-700 mb-4">
                  Men&apos;s polo subtotal: ${poloMTotal}
                </p>
              )}

              {/* Ladies' */}
              <p className="text-sm font-semibold text-gray-700 mb-2">Ladies&apos; cut</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {POLO_SIZES.map((s) => (
                        <th key={s} className="pb-2 px-1 font-medium text-gray-600 text-center">
                          {s}
                          <div className="text-xs font-normal text-gray-400">${poloPrice(s)}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {POLO_SIZES.map((s) => (
                        <td key={s} className="pt-3 px-1 text-center">
                          <QtyInput
                            value={poloLQtys[s] || 0}
                            onChange={setQty(setPoloLQtys, s)}
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              {poloLTotal > 0 && (
                <p className="text-right text-sm font-medium text-garden-700 mt-2">
                  Ladies&apos; polo subtotal: ${poloLTotal}
                </p>
              )}
            </div>

            {/* ── Apron ── */}
            <div>
              <p className={sectionHead}>Apron</p>
              <ImagePlaceholder label="Apron" />
              <p className="text-sm text-gray-500 mb-4">$35 each</p>
              <div className="flex items-center gap-4">
                <label htmlFor="apron-qty" className="text-sm font-medium text-gray-700">Quantity:</label>
                <QtyInput value={apronQty} onChange={setApronQty} />
                {apronTotal > 0 && (
                  <span className="text-sm font-medium text-garden-700 ml-auto">
                    Apron subtotal: ${apronTotal}
                  </span>
                )}
              </div>
            </div>

            {/* ── Order Total ── */}
            {grandTotal > 0 && (
              <div className="rounded-lg bg-garden-50 border border-garden-200 px-5 py-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-garden-900">Order Total</span>
                  <span className="text-xl font-bold text-garden-700">${grandTotal}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Payment collected at pickup</p>
              </div>
            )}

            {/* ── Notes ── */}
            <div>
              <label htmlFor="notes" className={labelClass}>Notes or special requests</label>
              <textarea id="notes" name="notes" rows={3} className={inputClass} />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-garden-600 text-white font-semibold rounded-lg hover:bg-garden-700 focus:outline-none focus:ring-2 focus:ring-garden-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending…' : 'Submit Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
