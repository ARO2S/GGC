'use client';

import Hero from '@/components/Hero';
import { useState, useRef } from 'react';

const MIN_SECONDS_ON_PAGE = 3;

const inputClass =
  'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent text-gray-900 bg-white';
const inputSmClass =
  'px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent text-gray-900 bg-white';
const labelClass = 'block text-sm font-medium text-gray-900 mb-2';
const radioClass = 'h-4 w-4 text-garden-600 focus:ring-garden-500 border-gray-300';
const checkClass = 'h-4 w-4 text-garden-600 focus:ring-garden-500 border-gray-300 rounded';
const sectionHeading = 'text-base font-semibold text-garden-800 border-b border-garden-200 pb-1 mb-4';

export default function Join() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [membershipType, setMembershipType] = useState<'new' | 'renew'>('new');
  const [hasSpecializedTraining, setHasSpecializedTraining] = useState<'yes' | 'no' | ''>('');
  const [isMasterGardener, setIsMasterGardener] = useState<'yes' | 'no' | ''>('');
  const [isNaturalist, setIsNaturalist] = useState<'yes' | 'no' | ''>('');
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

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
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
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <input type="hidden" name="form-name" value="membership" />
            <p className="hidden">
              <label>Don't fill this out if you're human: <input name="bot-field" /></label>
            </p>

            {/* ── Membership Type ── */}
            <div>
              <p className={sectionHeading}>Membership</p>
              <div className="space-y-4">
                <div>
                  <p className={labelClass}>Please check one:</p>
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

                <div>
                  <p className={labelClass}>Membership status:</p>
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

                <div className={membershipType === 'renew' ? '' : 'hidden'}>
                  <p className={labelClass}>If renewing, is this a change from last year?</p>
                  <div className="flex gap-6">
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
              </div>
            </div>

            {/* ── Contact Information ── */}
            <div>
              <p className={sectionHeading}>Contact Information</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className={labelClass}>Name</label>
                  <input type="text" id="name" name="name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="address" className={labelClass}>Address</label>
                  <input type="text" id="address" name="address" className={inputClass} />
                </div>
                <div className="grid grid-cols-6 gap-3">
                  <div className="col-span-3">
                    <label htmlFor="city" className={labelClass}>City</label>
                    <input type="text" id="city" name="city" className={inputClass} />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="state" className={labelClass}>State</label>
                    <input type="text" id="state" name="state" defaultValue="IL" className={inputClass} />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="zip" className={labelClass}>Zip</label>
                    <input type="text" id="zip" name="zip" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input type="email" id="email" name="email" className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phoneHome" className={labelClass}>Phone #</label>
                    <input type="tel" id="phoneHome" name="phoneHome" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phoneCell" className={labelClass}>Cell Phone #</label>
                    <input type="tel" id="phoneCell" name="phoneCell" className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Status / Interest ── */}
            <div>
              <p className={sectionHeading}>Your Interest</p>
              <div className="space-y-3">
                {[
                  { label: "I'm a current member.", name: "isCurrentMember" },
                  { label: "I'm interested in joining.", name: "isInterestedInJoining" },
                  { label: "Please contact me.", name: "pleaseContactMe" },
                ].map(({ label, name }) => (
                  <div key={name} className="flex items-center gap-6">
                    <span className="text-sm font-medium text-gray-900 w-56">{label}</span>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name={name} value="Yes" className={radioClass} />
                      <span className="text-sm">Y</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name={name} value="No" className={radioClass} />
                      <span className="text-sm">N</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Gardening Background ── */}
            <div>
              <p className={sectionHeading}>Gardening Background</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="gardeningYears" className={labelClass}>How long have you been gardening?</label>
                  <input type="text" id="gardeningYears" name="gardeningYears" placeholder="e.g. 10 years" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="gardeningInterest" className={labelClass}>What has interested you the most?</label>
                  <textarea id="gardeningInterest" name="gardeningInterest" rows={3} className={inputClass} />
                </div>
              </div>
            </div>

            {/* ── Gardening Interests ── */}
            <div>
              <p className={sectionHeading}>I&rsquo;m Interested In</p>
              <div className="space-y-5">

                {/* Indoor */}
                <div className="space-y-2">
                  <label className="inline-flex items-center gap-2 cursor-pointer font-medium">
                    <input type="checkbox" name="interestIndoor" value="yes" className={checkClass} />
                    <span>Indoor Gardening</span>
                  </label>
                  <div className="ml-6">
                    <p className="text-sm text-gray-600 mb-2">Any particular plants?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map((n) => (
                        <input key={n} type="text" name={`indoorPlant${n}`} placeholder={`Plant ${n}`} className={`${inputSmClass} w-full text-sm`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Outdoor */}
                <div className="space-y-3">
                  <label className="inline-flex items-center gap-2 cursor-pointer font-medium">
                    <input type="checkbox" name="interestOutdoor" value="yes" className={checkClass} />
                    <span>Outdoor Gardening</span>
                  </label>

                  {/* Flowers */}
                  <div className="ml-6 space-y-2">
                    <p className="text-sm font-medium text-gray-800">Flowers:</p>
                    <div className="flex flex-wrap gap-4 ml-2">
                      {['Shade', 'Sun', 'Mixed', 'Other'].map((opt) => (
                        <label key={opt} className="inline-flex items-center gap-1.5 cursor-pointer text-sm">
                          <input type="checkbox" name={`flowers${opt}`} value="yes" className={checkClass} />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Water Feature */}
                  <div className="ml-6 space-y-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-800">
                      <input type="checkbox" name="interestWaterFeature" value="yes" className={checkClass} />
                      <span>Water Feature</span>
                    </label>
                    <div className="flex flex-wrap gap-4 ml-6">
                      <label className="inline-flex items-center gap-1.5 cursor-pointer text-sm">
                        <input type="checkbox" name="waterWithPump" value="yes" className={checkClass} />
                        <span>With Pump &amp; Filter</span>
                      </label>
                      <label className="inline-flex items-center gap-1.5 cursor-pointer text-sm">
                        <input type="checkbox" name="waterWithout" value="yes" className={checkClass} />
                        <span>Without</span>
                      </label>
                    </div>
                  </div>

                  {/* Landscape */}
                  <div className="ml-6 flex flex-wrap gap-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-800">
                      <input type="checkbox" name="interestLandscapeDesign" value="yes" className={checkClass} />
                      <span>Landscape Design</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-800">
                      <input type="checkbox" name="interestInstallation" value="yes" className={checkClass} />
                      <span>Installation</span>
                    </label>
                  </div>

                  {/* Gardening type */}
                  <div className="ml-6 space-y-2">
                    <p className="text-sm font-medium text-gray-800">Gardening:</p>
                    <div className="flex flex-wrap gap-4 ml-2">
                      {['In Ground', 'Raised Bed', 'Container'].map((opt) => (
                        <label key={opt} className="inline-flex items-center gap-1.5 cursor-pointer text-sm">
                          <input type="checkbox" name={`gardening${opt.replace(' ', '')}`} value="yes" className={checkClass} />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Produce type */}
                  <div className="ml-6 space-y-2">
                    <p className="text-sm font-medium text-gray-800">Produce / Plants:</p>
                    <div className="flex flex-wrap gap-4 ml-2">
                      {['Veg', 'Fruit', 'Herbs', 'Flower', 'Other'].map((opt) => (
                        <label key={opt} className="inline-flex items-center gap-1.5 cursor-pointer text-sm">
                          <input type="checkbox" name={`produce${opt}`} value="yes" className={checkClass} />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ── Training & Credentials ── */}
            <div>
              <p className={sectionHeading}>Training &amp; Credentials</p>
              <div className="space-y-5">

                {/* Specialized Training */}
                <div className="space-y-2">
                  <p className={labelClass}>Have you had any Specialized Training classes?</p>
                  <div className="flex gap-6">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="specializedTraining" value="Yes" className={radioClass} onChange={() => setHasSpecializedTraining('yes')} />
                      <span>Y</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="specializedTraining" value="No" className={radioClass} onChange={() => setHasSpecializedTraining('no')} />
                      <span>N</span>
                    </label>
                  </div>
                  {hasSpecializedTraining === 'yes' && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">If yes, what were they?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[1, 2, 3].map((n) => (
                          <input key={n} type="text" name={`trainingClass${n}`} placeholder={`Class ${n}`} className={`${inputSmClass} w-full text-sm`} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Master Gardener */}
                <div className="space-y-2">
                  <p className={labelClass}>Are you a Master Gardener?</p>
                  <div className="flex items-center gap-6 flex-wrap">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="masterGardener" value="Yes" className={radioClass} onChange={() => setIsMasterGardener('yes')} />
                      <span>Y</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="masterGardener" value="No" className={radioClass} onChange={() => setIsMasterGardener('no')} />
                      <span>N</span>
                    </label>
                    {isMasterGardener === 'yes' && (
                      <div className="flex items-center gap-2">
                        <label htmlFor="masterGardenerYear" className="text-sm text-gray-700 whitespace-nowrap">Year:</label>
                        <input type="text" id="masterGardenerYear" name="masterGardenerYear" placeholder="e.g. 2018" className={`${inputSmClass} w-28 text-sm`} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Naturalist */}
                <div className="space-y-2">
                  <p className={labelClass}>Are you a Naturalist?</p>
                  <div className="flex items-center gap-6 flex-wrap">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="naturalist" value="Yes" className={radioClass} onChange={() => setIsNaturalist('yes')} />
                      <span>Y</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" name="naturalist" value="No" className={radioClass} onChange={() => setIsNaturalist('no')} />
                      <span>N</span>
                    </label>
                    {isNaturalist === 'yes' && (
                      <div className="flex items-center gap-2">
                        <label htmlFor="naturalistYear" className="text-sm text-gray-700 whitespace-nowrap">Year:</label>
                        <input type="text" id="naturalistYear" name="naturalistYear" placeholder="e.g. 2015" className={`${inputSmClass} w-28 text-sm`} />
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* ── Skills & Expertise ── */}
            <div>
              <p className={sectionHeading}>Skills &amp; Expertise</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="skillsTalents" className={labelClass}>
                    What skills or talents do you possess that have made you a better gardener?
                  </label>
                  <textarea id="skillsTalents" name="skillsTalents" rows={3} className={inputClass} />
                </div>
                <div>
                  <p className={labelClass}>
                    What are the top two or three areas/subjects of gardening you would be most comfortable answering questions about?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[1, 2, 3].map((n) => (
                      <div key={n}>
                        <label htmlFor={`expertArea${n}`} className="block text-xs text-gray-500 mb-1">Area {n}</label>
                        <input type="text" id={`expertArea${n}`} name={`expertArea${n}`} className={`${inputSmClass} w-full`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Mail address ── */}
            <div className="rounded-lg bg-gray-100 p-4 text-gray-900 text-sm">
              <p className="font-medium text-gray-900 mb-1">Mail with dues to:</p>
              <p>Greenville Garden Club<br />P.O. Box 164<br />Greenville, IL 62246</p>
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <div className="pt-2">
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
