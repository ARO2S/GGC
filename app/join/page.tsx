'use client';

import Hero from '@/components/Hero';
import { useState, useRef } from 'react';

const MIN_SECONDS_ON_PAGE = 3;

const inputClass =
  'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent text-gray-900 bg-white';
const labelClass = 'block text-sm font-medium text-gray-900 mb-2';
const radioClass = 'h-4 w-4 text-garden-600 focus:ring-garden-500 border-gray-300';

export default function Join() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [membershipType, setMembershipType] = useState<'new' | 'renew'>('new');
  const loadTimeRef = useRef<number>(Date.now());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const secondsOnPage = (Date.now() - loadTimeRef.current) / 1000;
    if (secondsOnPage < MIN_SECONDS_ON_PAGE) {
      setError('Please take a moment to complete the form before submitting.');
      return;
    }
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('form-name', 'membership');
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });
    const body = params.toString();

    try {
      const res = await fetch('/netlify-forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or mail the form to the address below.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Hero title="Thank You!" subtitle="We've received your membership information" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 text-center">
            <svg className="h-16 w-16 text-garden-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Submitted Successfully!</h2>
            <p className="text-gray-900 mb-6">
              Thank you for your interest in the Greenville Garden Club. A club officer will review your information and contact you soon.
            </p>
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
      <Hero title="Become a Member" subtitle="Greenville Garden Club" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8">
          <form
            name="membership"
            method="POST"
            data-netlify="true"
            data-netlify-recaptcha="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="membership" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            {/* 1. New Membership / Renew Membership */}
            <div>
              <p className={labelClass}>1. Please check.</p>
              <div className="flex flex-wrap gap-6">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="membershipType" value="New Membership" className={radioClass} defaultChecked onChange={() => setMembershipType('new')} />
                  <span>New Membership</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="membershipType" value="Renew Membership" className={radioClass} onChange={() => setMembershipType('renew')} />
                  <span>Renew Membership</span>
                </label>
              </div>
            </div>

            {/* 2. Membership status */}
            <div>
              <p className={labelClass}>2. Which membership status do you wish?</p>
              <div className="flex flex-wrap gap-6">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="membershipStatus" value="Standard $5/Yr" className={radioClass} defaultChecked />
                  <span>Standard $5/Yr</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="membershipStatus" value="Junior $0 (High School or lower)" className={radioClass} />
                  <span>Junior $0 (High School or lower)</span>
                </label>
              </div>
            </div>

            {/* 3. If renewing, change from last year? */}
            <div className={membershipType === 'renew' ? '' : 'hidden'}>
              <p className={labelClass}>3. If renewing, is this a change from last year?</p>
              <div className="flex flex-wrap gap-6">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="changeFromLastYear" value="Yes" className={radioClass} />
                  <span>Yes</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="changeFromLastYear" value="No" className={radioClass} />
                  <span>No</span>
                </label>
              </div>
            </div>

            {/* 4. New Member or Renewing with Changes – Please complete */}
            <div className="pt-2 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-900 mb-4">
                4. New member or renewing with changes — please complete
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className={labelClass}>Name</label>
                  <input type="text" id="name" name="name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="address" className={labelClass}>Address</label>
                  <input type="text" id="address" name="address" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="cityZip" className={labelClass}>City + Zip</label>
                  <input type="text" id="cityZip" name="cityZip" placeholder="e.g. Greenville, IL 62246" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>E-mail</label>
                  <input type="email" id="email" name="email" className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phoneCell" className={labelClass}>Phone – Cell #</label>
                    <input type="tel" id="phoneCell" name="phoneCell" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phoneHome" className={labelClass}>Home #</label>
                    <input type="tel" id="phoneHome" name="phoneHome" className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* Preferred contact method */}
            <div>
              <p className={labelClass}>Which method do you prefer? (Check your choice)</p>
              <div className="flex flex-wrap gap-6">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="preferCell" value="yes" className="h-4 w-4 text-garden-600 focus:ring-garden-500 border-gray-300 rounded" />
                  <span>Cell Phone</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="preferHome" value="yes" className="h-4 w-4 text-garden-600 focus:ring-garden-500 border-gray-300 rounded" />
                  <span>Home Phone</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="preferEmail" value="yes" className="h-4 w-4 text-garden-600 focus:ring-garden-500 border-gray-300 rounded" />
                  <span>E-Mail</span>
                </label>
              </div>
            </div>

            {/* Mail with dues */}
            <div className="rounded-lg bg-gray-100 p-4 text-gray-900 text-sm">
              <p className="font-medium text-gray-900 mb-1">Mail with dues to:</p>
              <p>Donna Bristow<br />1406 Killarney Dr.<br />Greenville, IL 62246</p>
            </div>

            <div data-netlify-recaptcha></div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-garden-600 text-white font-semibold rounded-lg hover:bg-garden-700 focus:outline-none focus:ring-2 focus:ring-garden-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending…' : 'Click here to send electronically'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
