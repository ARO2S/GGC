'use client';

import Hero from '@/components/Hero';
import { useState, useRef } from 'react';

const MIN_SECONDS_ON_PAGE = 3;

export default function PlantQuestions() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    formData.set('form-name', 'plant-questions');
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });
    const body = params.toString();
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Hero title="Thank You!" subtitle="Your question has been received" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 text-center">
            <svg className="h-16 w-16 text-garden-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Question Submitted Successfully!</h2>
            <p className="text-gray-900 mb-6">
              Thank you for your question! One of our experienced club members will review it and 
              get back to you as soon as possible.
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
        title="Ask Plant Questions"
        subtitle="Our experienced members are here to help with your gardening questions"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-garden-800 mb-4">Get Expert Advice</h2>
            <p className="text-gray-900 leading-relaxed">
              Do you have questions about plant care, pest problems, garden design, or any other 
              gardening topic? Our club members have decades of combined experience and are happy 
              to share their knowledge. Submit your question below and we'll get back to you with 
              helpful advice!
            </p>
          </div>

          <form 
            name="plant-questions" 
            method="POST" 
            data-netlify="true"
            data-netlify-recaptcha="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="plant-questions" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder="e.g., Yellow leaves on tomato plants"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>

            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-900 mb-2">
                Your Question *
              </label>
              <textarea
                id="question"
                name="question"
                required
                rows={6}
                placeholder="Please provide as much detail as possible about your plant or gardening question..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent text-gray-900 bg-white"
              ></textarea>
              <p className="mt-2 text-sm text-gray-600">
                Tip: Include information like plant type, location, watering schedule, and any visible symptoms
              </p>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-900 mb-2">
                Your Location (City, State)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g., Greenville, IL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-garden-500 focus:border-transparent text-gray-900 bg-white"
              />
              <p className="mt-2 text-sm text-gray-600">
                Helps us provide advice specific to your growing zone
              </p>
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
                {submitting ? 'Sending…' : 'Submit Question'}
              </button>
            </div>

            <p className="text-sm text-gray-900 text-center">
              * Required fields
            </p>
          </form>
        </div>

        <div className="mt-8 bg-garden-50 rounded-lg p-6 border-l-4 border-garden-600">
          <h3 className="font-semibold text-garden-800 mb-2">Response Time</h3>
          <p className="text-gray-900 text-sm">
            We typically respond to questions within 2-3 business days. For urgent plant problems, 
            consider bringing a sample to one of our monthly meetings for immediate assistance.
          </p>
        </div>
      </div>
    </>
  );
}

