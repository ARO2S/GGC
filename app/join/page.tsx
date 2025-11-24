'use client';

import Hero from '@/components/Hero';
import { useState } from 'react';

export default function Join() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    // Form will be handled by Netlify
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Hero title="Thank You!" subtitle="We've received your membership application" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <svg className="h-16 w-16 text-garden-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h2>
            <p className="text-gray-700 mb-6">
              Thank you for your interest in joining the Greenville Garden Club. A club officer will 
              review your application and contact you soon.
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
      <Hero 
        title="Join Our Club"
        subtitle="Become part of our gardening community"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-garden-800 mb-4">Membership Benefits</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-garden-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Access to monthly educational programs and workshops
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-garden-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Participation in community beautification projects
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-garden-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Early access to plant sales and special events
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-garden-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Connect with fellow gardening enthusiasts
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-garden-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Members-only newsletter with gardening tips and club updates
              </li>
            </ul>
          </div>

          <form 
            name="membership" 
            method="POST" 
            data-netlify="true"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  required
                  maxLength={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                Gardening Interests
              </label>
              <textarea
                id="interests"
                name="interests"
                rows={4}
                placeholder="Tell us about your gardening experience and what you hope to learn..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="volunteer"
                  className="mt-1 h-4 w-4 text-garden-600 focus:ring-garden-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I'm interested in volunteering for club projects and events
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-garden-600 text-white font-semibold rounded-lg hover:bg-garden-700 focus:outline-none focus:ring-2 focus:ring-garden-500 focus:ring-offset-2 transition-colors"
              >
                Submit Application
              </button>
            </div>

            <p className="text-sm text-gray-600 text-center">
              * Required fields
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

